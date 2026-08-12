import type { INodeProperties } from 'n8n-workflow';

export const groupRequestsUpdateDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupRequestsUpdate'], resource: ['group'] } },
    description: "JID of the group",
    routing: { send: { type: "body", property: "jid" } },
  },
  {
    displayName: "Participants",
    name: "participants",
    type: "string",
    typeOptions: { multipleValues: true },
    required: true,
    default: [],
    displayOptions: { show: { operation: ['groupRequestsUpdate'], resource: ['group'] } },
    description: "Phone numbers (digits only, with country and area code) or JIDs of who requested to join — the same ones listed in List Pending Join Requests",
    routing: { send: { type: "body", property: "participants" } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['groupRequestsUpdate'], resource: ['group'] } },
    options: [
        {
          displayName: "Approve",
          name: "approve",
          type: "boolean",
          default: false,
          description: "Whether to true approves (the person joins the group). False or omitted rejects the request.",
          routing: { send: { type: "body", property: "approve" } },
        }
    ],
  }
];
