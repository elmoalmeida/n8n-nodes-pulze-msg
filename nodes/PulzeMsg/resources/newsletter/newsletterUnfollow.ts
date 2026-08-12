import type { INodeProperties } from 'n8n-workflow';

export const newsletterUnfollowDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['newsletterUnfollow'], resource: ['newsletter'] } },
    description: "Full JID of the channel (e.g. 1203630...@newsletter)",
    routing: { send: { type: "body", property: "jid" } },
  }
];
