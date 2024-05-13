import axios from 'axios';
import Field from './field';

/**
 * Формы
 */
export default class Form {
	constructor(selector) {
		if (!selector || selector.instanceForm) {
			return;
		}

		this.data = {
			sending: '_sending',
			containerResponse: '.js-form-after-request',
		};

		this.container = selector;
		this.container.instanceForm = this;
		this.btnSubmit = this.container.querySelector('[type="submit"]');
		this.popup = this.container.closest('[data-popup]');
		this.containerResponse = this.container.parentNode.querySelector(
			this.data.containerResponse
		);

		this.fields = [];

		this.init();
	}

	init() {
		this.bind();
		this.initFields();
		this.addListenerSubmit();
	}

	bind() {
		this.onSubmit = this.onSubmit.bind(this);
	}

	initFields() {
		const selectors = this.container.querySelectorAll('[data-required');

		for (const el of selectors) {
			this.fields.push(new Field(el));
		}
	}

	addListenerSubmit() {
		this.container.addEventListener('submit', this.onSubmit);
	}

	validationForm() {
		return this.fields.reduce((accumulator, field) => {
			const resultValiudation = field.validation();
			return accumulator ? resultValiudation : false;
		}, true);
	}

	resetForm() {
		this.container.reset();

		const selectors = this.container.querySelectorAll('select.js-select');

		for (const el of selectors) {
			el.instanceSelect.clear();
		}
	}

	showContainerResponse() {
		this.container.style.display = 'none';
		this.containerResponse.style.display = '';

		if (this.popup) {
			this.popup.instancePopup.setStepsAfterRequest();
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const valid = this.validationForm();

		if (valid) {
			const THIS = this;
			const formData = new FormData(this.container);
			const url = this.container.getAttribute('action');
			const titleResponse = this.containerResponse.querySelector(
				'[data-response-title]'
			);
			const textResponse = this.containerResponse.querySelector(
				'[data-response-text]'
			);

			this.container.classList.add(this.data.sending);
			this.btnSubmit.setAttribute('disabled', true);

			axios
				.post(url, formData)
				.then(function (response) {
					if (response) {
						console.log('ok', response);

						if (titleResponse) {
							// TODO: сейчас запрос на тестовый jsonplaceholder, он возвращает успех 201
							// когда будут реальные данные, поменять вывод текста из response.data.id на актуальный путь хранения текста заголовка
							titleResponse.innerHTML = response.data.id;
						}
						if (textResponse) {
							// TODO: сейчас запрос на тестовый jsonplaceholder, он возвращает успех 201
							//  когда будут реальные данные, поменять вывод текста из response.data.id на актуальный путь хранения текста подзаголовка
							textResponse.innerHTML = response.data.id;
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
					THIS.container.classList.remove(THIS.data.sending);
					THIS.btnSubmit.removeAttribute('disabled', true);
					THIS.resetForm();
					THIS.showContainerResponse();
				});
		}
	}
}

export function initForms() {
	const selectors = document.querySelectorAll('.js-form');

	for (const el of selectors) {
		new Form(el);
	}
}
