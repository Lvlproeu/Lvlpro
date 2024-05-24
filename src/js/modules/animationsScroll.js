import gsap from 'gsap'
import  {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

const horizontalContainer = document.querySelectorAll('.horizontal-section');

horizontalContainer.forEach(horSec => {
    const tl = gsap.timeline();
    const horizontal1 = horSec.querySelector('.section-horizontal-1');
    const horizontal1Width = horizontal1.offsetWidth - window.innerWidth;
    const horizontal2 = horSec.querySelector('.section-horizontal-2');
    const horizontal2Width = horizontal2.offsetWidth + horizontal1Width;
    const vertical1 = horSec.querySelector('.section-vertical-1');
    const vertical2 = horSec.querySelector('.section-vertical-2');
    let end = null;
    end += horizontal1Width;
    end += horizontal2Width;
    end += window.innerWidth*2
    console.log(innerWidth*2 + horizontal2Width)
    tl.fromTo(horizontal1, {x: '0px'}, { x: -horizontal1Width})
        .fromTo(horizontal2, {x: '0px'}, { x: -horizontal2Width})
        .fromTo(vertical1, {x: -(window.innerWidth+horizontal2Width), y: '100%'}, { y: 0})
        .fromTo(vertical2, {x: -((window.innerWidth*2)+horizontal2Width), y: '100%'}, { y: 0})

    ScrollTrigger.create({
        animation: tl,
        trigger: horSec,
        start: 'center center',
        end: `+=${end}`,
        scrub: true,
        pin: true,
        markers: true,
    })
})