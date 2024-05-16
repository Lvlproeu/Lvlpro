import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';
import { initForms } from './modules/form';

import { initHeader } from './modules/header';
import { initPhoneMasks } from './modules/inputMask';
import { initMarquee } from './modules/marquee';
import { initPopups } from './modules/popup';
import { initSelects } from './modules/select';
import './modules/animationsScroll'

function initModules() {
	initBodyLock();
	initHeader();
	initMarquee();
	initSelects();
	initPopups();
	initForms();
	initPhoneMasks();

	document.body.classList.add('_loaded');
}

document.addEventListener('DOMContentLoaded', initModules);
