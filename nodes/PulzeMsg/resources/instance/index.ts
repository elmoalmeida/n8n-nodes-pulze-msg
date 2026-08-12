import type { INodeProperties } from 'n8n-workflow';

import { instanceNewDescription } from './instanceNew';
import { instanceDeleteDescription } from './instanceDelete';
import { instanceSettingsGetDescription } from './instanceSettingsGet';
import { instanceProxyGetDescription } from './instanceProxyGet';
import { instanceConnectDescription } from './instanceConnect';
import { instanceQrDescription } from './instanceQr';
import { instanceStatusDescription } from './instanceStatus';
import { instanceListDescription } from './instanceList';
import { instanceLogoutDescription } from './instanceLogout';
import { instanceSettingsSetDescription } from './instanceSettingsSet';
import { instanceProxySetDescription } from './instanceProxySet';

const showOnlyForInstance = {
  resource: ['instance'],
};

export const instanceDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForInstance,
    },
    options: [
    {
      name: "Create Instance",
      value: "instanceNew",
      action: "Create instance",
      description: "Creates a new instance (a WhatsApp number) for the account. It starts disconnected — the next step is reading the QR code (Get QR Code) and pairing the phone.",
      routing: { request: { method: "POST", url: '=/instance/new' } },
    },
    {
      name: "Delete Instance",
      value: "instanceDelete",
      action: "Delete instance",
      description: "Removes the instance entirely from the account. This cannot be undone — unlike Log Out (which only disconnects), here the whole registration disappears.",
      routing: { request: { method: "DELETE", url: '=/instance/delete/{{$parameter.instance}}' } },
    },
    {
      name: "Get Behavior Settings",
      value: "instanceSettingsGet",
      action: "Get behavior settings",
      description: "Reads the 6 behavior flags saved for this instance. An instance that was never configured returns everything as false.",
      routing: { request: { method: "GET", url: '=/instance/settings/{{$parameter.instance}}' } },
    },
    {
      name: "Get Proxy Settings",
      value: "instanceProxyGet",
      action: "Get proxy settings",
      description: 'The password is never returned (it always reads back empty, even when one is saved)',
      routing: { request: { method: "GET", url: '=/instance/proxy/{{$parameter.instance}}' } },
    },
    {
      name: "Get QR Code (JSON)",
      value: "instanceConnect",
      action: "Get QR code (JSON)",
      description: "Starts the connection and returns the current QR code embedded in JSON (a base64 PNG, ready to display as an image). The WhatsApp QR code expires in seconds — call again to get a refreshed one while not yet paired.",
      routing: { request: { method: "GET", url: '=/instance/connect/{{$parameter.instance}}' } },
    },
    {
      name: "Get QR Code (PNG Image)",
      value: "instanceQr",
      action: 'Get qr code png image',
      description: 'Same QR code as Get QR Code (JSON), but returned as a raw PNG image instead of JSON — meant to be displayed directly as an image',
      routing: { request: { method: "GET", url: '=/instance/qr/{{$parameter.instance}}' } },
    },
    {
      name: "Get Status",
      value: "instanceStatus",
      action: "Get status",
      description: "Connection state, phone number and login status of one instance",
      routing: { request: { method: "GET", url: '=/instance/status/{{$parameter.instance}}' } },
    },
    {
      name: "List",
      value: "instanceList",
      action: "List",
      description: "List every instance visible to the token. Requires an account token — an instance token gets a 403 here.",
      routing: { request: { method: "GET", url: '=/instance/list' } },
    },
    {
      name: "Log Out",
      value: "instanceLogout",
      action: "Log out",
      description: "Ends the WhatsApp session and clears the pairing — but keeps the instance itself registered (name, token, webhooks and chat history stay intact). To use it again, read a new QR code and pair once more.",
      routing: { request: { method: "DELETE", url: '=/instance/logout/{{$parameter.instance}}' } },
    },
    {
      name: "Update Behavior Settings",
      value: "instanceSettingsSet",
      action: "Update behavior settings",
      description: "Replaces the whole set of flags — this is not a merge. A flag you don't send becomes false, so always send all 6 (even repeating values already saved), never just the one you want to change.",
      routing: { request: { method: "POST", url: '=/instance/settings/{{$parameter.instance}}' } },
    },
    {
      name: "Update Proxy Settings",
      value: "instanceProxySet",
      action: "Update proxy settings",
      description: "Sets a proxy for this instance's connection to WhatsApp. Applied only on the NEXT connection — changing the proxy of an already-connected instance does not reconnect it by itself. Like Update Behavior Settings, this replaces the whole object; always send the fields you want to keep, not just the one that changed (exception: an empty Password keeps the currently saved password on purpose, so you don't have to resend it every call).",
      routing: { request: { method: "POST", url: '=/instance/proxy/{{$parameter.instance}}' } },
    }
    ],
    default: "instanceNew",
  },
  ...instanceNewDescription,
  ...instanceDeleteDescription,
  ...instanceSettingsGetDescription,
  ...instanceProxyGetDescription,
  ...instanceConnectDescription,
  ...instanceQrDescription,
  ...instanceStatusDescription,
  ...instanceListDescription,
  ...instanceLogoutDescription,
  ...instanceSettingsSetDescription,
  ...instanceProxySetDescription,
];
