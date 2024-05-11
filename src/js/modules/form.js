import axios from "axios";
import Field from "./field";

export default class Form {
    constructor(selector) {
        if (!selector || selector.instanceForm) {
            return;
        }

        this.data = {
            sending: '_sending',
            containerAfterRequest: '.js-form-after-request',
        }

        this.container = selector;
        this.container.instanceForm = this;
        this.popup = this.container.closest('[data-popup]');

        if (this.popup) {
            this.containerAfterRequest = this.popup.querySelector(this.data.containerAfterRequest);
        }

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

    addListenerSubmit() {
        this.container.addEventListener('submit', this.onSubmit);
    }

    validationForm() {
		return this.fields.reduce((accumulator, field) => {
			const resultValiudation = field.validation();
			return accumulator ? resultValiudation : false;
		}, true);
	}

    onSubmit(e) {
        e.preventDefault();
        const THIS = this;
        const formData = new FormData(this.container);
        const url = this.container.getAttribute('action');
        const btnSubmit = this.container.querySelector('[type="submit"');
        
        if (this.validationForm()) {
            this.container.classList.add(this.data.sending);
            btnSubmit.setAttribute('disabled', true);

            axios
                .post(url, formData)
                .then(function(response) {
                    if (response) {
                        console.log('ok');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
                .finally(function() {
                    THIS.container.classList.remove(THIS.data.sending);
                    THIS.resetForm();
                    THIS.checkPopup();
                    btnSubmit.removeAttribute('disabled', true);
                })
        }
    }

    initFields() {
        const selectors = this.container.querySelectorAll('[data-required');
        
        for (const el of selectors) {
            this.fields.push(new Field(el));
        }
    }

    resetForm() {
        this.container.reset();

        const selectors = this.container.querySelectorAll('select.js-select');

        for (const el of selectors) {
            el.instanceSelect.clear();
        }

    }

    checkPopup() {
        if (this.popup) {
            this.container.style.display = 'none';
            this.containerAfterRequest.style.display = '';
            this.popup.instancePopup.setStepsAfterRequest();
        }
    }
}

export function initForms() {
    const selectors = document.querySelectorAll('.js-form');

    for (const el of selectors) {
        new Form(el);
    }
}