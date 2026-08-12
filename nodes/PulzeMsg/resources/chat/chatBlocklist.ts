import type { INodeProperties } from 'n8n-workflow';

export const chatBlocklistDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatBlocklist'], resource: ['chat'] } },
    description: "Name of the instance",
  }
];
