/**
 * Анимация перехода между страницами
 */
export default class OverlayPage {
	constructor() {
		this.data = {
			showOverlayBefore: 'js-show-overlay-page-before',
		};

		this.overlayBefore = document.querySelector('.overlay-page._before');
		this.allLinks = document.querySelectorAll('a');
		this.links = [];

		this.curLink = null;

		this.init();
	}

	init() {
		this.filterLinks();
		this.bind();
		this.addListenerClick();
	}

	bind() {
		this.onClick = this.onClick.bind(this);
		this.onAnimationComplete = this.onAnimationComplete.bind(this);
	}

	addListenerClick() {
		for (const el of this.links) {
			el.addEventListener('click', this.onClick);
		}
	}

	filterLinks() {
		for (const el of this.allLinks) {
			const href = el.getAttribute('href');
			if (OverlayPage.isValid(href.toLowerCase())) {
				this.links.push(el);
			}
		}
	}

	onClick(e) {
		this.curLink = e.target.closest('a');

		if (this.overlayBefore) {
			document.body.classList.add(this.data.showOverlayBefore);
			e.preventDefault();
			setTimeout(this.onAnimationComplete, 500);
		}
	}

	onAnimationComplete() {
		window.location = this.curLink.href;
	}

	static isValid(href) {
		return (
			!href.includes('#', 0) && !href.includes('mailto:') && !href.includes('tel:')
		);
	}
}

export function initOverlayPage() {
	new OverlayPage();
}
