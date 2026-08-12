import type { INodeProperties } from 'n8n-workflow';

export const communityCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['communityCreate'], resource: ['community'] } },
    description: "Community name, as members will see it",
    routing: { send: { type: "body", property: "name" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['communityCreate'], resource: ['community'] } },
    options: [
        {
          displayName: "Description",
          name: "description",
          type: "string",
          default: '',
          description: "Intro text, shown on the community's info screen",
          routing: { send: { type: "body", property: "description" } },
        }
    ],
  }
];
