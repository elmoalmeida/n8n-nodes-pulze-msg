import type { INodeProperties } from 'n8n-workflow';

import { rowsFromUi } from '../../transform';

export const messageListDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageList'], resource: ['message'] } },
    description: "Recipient: phone number (digits only, with country and area code) or a full JID (@s.whatsapp.net, @lid, @g.us)",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Content Text",
    name: "contentText",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageList'], resource: ['message'] } },
    description: "Main text, above the button",
    routing: { send: { type: "body", property: "contentText" } },
  },
  {
    displayName: "Button Text",
    name: "buttonText",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageList'], resource: ['message'] } },
    description: "Label of the button that opens the list (e.g. \"View options\")",
    routing: { send: { type: "body", property: "buttonText" } },
  },
  {
    displayName: "Sections",
    name: "sections",
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: { show: { operation: ['messageList'], resource: ['message'], "@version": [1] } },
    description: "A group of options inside the menu. The section title appears as a heading in the middle of the list. Provide the exact JSON shape described in the field documentation (see the endpoint docs linked in the node README).",
    routing: { send: { type: "body", property: "sections", value: '={{JSON.parse($value)}}' } },
  },
  {
    displayName: "Sections Input",
    name: "sectionsMode",
    type: 'options',
    noDataExpression: true,
    options: [
      { name: "Form", value: 'form' },
      { name: "JSON", value: 'json' },
    ],
    default: 'form',
    displayOptions: { show: { operation: ['messageList'], resource: ['message'], "@version": [2] } },
    description: "Fill the cards in a form, or paste the raw JSON array. The form covers the common case; JSON is what you want when the cards come from a previous node.",
  },
  {
    displayName: "Sections",
    name: "sectionsUi",
    type: 'fixedCollection',
    typeOptions: { multipleValues: true, sortable: true },
    placeholder: "Add Option",
    default: {},
    displayOptions: { show: { operation: ['messageList'], resource: ['message'], "@version": [2], sectionsMode: ["form"] } },
    description: "A group of options inside the menu. The section title appears as a heading in the middle of the list.",
    options: [
      {
        name: "row",
        displayName: "Option",
        values: [
        {
          displayName: "Section",
          name: "section",
          type: 'string',
          default: "",
          description: "Heading of the group this option belongs to. Options sharing the same heading are grouped together, in the order you add them.",
        },
        {
          displayName: "Title",
          name: "title",
          type: 'string',
          default: "",
          description: "Title of the option",
        },
        {
          displayName: "Description",
          name: "description",
          type: 'string',
          default: "",
          description: "Secondary line, in grey, under the title",
        },
        {
          displayName: "ID",
          name: "id",
          type: 'string',
          default: "",
          description: "Your identifier. It is the value returned on the webhook when the customer picks this option.",
        }
        ],
      },
    ],
    routing: { send: { preSend: [rowsFromUi] } },
  },
  {
    displayName: "Sections",
    name: "sectionsJson",
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: { show: { operation: ['messageList'], resource: ['message'], "@version": [2], sectionsMode: ["json"] } },
    description: "A group of options inside the menu. The section title appears as a heading in the middle of the list. Provide the exact JSON shape described in the field documentation (see the endpoint docs linked in the node README).",
    routing: { send: { type: "body", property: "sections", value: '={{JSON.parse($value)}}' } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageList'], resource: ['message'] } },
    options: [
        {
          displayName: "Footer Text",
          name: "footerText",
          type: "string",
          default: '',
          description: "Small line below the button (business hours, legal notice)",
          routing: { send: { type: "body", property: "footerText" } },
        },
        {
          displayName: "Header Text",
          name: "headerText",
          type: "string",
          default: '',
          description: "Title above the main text",
          routing: { send: { type: "body", property: "headerText" } },
        }
    ],
  }
];
