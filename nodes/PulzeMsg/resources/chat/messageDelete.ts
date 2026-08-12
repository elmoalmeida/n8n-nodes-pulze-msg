import type { INodeProperties } from 'n8n-workflow';

export const chatMessageDeleteDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageDelete'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageDelete'], resource: ['chat'] } },
    description: "Original recipient of the message (number or JID)",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageDelete'], resource: ['chat'] } },
    description: "ID (returned on the original send) of the message to delete",
    routing: { send: { type: "body", property: "messageId" } },
  }
];
