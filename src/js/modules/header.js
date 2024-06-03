import Menu from './menu';
import Submenu from './submenu';
import SwitchLang from './switchLang';

/**
 * Хедер
 */
export default class Header {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.header = selector;
		this.header.instanceHeader = this;

		this.data = {
			headerSelector: '.js-header',
			popupSelector: '[data-popup-trigger]',
			clearTransitions: '_clear-transitions',
			point: '1023',
		};

		this.mediaQuery = window.matchMedia(`(max-width: ${this.data.point}px)`);

		this.menu = null;
		this.submenu = null;
		this.switchLang = null;

		this.init();
	}

	init() {
		this.bind();

		this.initMenu();
		this.initSubmenu();
		this.initSwitchLang();

		this.addListenerDocClick();
		this.addListenerResize();
	}

	bind() {
		this.onDocClick = this.onDocClick.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	initMenu() {
		this.menu = new Menu(this.header);
	}

	initSubmenu() {
		this.submenu = new Submenu(this.header);
	}

	initSwitchLang() {
		const selector = this.header.querySelector('.js-switch-lang');

		this.switchLang = new SwitchLang(selector);
	}

	addListenerResize() {
		this.mediaQuery.addEventListener('change', this.onResize);
	}

	addListenerDocClick() {
		document.addEventListener('click', this.onDocClick);
	}

	onDocClick(e) {
		const { target } = e;

		if (this.switchLang.isCurTarget(target) && this.submenu.isSubmenuOpen) {
			this.submenu.closeSubmenu();
		}

		if (!this.switchLang.isCurTarget(target) && this.switchLang.isOpen) {
			this.switchLang.close();
		}
	}

	onResize() {
		if (!this.mediaQuery.matches) {
			this.menu.closeMenu();
		}

		this.submenu.closeSubmenu();
		this.switchLang.close();

		this.clearTransitions();
	}

	clearTransitions() {
		this.header.classList.add(this.data.clearTransitions);

		setTimeout(() => {
			this.header.classList.remove(this.data.clearTransitions);
		}, 1);
	}

	isClickOutside(target) {
		return (
			!target.closest(this.data.headerSelector) ||
			target.closest(this.data.popupSelector)
		);
	}
}

export function initHeader() {
	const selector = document.querySelector('.js-header');

	new Header(selector);
}
