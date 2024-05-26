import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Картинки, уменьшающиеся по скроллу через scale
 */
export default class ImageScale {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;

		this.init();
	}

	init() {
		gsap.fromTo(
			this.container,
			{ scale: 1.2 },
			{
				scale: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: this.container,
					end: 'center center',
					scrub: true,
				},
			}
		);
	}
}

export function initImageScale() {
	const selectors = document.querySelectorAll('.js-image-scale');
	for (const el of selectors) {
		new ImageScale(el);
	}
}
