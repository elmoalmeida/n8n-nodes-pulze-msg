import type { INodeProperties } from 'n8n-workflow';

export const profileInstancePrivacySetDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['instancePrivacySet'], resource: ['profile'] } },
    options: [
        {
          displayName: "Call Add",
          name: "callAdd",
          type: "string",
          default: '',
          description: "Who can call you. Accepts: all | contacts | contact_blacklist.",
          routing: { send: { type: "body", property: "callAdd" } },
        },
        {
          displayName: "Group Add",
          name: "groupAdd",
          type: "string",
          default: '',
          description: "Who can add you to groups. Accepts: all | contacts | contact_blacklist.",
          routing: { send: { type: "body", property: "groupAdd" } },
        },
        {
          displayName: "Last Seen",
          name: "lastSeen",
          type: "string",
          default: '',
          description: "Who can see your last seen. Accepts: all | contacts | contact_blacklist | none.",
          routing: { send: { type: "body", property: "lastSeen" } },
        },
        {
          displayName: "Online",
          name: "online",
          type: "string",
          default: '',
          description: "Who can see you online right now. Accepts only: all | match_last_seen.",
          routing: { send: { type: "body", property: "online" } },
        },
        {
          displayName: "Profile",
          name: "profile",
          type: "string",
          default: '',
          description: "Who can see your profile picture. Accepts: all | contacts | contact_blacklist | none.",
          routing: { send: { type: "body", property: "profile" } },
        },
        {
          displayName: "Read Receipts",
          name: "readReceipts",
          type: "string",
          default: '',
          description: "Read receipts (blue double check marks). Accepts: all | none.",
          routing: { send: { type: "body", property: "readReceipts" } },
        },
        {
          displayName: "Status",
          name: "status",
          type: "string",
          default: '',
          description: "Who can see your about text. Accepts: all | contacts | contact_blacklist | none.",
          routing: { send: { type: "body", property: "status" } },
        }
    ],
  }
];
