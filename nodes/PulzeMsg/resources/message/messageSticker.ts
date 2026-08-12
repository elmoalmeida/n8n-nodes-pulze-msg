import type { INodeProperties } from 'n8n-workflow';

export const messageStickerDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageSticker'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Image URL",
    name: "imageUrl",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageSticker'], resource: ['message'] } },
    description: "Public URL OR base64 (with or without the data: prefix) of a WebP file",
    routing: { send: { type: "body", property: "imageUrl" } },
  }
];
