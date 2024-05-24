import gsap from 'gsap'
import  {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const tl = gsap.timeline();

const myFunction = function() {
    // console.log(this, this.targets);
}

const removeOthers = function(step) {
    if (step) {
        const othres = arrStepsSolve.filter((el) => el !== step);
        for (const el of othres) {
            el.parentNode.classList.remove('_active');
        }
    } else {
        one.parentNode.classList.remove('_active');
    }

}

const containerStepsSolve = document.querySelector('.js-steps-solve');
const stepsSolve = containerStepsSolve.querySelectorAll('.js-step-solve');
const arrStepsSolve = [...stepsSolve];
const width = stepsSolve[0].clientWidth;
const end = width * stepsSolve.length;

const tl = gsap.timeline({
    onComplete: myFunction,
    onUpdate: myFunction
    // repeat: 2,
    // repeatDelay: 1,
    // yoyo: true,
});

const one = stepsSolve[0];
const two = stepsSolve[1];
const three = stepsSolve[2];
const four = stepsSolve[3];

// gsap.fromTo(one, {opacity: '0'}, {
//      opacity: '1',
//      scrollTrigger: {
//         trigger: one,
//         start: 'top center',
//         end: `+=${height * 2}`,
//         scrub: true,
//      }
//     })

const line = containerStepsSolve.querySelector('.js-step-line');

tl
    .fromTo(one, {opacity: 0}, { opacity: 1})
    .to(one, {opacity: 0, duration: '0.2'})
    // .fromTo(one, {opacity: 1}, { opacity: 0})
    .fromTo(two, {opacity: 0}, { opacity: 1}, '-=0.2')
    .to(two, {opacity: 0, duration: '0.2'})
    // .fromTo(two, {opacity: 0}, { opacity: 1})
    .fromTo(three, {opacity: 0}, { opacity: 1}, '-=0.2')
    .to(three, {opacity: 0, duration: '0.2'})
    .fromTo(four, {opacity: 0}, { opacity: 1}, '-=0.2')

ScrollTrigger.create({
    animation: tl,
    trigger: containerStepsSolve,
    start: 'center center',
    end: `+=${end}`,
    scrub: 0,
    pin: true,
    markers: true,
    ease: 'none',
    onUpdate: (self) => {
        const percent = self.progress.toFixed(2) * 100;
        line.style.width = percent + '%';

        if (percent === 0) {
            removeOthers();
        } else if (percent > 0 && percent <= 25) {
            one.parentNode.classList.add('_active');
            removeOthers(one);
        } else if (percent > 25 && percent <= 50) {
            two.parentNode.classList.add('_active');
            removeOthers(two);
        } else if (percent > 50 && percent <= 75) {
            three.parentNode.classList.add('_active');
            removeOthers(three);
        } else if (percent > 75 && percent <= 100) {
            four.parentNode.classList.add('_active');
            removeOthers(four);
        }
    },
})
