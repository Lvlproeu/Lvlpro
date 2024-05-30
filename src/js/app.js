import '../scss/app.scss';
import initLazyLoad from './modules/lazyLoad';
import { initOverlayPage } from './modules/overlayPage';
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
import { initScrollObserver } from './modules/scrollObserver';

/**
 * Длительность оверлея открытия страницы. 
 * При изменении значения изменить длительность в стилях в классе .overlay-page и this.data.time в OverlayPage (overlayPage.js)
 */
const overlayPageAfterTime = 500;

const hideLoader = () => {
	window.preloaderLine.style.width = '100%';
	window.preloader.classList.add('_hide');
	document.body.classList.remove('_lock');
	document.body.style.paddingRight = '';
	setTimeout(() => {
		const event = new Event('loaderHide');
		window.dispatchEvent(event);
	}, 500);
}

const initMainscreen = function () {
	setTimeout(() => {
		initScrollObserver();
	}, overlayPageAfterTime);
	
	const videoMainScreen = document.querySelector('.js-video-mainscreen');
	if (videoMainScreen) {
		videoMainScreen.play();
	}
	if (window.titleSlider) {
		window.titleSlider.swiperSlider.autoplay.start();
	}
};

function initModules() {
	initLazyLoad();
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

	document.body.classList.add('_loaded', '_hide-overlay-page-after');

	if (window.preloader) {
		window.addEventListener('loaderHide', () => {
			initMainscreen();
		});
		
		if (window.preloader.canHide) {
			hideLoader();
		} else {
			setTimeout(() => {
				hideLoader();
			}, window.loaderTime * 4);
		}
	} else {
		initMainscreen();
	}
}

window.addEventListener('load', initModules);