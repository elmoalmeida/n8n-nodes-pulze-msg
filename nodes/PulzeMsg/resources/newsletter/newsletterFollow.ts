import type { INodeProperties } from 'n8n-workflow';

export const newsletterFollowDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['newsletterFollow'], resource: ['newsletter'] } },
    description: "Full JID of the channel (e.g. 1203630...@newsletter)",
    routing: { send: { type: "body", property: "jid" } },
  }
];
