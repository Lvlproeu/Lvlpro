import '../scss/app.scss';

import { initHeader } from './modules/header';

function initModules() {
	initHeader();

	document.body.classList.add('_loaded');
}

document.addEventListener('DOMContentLoaded', initModules);
