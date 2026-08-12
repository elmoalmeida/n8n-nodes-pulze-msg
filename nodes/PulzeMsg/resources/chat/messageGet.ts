import type { INodeProperties } from 'n8n-workflow';

export const chatMessageGetDescription: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageGet'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
