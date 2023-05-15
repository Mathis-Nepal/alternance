function AnimatedText(target, texts, changeInterval, updateInterval, onTextChanged) {
	var currentText = parseInt(Math.random() * texts.length);
	var areaText = texts[0];
	this.t1 = setInterval(
		function () {
			var c = parseInt(Math.random() * Math.max(texts[currentText].length, areaText.length));
			var s = texts[currentText][c];
			if (typeof s == "undefined") s = " ";
			while (areaText.length < c) areaText += " ";
			var newText = (areaText.slice(0, c) + s + areaText.slice(c + 1)).trim();
			var diff = !(newText == areaText);
			areaText = newText;
			if (onTextChanged && diff) onTextChanged();
			target.innerHTML = areaText.length == 0 ? "&nbsp;" : areaText;
		}.bind(this),
		updateInterval ? updateInterval : 25
	);
	this.t2 = setInterval(
		function () {
			currentText = parseInt(Math.random() * texts.length);
		}.bind(this),
		changeInterval ? changeInterval : 2000
	);
}
AnimatedText.prototype = {
	constructor: AnimatedText,
	stop: function () {
		clearInterval(this.t1);
		clearInterval(this.t2);
	},
};

// const monelement = document.getElementById("inferieur_title");
// const inferieurTitle = "<h2> Web & mobile developper <h2/>";
// monelement.textContent = inferieurTitle;

const Status = document.getElementById("status_automate");
const scrollStatus = (event) => {
	Status.style.top = `${window.scrollY * 0.03}vh`;

	// const opacity = Math.max(0, 1 - window.scrollY * 0.002);
	// Status.style.opacity = opacity;
	// console.log(opacity);
	// console.log(Status.style.marginTop);
};

document.addEventListener("scroll", scrollStatus);

// new AnimatedText(document.getElementById("status_automate"), ["alternant ?", "developpeur ?", "creatif ?"]);
// new AnimatedText(document.getElementById("princpale_big_tile"), ["développeur", "étudiant", "en recherche d'alternance"]);
// new AnimatedText(document.getElementById("title_name"), ["//Coder", "//Developper", "//Mobile", "//Web"]);
