import Submenu from "./submenu";

export default class Header {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.header = selector;
		this.header.instanceHeader = this;

		this.data = {
			openMenu: '_open-menu',
			point: '1023',
		};

		this.burger = this.header.querySelector('.js-burger');
		this.mediaQuery = window.matchMedia(`(max-width: ${this.data.point}px)`);

        this.submenu = null;

		this.init();
	}

	init() {
		this.bind();
		this.addListenerResize();
		this.addListenerBurgerClick();
        this.initSubmenu();
	}

	bind() {
		this.onResize = this.onResize.bind(this);
		this.onBurgerClick = this.onBurgerClick.bind(this);
	}

    initSubmenu() {
        this.submenu = new Submenu(this.header);
    }

	addListenerResize() {
		this.mediaQuery.addEventListener('change', this.onResize);
	}

	addListenerBurgerClick() {
		this.burger.addEventListener('click', this.onBurgerClick);
	}

	onResize() {
		if (this.mediaQuery.matches) {
            this.submenu.closeSubmenu();
		} else {
            this.closeMenu();
        }
	}

	onBurgerClick(e) {
		e.preventDefault();

		this.header.classList.toggle(this.data.openMenu);
	}

	closeMenu() {
		this.header.classList.remove(this.data.openMenu);
	}
}

export function initHeader() {
	const selector = document.querySelector('.js-header');

	new Header(selector);
}
