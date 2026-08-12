import type { INodeProperties } from 'n8n-workflow';

export const messageTextDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageText'], resource: ['message'] } },
    description: "Recipient: phone number (with country and area code) or a full JID. The Brazilian 9th digit is resolved automatically.",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageText'], resource: ['message'] } },
    description: "Message text",
    routing: { send: { type: "body", property: "text" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageText'], resource: ['message'] } },
    options: [
        {
          displayName: "Delay",
          name: "delay",
          type: "number",
          default: 0,
          description: "Seconds of \"typing...\" before sending. Values above 15 are capped to 15 by the API.",
          routing: { send: { type: "body", property: "delay" } },
        },
        {
          displayName: "Quoted ID",
          name: "quotedId",
          type: "string",
          default: '',
          description: "ID of a message from this instance's history, to reply quoting it. Must exist in the history of THIS instance.",
          routing: { send: { type: "body", property: "quotedId" } },
        }
    ],
  }
];
