import type { INodeProperties } from 'n8n-workflow';

export const chatMessageMediaBase64Description: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageMediaBase64'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
