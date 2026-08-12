import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

import { instanceDescription } from './resources/instance';
import { profileDescription } from './resources/profile';
import { messageDescription } from './resources/message';
import { chatDescription } from './resources/chat';
import { eventsDescription } from './resources/events';
import { groupDescription } from './resources/group';
import { communityDescription } from './resources/community';
import { newsletterDescription } from './resources/newsletter';
import { chatwootDescription } from './resources/chatwoot';
import { typebotDescription } from './resources/typebot';

export class PulzeMsg implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pulze API',
		name: 'pulzeMsg',
		icon: { light: 'file:pulzeMsg.svg', dark: 'file:pulzeMsg.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send and receive WhatsApp messages via the Pulze API',
		defaults: {
			name: 'Pulze API',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'pulzeMsgApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: "Chat", value: "chat" },
					{ name: "Chatwoot", value: "chatwoot" },
					{ name: "Community", value: "community" },
					{ name: "Event", value: "events" },
					{ name: "Group", value: "group" },
					{ name: "Instance", value: "instance" },
					{ name: "Message", value: "message" },
					{ name: "Newsletter (Channel)", value: "newsletter" },
					{ name: "Profile", value: "profile" },
					{ name: "Typebot", value: "typebot" },
				],
				default: 'message',
			},
			...instanceDescription,
			...profileDescription,
			...messageDescription,
			...chatDescription,
			...eventsDescription,
			...groupDescription,
			...communityDescription,
			...newsletterDescription,
			...chatwootDescription,
			...typebotDescription,
		],
	};
}
