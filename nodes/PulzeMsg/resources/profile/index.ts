import type { INodeProperties } from 'n8n-workflow';

import { profileInstancePictureDeleteDescription } from './instancePictureDelete';
import { profileInstancePrivacyGetDescription } from './instancePrivacyGet';
import { profileInstanceProfileGetDescription } from './instanceProfileGet';
import { profileInstancePictureSetDescription } from './instancePictureSet';
import { profileInstanceProfileSetDescription } from './instanceProfileSet';
import { profileInstancePrivacySetDescription } from './instancePrivacySet';

const showOnlyForProfile = {
  resource: ['profile'],
};

export const profileDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForProfile,
    },
    options: [
    {
      name: "Delete Profile Picture",
      value: "instancePictureDelete",
      action: "Delete profile picture",
      description: "Removes the connected WhatsApp account's profile picture. Subject to the same known issue as Set Profile Picture.",
      routing: { request: { method: "DELETE", url: '=/instance/profile/picture/{{$parameter.instance}}' } },
    },
    {
      name: "Get Privacy Settings",
      value: "instancePrivacyGet",
      action: "Get privacy settings",
      description: 'Reads the 7 WhatsApp privacy settings of the connected account',
      routing: { request: { method: "GET", url: '=/instance/privacy/{{$parameter.instance}}' } },
    },
    {
      name: "Get WhatsApp Profile",
      value: "instanceProfileGet",
      action: 'Get whats app profile',
      description: 'Display name, phone number, JID, profile picture and about text of the WhatsApp account connected to this instance',
      routing: { request: { method: "GET", url: '=/instance/profile/{{$parameter.instance}}' } },
    },
    {
      name: "Set Profile Picture",
      value: "instancePictureSet",
      action: "Set profile picture",
      description: "Known issue, not yet fixed: changing the WhatsApp profile picture does not reliably work today (name, about and privacy work normally). Do not promise this feature to a client until it is fixed.",
      routing: { request: { method: "POST", url: '=/instance/profile/picture/{{$parameter.instance}}' } },
    },
    {
      name: "Update Name and About",
      value: "instanceProfileSet",
      action: "Update name and about",
      description: 'Changes the display name and the about text of the connected WhatsApp account',
      routing: { request: { method: "POST", url: '=/instance/profile/{{$parameter.instance}}' } },
    },
    {
      name: "Update Privacy Settings",
      value: "instancePrivacySet",
      action: "Update privacy settings",
      description: 'Only the options you actually add are sent — an option left out is not changed',
      routing: { request: { method: "POST", url: '=/instance/privacy/{{$parameter.instance}}' } },
    }
    ],
    default: "instancePictureDelete",
  },
  {
    displayName: 'Instance Name or ID',
    name: 'instance',
    type: 'options',
    typeOptions: { loadOptionsMethod: 'getInstances' },
    required: true,
    default: '',
    displayOptions: { show: { resource: ['profile'] } },
    description: 'Name of the instance. Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  ...profileInstancePictureDeleteDescription,
  ...profileInstancePrivacyGetDescription,
  ...profileInstanceProfileGetDescription,
  ...profileInstancePictureSetDescription,
  ...profileInstanceProfileSetDescription,
  ...profileInstancePrivacySetDescription,
];
