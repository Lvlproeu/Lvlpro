/**
 * Поле ввода
 */
export default class Field {
	constructor(selector) {
        if (!selector || selector.instanceField) {
            return;
        }

		this.data = {
			error: '_error',
			container: '.field'
		}

		this.field = selector;
        this.field.instanceField = this;
		this.container = this.field.closest(this.data.container);
		
		this.patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		this.options = null;

		this.init();
	}

	init() {
		this.bind();
		this.addEventListeners();
	}

	bind() {
		this.removeError = this.removeError.bind(this);
		this.validation = this.validation.bind(this);
	}

	addEventListeners() {
		this.field.addEventListener('focus', this.removeError);
		this.field.addEventListener('change', this.removeError);
		this.field.addEventListener('blur', this.validation);
		this.field.addEventListener('change', this.validation);
	}

	addError() {
		this.container.classList.add(this.data.error);
	}

	removeError() {
		this.container.classList.remove(this.data.error);
	}

	validation() {
		if (!this.field.hasAttribute('disabled')) {
			switch (this.field.getAttribute('data-required')) {
				case 'text':
					if (this.field.value) {
						this.removeError();
						return true;
					}
					break;
				case 'checkbox':
					if (this.field.checked) {
						this.removeError();
						return true;
					}
					break;
				case 'tel':
					if (this.field.value !== '' && this.field.value.indexOf('_') === -1) {
						this.removeError();
						return true;
					}
					break;
				case 'email':
					if (this.field.value.toLowerCase().search(this.patternEmail) === 0) {
						this.removeError();
						return true;
					}
					break;
				case 'select':
					this.options = this.field.querySelectorAll(
						'option:not([data-placeholder])'
					);
					for (let index = 0; index < this.options.length; index += 1) {
						const el = this.options[index];
						if (el.selected) {
							this.removeError();
							return true;
						}
					}
					break;
				default:
					return true;
			}
			this.addError();
			return false;
		}
		return true;
	}
}
