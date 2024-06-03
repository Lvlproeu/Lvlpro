/* global bodyLock */

/**
 * Меню в хедере
 */
export default class Menu {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;

		this.data = {
			openMenu: '_open-menu',
		};

		this.burger = this.container.querySelector('.js-burger');

		this.init();
	}

	init() {
		this.bind();
		this.addListenerBurgerClick();
	}

	bind() {
		this.onBurgerClick = this.onBurgerClick.bind(this);
	}

	addListenerBurgerClick() {
		if (this.burger) {
			this.burger.addEventListener('click', this.onBurgerClick);
		}
	}

	onBurgerClick(e) {
		e.preventDefault();

		this.container.classList.toggle(this.data.openMenu);

		if (this.isMenuOpen) {
			bodyLock.lock();
		} else {
			bodyLock.unlock();
		}
	}

	closeMenu() {
		if (this.isMenuOpen) {
            bodyLock.unlock();
			this.container.classList.remove(this.data.openMenu);
        }
	}

	get isMenuOpen() {
		return this.container.classList.contains(this.data.openMenu);
	}
}
