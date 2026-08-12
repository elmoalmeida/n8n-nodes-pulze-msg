import type { INodeProperties } from 'n8n-workflow';

export const eventsWsConfigSetDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['wsConfigSet'], resource: ['events'] } },
    options: [
        {
          displayName: "Enabled",
          name: "enabled",
          type: "boolean",
          default: false,
          description: "Whether to turn WebSocket broadcast on for this instance",
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
