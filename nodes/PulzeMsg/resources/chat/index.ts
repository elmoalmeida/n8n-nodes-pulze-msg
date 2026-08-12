import type { INodeProperties } from 'n8n-workflow';

import { chatBlockDescription } from './chatBlock';
import { chatCheckDescription } from './chatCheck';
import { chatStatsOverviewDescription } from './statsOverview';
import { chatMessageDeleteDescription } from './messageDelete';
import { chatMessageEditDescription } from './messageEdit';
import { chatMessageGetDescription } from './messageGet';
import { chatMessagesDescription } from './chatMessages';
import { chatMessageMediaBase64Description } from './messageMediaBase64';
import { chatBlocklistDescription } from './chatBlocklist';
import { chatListDescription } from './chatList';
import { chatContactsDescription } from './chatContacts';
import { chatReadDescription } from './chatRead';
import { chatPresenceDescription } from './chatPresence';
import { chatUnblockDescription } from './chatUnblock';

const showOnlyForChat = {
  resource: ['chat'],
};

export const chatDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForChat,
    },
    options: [
    {
      name: "Block a Contact",
      value: "chatBlock",
      action: "Block a contact",
      description: "Blocks a contact for this instance — same effect as blocking from the app. Does not delete past chat history, it only prevents new interaction.",
      routing: { request: { method: "POST", url: '=/chat/block/{{$parameter.instance}}' } },
    },
    {
      name: "Check Numbers on WhatsApp",
      value: "chatCheck",
      action: 'Check numbers on whats app',
      description: "Asks WhatsApp which numbers in the list have an active account — useful before importing a list or before a bulk send. This is a lookup only, no message is sent and no state changes.",
      routing: { request: { method: "POST", url: '=/chat/check/{{$parameter.instance}}' } },
    },
    {
      name: "Dashboard Metrics",
      value: "statsOverview",
      action: "Dashboard metrics",
      description: "Aggregates the message history of the instances this account/token can see. Without Instance, it sums all of them; with Instance, it narrows to one. Without Days, it aggregates from the beginning; with Days, it counts only the last N days.",
      routing: { request: { method: "GET", url: '=/stats/overview' } },
    },
    {
      name: "Delete a Message",
      value: "messageDelete",
      action: "Delete a message",
      description: "Revokes (\"delete for everyone\") a message this instance sent. Same mechanism as WhatsApp's own \"Delete for everyone\" button — does not delete messages received from someone else, and WhatsApp also has its own time window to accept the revocation.",
      routing: { request: { method: "DELETE", url: '=/message/delete/{{$parameter.instance}}' } },
    },
    {
      name: "Edit a Message",
      value: "messageEdit",
      action: "Edit a message",
      description: "Replaces the text of a text message this instance sent. Only works within the time window WhatsApp itself allows editing (WhatsApp's own server rejects it outside that window). Does not edit messages received from someone else, nor media/buttons/list/carousel messages.",
      routing: { request: { method: "POST", url: '=/message/edit/{{$parameter.instance}}' } },
    },
    {
      name: "Get a Message by ID",
      value: "messageGet",
      action: "Get a message by ID",
      description: "Looks up ONE message in Pulze's own history by its ID — the same ID the send route returned, or the \"ID\"/\"selectedId\" that arrived in a webhook/WebSocket event. Does not query WhatsApp — only finds what already passed through this instance and was recorded.",
      routing: { request: { method: "GET", url: '=/message/{{$parameter.instance}}' } },
    },
    {
      name: "Get Chat Messages",
      value: "chatMessages",
      action: "Get chat messages",
      description: "Returns the messages of ONE chat, oldest first. Besides the text, each message can carry a media URL, a quoted message ID, and a payload (raw structured content of buttons/list/carousel/location/contact/poll). Paginate backward with Before.",
      routing: { request: { method: "GET", url: '=/chat/messages/{{$parameter.instance}}' } },
    },
    {
      name: "Get Media as Base64",
      value: "messageMediaBase64",
      action: "Get media as base64",
      description: "Looks up the message in Pulze's history and re-downloads, from Pulze's own storage (S3/MinIO), the media already saved in its media URL — returning the content as base64. Does not depend on WhatsApp: it keeps working even after the media has expired there, because the file was already saved to storage when the message arrived.",
      routing: { request: { method: "GET", url: '=/message/media/base64/{{$parameter.instance}}' } },
    },
    {
      name: "List Blocked Contacts",
      value: "chatBlocklist",
      action: "List blocked contacts",
      description: "Returns the list of JIDs blocked by this instance (the same list shown in the app under Settings > Privacy > Blocked contacts). Note this shares its path with Block/Unblock Contact — it's the HTTP method that changes the operation.",
      routing: { request: { method: "GET", url: '=/chat/block/{{$parameter.instance}}' } },
    },
    {
      name: "List Chats",
      value: "chatList",
      action: "List chats",
      description: "Lists this instance's chats from the history Pulze recorded itself, most recent first. Each item summarizes a chat: last message, who sent it last and how many are unread.",
      routing: { request: { method: "GET", url: '=/chat/list/{{$parameter.instance}}' } },
    },
    {
      name: "List Contacts and Groups",
      value: "chatContacts",
      action: "List contacts and groups",
      description: "Returns the address book synced at pairing time plus the groups this instance is part of, in a single list, sorted by name. Groups come with isGroup:true and a members count; individual contacts come with a phone number.",
      routing: { request: { method: "GET", url: '=/chat/contacts/{{$parameter.instance}}' } },
    },
    {
      name: "Mark Chat as Read",
      value: "chatRead",
      action: "Mark chat as read",
      description: "Clears the unread counter of this chat in Pulze's own history. This is not WhatsApp's blue read receipt — Pulze does not tell the sender the message was read here, it only clears the unread badge in your dashboard/API.",
      routing: { request: { method: "POST", url: '=/chat/read/{{$parameter.instance}}' } },
    },
    {
      name: "Send Presence",
      value: "chatPresence",
      action: "Send presence",
      description: "Announces presence the way WhatsApp shows \"typing...\", \"recording audio...\" or \"online\". Without To: GLOBAL presence for the instance (available/unavailable). With To: CHAT-specific presence for that conversation (composing = typing, recording = recording audio, paused = stopped) — it disappears on its own after a few seconds if you don't send paused or the actual message.",
      routing: { request: { method: "POST", url: '=/chat/presence/{{$parameter.instance}}' } },
    },
    {
      name: "Unblock a Contact",
      value: "chatUnblock",
      action: "Unblock a contact",
      description: 'Undoes the block of a contact for this instance — same effect as unblocking from the app',
      routing: { request: { method: "DELETE", url: '=/chat/block/{{$parameter.instance}}' } },
    }
    ],
    default: "chatBlock",
  },
  ...chatBlockDescription,
  ...chatCheckDescription,
  ...chatStatsOverviewDescription,
  ...chatMessageDeleteDescription,
  ...chatMessageEditDescription,
  ...chatMessageGetDescription,
  ...chatMessagesDescription,
  ...chatMessageMediaBase64Description,
  ...chatBlocklistDescription,
  ...chatListDescription,
  ...chatContactsDescription,
  ...chatReadDescription,
  ...chatPresenceDescription,
  ...chatUnblockDescription,
];
