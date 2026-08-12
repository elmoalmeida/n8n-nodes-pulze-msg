import type { INodeProperties } from 'n8n-workflow';

export const messageButtonsDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageButtons'], resource: ['message'] } },
    description: "Recipient: phone number (with country and area code) or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Content Text",
    name: "contentText",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageButtons'], resource: ['message'] } },
    description: "Main message text",
    routing: { send: { type: "body", property: "contentText" } },
  },
  {
    displayName: "Buttons",
    name: "buttons",
    type: 'fixedCollection',
    typeOptions: { multipleValues: true, sortable: true },
    placeholder: "Add Button",
    required: true,
    default: {},
    displayOptions: { show: { operation: ['messageButtons'], resource: ['message'] } },
    description: "A button. What it DOES comes from the Type + ID/Value pair.",
    options: [
      {
        name: "button",
        displayName: "Button",
        values: [
        {
          displayName: "ID",
          name: "id",
          type: "string",
          default: '',
          description: "Depends on Type: reply -> identifier returned on the webhook when tapped; URL -> the link; call -> phone number with country code; copy -> the text to copy",
        },
        {
          displayName: "Display Text",
          name: "displayText",
          type: "string",
          default: '',
          description: "Visible label on the button",
        },
        {
          displayName: "Type",
          name: "type",
          type: 'options',
      options: [
        { name: 'Reply', value: 'reply' },
        { name: 'URL', value: 'url' },
        { name: 'Call', value: 'call' },
        { name: 'Copy', value: 'copy' },
      ],
          default: "reply",
          description: "Reply | URL | call | copy",
        }
        ],
      },
    ],
    routing: { send: { type: "body", property: "buttons", value: "={{$value.button}}" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageButtons'], resource: ['message'] } },
    options: [
        {
          displayName: "Footer Text",
          name: "footerText",
          type: "string",
          default: '',
          description: "Small line below the buttons",
          routing: { send: { type: "body", property: "footerText" } },
        },
        {
          displayName: "Header Text",
          name: "headerText",
          type: "string",
          default: '',
          description: "Title above the main text. Ignored if Media URL is set.",
          routing: { send: { type: "body", property: "headerText" } },
        },
        {
          displayName: "Media Type",
          name: "mediaType",
          type: "string",
          default: '',
          description: "Image | video | document",
          routing: { send: { type: "body", property: "mediaType" } },
        },
        {
          displayName: "Media URL",
          name: "mediaUrl",
          type: "string",
          default: '',
          description: "Image, video or document shown at the top of the message",
          routing: { send: { type: "body", property: "mediaUrl" } },
        }
    ],
  }
];
