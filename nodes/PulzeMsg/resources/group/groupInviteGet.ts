import type { INodeProperties } from 'n8n-workflow';

export const groupInviteGetDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['groupInviteGet'], resource: ['group'] } },
    options: [
        {
          displayName: "JID",
          name: "jid",
          type: "string",
          default: '',
          description: "JID of the group (required)",
          routing: { send: { type: "query", property: "jid" } },
        }
    ],
  }
];
