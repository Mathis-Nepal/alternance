import "./scss/style.scss";
import "./phone_3D.js";
import Aos from "aos";
import "./animation.js";
import "./cube_3D.js";

function main() {
	loadingPage();
	Aos.init();
}

function loadingPage() {
	const loaderAnimation = document.querySelector(".loader");
	if (performance.now() > 500) {
		loaderAnimation.classList.toggle("active");
	}
	window.addEventListener("load", function () {
		const loaderContainer = document.querySelector(".loading_section");
		const body = document.querySelector("body");
		body.style.overflowY = "auto";
		loaderAnimation.classList.contains("active") ? loaderAnimation.classList.remove("active") : null;
		loaderContainer.classList.add("fondu_out");
		loaderContainer.style.display = "none";
	});
}

window.addEventListener("beforeunload", function () {
	localStorage.setItem("scrollPosition", window.scrollY);
});
window.addEventListener("load", function () {
	var scrollPosition = localStorage.getItem("scrollPosition");
	if (scrollPosition) {
		window.scrollTo(0, scrollPosition);
		localStorage.removeItem("scrollPosition"); // Supprimer la position enregistrée
	}
});

const blob = document.querySelector(".blob");
const blur = document.querySelector(".contain_all_section_2");

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
const ease = 0.15;

function moveBlob() {
	const diffX = targetX - currentX;
	const diffY = targetY - currentY;

	currentX += diffX * ease;
	currentY += diffY * ease;

	blob.style.left = `${currentX}px`;
	blob.style.top = `${currentY}px`;

	requestAnimationFrame(moveBlob);
}

blur.addEventListener("pointermove", (event) => {
	const { clientX, clientY } = event;
	const scrollY = window.scrollY;
	const maxX = blur.clientWidth;
	const maxY = blur.clientHeight;
	const blobWidth = blob.clientWidth;
	const blobHeight = blob.clientHeight;
	targetX = Math.min(Math.max(0, clientX - blobWidth / 3), maxX - blobWidth / 2);
	targetY = Math.min(Math.max(0, clientY - blobHeight / 3), maxY - blobHeight / 2) + scrollY;
	console.log(targetY);
});

moveBlob(); // Start the animation loop

// blur.onpointermove = (event) => {
// 	const { clientX, clientY } = event;
// 	const scrollY = window.scrollY;
// 	const maxX = blur.clientWidth;
// 	const left = Math.min(Math.max(0, clientX - blob.clientWidth / 2), maxX);

// 	console.log("oui");

// 	blob.animate(
// 		{
// 			// position: "absolute", // display: "block",
// 			left: `${left}px`,
// 			top: `${clientY + scrollY}px`,
// 		},
// 		{ duration: 3000, fill: "forwards" }
// 	);
// };

// blur.onwheel = (event) => {
// 	const { clientX, clientY } = event;
// 	const scrollY = window.scrollY;
// 	const maxX = blur.clientWidth;
// 	const left = Math.min(Math.max(0, clientX - blob.clientWidth / 2), maxX);

// 	console.log("nop");

// 	blob.animate(
// 		{
// 			// display: "block",
// 			// position: "absolute",
// 			left: `${left}px`,
// 			top: `${clientY + scrollY}px`,
// 		},
// 		{ duration: 3000, fill: "forwards" }
// 	);
// };

// document.body.onwheel = (event) => {
// 	// const scrollX = window.scrollX || window.pageXOffset;
// 	const scrollY = window.scrollY || window.pageYOffset;

// 	// blob.style.left = `${scrollX}px`;
// 	blob.style.top = `${scrollY}px`;
// };

// document.body.addEventListener("pointermove", (event) => {
// 	const { clientX, clientY } = event;

// 	blob.style.left = `${clientX}px`;
// 	blob.style.top = `${clientY}px`;
// });

// document.body.addEventListener("wheel", (event) => {
// 	const scrollX = window.scrollX || window.pageXOffset;
// 	const scrollY = window.scrollY || window.pageYOffset;

// 	blob.style.left = `${scrollX}px`;
// 	blob.style.top = `${scrollY}px`;
// });

main();
