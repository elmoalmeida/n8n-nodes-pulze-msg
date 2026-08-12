import type { INodeProperties } from 'n8n-workflow';

export const chatBlockDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatBlock'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatBlock'], resource: ['chat'] } },
    description: "Number or JID of the contact to block",
    routing: { send: { type: "body", property: "jid" } },
  }
];
