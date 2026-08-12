import type { INodeProperties } from 'n8n-workflow';

export const chatMessageEditDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageEdit'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageEdit'], resource: ['chat'] } },
    description: "Original recipient of the message (number or JID)",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageEdit'], resource: ['chat'] } },
    description: "ID (returned on the original send) of the message to edit",
    routing: { send: { type: "body", property: "messageId" } },
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageEdit'], resource: ['chat'] } },
    description: "New text that replaces the previous one",
    routing: { send: { type: "body", property: "text" } },
  }
];
