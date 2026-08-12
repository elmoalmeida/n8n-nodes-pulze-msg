import type { INodeProperties } from 'n8n-workflow';

export const messageContactDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageContact'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID — who RECEIVES the card",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Phone Number",
    name: "phoneNumber",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageContact'], resource: ['message'] } },
    description: "Phone number of the contact being SENT (not the recipient) — digits only, with country code. Becomes the vCard's \"waid\".",
    routing: { send: { type: "body", property: "phoneNumber" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageContact'], resource: ['message'] } },
    options: [
        {
          displayName: "Full Name",
          name: "fullName",
          type: "string",
          default: '',
          description: "Name shown on the contact card being sent",
          routing: { send: { type: "body", property: "fullName" } },
        },
        {
          displayName: "Organization",
          name: "organization",
          type: "string",
          default: '',
          description: "Company/organization shown on the card",
          routing: { send: { type: "body", property: "organization" } },
        }
    ],
  }
];
