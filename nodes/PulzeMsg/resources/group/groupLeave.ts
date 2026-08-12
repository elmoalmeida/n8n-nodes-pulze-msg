import type { INodeProperties } from 'n8n-workflow';

export const groupLeaveDescription: INodeProperties[] = [
  {
    displayName: "JID",
    name: "jid",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupLeave'], resource: ['group'] } },
    description: "JID of the group",
    routing: { send: { type: "body", property: "jid" } },
  }
];
