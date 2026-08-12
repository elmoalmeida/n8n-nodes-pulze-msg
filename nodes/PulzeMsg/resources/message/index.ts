import type { INodeProperties } from 'n8n-workflow';

import { messageStatusMediaDescription } from './messageStatusMedia';
import { messageStatusTextDescription } from './messageStatusText';
import { messageCarouselDescription } from './messageCarousel';
import { messageContactDescription } from './messageContact';
import { messageFormDescription } from './messageForm';
import { messageListDescription } from './messageList';
import { messageLocationDescription } from './messageLocation';
import { messagePixDescription } from './messagePix';
import { messagePollDescription } from './messagePoll';
import { messageReactionDescription } from './messageReaction';
import { messageStickerDescription } from './messageSticker';
import { messageEventDescription } from './messageEvent';
import { messageButtonsDescription } from './messageButtons';
import { messageMediaDescription } from './messageMedia';
import { messageTextDescription } from './messageText';

const showOnlyForMessage = {
  resource: ['message'],
};

export const messageDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForMessage,
    },
    options: [
    {
      name: "Post a Media Status",
      value: "messageStatusMedia",
      action: "Post a media status",
      description: 'Posts an image or video status, with an optional caption',
      routing: { request: { method: "POST", url: '=/status/media/{{$parameter.instance}}' } },
    },
    {
      name: "Post a Text Status",
      value: "messageStatusText",
      action: "Post a text status",
      description: "Posts a plain text status, visible for 24h. There is no recipient — a status has no single destination.",
      routing: { request: { method: "POST", url: '=/status/text/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Carousel",
      value: "messageCarousel",
      action: "Send a carousel",
      description: "A horizontal menu of cards with image/video, title, text and their own buttons — the customer swipes between cards. Each card requires a header title and a body text; each card's buttons follow the same format as Send Buttons (reply | URL | call | copy).",
      routing: { request: { method: "POST", url: '=/message/carousel/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Contact",
      value: "messageContact",
      action: "Send a contact",
      description: "Sends a contact card (vCard) the recipient can save with one tap. Pulze builds a vCard 3.0 on the server from Full Name / Phone Number / Organization — only Phone Number is required.",
      routing: { request: { method: "POST", url: '=/message/contact/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Form (WhatsApp Flow)",
      value: "messageForm",
      action: 'Send a form whats app flow',
      description: "Sends a message with a button that opens a native WhatsApp form (Flow). Requires a Flow of YOUR OWN, already published in WhatsApp Business Manager.",
      routing: { request: { method: "POST", url: '=/message/form/{{$parameter.instance}}' } },
    },
    {
      name: "Send a List",
      value: "messageList",
      action: "Send a list",
      description: "An interactive menu: the message arrives with a button that, when tapped, opens a list of options grouped into sections. The customer picks one option and it comes back on your webhook. Good for a support menu, a short catalog, or an FAQ.",
      routing: { request: { method: "POST", url: '=/message/list/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Location",
      value: "messageLocation",
      action: "Send a location",
      description: "Sends a location card with a small map, from coordinates. Name and Address are only displayed text — Pulze does not check that they match the coordinates.",
      routing: { request: { method: "POST", url: '=/message/location/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Pix Key",
      value: "messagePix",
      action: 'Send a pix key',
      description: "A card with a Brazilian Pix key and a copy button. Not a native WhatsApp Business feature — it does not open a payment screen, create a charge or receive a confirmation callback. It is just a \"copy\" button (same as Send Buttons) with the text formatted as Pix; the customer copies the key and pastes it in their banking app.",
      routing: { request: { method: "POST", url: '=/message/pix/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Poll",
      value: "messagePoll",
      action: "Send a poll",
      description: "A NATIVE WhatsApp poll — 2 to 12 options, single or multiple choice. Blank options are discarded before checking the minimum/maximum. Can be sent as a reply to another message (Quoted Message ID).",
      routing: { request: { method: "POST", url: '=/message/poll/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Reaction",
      value: "messageReaction",
      action: "Send a reaction",
      description: "Reacts with an emoji to an existing message in the conversation. An empty emoji REMOVES the reaction — the same mechanism WhatsApp uses to undo one.",
      routing: { request: { method: "POST", url: '=/message/reaction/{{$parameter.instance}}' } },
    },
    {
      name: "Send a Sticker",
      value: "messageSticker",
      action: "Send a sticker",
      description: 'Shortcut for Send Media with Media Type = sticker — same delivery underneath, just with a dedicated Image URL field instead of Media Type + Media',
      routing: { request: { method: "POST", url: '=/message/sticker/{{$parameter.instance}}' } },
    },
    {
      name: "Send an Event",
      value: "messageEvent",
      action: "Send an event",
      description: "Sends an event/meeting card (a native WhatsApp EventMessage) with a title, a date and, optionally, a meeting link or a location. Events are primarily a GROUP feature — in a one-on-one chat it may not render depending on the app version.",
      routing: { request: { method: "POST", url: '=/message/event/{{$parameter.instance}}' } },
    },
    {
      name: "Send Buttons",
      value: "messageButtons",
      action: "Send buttons",
      description: "Send a message with up to 3 reply, URL, call or copy buttons",
      routing: { request: { method: "POST", url: '=/message/buttons/{{$parameter.instance}}' } },
    },
    {
      name: "Send Media",
      value: "messageMedia",
      action: "Send media",
      description: "Send an image, video, audio, document or sticker from a URL or base64",
      routing: { request: { method: "POST", url: '=/message/media/{{$parameter.instance}}' } },
    },
    {
      name: "Send Text",
      value: "messageText",
      action: "Send text",
      description: "Send a plain text message",
      routing: { request: { method: "POST", url: '=/message/text/{{$parameter.instance}}' } },
    }
    ],
    default: "messageStatusMedia",
  },
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['message'] } },
    description: "Name of the instance",
  },
  ...messageStatusMediaDescription,
  ...messageStatusTextDescription,
  ...messageCarouselDescription,
  ...messageContactDescription,
  ...messageFormDescription,
  ...messageListDescription,
  ...messageLocationDescription,
  ...messagePixDescription,
  ...messagePollDescription,
  ...messageReactionDescription,
  ...messageStickerDescription,
  ...messageEventDescription,
  ...messageButtonsDescription,
  ...messageMediaDescription,
  ...messageTextDescription,
];
