import type { INodeProperties } from 'n8n-workflow';

export const chatPresenceDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatPresence'], resource: ['chat'] } },
    description: "Name of the instance",
  },
  {
    displayName: "State",
    name: "state",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['chatPresence'], resource: ['chat'] } },
    description: "Without To: available | unavailable. With To: composing | recording | paused.",
    routing: { send: { type: "body", property: "state" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['chatPresence'], resource: ['chat'] } },
    options: [
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: '',
          description: "Number or JID of the chat. Empty means global presence (not chat-specific).",
          routing: { send: { type: "body", property: "to" } },
        }
    ],
  }
];
