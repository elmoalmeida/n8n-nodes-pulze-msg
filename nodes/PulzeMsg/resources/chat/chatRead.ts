import type { INodeProperties } from 'n8n-workflow';

export const chatReadDescription: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatRead'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
