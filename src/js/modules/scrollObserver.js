/* global IntersectionObserver */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class ScrollObserver {
	constructor() {
		this.data = {
			group: 'js-scroll-observe-group',
			groupEl: '.js-scroll-observe-group-el',
		}

		this.options = {
			root: null,
			rootMargin: '0px',
			// процент пересечения - половина элемента
			threshold: 1,
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

					if (el.classList.contains(this.data.group)) {
						const elements = el.querySelectorAll(this.data.groupEl);
						elements.forEach((item, index) => {
							gsap.to(item, { 
								x: 0,
								y: 0,
								rotate: 0,
								opacity: 1,
								scale: 1,
								duration: ScrollObserver.getDuration(el),
								delay: ScrollObserver.getDelay(el) * index});
						});
					} else {
						gsap.to(el, { 
							x: 0,
							y: 0,
							rotate: 0,
							opacity: 1,
							scale: 1,
							duration: ScrollObserver.getDuration(el),
							delay: ScrollObserver.getDelay(el) });
					}

					observer.unobserve(el);
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
        return el.dataset.delay ? el.dataset.delay : '0';
    }

    static getDuration(el) {
        return el.dataset.duration ? el.dataset.duration : '0.5';
    }
}

export function initScrollObserver() {
	const scrollObserver = new ScrollObserver();
	window.scrollObserver = scrollObserver;
}
