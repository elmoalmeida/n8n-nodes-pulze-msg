import type { INodeProperties } from 'n8n-workflow';

export const groupUpdateDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupUpdate'], resource: ['group'] } },
    description: "JID of the group",
    routing: { send: { type: "body", property: "jid" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['groupUpdate'], resource: ['group'] } },
    options: [
        {
          displayName: "Description",
          name: "description",
          type: "string",
          default: '',
          description: "New group topic/description. Omitted or empty means no change.",
          routing: { send: { type: "body", property: "description" } },
        },
        {
          displayName: "Name",
          name: "name",
          type: "string",
          default: '',
          description: "New group name. Omitted or empty means no change.",
          routing: { send: { type: "body", property: "name" } },
        }
    ],
  }
];
