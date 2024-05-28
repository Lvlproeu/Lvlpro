/* global IntersectionObserver */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class ScrollObserver {
	constructor() {
		this.data = {
			innerEl: '.js-scroll-observe-el-inner',
			group: 'js-scroll-observe-group',
			groupEl: '.js-scroll-observe-group-el',
			groupInnerEl: 'js-scroll-observe-group-el-inner',
			animated: '_animated',
		};

		this.options = {
			root: null,
			rootMargin: '0px',
			threshold: [0, 0.6, 1],
		};

		this.elements = document.querySelectorAll('.js-scroll-observe-el');
		this.groups = document.querySelectorAll('.js-scroll-observe-group');

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
					let current = el;

					if (ratio >= ScrollObserver.getRatio(el)) {
						if (current.classList.contains(this.data.group)) {
							const elements = current.querySelectorAll(this.data.groupEl);
							elements.forEach((item, index) => {
								gsap.to(item, {
									x: 0,
									y: 0,
									rotate: 0,
									opacity: 1,
									scale: 1,
									duration: ScrollObserver.getDuration(el),
									delay: ScrollObserver.getDelay(el) * index,
									onComplete: () => {
										item.classList.add(this.data.animated);
									},
								});
							});
						} else {
							const inner = el.querySelector(this.data.innerEl);
							if (inner) {
								current = inner;
							}
							gsap.to(current, {
								x: 0,
								y: 0,
								rotate: 0,
								opacity: 1,
								scale: 1,
								duration: ScrollObserver.getDuration(current),
								delay: ScrollObserver.getDelay(current),
							});
						}

						current.classList.add(this.data.animated);
						observer.unobserve(el);
					}
				}
			}
		}, this.options);
	}

	startObserve() {
		for (const el of this.elements) {
			this.observer.observe(el);
		}

		for (const el of this.groups) {
			this.observer.observe(el);
		}
	}

	static getDelay(el) {
		return el.hasAttribute('data-delay') ? el.dataset.delay : '0';
	}

	static getDuration(el) {
		return el.hasAttribute('data-duration') ? el.dataset.duration : '0.5';
	}

	static getRatio(el) {
		return el.hasAttribute('data-ratio') ? Number(el.dataset.ratio) : 1;
	}
}

export function initScrollObserver() {
	const scrollObserver = new ScrollObserver();
	window.scrollObserver = scrollObserver;
}
