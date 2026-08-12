import type { INodeProperties } from 'n8n-workflow';

export const instanceProxySetDescription: INodeProperties[] = [
  {
    displayName: 'Instance',
    name: 'instance',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['instanceProxySet'], resource: ['instance'] } },
    description: "Name of the instance",
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['instanceProxySet'], resource: ['instance'] } },
    options: [
        {
          displayName: "Enabled",
          name: "enabled",
          type: "boolean",
          default: false,
          description: "Whether to turn the proxy on",
          routing: { send: { type: "body", property: "enabled" } },
        },
        {
          displayName: "Host",
          name: "host",
          type: "string",
          default: '',
          description: "IP or hostname. Without a host the proxy is silently ignored, even with Enabled turned on.",
          routing: { send: { type: "body", property: "host" } },
        },
        {
          displayName: "Password",
          name: "password",
          type: "string",
          typeOptions: { password: true },
          default: '',
          description: "Empty keeps the currently saved password (it is never returned on read, so there is no way to know its current value — only whether one exists)",
          routing: { send: { type: "body", property: "password" } },
        },
        {
          displayName: "Port",
          name: "port",
          type: "string",
          default: '',
          description: "Port, as text. Without a port the proxy is also silently ignored.",
          routing: { send: { type: "body", property: "port" } },
        },
        {
          displayName: "Protocol",
          name: "protocol",
          type: "string",
          default: "http",
          description: "Http | https | socks5 (informational — not validated by the server; any text is accepted and used literally in the proxy URL; empty becomes \"http\")",
          routing: { send: { type: "body", property: "protocol" } },
        },
        {
          displayName: "Username",
          name: "username",
          type: "string",
          default: '',
          description: "Username, if the proxy requires authentication",
          routing: { send: { type: "body", property: "username" } },
        }
    ],
  }
];
