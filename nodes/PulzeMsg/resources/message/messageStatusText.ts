import type { INodeProperties } from 'n8n-workflow';

export const messageStatusTextDescription: INodeProperties[] = [
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageStatusText'], resource: ['message'] } },
    description: "Status text",
    routing: { send: { type: "body", property: "text" } },
  }
];
