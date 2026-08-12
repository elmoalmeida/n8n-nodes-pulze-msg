import type { INodeProperties } from 'n8n-workflow';

export const groupInfoDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['groupInfo'], resource: ['group'] } },
    options: [
        {
          displayName: "JID",
          name: "jid",
          type: "string",
          default: '',
          description: "Full JID of the group (required, e.g. 12036300...@g.us)",
          routing: { send: { type: "query", property: "jid" } },
        }
    ],
  }
];
