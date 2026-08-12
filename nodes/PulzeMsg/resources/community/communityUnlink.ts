import type { INodeProperties } from 'n8n-workflow';

export const communityUnlinkDescription: INodeProperties[] = [
  {
    displayName: "Community JID",
    name: "communityJid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['communityUnlink'], resource: ['community'] } },
    description: "Full JID of the community (...@g.us format)",
    routing: { send: { type: "body", property: "communityJid" } },
  },
  {
    displayName: "Group JID",
    name: "groupJid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['communityUnlink'], resource: ['community'] } },
    description: "Full JID of the group to unlink (...@g.us format)",
    routing: { send: { type: "body", property: "groupJid" } },
  }
];
