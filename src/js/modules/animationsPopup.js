/**
 * Анимации модальных окон
 */
export default class AnimationsPopup {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;
		this.elements = this.container.querySelectorAll('[data-anim-step]');
		this.index = 0;

		this.play = false;
	}

	startForward() {
		this.play = true;

		if (this.index < this.elements.length) {
			const current = this.elements[this.index];
			const time = AnimationsPopup.timeInMs(
				window.getComputedStyle(current).transitionDuration
			);
			current.classList.add('_playing');
			this.index += 1;

			setTimeout(() => {
				this.startForward();
			}, time);

			if (this.index === this.elements.length) {
				setTimeout(() => {
					this.play = false;
					this.container.instancePopup.openCurrent();
				}, time);
			}
		}
	}

	startBack() {
		this.play = true;

		if (this.index > 0) {
			const current = this.elements[this.index - 1];
			const time = AnimationsPopup.timeInMs(
				window.getComputedStyle(current).transitionDuration
			);
			current.classList.remove('_playing');
			this.index -= 1;

			setTimeout(() => {
				this.startBack();
			}, time);

			if (this.index === 0) {
				setTimeout(() => {
					this.play = false;
					this.container.instancePopup.closeCurrent();
				}, time);
			}
		}
	}

	clear() {
		for (const el of this.elements) {
			el.classList.remove('_playing');
		}
	}

	static timeInMs(time) {
		const el = time.replace('s', '');
		return el * 1000;
	}
}
