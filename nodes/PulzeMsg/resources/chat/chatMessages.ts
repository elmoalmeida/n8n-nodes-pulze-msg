import type { INodeProperties } from 'n8n-workflow';

export const chatMessagesDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatMessages'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "Chat",
    name: "chat",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatMessages'], resource: ['chat'] } },
    description: "JID of the chat (e.g. 5511999999999@s.whatsapp.net or ...@g.us)",
    routing: { send: { type: "query", property: "chat" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['chatMessages'], resource: ['chat'] } },
    options: [
        {
          displayName: "Before",
          name: "before",
          type: "number",
          default: 0,
          description: "Unix seconds. Returns only messages before this instant — to get the next page, use the timestamp of the oldest message you already loaded.",
          routing: { send: { type: "query", property: "before" } },
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: { minValue: 1 },
          default: 50,
          description: "Max number of results to return",
          routing: { send: { type: "query", property: "limit" } },
        }
    ],
  }
];
