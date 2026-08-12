import type { INodeProperties } from 'n8n-workflow';

export const newsletterCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['newsletterCreate'], resource: ['newsletter'] } },
    description: "Channel name, visible to followers",
    routing: { send: { type: "body", property: "name" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['newsletterCreate'], resource: ['newsletter'] } },
    options: [
        {
          displayName: "Description",
          name: "description",
          type: "string",
          default: '',
          description: "Intro text, shown on the channel's info screen",
          routing: { send: { type: "body", property: "description" } },
        }
    ],
  }
];
