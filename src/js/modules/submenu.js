/**
 * Подменю в хедере
 */
export default class Submenu {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;

		this.data = {
			submenuSelector: '.js-submenu',
			linkSelector: 'a.nav-header__link',
			wrapperLastLvlSelector: '.js-wrapper-last-lvl',
			openSubmenu: '_open-submenu',
			openLastLvl: '_open-last-lvl',
		};

		this.triggers = this.container.querySelectorAll('.js-trigger-submenu');
		this.triggersLastLvl = this.container.querySelectorAll(
			'.js-trigger-last-lvl'
		);

		this.wrapper = null;
		this.wrapperLastLvl = null;

		this.init();
	}

	init() {
		this.bind();
		this.addListeners();
	}

	bind() {
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseenterLastLvl = this.onMouseenterLastLvl.bind(this);
	}

	addListeners() {
		this.addListenerMouseEnter();
		this.addListenerMouseLeave();
		this.addListenerMouseMove();
		this.addListenerMouseEnterLastLvl();
	}

	addListenerMouseEnter() {
		for (const el of this.triggers) {
			el.addEventListener('mouseenter', this.onMouseEnter);
		}
	}

	addListenerMouseMove() {
		this.container.addEventListener('mousemove', this.onMouseMove);
	}

	addListenerMouseLeave() {
		this.container.addEventListener('mouseleave', this.onMouseLeave);
	}

	addListenerMouseEnterLastLvl() {
		for (const el of this.triggersLastLvl) {
			el.addEventListener('mouseenter', this.onMouseenterLastLvl);
		}
	}

	onMouseEnter(e) {
		e.preventDefault();
		const { target } = e;

		// Случай, если будет несколько подменю
		if (this.wrapper && this.isSubmenuOpen) {
			this.wrapper.classList.remove(this.data.openSubmenu);
			this.container.classList.remove(this.data.openSubmenu);
			this.wrapper = null;
		}

		this.wrapper = target.closest(this.data.submenuSelector);
		this.wrapper.classList.add(this.data.openSubmenu);
		this.container.classList.add(this.data.openSubmenu);
	}

	onMouseLeave(e) {
		e.stopPropagation();

		if (this.isSubmenuOpen) {
			this.closeSubmenu();
		}
	}

	onMouseMove(e) {
		e.stopPropagation();

		const { target } = e;
		const isLink = target.closest(this.data.linkSelector);

		if (this.isSubmenuOpen && isLink) {
			this.closeSubmenu();
		}
	}

	onMouseenterLastLvl(e) {
		e.stopPropagation();

		const { target } = e;

		if (this.wrapperLastLvl && this.isLastLvlOpen) {
			this.wrapperLastLvl.classList.remove(this.data.openLastLvl);
		}

		this.wrapperLastLvl = target.closest(this.data.wrapperLastLvlSelector);
		this.wrapperLastLvl.classList.add(this.data.openLastLvl);
	}

	closeSubmenu() {
		if (this.wrapper) {
			this.wrapper.classList.remove(this.data.openSubmenu);
			this.container.classList.remove(this.data.openSubmenu);
			this.wrapper = null;
		}
		this.closeLastLvl();
	}

	closeLastLvl() {
		if (this.wrapperLastLvl) {
			this.wrapperLastLvl.classList.remove(this.data.openLastLvl);
			this.wrapperLastLvl = null;
		}
	}

	get isSubmenuOpen() {
		return (
			this.wrapper && this.wrapper.classList.contains(this.data.openSubmenu)
		);
	}

	get isLastLvlOpen() {
		return (
			this.wrapperLastLvl &&
			this.wrapperLastLvl.classList.contains(this.data.openLastLvl)
		);
	}
}
