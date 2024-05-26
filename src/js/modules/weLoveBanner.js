import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Баннер Мы любим то,то мы делаем
 */
export default class WeLoveBanner {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;
		this.images = this.container.querySelector('.js-we-love-banner-images');
		this.tl = gsap.timeline();

		this.st = null;

		this.init();
	}

	init() {
		this.setFromTo();
		this.initSt();
	}

	setFromTo() {
		this.tl.fromTo(this.images, { y: '100%' }, { y: '0%', ease: 'none' });
	}

	initSt() {
		this.st = ScrollTrigger.create({
			animation: this.tl,
			trigger: this.container,
			start: 'bottom bottom',
			end: `+=${this.images.clientHeight}`,
			scrub: 0,
			pin: true,
			ease: 'none',
		});
	}
}

export function initWeLoveBanner() {
	const selector = document.querySelector('.js-we-love-banner');
	new WeLoveBanner(selector);
}
