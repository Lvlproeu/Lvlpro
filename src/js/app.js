import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';
import { initForms } from './modules/form';

import { initHeader } from './modules/header';
import { initPhoneMasks } from './modules/inputMask';
import { initMarquee } from './modules/marquee';
import { initPopups } from './modules/popup';
import { initSelects } from './modules/select';
import './modules/animationsScroll'
import { initTitleSlider } from "./modules/sliders/titleSlider";
import { initImageScale } from './modules/imageScale';
import { initStepsSolve } from './modules/stepsSolve';
import { initWeLoveBanner } from './modules/weLoveBanner';
import { initLatestProjects } from './modules/latestProjects';
import { initOverlayPage } from './modules/overlayPage';
import { initScrollObserver } from './modules/scrollObserver';

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


	initScrollObserver();

	// считается, что главная страница загрузилась, если видео может проигрываться
	const videoMainScreen = document.querySelector('.js-video-mainscreen');

	if (videoMainScreen) {
		window.videoMainScreen = videoMainScreen;

		const initMainscreen = function() {
			document.body.classList.add('_loaded');
			if (!window.preloader) {
				window.videoMainScreen.play();
				if (window.titleSlider) {
					window.titleSlider.swiperSlider.autoplay.start();
				}
			}
		}

		if (videoMainScreen.videoCanPlay) {
			initMainscreen();
		} else {
			const interval = setInterval(() => {
				if (videoMainScreen.videoCanPlay) {
					clearInterval(interval);
					initMainscreen();
				}
			}, 100);
		}
	} else {
		document.body.classList.add('_loaded');
	}
}

document.addEventListener('DOMContentLoaded', initModules);

window.addEventListener('loaderHide', () => {
	if (window.videoMainScreen) {
		if (window.videoMainScreen.videoCanPlay) {
			window.videoMainScreen.play();
		}
	}
	if (window.titleSlider) {
		window.titleSlider.swiperSlider.autoplay.start();
	}
});


