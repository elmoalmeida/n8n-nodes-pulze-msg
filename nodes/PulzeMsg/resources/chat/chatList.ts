import type { INodeProperties } from 'n8n-workflow';

export const chatListDescription: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatList'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
