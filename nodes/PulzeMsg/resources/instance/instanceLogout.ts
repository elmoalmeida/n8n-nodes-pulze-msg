import type { INodeProperties } from 'n8n-workflow';

export const instanceLogoutDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceLogout'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
