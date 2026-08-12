import type { INodeProperties } from 'n8n-workflow';

export const chatCheckDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatCheck'], resource: ['chat'] } },
    description: "Name of the instance",
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
