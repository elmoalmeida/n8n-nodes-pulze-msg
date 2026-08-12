import type { INodeProperties } from 'n8n-workflow';

export const groupCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupCreate'], resource: ['group'] } },
    description: "Group name",
    routing: { send: { type: "body", property: "name" } },
  },
  {
    displayName: "Participants",
    name: "participants",
    type: "string",
    typeOptions: { multipleValues: true },
    required: true,
    default: [],
    displayOptions: { show: { operation: ['groupCreate'], resource: ['group'] } },
    description: "Phone numbers (digits only, with country and area code) or full JIDs of the initial participants. Unlike sending a message, there is no automatic resolution of the Brazilian 9th digit here — send the number in the format WhatsApp recognizes.",
    routing: { send: { type: "body", property: "participants" } },
  }
];
