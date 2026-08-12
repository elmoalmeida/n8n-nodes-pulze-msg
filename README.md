# n8n-nodes-pulze-msg

This is an n8n community node. It lets you use the [Pulze API](https://pulzeapi.botautotik.com)
in your n8n workflows.

Pulze API is a self-hosted REST API for WhatsApp automation — send and receive
messages (text, media, interactive buttons, carousels, lists), manage
instances, groups and profiles, and react to events (`message.exchange`,
`message.status`, `instance.state`, `call.update`) over HMAC-signed webhooks.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/)
workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
in the n8n community nodes documentation, and search for **Pulze API**.

## Operations

**Pulze API Trigger** — starts the workflow when Pulze delivers a WhatsApp
event. Registers and removes its own webhook automatically while the
workflow is active/inactive, and verifies the `X-Pulze-Signature` HMAC on
every delivery before the workflow runs — an unsigned or forged request never
reaches your workflow.

**Pulze API** node, one Resource/Operation per WhatsApp feature:

| Resource | Operations |
|---|---|
| Message | Send Text, Send Media, Send a Sticker, Send a Location, Send a Contact, Send a Reaction, Send a Poll, Send an Event, Send Buttons, Send a Form (WhatsApp Flow), Send a Pix Key, Send a List, Send a Carousel, Post a Text Status, Post a Media Status |
| Instance | Create, List, Get QR Code (JSON/PNG), Get Status, Get/Update Behavior Settings, Get/Update Proxy Settings, Log Out, Delete |
| Profile | Get/Update WhatsApp Profile, Set/Delete Profile Picture, Get/Update Privacy Settings |
| Chat | List Chats, Get Chat Messages, Mark as Read, List Contacts and Groups, Check Numbers on WhatsApp, Dashboard Metrics, Edit/Delete/Get a Message, Get Media as Base64, Block/Unblock/List Blocked Contacts, Send Presence |
| Event | Create/List/Delete a Webhook, Get/Update WebSocket Config |
| Group | Create, List, Get Details, Update, Manage Participants, Join (invite link), Get/Reset Invite Link, List/Approve/Reject Pending Requests, Leave |
| Community | Create, List, List Subgroups, Link/Unlink a Group |
| Newsletter (Channel) | Create, List, Get Info, Follow, Unfollow |
| Chatwoot | Connect/Update, Get Connection, Disconnect |
| Typebot | Create, List, Update, Delete, Delete All |

`Send a List` and `Send a Carousel` take their nested structure (sections/
rows, cards/buttons) as a JSON field rather than point-and-click — those two
are nested two levels deep (an array inside an array), past what a single
`fixedCollection` can represent cleanly.

## Credentials

You need a Pulze API instance (self-hosted) and a token from it:

1. **Base URL** — your instance's address, ending in `/api/v1`
   (e.g. `https://your-server.example.com/api/v1`).
2. **Token** — either:
   - an **account token** (dashboard: *Admin → My Account*), which can see
     every instance under the account and is required for account-level
     operations such as *List Instances*; or
   - an **instance token** (dashboard: instance → *Settings*), scoped to a
     single instance.
3. **Instance (for testing the connection)** — optional, and only for Pulze
   servers older than August 2026: those answer `403` when an instance token
   asks for the instance list, so the name typed here is used both by the
   credential's "Test" button and as the single entry of the **Instance**
   dropdown. On current servers you can leave it empty with either token type.

Both token types authenticate the same way (`Authorization: Bearer <token>`),
but they are not interchangeable in scope — an instance token gets a `403` on
operations that require an account token.

## Compatibility

Built and tested against n8n 1.x with `n8nNodesApiVersion: 1`. No known
incompatibilities.

## Usage

Every operation needs an **Instance** field — the Pulze instance (a connected
WhatsApp session) that should send or be queried. It is a dropdown filled from
your credential: an account token lists every instance of the account, an
instance token lists its own. To pick the instance at runtime instead, switch
the field to an expression.

If you're new to n8n, the [Try it out](https://docs.n8n.io/try-it-out/) guide
covers the basics of building a workflow.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Pulze API documentation](https://pulzeapi.botautotik.com/docs.html)

## Version history

- **0.1.0** — Initial release: 80 operations across 10 resources (Message,
  Instance, Profile, Chat, Event, Group, Community, Newsletter, Chatwoot,
  Typebot) plus the Pulze API Trigger with HMAC-verified webhook delivery.
