import type { INodeProperties } from 'n8n-workflow';

export const messagePixDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messagePix'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Pix Key",
    name: "pixKey",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messagePix'], resource: ['message'] } },
    description: "The Pix key itself (also the text copied when tapping \"Copy Pix key\")",
    routing: { send: { type: "body", property: "pixKey" } },
  },
  {
    displayName: "Pix Key Type",
    name: "pixKeyType",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messagePix'], resource: ['message'] } },
    description: "CPF | CNPJ | EMAIL | PHONE | RANDOM — only used in the displayed text (\"Pix Key (CPF): ...\"), not validated against the key's real format",
    routing: { send: { type: "body", property: "pixKeyType" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messagePix'], resource: ['message'] } },
    options: [
        {
          displayName: "Merchant Name",
          name: "merchantName",
          type: "string",
          default: '',
          description: "Name shown at the top of the card (e.g. store name)",
          routing: { send: { type: "body", property: "merchantName" } },
        }
    ],
  }
];
