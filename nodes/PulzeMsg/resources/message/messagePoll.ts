import type { INodeProperties } from 'n8n-workflow';

export const messagePollDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messagePoll'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messagePoll'], resource: ['message'] } },
    description: "The poll question",
    routing: { send: { type: "body", property: "name" } },
  },
  {
    displayName: "Options",
    name: "options",
    type: "string",
    typeOptions: { multipleValues: true },
    required: true,
    default: [],
    displayOptions: { show: { operation: ['messagePoll'], resource: ['message'] } },
    description: "2 to 12 options (after removing blank ones)",
    routing: { send: { type: "body", property: "options" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messagePoll'], resource: ['message'] } },
    options: [
        {
          displayName: "Multiple",
          name: "multiple",
          type: "boolean",
          default: false,
          description: "Whether this is multiple choice (the contact can select more than one); default is single choice",
          routing: { send: { type: "body", property: "multiple" } },
        },
        {
          displayName: "Quoted ID",
          name: "quotedId",
          type: "string",
          default: '',
          description: "ID of a message from history — sends the poll as a reply to it, same as in Send Text",
          routing: { send: { type: "body", property: "quotedId" } },
        }
    ],
  }
];
