import { createHmac, timingSafeEqual } from 'crypto';

import {
	NodeConnectionTypes,
	NodeOperationError,
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
	type IDataObject,
} from 'n8n-workflow';

interface PulzeMsgCredentials {
	baseUrl: string;
	token: string;
	instanceName?: string;
}

const EVENT_TIPOS = ['message.exchange', 'message.status', 'instance.state', 'call.update'];

/**
 * Fires when the Pulze API delivers a WhatsApp event to a webhook this node
 * registers for itself (POST /events/webhook/{instance} on activation,
 * DELETE on deactivation — the same lifecycle the Chat/Instance resources
 * expose manually, driven here automatically).
 *
 * The signature check is the whole reason this node exists instead of a
 * plain Webhook node: Pulze signs every delivery with
 * `X-Pulze-Signature: sha256=<hex>` (internal/events/dispatcher.go,
 * HMAC-SHA256 over the exact raw request body) and shows the signing secret
 * ONLY in the create response — never again. A generic Webhook node can
 * receive the event but has no way to prove it actually came from Pulze
 * (and not from anyone who guesses the URL). This node keeps the secret in
 * the workflow's static data (n8n's per-node persistent storage) and
 * verifies it on every delivery before the workflow runs at all.
 *
 * The verification needs the RAW bytes of the body, not the JSON n8n parses
 * for you — re-serializing parsed JSON is not guaranteed to produce the
 * exact same bytes Go signed (key order, spacing). n8n's own core always
 * reads the raw body into `req.rawBody` before parsing
 * (n8n/dist/middlewares/body-parser.js: rawBodyReader), which is why this
 * reads `getRequestObject().rawBody` instead of `getBodyData()`.
 */
export class PulzeMsgTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pulze API Trigger',
		name: 'pulzeMsgTrigger',
		icon: { light: 'file:../PulzeMsg/pulzeMsg.svg', dark: 'file:../PulzeMsg/pulzeMsg.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["instance"]}}',
		description: 'Starts the workflow when the Pulze API delivers a WhatsApp event (message, status, connection, call)',
		defaults: {
			name: 'Pulze API Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'pulzeMsgApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Instance',
				name: 'instance',
				type: 'string',
				required: true,
				default: '',
				description: 'Name of the Pulze instance to receive events from. Registers one webhook on this instance while the workflow is active.',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: EVENT_TIPOS.map((v) => ({ name: v, value: v })),
				default: [],
				description: 'Which event types to receive. Leave empty to receive all of them (message.exchange, message.status, instance.state, call.update).',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				return webhookData.webhookSecret !== undefined;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials<PulzeMsgCredentials>('pulzeMsgApi');
				const instance = this.getNodeParameter('instance') as string;
				const events = this.getNodeParameter('events') as string[];
				const webhookUrl = this.getNodeWebhookUrl('default');

				// Stable across activate/deactivate cycles of the SAME node in the
				// SAME workflow, so reactivating upserts the existing webhook
				// (Pulze's own upsert-by-label rule) instead of piling up new ones
				// against the 3-per-instance limit.
				const label = `n8n-${this.getWorkflow().id ?? 'unsaved'}-${this.getNode().id}`;

				const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'pulzeMsgApi', {
					baseURL: credentials.baseUrl,
					url: `/events/webhook/${encodeURIComponent(instance)}`,
					method: 'POST',
					body: {
						label,
						url: webhookUrl,
						events,
						enabled: true,
					},
					json: true,
				})) as IDataObject;

				const secret = (response.data as IDataObject | undefined)?.secret ?? response.secret;
				if (!secret || typeof secret !== 'string') {
					// The create response carries the secret ONLY this once — no
					// secret back means we cannot verify deliveries, so activation
					// must fail loudly rather than silently accept unsigned events.
					throw new NodeOperationError(
						this.getNode(),
						'Pulze API did not return a webhook secret on creation — cannot verify signed deliveries.',
					);
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookSecret = secret;
				webhookData.label = label;
				webhookData.instance = instance;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const instance = webhookData.instance as string | undefined;
				const label = webhookData.label as string | undefined;

				if (instance && label) {
					try {
						const credentials = await this.getCredentials<PulzeMsgCredentials>('pulzeMsgApi');
						await this.helpers.httpRequestWithAuthentication.call(this, 'pulzeMsgApi', {
							baseURL: credentials.baseUrl,
							url: `/events/webhook/${encodeURIComponent(instance)}`,
							method: 'DELETE',
							qs: { label },
						});
					} catch (error) {
						// Delete is documented idempotent server-side (200 even for a
						// label that doesn't exist) — a failure here is network/auth,
						// not "already gone". Deactivation should not get stuck on it,
						// but the failure still needs to be visible somewhere.
						this.logger.warn('Pulze API Trigger: failed to remove the webhook on deactivation', {
							error: error instanceof Error ? error.message : String(error),
						});
					}
				}

				delete webhookData.webhookSecret;
				delete webhookData.label;
				delete webhookData.instance;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const webhookData = this.getWorkflowStaticData('node');
		const secret = webhookData.webhookSecret as string | undefined;
		const req = this.getRequestObject() as unknown as { rawBody?: Buffer };
		const headerSignature = (this.getHeaderData()['x-pulze-signature'] as string | undefined) ?? '';

		if (!secret || !req.rawBody) {
			const res = this.getResponseObject();
			res.status(401).json({ error: 'missing signing secret or raw body' });
			return { noWebhookResponse: true };
		}

		const esperado = 'sha256=' + createHmac('sha256', secret).update(req.rawBody).digest('hex');
		const bufEsperado = Buffer.from(esperado);
		const bufRecebido = Buffer.from(headerSignature);
		const valido =
			bufEsperado.length === bufRecebido.length && timingSafeEqual(bufEsperado, bufRecebido);

		if (!valido) {
			const res = this.getResponseObject();
			res.status(401).json({ error: 'invalid signature' });
			return { noWebhookResponse: true };
		}

		return {
			workflowData: [this.helpers.returnJsonArray([this.getBodyData()])],
		};
	}
}
