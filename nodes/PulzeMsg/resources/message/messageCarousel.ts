import type { INodeProperties } from 'n8n-workflow';

export const messageCarouselDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    description: "Text shown above the carousel",
    routing: { send: { type: "body", property: "message" } },
  },
  {
    displayName: "Cards",
    name: "cards",
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    description: "A carousel card — image/video, text and its own buttons. Provide the exact JSON shape described in the field documentation (see the endpoint docs linked in the node README).",
    routing: { send: { type: "body", property: "cards", value: '={{JSON.parse($value)}}' } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    options: [
        {
          displayName: "Footer",
          name: "footer",
          type: "string",
          default: '',
          description: "Small line below the main text",
          routing: { send: { type: "body", property: "footer" } },
        }
    ],
  }
];
