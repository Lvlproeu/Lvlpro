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

		this.addListenerTriggerClick();
		this.addListenerMouseEnter();
	}

	bind() {
		this.onTriggerClick = this.onTriggerClick.bind(this);
		this.onMouseenter = this.onMouseenter.bind(this);
	}

	addListenerTriggerClick() {
		for (const el of this.triggers) {
			el.addEventListener('click', this.onTriggerClick);
		}
	}

	addListenerMouseEnter() {
		for (const el of this.triggersLastLvl) {
			el.addEventListener('mouseenter', this.onMouseenter);
		}
	}

	onTriggerClick(e) {
		e.preventDefault();
		const { target } = e;

		if (this.wrapper && !this.isSubmenuOpen) {
			this.wrapper.classList.remove(this.data.openSubmenu);
			this.container.classList.remove(this.data.openSubmenu);
		}

		this.wrapper = target.closest(this.data.submenuSelector);
		this.wrapper.classList.toggle(this.data.openSubmenu);
		this.container.classList.toggle(this.data.openSubmenu);

		if (!this.isSubmenuOpen) {
			this.closeLastLvl();
		}
	}

	onMouseenter(e) {
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
		return this.wrapper && this.wrapper.classList.contains(this.data.openSubmenu);
	}

	get isLastLvlOpen() {
		return this.wrapperLastLvl && this.wrapperLastLvl.classList.contains(this.data.openLastLvl);
	}
}
