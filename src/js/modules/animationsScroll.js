
//

//
//
// gsap.registerPlugin(ScrollTrigger);
//
// const tl = gsap.timeline();
// const scrollContainer = document.querySelector('.section-wrapper');
// if (scrollContainer) {
//     // const sections = scrollContainer.querySelectorAll('.section1');
//     //
//     // let fullWidth = null;
//     // sections.forEach(section => {
//     //     const widthSection = section.offsetWidth ;
//     //     fullWidth += widthSection;
//     // })
//     // fullWidth -= window.innerWidth
//     // tl.to(scrollContainer, {x: -fullWidth})
//     // tl.fromTo('.section-vertical', {x: '-100%', y: '+100%'}, {y: 0})
//     // tl.fromTo('.section-vertical2', {x: '-200%', y: '+200%'}, {y: 0})
//
//     ScrollTrigger.create({
//         animation: tl,
//         trigger: '.section-wrapper',
//         start: 'top top',
//         end: `+=4000`,
//         scrub: true,
//         pin: true
//     })
//
// }

import ScrollMagic from 'scrollmagic';
import '../../../node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min'


const controller = new ScrollMagic.Controller();

// define movement of panels
const wipeAnimation = new TimelineMax()
    .fromTo("section.panel.turqoise", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
    .fromTo("section.panel.green",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
    .fromTo("section.panel.bordeaux", 1, {y: "-100%"}, {y: "0%", ease: Linear.easeNone}); // in from top

// create scene to pin and link animation
new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "300%"
}).setPin("#pinContainer")
    .setTween(wipeAnimation)
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
