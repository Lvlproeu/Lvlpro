import AOS from 'aos';

function initAos() {
    AOS.init({
        startEvent: 'DOMContentLoaded',
        once: true,
    });
}

export default initAos;