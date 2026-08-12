import type { INodeProperties } from 'n8n-workflow';

export const messageReactionDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageReaction'], resource: ['message'] } },
    description: "Recipient/chat where the message is. Accepts the \"chat\" (or \"sender\") field from a webhook event directly.",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageReaction'], resource: ['message'] } },
    description: "ID of the message to react to. Comes from the \"ID\" (or the \"messageId\" alias) field of the message.exchange event in your webhook.",
    routing: { send: { type: "body", property: "messageId" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageReaction'], resource: ['message'] } },
    options: [
        {
          displayName: "Emoji",
          name: "emoji",
          type: "string",
          default: '',
          description: "Reaction emoji (a single emoji). Empty removes the existing reaction.",
          routing: { send: { type: "body", property: "emoji" } },
        },
        {
          displayName: "From Me",
          name: "fromMe",
          type: "boolean",
          default: false,
          description: "Whether to react to a message that YOU sent yourself (instead of one received from the contact)",
          routing: { send: { type: "body", property: "fromMe" } },
        }
    ],
  }
];
