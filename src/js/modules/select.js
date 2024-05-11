import SlimSelect from 'slim-select';

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
			events: {
				afterChange() {
					const customEvent = new Event('change', { bubbles: true });
					el.dispatchEvent(customEvent);
				},
			},
			settings: {
				showSearch: false,
			},
		});
	}
}

export function initSelects() {
	const selectors = document.querySelectorAll('.js-select');

	for (const el of selectors) {
		new Select(el);
	}
}

window.initSelects = initSelects;
