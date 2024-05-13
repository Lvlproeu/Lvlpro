/**
 * Поле формы
 */
export default class Field {
	constructor(selector) {
		if (!selector || selector.instanceField) {
			return;
		}

		this.data = {
			error: '_error',
			container: '.field',
		};

		this.field = selector;
		this.field.instanceField = this;
		this.container = this.field.closest(this.data.container);

		this.patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
		if (this.isChangeListener) {
			this.field.addEventListener('change', this.validation);
			return;
		}

		this.field.addEventListener('focus', this.removeError);
		this.field.addEventListener('blur', this.validation);
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
					if (this.isSelected) {
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
				default:
					return true;
			}
			this.addError();
			return false;
		}
		return true;
	}

	get isChangeListener() {
		return this.field.tagName === 'SELECT' || this.field.type === 'checkbox';
	}

	get isSelected() {
		return [
			...this.field.querySelectorAll('option:not([data-placeholder])'),
		].filter((el) => el.selected)[0];
	}
}
