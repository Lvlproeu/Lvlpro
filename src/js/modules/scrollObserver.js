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
		};

		this.options = {
			root: null,
			rootMargin: '0px',
			threshold: [0, 1],
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
					let cur = null;

					if  (ratio >= 1) {
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
									delay: ScrollObserver.getDelay(el) * index,
								});
							});
						} else {
							const inner = el.querySelector(this.data.innerEl);
							cur = inner || el;
							gsap.to(cur, {
								x: 0,
								y: 0,
								rotate: 0,
								opacity: 1,
								scale: 1,
								duration: ScrollObserver.getDuration(cur),
								delay: ScrollObserver.getDelay(cur),
							});
						}
	
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
}

export function initScrollObserver() {
	const scrollObserver = new ScrollObserver();
	window.scrollObserver = scrollObserver;
}
