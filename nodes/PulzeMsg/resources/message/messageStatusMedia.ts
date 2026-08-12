import type { INodeProperties } from 'n8n-workflow';

export const messageStatusMediaDescription: INodeProperties[] = [
  {
    displayName: "Mediatype",
    name: "mediatype",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageStatusMedia'], resource: ['message'] } },
    description: "Image | video — unlike Send Media, a status does NOT accept audio/document/sticker",
    routing: { send: { type: "body", property: "mediatype" } },
  },
  {
    displayName: "Media",
    name: "media",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageStatusMedia'], resource: ['message'] } },
    description: "URL or base64 of the file",
    routing: { send: { type: "body", property: "media" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageStatusMedia'], resource: ['message'] } },
    options: [
        {
          displayName: "Caption",
          name: "caption",
          type: "string",
          default: '',
          routing: { send: { type: "body", property: "caption" } },
        }
    ],
  }
];
