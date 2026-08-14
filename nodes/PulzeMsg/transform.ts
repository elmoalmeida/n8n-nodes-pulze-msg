import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

/**
 * Turns the "Cards"/"Options" form fields into the nested body the Pulze API
 * expects.
 *
 * Why a preSend and not an expression: the API wants two levels
 * (card -> header/body/buttons, section -> rows) while the n8n form is flat,
 * because a fixedCollection cannot reliably hold another fixedCollection. An
 * expression doing this mapping would be an unreadable one-liner; a function
 * can be read, and tested, on its own.
 *
 * These only run when their field is the one on screen: n8n skips the routing
 * of any parameter hidden by displayOptions, so the JSON box and the form
 * never both write to the body.
 */

interface CardUi {
	title?: string;
	subtitle?: string;
	imageUrl?: string;
	videoUrl?: string;
	text?: string;
	footer?: string;
	[key: string]: string | undefined;
}

interface RowUi {
	section?: string;
	title?: string;
	description?: string;
	id?: string;
}

/** Drops empty strings — the API treats an absent field and an empty one differently. */
function comValor(objeto: IDataObject): IDataObject {
	const limpo: IDataObject = {};
	for (const [chave, valor] of Object.entries(objeto)) {
		if (valor !== undefined && valor !== null && valor !== '') limpo[chave] = valor;
	}
	return limpo;
}

function corpoDe(requestOptions: IHttpRequestOptions): IDataObject {
	if (typeof requestOptions.body !== 'object' || requestOptions.body === null) {
		requestOptions.body = {};
	}
	return requestOptions.body as IDataObject;
}

export async function cardsFromUi(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const ui = this.getNodeParameter('cardsUi', {}) as { card?: CardUi[] };
	const cards = (ui.card ?? []).map((c) => {
		// Three fixed button slots: WhatsApp already renders poorly past three,
		// so the limit costs nobody anything. A slot set to "none" is skipped.
		const buttons = [1, 2, 3]
			.map((n) => ({
				type: c[`bt${n}Type`],
				displayText: c[`bt${n}Label`],
				id: c[`bt${n}Value`],
			}))
			.filter((b) => b.type && b.type !== 'none');

		const header = comValor({
			title: c.title,
			subtitle: c.subtitle,
			imageUrl: c.imageUrl,
			videoUrl: c.videoUrl,
		});

		const card: IDataObject = { header, body: { text: c.text ?? '' } };
		if (c.footer) card.footer = c.footer;
		if (buttons.length) card.buttons = buttons;
		return card;
	});

	corpoDe(requestOptions).cards = cards;
	return requestOptions;
}

export async function rowsFromUi(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const ui = this.getNodeParameter('sectionsUi', {}) as { row?: RowUi[] };

	// Options carry the name of the group they belong to, and the grouping
	// happens here. A Map keeps the sections in the order their first option
	// appeared, so the list comes out in the order it was typed — with a plain
	// object, numeric-looking headings ("1", "2") would be reordered by the
	// JavaScript key rules and the menu would silently scramble.
	const secoes = new Map<string, IDataObject[]>();
	for (const r of ui.row ?? []) {
		const titulo = r.section ?? '';
		if (!secoes.has(titulo)) secoes.set(titulo, []);
		secoes.get(titulo)!.push(
			comValor({ id: r.id, title: r.title, description: r.description }),
		);
	}

	corpoDe(requestOptions).sections = [...secoes].map(([title, rows]) => ({ title, rows }));
	return requestOptions;
}
