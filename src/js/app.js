import '../scss/app.scss';
import { initBodyLock } from './modules/bodyLock';
import { initForms } from './modules/form';

import { initHeader } from './modules/header';
import { initMarquee } from './modules/marquee';
import { initPopups } from './modules/popup';
import { initSelects } from './modules/select';

function initModules() {
	initBodyLock();
	initHeader();
	initMarquee();
	initSelects();
	initPopups();
	initForms();

	document.body.classList.add('_loaded');
}

document.addEventListener('DOMContentLoaded', initModules);
