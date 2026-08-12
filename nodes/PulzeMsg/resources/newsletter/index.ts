import type { INodeProperties } from 'n8n-workflow';

import { newsletterCreateDescription } from './newsletterCreate';
import { newsletterFollowDescription } from './newsletterFollow';
import { newsletterInfoDescription } from './newsletterInfo';
import { newsletterListDescription } from './newsletterList';
import { newsletterUnfollowDescription } from './newsletterUnfollow';

const showOnlyForNewsletter = {
  resource: ['newsletter'],
};

export const newsletterDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForNewsletter,
    },
    options: [
    {
      name: "Create a Channel",
      value: "newsletterCreate",
      action: "Create a channel",
      description: "Creates a WhatsApp channel (newsletter) — different from a group: only the owner/admin posts, followers are anonymous to each other and only receive, they don't reply in the channel's chat. Good for announcements, promotions and bulk content without exposing your contact list. The instance that creates it automatically becomes its admin/owner.",
      routing: { request: { method: "POST", url: '=/newsletter/create/{{$parameter.instance}}' } },
    },
    {
      name: "Follow a Channel",
      value: "newsletterFollow",
      action: "Follow a channel",
      description: "This instance starts following an existing channel (its own or a third party's) by JID. Same as tapping \"Follow\" on the channel from the app.",
      routing: { request: { method: "POST", url: '=/newsletter/follow/{{$parameter.instance}}' } },
    },
    {
      name: "Get Channel Info",
      value: "newsletterInfo",
      action: "Get channel info",
      description: 'Details of a specific channel by JID — name, description, follower count, and the invite code used to build the public invite link',
      routing: { request: { method: "GET", url: '=/newsletter/info/{{$parameter.instance}}' } },
    },
    {
      name: "List Channels",
      value: "newsletterList",
      action: "List channels",
      description: "Channels this instance follows (including the ones it created itself, since creating one means following it as admin). Does not list third-party channels this instance does not follow.",
      routing: { request: { method: "GET", url: '=/newsletter/list/{{$parameter.instance}}' } },
    },
    {
      name: "Unfollow a Channel",
      value: "newsletterUnfollow",
      action: "Unfollow a channel",
      description: "This instance stops following a channel. Same as tapping \"Unfollow\" from the app — does not delete the channel, nor remove other followers.",
      routing: { request: { method: "DELETE", url: '=/newsletter/unfollow/{{$parameter.instance}}' } },
    }
    ],
    default: "newsletterCreate",
  },
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['newsletter'] } },
    description: "Name of the instance",
  },
  ...newsletterCreateDescription,
  ...newsletterFollowDescription,
  ...newsletterInfoDescription,
  ...newsletterListDescription,
  ...newsletterUnfollowDescription,
];
