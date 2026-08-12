import type { INodeProperties } from 'n8n-workflow';

export const instanceStatusDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceStatus'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
