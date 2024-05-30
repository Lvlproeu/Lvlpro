import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';
import { initForms } from './modules/form';

import { initHeader } from './modules/header';
import { initPhoneMasks } from './modules/inputMask';
import { initMarquee } from './modules/marquee';
import { initPopups } from './modules/popup';
import { initSelects } from './modules/select';
import './modules/animationsScroll';
import { initTitleSlider } from './modules/sliders/titleSlider';
import { initImageScale } from './modules/imageScale';
import { initStepsSolve } from './modules/stepsSolve';
import { initWeLoveBanner } from './modules/weLoveBanner';
import { initLatestProjects } from './modules/latestProjects';
import { initOverlayPage } from './modules/overlayPage';
import { initScrollObserver } from './modules/scrollObserver';

/**
 * Длительность оверлея открытия страницы. 
 * При изменении значения изменить длительность в стилях в классе .overlay-page и this.data.time в OverlayPage (overlayPage.js)
 */
const overlayPageAfterTime = 500;

const initMainscreen = function () {
	setTimeout(() => {
		if (!window.scrollObserver) {
			initScrollObserver();
		}
	}, overlayPageAfterTime);

	if (window.videoMainScreen) {
		window.videoMainScreen.play();
	}
	if (window.titleSlider) {
		window.titleSlider.swiperSlider.autoplay.start();
	}
};

function initModules() {
	initOverlayPage();
	initBodyLock();
	initHeader();
	initMarquee();
	initSelects();
	initPopups();
	initForms();
	initPhoneMasks();
	initTitleSlider();
	initImageScale();

	// scrollTrigger на странице услуги детальной
	initStepsSolve();
	initWeLoveBanner();
	initLatestProjects();

	const videoMainScreen = document.querySelector('.js-video-mainscreen');

	if (videoMainScreen) {
		window.videoMainScreen = videoMainScreen;
		if (videoMainScreen.videoCanPlay) {
			document.body.classList.add('_loaded');

			// Случай, если нету лоадера
			if (!window.preloader) {
				initMainscreen();
				document.body.classList.add('_hide-overlay-page-after');
			}
		} else {
			const interval = window.setInterval(() => {
				if (videoMainScreen.videoCanPlay) {
					clearInterval(interval);
					document.body.classList.add('_loaded');

					// Случай, если нету лоадера
					if (!window.preloader) {
						initMainscreen();
						document.body.classList.add('_hide-overlay-page-after');
					}
				}
			}, 100);
		}
	} else {
		document.body.classList.add('_loaded', '_hide-overlay-page-after');

		setTimeout(() => {
			if (!window.scrollObserver) {
				initScrollObserver();
			}
		}, overlayPageAfterTime);
	}
}

document.addEventListener('DOMContentLoaded', initModules);

// случай, если есть лоадер
window.addEventListener('loaderHide', () => {
	initMainscreen();
});
