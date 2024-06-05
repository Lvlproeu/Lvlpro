/* global IntersectionObserver */

export default class ScrollObserver {
	constructor() {
		this.data = {
			innerEl: '.js-scroll-observe-el-inner',
			animated: '_animated',
		};

		this.options = {
			root: null,
			rootMargin: '0px',
			threshold: [0, 0.6, 1],
		};

		this.elements = document.querySelectorAll('.js-scroll-observe-el');

		this.observer = null;

		this.init();
	}

	init() {
		this.createObserver();
		this.startObserve();
	}

	createObserver() {
		this.observer = new IntersectionObserver((entries, observer) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const el = entry.target;
					const ratio = entry.intersectionRatio;

					if (ratio >= ScrollObserver.getRatio(el)) {
						this.startAnimation(el);
						observer.unobserve(el);
					}
				}
			}
		}, this.options);
	}

	startAnimation(el) {
		const inner = el.querySelector(this.data.innerEl);
		let current = el;
		if (inner) {
			current = inner;
			el.classList.add(this.data.animated);
		}
		current.classList.add(this.data.animated);
	}

	startObserve() {
		for (const el of this.elements) {
			this.observer.observe(el);
		}
	}

	static getRatio(el) {
		return el.hasAttribute('data-ratio') ? Number(el.dataset.ratio) : 1;
	}
}

export function initScrollObserver() {
	const scrollObserver = new ScrollObserver();
	window.scrollObserver = scrollObserver;
}
