import type { INodeProperties } from 'n8n-workflow';

export const chatListDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatList'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['chatList'], resource: ['chat'] } },
    options: [
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: { minValue: 1 },
          default: 50,
          description: "Max number of results to return",
          routing: { send: { type: "query", property: "limit" } },
        }
    ],
  }
];
