import {Swiper} from "swiper/bundle";
import 'swiper/css';
import 'swiper/css/autoplay';

export default class TitleSlider {
    constructor() {
        this.slider = document.querySelector('.js-titles-slider');

        this.swiperSlider = null;
        this.init();
    }

    initSlider() {
        this.swiperSlider = new Swiper(this.slider, {
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 3000,
            },
            slidesPerView: 'auto',
            direction: 'vertical',
            spaceBetween: 20,
        });
    }

    init() {
        this.initSlider();
    }
}