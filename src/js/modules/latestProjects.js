import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Последние проекты
 */
export default class LatestProjects {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.data = {
			mediaQuery: '1279',
		};

		this.container = selector;
		this.wrapper = this.container.querySelector('.js-latest-projects-wrapper');
		this.row = this.container.querySelector('.js-latest-projects-row');
		this.tl = gsap.timeline();

		this.mediaQuery = window.matchMedia(
			`(max-width: ${this.data.mediaQuery}px)`
		);

		this.st = null;

		this.init();
	}

	init() {
		this.checkDevive();
	}

	checkDevive() {
		if (!this.mediaQuery.matches) {
			this.setFromTo();
			this.initSt();
		}
	}

	setFromTo() {
		this.tl.fromTo(
			this.row,
			{ x: '0' },
			{ x: -this.row.clientWidth + this.wrapper.clientWidth, ease: 'none' }
		);
	}

	initSt() {
		this.st = ScrollTrigger.create({
			animation: this.tl,
			trigger: this.container,
			start: 'top top',
			end: `+=${this.container.clientHeight}`,
			scrub: 0,
			pin: true,
			ease: 'none',
		});
	}
}

export function initLatestProjects() {
	const selector = document.querySelector('.js-latest-projects');
	new LatestProjects(selector);
}
