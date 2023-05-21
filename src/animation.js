import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#status_automate", {
	scrollTrigger: {
		trigger: ".section_0",
		// markers: true,
		start: "70% center",
		scrub: 2,
		endTrigger: ".section_1",
		end: "top center",
	},
	top: 500,
});

let scrollNull = 0;
const body = document.querySelector("body");

addEventListener("scroll", function () {
	console.log(window.pageYOffset);
	const scroll = window.scrollY;
	// console.log(scroll);
	if (scroll === 0) {
		console.log("top");
		body.classList.remove("scroll_down");
		body.classList.remove("scroll_up");
	} else if (scroll > scrollNull) {
		body.classList.add("scroll_down");
		body.classList.remove("scroll_up");
		console.log("down");
	} else if (scroll < scrollNull) {
		console.log("up");
		body.classList.add("scroll_up");
		body.classList.remove("scroll_down");
	}

	scrollNull = scroll;
});
