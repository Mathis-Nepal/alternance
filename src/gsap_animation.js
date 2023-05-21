import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#status_automate", {
	scrollTrigger: {
		trigger: ".section_0",
		markers: true,
		start: "70% center",
		scrub: 2,
		endTrigger: ".section_1",
		end: "top center",
	},
	top: 500,
});
