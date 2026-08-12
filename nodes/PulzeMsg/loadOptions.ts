import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

interface PulzeInstance {
	name?: string;
	state?: string;
	connected?: boolean;
	loggedIn?: boolean;
}

/**
 * Fills the "Instance" dropdown from GET /instance/list, so nobody has to type
 * an instance name by hand.
 *
 * Both kinds of token work, but they see different things: an account token
 * lists every instance of the account, while an instance token gets a
 * single-item list with its own instance. Older Pulze servers answer 403 to an
 * instance token here — that is what the `instanceName` credential field is
 * for, and why a failure falls back to it instead of leaving the user stuck.
 */
export async function getInstances(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('pulzeMsgApi');
	const baseUrl = String(credentials.baseUrl ?? '').replace(/\/+$/, '');
	const fallback = String(credentials.instanceName ?? '').trim();

	let instances: PulzeInstance[];
	try {
		const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'pulzeMsgApi', {
			method: 'GET',
			url: `${baseUrl}/instance/list`,
			json: true,
		})) as { data?: PulzeInstance[] };
		instances = response?.data ?? [];
	} catch (error) {
		if (fallback !== '') {
			return [{ name: fallback, value: fallback }];
		}
		const detail = error instanceof Error ? error.message : String(error);
		throw new NodeOperationError(
			this.getNode(),
			`Could not load the instances from ${baseUrl}: ${detail}`,
			{
				description:
					'Check the Base URL and Token in the credential. If the token belongs to a single instance and the server is an older Pulze version, fill in the "Instance (for Testing the Connection)" field of the credential — the name there is used as the only option.',
				level: 'warning',
			},
		);
	}

	const options = instances
		.filter((instance) => typeof instance.name === 'string' && instance.name !== '')
		.map((instance) => ({
			name: instance.name as string,
			value: instance.name as string,
			description: instance.loggedIn
				? `Connected${instance.state ? ` (${instance.state})` : ''}`
				: `Not connected${instance.state ? ` (${instance.state})` : ''}`,
		}));

	options.sort((a, b) => a.name.localeCompare(b.name));
	return options;
}
