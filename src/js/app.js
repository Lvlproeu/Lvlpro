import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';

import { initHeader } from './modules/header';
import { initMarquee } from './modules/marquee';

function initModules() {
	initBodyLock();
	initHeader();
	initMarquee();

	document.body.classList.add('_loaded');
}

document.addEventListener('DOMContentLoaded', initModules);
