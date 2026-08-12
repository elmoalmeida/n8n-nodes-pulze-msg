import type { INodeProperties } from 'n8n-workflow';

export const groupParticipantsDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupParticipants'], resource: ['group'] } },
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
    displayOptions: { show: { operation: ['groupParticipants'], resource: ['group'] } },
    description: "Phone numbers (digits only, with country and area code) or full JIDs. No automatic resolution of the Brazilian 9th digit.",
    routing: { send: { type: "body", property: "participants" } },
  },
  {
    displayName: "Action",
    name: "action",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupParticipants'], resource: ['group'] } },
    description: "One of 4 operations: add (adds to the group), remove (kicks from the group), promote (makes admin), demote (removes admin)",
    routing: { send: { type: "body", property: "action" } },
  }
];
