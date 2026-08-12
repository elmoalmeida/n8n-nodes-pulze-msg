import type { INodeProperties } from 'n8n-workflow';

export const chatMessageMediaBase64Description: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageMediaBase64'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "ID",
    name: "id",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageMediaBase64'], resource: ['chat'] } },
    description: "ID of the message — the same one that appears in Get Chat Messages",
    routing: { send: { type: "query", property: "id" } },
  }
];
