import type { INodeProperties } from 'n8n-workflow';

export const chatAvatarDescription: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatAvatar'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatAvatar'], resource: ['chat'] } },
    description: "Contact or group ID: 5511999999999@s.whatsapp.net, 123456789012345@lid (as it arrives in the webhook) or 120363000000000000@g.us. A plain number is also accepted.",
    routing: { send: { type: "query", property: "jid" } },
  }
];
