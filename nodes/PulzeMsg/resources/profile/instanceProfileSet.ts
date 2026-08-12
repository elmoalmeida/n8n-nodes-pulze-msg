import type { INodeProperties } from 'n8n-workflow';

export const profileInstanceProfileSetDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceProfileSet'], resource: ['profile'] } },
    description: "New display name",
    routing: { send: { type: "body", property: "name" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['instanceProfileSet'], resource: ['profile'] } },
    options: [
        {
          displayName: "Status",
          name: "status",
          type: "string",
          default: '',
          description: "New about text. An empty string is accepted and clears it — only Name is required.",
          routing: { send: { type: "body", property: "status" } },
        }
    ],
  }
];
