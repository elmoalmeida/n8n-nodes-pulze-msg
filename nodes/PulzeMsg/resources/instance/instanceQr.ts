import type { INodeProperties } from 'n8n-workflow';

export const instanceQrDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceQr'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
