import type { INodeProperties } from 'n8n-workflow';

export const messageLocationDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageLocation'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Latitude",
    name: "latitude",
    type: "number",
    required: true,
    default: 0,
    displayOptions: { show: { operation: ['messageLocation'], resource: ['message'] } },
    description: "Decimal degrees (e.g. -10.9472). Not validated — an invalid coordinate shows up as a misplaced pin.",
    routing: { send: { type: "body", property: "latitude" } },
  },
  {
    displayName: "Longitude",
    name: "longitude",
    type: "number",
    required: true,
    default: 0,
    displayOptions: { show: { operation: ['messageLocation'], resource: ['message'] } },
    description: "Decimal degrees (e.g. -37.0731)",
    routing: { send: { type: "body", property: "longitude" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageLocation'], resource: ['message'] } },
    options: [
        {
          displayName: "Address",
          name: "address",
          type: "string",
          default: '',
          description: "Address, shown below the name",
          routing: { send: { type: "body", property: "address" } },
        },
        {
          displayName: "Name",
          name: "name",
          type: "string",
          default: '',
          description: "Place name, shown prominently on the card (e.g. \"Downtown Store\")",
          routing: { send: { type: "body", property: "name" } },
        }
    ],
  }
];
