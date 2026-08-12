import type { INodeProperties } from 'n8n-workflow';

export const instanceSettingsSetDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceSettingsSet'], resource: ['instance'] } },
    description: "Name of the instance",
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['instanceSettingsSet'], resource: ['instance'] } },
    options: [
        {
          displayName: "Always Online",
          name: "alwaysOnline",
          type: "boolean",
          default: false,
          description: "Whether to keep the WhatsApp status as always online",
          routing: { send: { type: "body", property: "alwaysOnline" } },
        },
        {
          displayName: "Ignore Groups",
          name: "ignoreGroups",
          type: "boolean",
          default: false,
          description: "Whether to ignore messages from groups (not saved to history, no webhook fired)",
          routing: { send: { type: "body", property: "ignoreGroups" } },
        },
        {
          displayName: "Ignore Status",
          name: "ignoreStatus",
          type: "boolean",
          default: false,
          description: "Whether to ignore status updates / stories",
          routing: { send: { type: "body", property: "ignoreStatus" } },
        },
        {
          displayName: "Mark Read",
          name: "markRead",
          type: "boolean",
          default: false,
          description: "Whether to automatically mark received messages as read",
          routing: { send: { type: "body", property: "markRead" } },
        },
        {
          displayName: "Reject Calls",
          name: "rejectCalls",
          type: "boolean",
          default: false,
          description: "Whether to automatically reject voice/video calls",
          routing: { send: { type: "body", property: "rejectCalls" } },
        },
        {
          displayName: "Sync History",
          name: "syncHistory",
          type: "boolean",
          default: false,
          description: "Whether to sync chat history on connect",
          routing: { send: { type: "body", property: "syncHistory" } },
        }
    ],
  }
];
