import type { INodeProperties } from 'n8n-workflow';

import { communityCreateDescription } from './communityCreate';
import { communityLinkDescription } from './communityLink';
import { communityListDescription } from './communityList';
import { communitySubgroupsDescription } from './communitySubgroups';
import { communityUnlinkDescription } from './communityUnlink';

const showOnlyForCommunity = {
  resource: ['community'],
};

export const communityDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCommunity,
    },
    options: [
    {
      name: "Create a Community",
      value: "communityCreate",
      action: "Create a community",
      description: "A community is a \"group of groups\": a container that gathers several existing groups under one identity, with its own announcement group for general notices. This route creates the community — the announcement group is generated automatically by WhatsApp's own server. After creating it, use Link Group to attach existing groups to it.",
      routing: { request: { method: "POST", url: '=/community/create/{{$parameter.instance}}' } },
    },
    {
      name: "Link a Group",
      value: "communityLink",
      action: "Link a group",
      description: "Attaches an existing group to a community, turning it into one of its subgroups. The group must already exist — this route only links the two, it does not create anything. Requires the instance to be an admin of both the community and the group.",
      routing: { request: { method: "POST", url: '=/community/link/{{$parameter.instance}}' } },
    },
    {
      name: "List Communities",
      value: "communityList",
      action: "List communities",
      description: "Lists the communities this instance is part of (owner or member). Each item is the community's \"parent\" group — to see the groups linked to one, use List Subgroups with the JID returned here.",
      routing: { request: { method: "GET", url: '=/community/list/{{$parameter.instance}}' } },
    },
    {
      name: "List Subgroups",
      value: "communitySubgroups",
      action: "List subgroups",
      description: "Lists the groups already linked to a community (the \"subgroups\", e.g. \"Support\", \"Sales\", \"Announcements\" inside a larger community). Does not include the community's automatic announcement group.",
      routing: { request: { method: "GET", url: '=/community/subgroups/{{$parameter.instance}}' } },
    },
    {
      name: "Unlink a Group",
      value: "communityUnlink",
      action: "Unlink a group",
      description: "Detaches a group from a community, without deleting the group — it goes back to being a regular group, outside the community. The group itself (history, participants) stays intact.",
      routing: { request: { method: "DELETE", url: '=/community/unlink/{{$parameter.instance}}' } },
    }
    ],
    default: "communityCreate",
  },
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { resource: ['community'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  ...communityCreateDescription,
  ...communityLinkDescription,
  ...communityListDescription,
  ...communitySubgroupsDescription,
  ...communityUnlinkDescription,
];
