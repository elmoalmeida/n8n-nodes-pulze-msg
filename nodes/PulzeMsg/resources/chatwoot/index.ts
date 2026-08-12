import type { INodeProperties } from 'n8n-workflow';

import { chatwootSaveDescription } from './chatwootSave';
import { chatwootDeleteDescription } from './chatwootDelete';
import { chatwootGetDescription } from './chatwootGet';

const showOnlyForChatwoot = {
  resource: ['chatwoot'],
};

export const chatwootDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForChatwoot,
    },
    options: [
    {
      name: "Connect or Update Chatwoot",
      value: "chatwootSave",
      action: 'Connect or update chatwoot',
      description: "Links this instance to a Chatwoot API Inbox (Chatwoot's generic channel for custom integrations). The connection is actually tested before saving. With Auto Create Inbox on, Pulze creates the inbox on the spot, with its webhook URL already pointing back to Pulze. Resending (same Inbox ID, Auto Create Inbox off) only updates the options, without recreating anything in Chatwoot.",
      routing: { request: { method: "POST", url: '=/instance/integrations/chatwoot/{{$parameter.instance}}' } },
    },
    {
      name: "Disconnect Chatwoot",
      value: "chatwootDelete",
      action: 'Disconnect chatwoot',
      description: "Disconnects only on Pulze's side — deletes the saved configuration. Does not touch anything inside Chatwoot: the inbox, contacts and conversations stay there normally.",
      routing: { request: { method: "DELETE", url: '=/instance/integrations/chatwoot/{{$parameter.instance}}' } },
    },
    {
      name: "Get Chatwoot Connection",
      value: "chatwootGet",
      action: 'Get chatwoot connection',
      description: "Current state of this instance's connection to Chatwoot. The API token is never returned (not even masked) — the response only says whether it's connected and shows the other fields.",
      routing: { request: { method: "GET", url: '=/instance/integrations/chatwoot/{{$parameter.instance}}' } },
    }
    ],
    default: "chatwootSave",
  },
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { resource: ['chatwoot'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  ...chatwootSaveDescription,
  ...chatwootDeleteDescription,
  ...chatwootGetDescription,
];
