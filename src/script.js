import "./scss/style.scss";
import "./phone_3D.js";
import Aos from "aos";
import "./animation.js";

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
Aos.init();
