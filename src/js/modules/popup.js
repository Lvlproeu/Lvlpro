/* global bodyLock */

import AnimationsPopup from './animationsPopup';

/**
 * Модальные окна
 */
export default class Popup {
	constructor(selector) {
		if (!selector || selector.instancePopup) {
			return;
		}

		this.selector = selector;
		this.selector.instancePopup = this;

		this.data = {
			name: this.name,
			open: '_open',
			openDefault: 'data-open-default',
		};

		this.triggers = document.querySelectorAll(
			`[data-popup-trigger="${this.data.name}"]`
		);

		this.anim = null;

		this.init();
	}

	init() {
		this.bind();

		this.anim = new AnimationsPopup(this.selector);

		this.addListenerTriggerClick();
		this.addListenerPopupClick();
		this.checkOpenDefault();
	}

	bind() {
		this.onTriggerClick = this.onTriggerClick.bind(this);
		this.onPopupClick = this.onPopupClick.bind(this);
	}

	addListenerTriggerClick() {
		for (const el of this.triggers) {
			el.addEventListener('click', this.onTriggerClick);
		}
	}

	addListenerPopupClick() {
		this.selector.addEventListener('click', this.onPopupClick);
	}

	onTriggerClick(e) {
		e.preventDefault();

		this.startOpenCurrent();
	}

	onPopupClick(e) {
		const { target } = e;

		if (Popup.clickOnCloseArea(target) && !this.anim.play) {
			this.startCloseCurrent();
		}
	}

	checkOpenDefault() {
		if (this.isOpenDefault) {
			this.startOpenCurrent();
		}
	}

	startOpenCurrent() {
		Popup.closeAllPopups();
		this.openCurrent();
		this.anim.startForward();
	}

	openCurrent() {
		this.selector.classList.add(this.data.open);
		bodyLock.lock();
	}

	startCloseCurrent() {
		this.anim.startBack();
	}

	closeCurrent() {
		this.selector.classList.remove(this.data.open);
		bodyLock.unlock();
	}

	setStepsAfterRequest() {
		this.anim.elements = this.selector.querySelectorAll(
			'[data-anim-step-after-request]'
		);
		this.anim.index = this.anim.elements.length;
	}

	static open(name) {
		Popup.closeAllPopups();
		const curName = name;
		const selector = document.querySelector(`[data-popup="${curName}"]`);
		selector.instancePopup.startOpenCurrent();
	}

	static close(name) {
		const curName = name;
		const selector = document.querySelector(`[data-popup="${curName}"]`);
		selector.instancePopup.startCloseCurrent();
	}

	static closeAllPopups() {
		const selectors = Popup.openedPopups;
		for (const el of selectors) {
			if (el.instancePopup.isOpen) {
				el.instancePopup.closeCurrent();
				el.instancePopup.anim.index = 0;
				el.instancePopup.anim.clear();
			}
		}
	}

	get name() {
		return this.selector.getAttribute('data-popup');
	}

	get isOpen() {
		return this.selector.classList.contains(this.data.open);
	}

	get isOpenDefault() {
		return this.selector.hasAttribute(this.data.openDefault);
	}

	static get openedPopups() {
		const selectors = document.querySelectorAll('[data-popup]._open');
		return selectors;
	}

	static clickOnCloseArea(target) {
		return (
			target.hasAttribute('data-popup') ||
			target.hasAttribute('data-popup-close')
		);
	}
}

export function initPopups() {
	const selectors = document.querySelectorAll('[data-popup]');

	for (const el of selectors) {
		new Popup(el);
	}
}

window.initPopups = initPopups;
window.Popup = Popup;
