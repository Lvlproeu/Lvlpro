import gsap from 'gsap'
import  {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// class MainPageAnimation {
//     constructor() {
//         this.container = document.querySelector('.horizontal-section');
//
//         this.videos = this.container.querySelector('.js-video-block');
//         this.videosRow = this.container.querySelector('.js-video-block__row');
//
//         this.whatWeDo = this.container.querySelector('.js-what-we-do');
//         this.whatWeDoRow = this.container.querySelector('.js-what-we-do__row');
//
//         if (this.container) {
//             this.init();
//         }
//     }
//
//     // swapSections() {
//     //     const tl = gsap.timeline();
//     //
//     //     tl.fromTo(
//     //         this.videosRow,
//     //         { x: '0' },
//     //         { x: '0', ease: 'none' }
//     //     ).fromTo(
//     //         this.whatWeDo,
//     //         { y: -100 },
//     //         { y: 0, ease: 'none' }
//     //     );
//     //
//     //     ScrollTrigger.create({
//     //         animation: tl,
//     //         trigger: this.container,
//     //         start: 'top top',
//     //         end: `+=${this.videosRow.clientWidth + this.videos.clientWidth}`,
//     //         scrub: false,
//     //         pin: true,
//     //         ease: 'none',
//     //         markers: true
//     //     });
//     // }
//
//     animVideoRow() {
//         const tl = gsap.timeline();
//
//         tl.fromTo(
//             this.videosRow,
//             { x: '0' },
//             { x: -this.videosRow.clientWidth + this.videos.clientWidth, ease: 'none' }
//         ).fromTo(
//             this.whatWeDo,
//             { y: -100 },
//             { y: 0, ease: 'none' }
//         );
//
//         ScrollTrigger.create({
//             animation: tl,
//             trigger: this.videos,
//             start: 'bottom bottom',
//             end: `+=${this.videosRow.clientWidth + this.videos.clientWidth}`,
//             scrub: true,
//             pin: true,
//             ease: 'none',
//             markers: true
//         });
//     }
//
//     // animWhatWeDo() {
//     //     const tl = gsap.timeline();
//     //
//     //     tl.fromTo(
//     //         this.whatWeDo,
//     //         { y: 100 },
//     //         { y: 0, ease: 'none' }
//     //     );
//     //
//     //     const instance = ScrollTrigger.create({
//     //         animation: tl,
//     //         trigger: this.whatWeDo,
//     //         start: 'top top',
//     //         scrub: false,
//     //         pin: true,
//     //         ease: 'none',
//     //         markers: true
//     //     });
//     // }
//
//     init() {
//         this.animVideoRow();
//     }
// }
//
// new MainPageAnimation()

const tl = gsap.timeline();

const horizontalContainer = document.querySelectorAll('.horizontal-section');

horizontalContainer.forEach(horSec => {
    const tl = gsap.timeline();
    const horizontal1 = horSec.querySelector('.section-horizontal-1');
    const horizontal1Video = horizontal1.querySelector('.section-horizontal-1__video');
    const horizontal1Width = horizontal1.offsetWidth - window.innerWidth;
    const horizontal2 = horSec.querySelector('.section-horizontal-2');
    const horizontal2Width = horizontal2.offsetWidth + horizontal1Width;
    const vertical1 = horSec.querySelector('.section-vertical-1');
    const vertical2 = horSec.querySelector('.section-vertical-2');
    const vertical3 = horSec.querySelector('.section-vertical-3');
    let end = null;
    end += horizontal1Width;
    end += horizontal2Width;
    end += window.innerWidth*2
    console.log(innerWidth*2 + horizontal2Width)
    tl.fromTo(horizontal1Video, {x: '0px'}, { x: -horizontal1Width})
        .fromTo(horizontal2, {x: '0px'}, { x: -horizontal2Width})
        .fromTo(vertical1, {x: -(window.innerWidth+horizontal2Width), y: '100%'}, { y: 0})
        .fromTo(vertical2, {x: -((window.innerWidth*2)+horizontal2Width), y: '100%'}, { y: 0})
        .fromTo(vertical3, {x: -((window.innerWidth*3)+horizontal2Width), y: '100%'}, { y: 0})

    ScrollTrigger.create({
        animation: tl,
        trigger: horSec,
        start: 'top top',
        end: () => "+="  + (horSec.offsetWidth * 2),
        scrub: 2,
        pin: true,
        markers: true,
    })
})
