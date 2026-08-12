import type { INodeProperties } from 'n8n-workflow';

import { groupRequestsUpdateDescription } from './groupRequestsUpdate';
import { groupCreateDescription } from './groupCreate';
import { groupInfoDescription } from './groupInfo';
import { groupInviteGetDescription } from './groupInviteGet';
import { groupJoinDescription } from './groupJoin';
import { groupLeaveDescription } from './groupLeave';
import { groupListDescription } from './groupList';
import { groupRequestsListDescription } from './groupRequestsList';
import { groupParticipantsDescription } from './groupParticipants';
import { groupInviteResetDescription } from './groupInviteReset';
import { groupUpdateDescription } from './groupUpdate';

const showOnlyForGroup = {
  resource: ['group'],
};

export const groupDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForGroup,
    },
    options: [
    {
      name: "Approve or Reject Join Requests",
      value: "groupRequestsUpdate",
      action: "Approve or reject join requests",
      description: 'Decides the fate of one or more pending join requests (the same ones listed in List Pending Join Requests): approve and the person joins the group, or reject and the request is discarded',
      routing: { request: { method: "POST", url: '=/group/requests/{{$parameter.instance}}' } },
    },
    {
      name: "Create a Group",
      value: "groupCreate",
      action: "Create a group",
      description: "Creates a group from scratch, with a name and the initial list of participants. The caller automatically becomes an admin/super admin of the created group.",
      routing: { request: { method: "POST", url: '=/group/create/{{$parameter.instance}}' } },
    },
    {
      name: "Get Group Details",
      value: "groupInfo",
      action: "Get group details",
      description: "Full details of a specific group: name, topic/description, owner, whether it's a community, and the full participant list with their role (admin/super admin). Use before managing participants to check who is already an admin.",
      routing: { request: { method: "GET", url: '=/group/info/{{$parameter.instance}}' } },
    },
    {
      name: "Get Invite Link",
      value: "groupInviteGet",
      action: "Get invite link",
      description: "Returns the group's current invite link, ready to share. Does not change anything — to invalidate the old link and generate a new one, use Reset Invite Link.",
      routing: { request: { method: "GET", url: '=/group/invite/{{$parameter.instance}}' } },
    },
    {
      name: "Join a Group (Invite Link)",
      value: "groupJoin",
      action: 'Join a group invite link',
      description: "The instance joins a group using the invite link's code (the same one anyone would use in the app) — no need for an admin to add the number manually. If the group requires approval, the join stays pending instead of immediate.",
      routing: { request: { method: "POST", url: '=/group/join/{{$parameter.instance}}' } },
    },
    {
      name: "Leave a Group",
      value: "groupLeave",
      action: "Leave a group",
      description: 'The instance leaves the group — irreversible through the API (to come back, someone needs to add it again or share the invite link)',
      routing: { request: { method: "DELETE", url: '=/group/leave/{{$parameter.instance}}' } },
    },
    {
      name: "List Groups",
      value: "groupList",
      action: "List groups",
      description: "Lists every regular group this instance currently belongs to. Communities are excluded from this list (use List Communities).",
      routing: { request: { method: "GET", url: '=/group/list/{{$parameter.instance}}' } },
    },
    {
      name: "List Pending Join Requests",
      value: "groupRequestsList",
      action: "List pending join requests",
      description: "Lists who asked to join and is still waiting for approval — only applies to groups with the \"admin approval\" setting turned on in WhatsApp. In an open group the list always comes back empty, because joining is immediate.",
      routing: { request: { method: "GET", url: '=/group/requests/{{$parameter.instance}}' } },
    },
    {
      name: "Manage Participants",
      value: "groupParticipants",
      action: "Manage participants",
      description: "Adds, removes, promotes or demotes group participants — a single route for the 4 operations, chosen through Action. The instance needs to be a group admin for remove/promote/demote; for add too, unless the group allows any member to add.",
      routing: { request: { method: "POST", url: '=/group/participants/{{$parameter.instance}}' } },
    },
    {
      name: "Reset Invite Link",
      value: "groupInviteReset",
      action: "Reset invite link",
      description: "Generates a new invite link and invalidates the old one in the same call. Use it when the link leaked, or as periodic security practice.",
      routing: { request: { method: "POST", url: '=/group/invite/reset/{{$parameter.instance}}' } },
    },
    {
      name: "Update a Group",
      value: "groupUpdate",
      action: "Update a group",
      description: "Edits the group's name and/or description — send only the field(s) you want to change. Requires the instance to be an admin of the group. Cannot change the group photo, the \"only admins send\" setting or privacy through this route — today only name and description.",
      routing: { request: { method: "PUT", url: '=/group/update/{{$parameter.instance}}' } },
    }
    ],
    default: "groupRequestsUpdate",
  },
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['group'] } },
    description: "Name of the instance",
  },
  ...groupRequestsUpdateDescription,
  ...groupCreateDescription,
  ...groupInfoDescription,
  ...groupInviteGetDescription,
  ...groupJoinDescription,
  ...groupLeaveDescription,
  ...groupListDescription,
  ...groupRequestsListDescription,
  ...groupParticipantsDescription,
  ...groupInviteResetDescription,
  ...groupUpdateDescription,
];
