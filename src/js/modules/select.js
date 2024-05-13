import SlimSelect from 'slim-select';

/**
 * Селект
 */
export default class Select {
	constructor(selector) {
		if (!selector || selector.instanceSelect) {
			return;
		}

		this.selector = selector;
		this.selector.instanceSelect = this;

		this.slim = null;

		this.init();
	}

	init() {
		this.create();
	}

	create() {
		const el = this.selector;

		this.slim = new SlimSelect({
			select: el,
			settings: {
				showSearch: false,
			},
		});
	}

	clear() {
		this.slim.setSelected();

		if (this.selector.instanceField) {
			this.selector.instanceField.removeError();
		}
	}
}

export function initSelects() {
	const selectors = document.querySelectorAll('.js-select');

	for (const el of selectors) {
		new Select(el);
	}
}

window.initSelects = initSelects;
