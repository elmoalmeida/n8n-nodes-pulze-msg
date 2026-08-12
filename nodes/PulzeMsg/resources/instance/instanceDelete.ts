import type { INodeProperties } from 'n8n-workflow';

export const instanceDeleteDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceDelete'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
