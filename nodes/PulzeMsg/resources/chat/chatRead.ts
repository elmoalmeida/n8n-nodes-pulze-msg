import type { INodeProperties } from 'n8n-workflow';

export const chatReadDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatRead'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "Chat",
    name: "chat",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatRead'], resource: ['chat'] } },
    description: "JID of the chat to mark as read",
    routing: { send: { type: "body", property: "chat" } },
  }
];
