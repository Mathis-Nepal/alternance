import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".status_automate", {
	scrollTrigger: {
		trigger: ".status_automate",
		markers: true,
		start: "bottom center",
		scrub: 2,
		end: "+=500",
	},
	top: 450,
});
