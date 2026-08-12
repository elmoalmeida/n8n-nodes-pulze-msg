import type { INodeProperties } from 'n8n-workflow';

export const chatContactsDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatContacts'], resource: ['chat'] } },
    description: "Name of the instance",
  }
];
