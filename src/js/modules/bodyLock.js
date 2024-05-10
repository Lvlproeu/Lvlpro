/**
 * Блокировка прокрутки страницы
 */
export default class BodyLock {
	constructor() {
		this.body = document.body;

		this.data = {
			lock: '_lock',
		};

		this.selectors = document.querySelectorAll('.js-fixed-element');

		this.lockFlag = false;
	}

	lock() {
		if (!this.lockFlag) {
			this.switchFlag();
			this.checkFlag(true);
			this.body.classList.add(this.data.lock);
		}
	}

	unlock() {
		if (this.lockFlag) {
			this.switchFlag();
			this.checkFlag(false);
			this.body.classList.remove(this.data.lock);
		}
	}

	checkFlag(flag) {
		if (flag) {
			this.setPadding(`${this.scrollbarSize}px`);
			return;
		}
		this.setPadding('');
	}

	setPadding(property) {
		this.body.style.paddingRight = property;

		for (const el of this.selectors) {
			el.style.paddingRight = property;
		}
	}

	switchFlag() {
		this.lockFlag = !this.lockFlag;
	}

	get scrollbarSize() {
		return window.innerWidth - this.body.offsetWidth;
	}
}

export function initBodyLock() {
	const bodyLock = new BodyLock();
	window.bodyLock = bodyLock;
}
