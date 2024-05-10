/**
 * Бегущая строка
 */
export default class Marquee {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.marquue = selector;

		this.data = {
			play: '_play',
		};

		this.container = this.marquue.parentNode;

		this.init();
	}

	init() {
		this.makeClone();

		setTimeout(() => {
			this.container.classList.add(this.data.play);
		}, 1);
	}

	makeClone() {
		const clone = this.marquue.cloneNode(true);
		this.container.appendChild(clone);
	}
}

export function initMarquee() {
	const selectors = document.querySelectorAll('.js-marquee');

	for (const el of selectors) {
		new Marquee(el);
	}
}
