/**
 * Выпадашка смены языка в хедере
 */
export default class SwitchLang {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;

		this.data = {
            wrapperSelector: '.js-switch-lang',
			open: '_open',
		};

		this.trigger = this.container.querySelector('.js-switch-lang-trigger');

		this.init();
	}

	init() {
		this.bind();
		this.addListenerTriggerClick();
	}

	bind() {
		this.onTriggerClick = this.onTriggerClick.bind(this);
	}

	addListenerTriggerClick() {
		if (this.trigger) {
			this.trigger.addEventListener('click', this.onTriggerClick);
		}
	}

	onTriggerClick(e) {
		e.preventDefault();

		this.container.classList.toggle(this.data.open);

	}

    close() {
        this.container.classList.remove(this.data.open);
    }

    isCurTarget(target) {
        return target.closest(this.data.wrapperSelector);
    }

    get isOpen() {
        return this.container.classList.contains(this.data.open);
    }
}
