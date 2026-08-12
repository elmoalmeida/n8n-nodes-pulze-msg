import type { INodeProperties } from 'n8n-workflow';

export const eventsWebhookCreateDescription: INodeProperties[] = [
  {
    displayName: "URL",
    name: "url",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['webhookCreate'], resource: ['events'] } },
    description: "Delivery URL",
    routing: { send: { type: "body", property: "url" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['webhookCreate'], resource: ['events'] } },
    options: [
        {
          displayName: "Authorization",
          name: "authorization",
          type: "string",
          default: '',
          description: "Sent in the Authorization header of every delivery — extra protection besides the HMAC signature",
          routing: { send: { type: "body", property: "authorization" } },
        },
        {
          displayName: "By Events",
          name: "byEvents",
          type: "boolean",
          default: false,
          description: "Whether to when true, appends the event name to the end of the URL (e.g. .../webhook/message.exchange) — useful to route each event type to a different route on your server",
          routing: { send: { type: "body", property: "byEvents" } },
        },
        {
          displayName: "Enabled",
          name: "enabled",
          type: "boolean",
          default: true,
          description: "Whether to not set means active. False pauses delivery without deleting the registration.",
          routing: { send: { type: "body", property: "enabled" } },
        },
        {
          displayName: "Events",
          name: "events",
          type: "string",
          typeOptions: { multipleValues: true },
          default: [],
          description: "Empty means every event (message.exchange, message.status, instance.state, call.update)",
          routing: { send: { type: "body", property: "events" } },
        },
        {
          displayName: "Label",
          name: "label",
          type: "string",
          default: "default",
          description: "Identifier of the webhook. Resending the same label updates the existing one.",
          routing: { send: { type: "body", property: "label" } },
        },
        {
          displayName: "Media Base64",
          name: "mediaBase64",
          type: "boolean",
          default: false,
          description: "Whether to reserved: saved but does not currently change the delivered payload — media always arrives as a URL, never as base64",
          routing: { send: { type: "body", property: "mediaBase64" } },
        }
    ],
  }
];
