import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';

import { initHeader } from './modules/header';
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

	document.body.classList.add('_loaded');
}

document.addEventListener('DOMContentLoaded', initModules);
