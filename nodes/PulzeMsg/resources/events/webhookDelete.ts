import type { INodeProperties } from 'n8n-workflow';

export const eventsWebhookDeleteDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['webhookDelete'], resource: ['events'] } },
    options: [
        {
          displayName: "Label",
          name: "label",
          type: "string",
          default: "default",
          description: "Which webhook to remove, when there is more than one on the instance",
          routing: { send: { type: "query", property: "label" } },
        }
    ],
  }
];
