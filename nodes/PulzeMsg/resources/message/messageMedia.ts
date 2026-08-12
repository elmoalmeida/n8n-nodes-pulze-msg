import type { INodeProperties } from 'n8n-workflow';

export const messageMediaDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageMedia'], resource: ['message'] } },
    description: "Recipient: phone number (with country and area code) or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Mediatype",
    name: "mediatype",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageMedia'], resource: ['message'] } },
    description: "Image | video | audio | document | sticker",
    routing: { send: { type: "body", property: "mediatype" } },
  },
  {
    displayName: "Media",
    name: "media",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageMedia'], resource: ['message'] } },
    description: "URL or base64 of the file. Sticker must be WebP — Pulze does not convert it.",
    routing: { send: { type: "body", property: "media" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageMedia'], resource: ['message'] } },
    options: [
        {
          displayName: "Caption",
          name: "caption",
          type: "string",
          default: '',
          description: "Caption for image, video or document. Audio and stickers have no caption on WhatsApp.",
          routing: { send: { type: "body", property: "caption" } },
        },
        {
          displayName: "File Name",
          name: "fileName",
          type: "string",
          default: "arquivo",
          description: "File name shown to the recipient (documents)",
          routing: { send: { type: "body", property: "fileName" } },
        },
        {
          displayName: "Mimetype",
          name: "mimetype",
          type: "string",
          default: '',
          description: "Overrides the mime type that Media Type would otherwise detect",
          routing: { send: { type: "body", property: "mimetype" } },
        },
        {
          displayName: "Ptt",
          name: "ptt",
          type: "boolean",
          default: false,
          description: "Whether to send audio as a voice message (waveform bubble) instead of a regular audio file",
          routing: { send: { type: "body", property: "ptt" } },
        }
    ],
  }
];
