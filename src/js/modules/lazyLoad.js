import LazyLoad from 'vanilla-lazyload';

export default function initLazyLoad() {
    new LazyLoad({
        elements_selector: '.lazyload',
    })
}