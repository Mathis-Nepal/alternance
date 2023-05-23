import "./scss/style.scss";
import "./phone_3D.js";
import Aos from "aos";
import "./animation.js";

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
main();
