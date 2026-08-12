import type { INodeProperties } from 'n8n-workflow';

export const communitySubgroupsDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['communitySubgroups'], resource: ['community'] } },
    options: [
        {
          displayName: "JID",
          name: "jid",
          type: "string",
          default: '',
          description: "Full JID of the community (required, ...@g.us format)",
          routing: { send: { type: "query", property: "jid" } },
        }
    ],
  }
];
