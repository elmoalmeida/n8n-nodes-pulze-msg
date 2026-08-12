import type { INodeProperties } from 'n8n-workflow';

export const instanceConnectDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceConnect'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
