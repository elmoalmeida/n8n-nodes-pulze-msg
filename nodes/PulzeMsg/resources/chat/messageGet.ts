import type { INodeProperties } from 'n8n-workflow';

export const chatMessageGetDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageGet'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "ID",
    name: "id",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageGet'], resource: ['chat'] } },
    description: "ID of the message (the \"ID\" the send route returned, or the one that arrived in a webhook/WebSocket event)",
    routing: { send: { type: "query", property: "id" } },
  }
];
