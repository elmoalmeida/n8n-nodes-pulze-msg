import type { INodeProperties } from 'n8n-workflow';

export const chatCheckDescription: INodeProperties[] = [
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatCheck'], resource: ['chat'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: "Numbers",
    name: "numbers",
    type: "string",
    typeOptions: { multipleValues: true },
    required: true,
    default: [],
    displayOptions: { show: { operation: ['chatCheck'], resource: ['chat'] } },
    description: "List of phone numbers (with country and area code, digits only). No need to know in advance whether it has the 9th digit — Pulze queries the number as given.",
    routing: { send: { type: "body", property: "numbers" } },
  }
];
