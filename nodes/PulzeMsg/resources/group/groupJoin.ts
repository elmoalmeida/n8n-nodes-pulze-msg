import type { INodeProperties } from 'n8n-workflow';

export const groupJoinDescription: INodeProperties[] = [
  {
    displayName: "Code",
    name: "code",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['groupJoin'], resource: ['group'] } },
    description: "Only the invite link's code — the part after \"chat.whatsapp.com/\" (e.g. in https://chat.whatsapp.com/AbCdEfGhIjKlMnOp the code is AbCdEfGhIjKlMnOp). Do not send the full URL.",
    routing: { send: { type: "body", property: "code" } },
  }
];
