import type { INodeProperties } from 'n8n-workflow';

export const typebotDeleteDescription: INodeProperties[] = [
  {
    displayName: 'Bot ID',
    name: 'botId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['typebotDelete'], resource: ['typebot'] } },
    description: "ID of the bot (returned when it was created or listed)",
  }
];
