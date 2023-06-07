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

// animation section_0 du point title
let titleAnimationTimeline = gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });

titleAnimationTimeline.to("#animation-title", {
	y: "0%",
	duration: 0.5,
	stagger: 0.5,
});
titleAnimationTimeline.to(".text-contain-part-title", {
	overflow: "visible",
});
