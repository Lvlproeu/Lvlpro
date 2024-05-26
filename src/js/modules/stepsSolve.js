import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Шаги в блоке Как мы будем решать вашу проблему
 */
export default class StepsSolve {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.data = {
			active: '_active',
			mediaQuery: '1023',
		};

		this.container = selector;
		this.row = this.container.querySelector('.js-steps-solve-row');
		this.line = this.container.querySelector('.js-step-line');

		this.steps = this.container.querySelectorAll('.js-step-solve');
		this.arrSteps = [...this.steps];

		this.stepsMob = this.container.querySelectorAll('.js-step-solve-mob');
		this.arrStepsMob = [...this.stepsMob];

		this.end = this.row.clientWidth;
		this.offsetRightMob = this.stepsMob[0].clientWidth;

		this.mediaQuery = window.matchMedia(
			`(max-width: ${this.data.mediaQuery}px)`
		);

		this.init();
	}

	init() {
		this.checkDevive();
	}

	checkDevive() {
		if (this.mediaQuery.matches) {
			this.initMobile();
		} else {
			this.initDesktop();
		}
	}

	initDesktop() {
		const [one, two, three, four] = this.steps;
		const tl = gsap.timeline();

		tl
			.fromTo(one, { opacity: 0 }, { opacity: 1, ease: 'none' })
			.to(one, { opacity: 0, duration: '0.2', ease: 'none' })
			.fromTo(two, { opacity: 0 }, { opacity: 1, ease: 'none' }, '-=0.2')
			.to(two, { opacity: 0, duration: '0.2', ease: 'none' })
			.fromTo(three, { opacity: 0 }, { opacity: 1, ease: 'none' }, '-=0.2')
			.to(three, { opacity: 0, duration: '0.2', ease: 'none' })
			.fromTo(four, { opacity: 0 }, { opacity: 1, ease: 'none' }, '-=0.2');

		ScrollTrigger.create({
			animation: tl,
			trigger: this.container,
			start: 'center center',
			end: `+=${this.end}`,
			scrub: 0,
			pin: true,
			ease: 'none',
			onUpdate: (self) => {
				const percent = self.progress.toFixed(3) * 100;
				this.line.style.width = `${percent}%`;

				this.toggleActive(percent, one, two, three, four);
			},
		});
	}

	toggleActive(percent, one, two, three, four) {
		if (percent === 0) {
			this.removeActive(null, one);
		} else if (percent > 0 && percent <= 25) {
			one.parentNode.classList.add(this.data.active);
			this.removeActive(one);
		} else if (percent > 25 && percent <= 50) {
			two.parentNode.classList.add(this.data.active);
			this.removeActive(two);
		} else if (percent > 50 && percent <= 75) {
			three.parentNode.classList.add(this.data.active);
			this.removeActive(three);
		} else if (percent > 75 && percent <= 100) {
			four.parentNode.classList.add(this.data.active);
			this.removeActive(four);
		}
	}

	removeActive(step, selelector = null) {
		if (step) {
			const othres = this.arrSteps.filter((el) => el !== step);
			for (const el of othres) {
				el.parentNode.classList.remove('_active');
			}
		} else {
			selelector.parentNode.classList.remove('_active');
		}
	}

	initMobile() {
		const [one, two, three, four] = this.stepsMob;
		const tl = gsap.timeline();

		one.classList.add(this.data.active);

		tl.fromTo(
			this.row,
			{ x: 0 },
			{ x: `${-this.end + this.offsetRightMob}px`, ease: 'none' }
		);

		ScrollTrigger.create({
			animation: tl,
			trigger: this.container,
			start: 'center center',
			end: `+=${this.end}`,
			scrub: 0,
			pin: true,
			onUpdate: (self) => {
				const percent = self.progress.toFixed(3) * 100;

				this.line.style.width = `${percent}%`;
				this.toggleActiveMoB(percent, one, two, three, four);
			},
		});
	}

	toggleActiveMoB(percent, one, two, three, four) {
		if (percent > -1 && percent <= 12) {
			one.classList.add(this.data.active);
			this.removeActiveMob(one);
		} else if (percent > 12 && percent <= 35) {
			two.classList.add(this.data.active);
			this.removeActiveMob(two);
		} else if (percent > 35 && percent <= 70) {
			three.classList.add(this.data.active);
			this.removeActiveMob(three);
		} else if (percent > 70 && percent <= 100) {
			four.classList.add(this.data.active);
			this.removeActiveMob(four);
		}
	}

	removeActiveMob(step) {
		const othres = this.arrStepsMob.filter((el) => el !== step);
		for (const el of othres) {
			el.classList.remove('_active');
		}
	}
}

export function initStepsSolve() {
	const selector = document.querySelector('.js-steps-solve');
	new StepsSolve(selector);
}
