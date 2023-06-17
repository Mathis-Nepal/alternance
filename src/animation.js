import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// animation section_0 du point d'intérogation

gsap.to("#status_automate", {
	scrollTrigger: {
		trigger: ".section_0",
		start: "80% center",
		scrub: 2,
		endTrigger: ".section_1",
		end: "25% center",
	},
	top: 500,
});
let scrollNull = 0;
const body = document.querySelector("body");

addEventListener("scroll", function () {
	const scroll = window.scrollY;
	if (scroll === 0) {
		body.classList.remove("scroll_down");
		body.classList.remove("scroll_up");
	} else if (scroll > scrollNull) {
		body.classList.add("scroll_down");
		body.classList.remove("scroll_up");
	} else if (scroll < scrollNull) {
		body.classList.add("scroll_up");
		body.classList.remove("scroll_down");
	}

	scrollNull = scroll;
});
let titleAnimationTimeline = gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });

titleAnimationTimeline.to("#animation-title", {
	y: "0%",
	duration: 0.5,
	stagger: 0.5,
});
titleAnimationTimeline.to(".text-contain-part-title", {
	overflow: "visible",
});

const sections = [
	{ trigger: ".section_0", endTrigger: ".section_1" },
	{ trigger: ".section_1", endTrigger: ".section_2" },
	{ trigger: ".section_2", endTrigger: ".section_2-2" },
	{ trigger: ".section_2-2", endTrigger: ".section_3" },
];

sections.forEach((section, index) => {
	const animatedTitlePart = `.animated-title-part-${index + 1}`;
	const animatedTitlePartContainer = `.animated-title-container-${index + 1}`;
	let titleAnimationTimelineOnScroll = gsap.timeline({
		scrollTrigger: {
			trigger: section.trigger,
			start: "90% center",
			scrub: 2,
			endTrigger: section.endTrigger,
			end: "30% center",
			markers: true,
			// animation: titleAnimationTimelineOnScroll,
			// immediateRender: false,
		},
	});

	titleAnimationTimelineOnScroll.to(animatedTitlePart, {
		transform: "translateY(0)",
		opacity: 1,
		stagger: 0.5,
	});

	titleAnimationTimelineOnScroll.to(animatedTitlePartContainer, {
		overflow: "visible",
	});
});

//smooth scroll on click on element in navabar

function animationTitle(button) {
	var ancre = document.querySelector(button);
	ancre.scrollIntoView({
		behavior: "smooth",
	});
}

document.querySelector(".button-home").addEventListener("click", function () {
	animationTitle(".section_0");
});
document.querySelector(".button-about").addEventListener("click", function () {
	animationTitle(".section_1");
});
document.querySelector(".button-skills").addEventListener("click", function () {
	animationTitle(".section_2");
});
document.querySelector(".button-project").addEventListener("click", function () {
	animationTitle(".section_3");
});
