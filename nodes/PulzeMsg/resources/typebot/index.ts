import type { INodeProperties } from 'n8n-workflow';

import { typebotCreateDescription } from './typebotCreate';
import { typebotDeleteDescription } from './typebotDelete';
import { typebotDeleteAllDescription } from './typebotDeleteAll';
import { typebotListDescription } from './typebotList';
import { typebotUpdateDescription } from './typebotUpdate';

const showOnlyForTypebot = {
  resource: ['typebot'],
};

export const typebotDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForTypebot,
    },
    options: [
    {
      name: "Create a Bot",
      value: "typebotCreate",
      action: "Create a bot",
      description: "Creates a Typebot bot linked to this instance, with its own trigger — unlike Chatwoot (1 connection per instance), several bots can coexist here, each responding to a different trigger. Creation only — resending does not update an existing bot (use Update Bot). The bot is actually tested before saving.",
      routing: { request: { method: "POST", url: '=/instance/integrations/typebot/{{$parameter.instance}}' } },
    },
    {
      name: "Delete a Bot",
      value: "typebotDelete",
      action: "Delete a bot",
      description: 'Removes only this bot (and its active sessions) — the instance\'s other bots stay intact',
      routing: { request: { method: "DELETE", url: '=/instance/integrations/typebot/{{$parameter.instance}}/{{$parameter.botId}}' } },
    },
    {
      name: "Delete All Bots",
      value: "typebotDeleteAll",
      action: "Delete all bots",
      description: 'Removes every bot (and active sessions) of the instance at once — the same cleanup that already happens automatically when the whole instance is deleted',
      routing: { request: { method: "DELETE", url: '=/instance/integrations/typebot/{{$parameter.instance}}' } },
    },
    {
      name: "List Bots",
      value: "typebotList",
      action: "List bots",
      description: 'All Typebot bots registered on this instance, enabled or not',
      routing: { request: { method: "GET", url: '=/instance/integrations/typebot/{{$parameter.instance}}' } },
    },
    {
      name: "Update a Bot",
      value: "typebotUpdate",
      action: "Update a bot",
      description: "Replaces the editable fields — send the full object (same body as Create Bot), this is not a partial merge. Only re-tests the URL on Typebot if it changed from the saved value.",
      routing: { request: { method: "PATCH", url: '=/instance/integrations/typebot/{{$parameter.instance}}/{{$parameter.botId}}' } },
    }
    ],
    default: "typebotCreate",
  },
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { resource: ['typebot'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  ...typebotCreateDescription,
  ...typebotDeleteDescription,
  ...typebotDeleteAllDescription,
  ...typebotListDescription,
  ...typebotUpdateDescription,
];
