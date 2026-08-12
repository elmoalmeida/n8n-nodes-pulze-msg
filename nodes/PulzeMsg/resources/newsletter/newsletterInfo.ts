import type { INodeProperties } from 'n8n-workflow';

export const newsletterInfoDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['newsletterInfo'], resource: ['newsletter'] } },
    options: [
        {
          displayName: "JID",
          name: "jid",
          type: "string",
          default: '',
          description: "Full JID of the channel (required, e.g. 1203630...@newsletter)",
          routing: { send: { type: "query", property: "jid" } },
        }
    ],
  }
];
