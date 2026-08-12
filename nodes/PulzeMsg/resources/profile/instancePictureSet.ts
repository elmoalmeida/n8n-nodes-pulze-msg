import type { INodeProperties } from 'n8n-workflow';

export const profileInstancePictureSetDescription: INodeProperties[] = [
  {
    displayName: "Image Base64",
    name: "imageBase64",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instancePictureSet'], resource: ['profile'] } },
    description: "Image as base64 (with or without the data: prefix). A public http(s) URL is also accepted in this same field.",
    routing: { send: { type: "body", property: "imageBase64" } },
  }
];
