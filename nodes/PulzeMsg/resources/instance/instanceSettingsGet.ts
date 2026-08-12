import type { INodeProperties } from 'n8n-workflow';

export const instanceSettingsGetDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceSettingsGet'], resource: ['instance'] } },
    description: "Name of the instance",
  }
];
