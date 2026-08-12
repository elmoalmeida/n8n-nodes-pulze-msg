import type { INodeProperties } from 'n8n-workflow';

export const instanceNewDescription: INodeProperties[] = [
  {
    displayName: "Instance Name",
    name: "instanceName",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceNew'], resource: ['instance'] } },
    description: "Name of the instance (used in the API URL, e.g. /message/text/sales). Cannot repeat within the same account.",
    routing: { send: { type: "body", property: "instanceName" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['instanceNew'], resource: ['instance'] } },
    options: [
        {
          displayName: "Token",
          name: "token",
          type: "string",
          typeOptions: { password: true },
          default: '',
          description: "Custom token. Leave empty to let Pulze generate a UUID. If given and already used by another instance, the request fails with 409.",
          routing: { send: { type: "body", property: "token" } },
        }
    ],
  }
];
