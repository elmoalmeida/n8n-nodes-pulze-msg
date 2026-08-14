import type { INodeProperties } from 'n8n-workflow';

import { cardsFromUi } from '../../transform';

export const messageCarouselDescription: INodeProperties[] = [
  {
    displayName: "Number",
    name: "number",
    type: "string",
    required: true,
    default: '',
    placeholder: "5511999999999",
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    description: "Recipient: phone number with country and area code, or a full JID",
    routing: { send: { type: "body", property: "number" } },
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    required: true,
    default: '',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    description: "Text shown above the carousel",
    routing: { send: { type: "body", property: "message" } },
  },
  {
    displayName: "Cards",
    name: "cards",
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'], "@version": [1] } },
    description: "A carousel card — image/video, text and its own buttons. Provide the exact JSON shape described in the field documentation (see the endpoint docs linked in the node README).",
    routing: { send: { type: "body", property: "cards", value: '={{JSON.parse($value)}}' } },
  },
  {
    displayName: "Cards Input",
    name: "cardsMode",
    type: 'options',
    noDataExpression: true,
    options: [
      { name: "Form", value: 'form' },
      { name: "JSON", value: 'json' },
    ],
    default: 'form',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'], "@version": [2] } },
    description: "Fill the cards in a form, or paste the raw JSON array. The form covers the common case; JSON is what you want when the cards come from a previous node.",
  },
  {
    displayName: "Cards",
    name: "cardsUi",
    type: 'fixedCollection',
    typeOptions: { multipleValues: true, sortable: true },
    placeholder: "Add Card",
    default: {},
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'], "@version": [2], cardsMode: ["form"] } },
    description: 'A carousel card — image/video, text and its own buttons',
    options: [
      {
        name: "card",
        displayName: "Card",
        values: [
							{
								displayName: 'Body Text',
								name: 'text',
								type: 'string',
								default: '',
								description: 'Main text of the card, under the header. Required.',
							},
							{
								displayName: 'Button 1',
								name: 'bt1Type',
								type: 'options',
								options: [
											{
												name: 'Call',
												value: 'call',
											},
											{
												name: 'Copy',
												value: 'copy',
											},
											{
												name: 'None',
												value: 'none',
											},
											{
												name: 'Reply',
												value: 'reply',
											},
											{
												name: 'URL',
												value: 'url',
											},
										],
								default: 'none',
								description: 'What the button does. Leave it as None to use fewer buttons.',
							},
							{
								displayName: 'Button 1 Label',
								name: 'bt1Label',
								type: 'string',
								default: '',
								description: 'Visible label on the button',
							},
							{
								displayName: 'Button 1 Value',
								name: 'bt1Value',
								type: 'string',
								default: '',
								description: 'Depends on thetype: reply	->	the identifier returned on the webhook;	URL	->	the link;	call	->	phone number with country code;	copy	->	the text to copy',
							},
							{
								displayName: 'Button 2',
								name: 'bt2Type',
								type: 'options',
								options: [
											{
												name: 'Call',
												value: 'call',
											},
											{
												name: 'Copy',
												value: 'copy',
											},
											{
												name: 'None',
												value: 'none',
											},
											{
												name: 'Reply',
												value: 'reply',
											},
											{
												name: 'URL',
												value: 'url',
											},
									],
								default: 'none',
								description: 'What the button does. Leave it as None to use fewer buttons.',
							},
							{
								displayName: 'Button 2 Label',
								name: 'bt2Label',
								type: 'string',
								default: '',
								description: 'Visible label on the button',
							},
							{
								displayName: 'Button 2 Value',
								name: 'bt2Value',
								type: 'string',
								default: '',
								description: 'Depends on thetype: reply	->	the identifier returned on the webhook;	URL	->	the link;	call	->	phone number with country code;	copy	->	the text to copy',
							},
							{
								displayName: 'Button 3',
								name: 'bt3Type',
								type: 'options',
								options: [
											{
												name: 'Call',
												value: 'call',
											},
											{
												name: 'Copy',
												value: 'copy',
											},
											{
												name: 'None',
												value: 'none',
											},
											{
												name: 'Reply',
												value: 'reply',
											},
											{
												name: 'URL',
												value: 'url',
											},
									],
								default: 'none',
								description: 'What the button does. Leave it as None to use fewer buttons.',
							},
							{
								displayName: 'Button 3 Label',
								name: 'bt3Label',
								type: 'string',
								default: '',
								description: 'Visible label on the button',
							},
							{
								displayName: 'Button 3 Value',
								name: 'bt3Value',
								type: 'string',
								default: '',
								description: 'Depends on thetype: reply	->	the identifier returned on the webhook;	URL	->	the link;	call	->	phone number with country code;	copy	->	the text to copy',
							},
							{
								displayName: 'Card Footer',
								name: 'footer',
								type: 'string',
								default: '',
								description: 'Footer of this card only, different from the message footer',
							},
							{
								displayName: 'Image URL',
								name: 'imageUrl',
								type: 'string',
								default: '',
								description: 'Public URL of the card image. WhatsApp downloads it, so it must be reachable from the internet.',
							},
							{
								displayName: 'Subtitle',
								name: 'subtitle',
								type: 'string',
								default: '',
								description: 'Secondary line under the title',
							},
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Card title, in bold. Required.',
							},
							{
								displayName: 'Video URL',
								name: 'videoUrl',
								type: 'string',
								default: '',
								description: 'Public URL of the card video. Ignored when an image URL is also filled in.',
							},
					],
      },
    ],
    routing: { send: { preSend: [cardsFromUi] } },
  },
  {
    displayName: "Cards",
    name: "cardsJson",
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'], "@version": [2], cardsMode: ["json"] } },
    description: "A carousel card — image/video, text and its own buttons. Provide the exact JSON shape described in the field documentation (see the endpoint docs linked in the node README).",
    routing: { send: { type: "body", property: "cards", value: '={{JSON.parse($value)}}' } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['messageCarousel'], resource: ['message'] } },
    options: [
        {
          displayName: "Footer",
          name: "footer",
          type: "string",
          default: '',
          description: "Small line below the main text",
          routing: { send: { type: "body", property: "footer" } },
        }
    ],
  }
];
