import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const firstPhoneLoader = new GLTFLoader();
const elementPhone = document.querySelector(".phone");
const gui = new dat.GUI();
const sceneFirstPhone = new THREE.Scene();

let timeline1 = gsap.timeline();

var folderFirstPhone = gui.addFolder("PHONE 1");
firstPhoneLoader.load("assets/phone_1/phone_1.gltf", (gltf) => {
	gltf.scene.scale.set(moddifyFirstWidth, moddifyFirstWidth, moddifyFirstWidth);
	gltf.scene.rotation.set(0, -1.5, 0);
	gltf.scene.position.set(0, 1, -0.3);
	folderFirstPhone.add(gltf.scene.position, "x").min(-6).max(9).step(0.01);
	folderFirstPhone.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	folderFirstPhone.add(gltf.scene.position, "z").min(-6).max(9).step(0.01);
	folderFirstPhone.add(gltf.scene.rotation, "x").min(-6).max(9).step(0.01);
	folderFirstPhone.add(gltf.scene.rotation, "y").min(-6).max(9).step(0.01);
	folderFirstPhone.add(gltf.scene.rotation, "z").min(-6).max(9).step(0.01);

	timeline1.to(gltf.scene.rotation, { y: -0.8, duration: 1 });
	timeline1.to(gltf.scene.position, { y: -0.4, duration: 1 }, "-=1");

	ScrollTrigger.create({
		trigger: ".section_3",
		start: "top center",
		markers: true,
		scrub: 2,
		endTrigger: ".section_3",
		end: "center center",
		animation: timeline1,
	});

	window.addEventListener("resize", () => {
		gltf.scene.scale.set(moddifyFirstWidth, moddifyFirstWidth, moddifyFirstWidth);
	});

	sceneFirstPhone.add(gltf.scene);
});

let sizeFirstPhone = {
	width: elementPhone.clientWidth,
	height: elementPhone.clientHeight,
};

// const moddifyFirstWidth = Math.min(sizeFirstPhone.width * 0.0004, 0.25);
let moddifyFirstWidth = sizeFirstPhone.width * 0.0004;
console.log(moddifyFirstWidth);

const pointLightForSphereWhite = new THREE.AmbientLight(0xffffff, 1);
sceneFirstPhone.add(pointLightForSphereWhite);

const cameraFirstPhone = new THREE.PerspectiveCamera(75, sizeFirstPhone.width / sizeFirstPhone.height, 0.1, 1000);
cameraFirstPhone.position.x = 0;
cameraFirstPhone.position.y = 0;
cameraFirstPhone.position.z = 1;
sceneFirstPhone.add(cameraFirstPhone);

const rendererFirstPhone = new THREE.WebGLRenderer({
	canvas: elementPhone,
	alpha: true,
});

const secondPhoneLoader = new GLTFLoader();
const elementSecondPhone = document.querySelector(".phone_2");
const sceneSecondPhone = new THREE.Scene();

let timeline2 = gsap.timeline();

var folderSecondPhone = gui.addFolder("PHONE 2");
secondPhoneLoader.load("assets/phone_2/phone_2.gltf", (gltf) => {
	gltf.scene.scale.set(moddifySecondWidth, moddifySecondWidth, moddifySecondWidth);
	gltf.scene.rotation.set(0, -0.5, 0);
	gltf.scene.position.set(0.35, -2, 0.1);
	folderSecondPhone.add(gltf.scene.position, "x").min(-6).max(9).step(0.01);
	folderSecondPhone.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	folderSecondPhone.add(gltf.scene.position, "z").min(-6).max(9).step(0.01);
	folderSecondPhone.add(gltf.scene.rotation, "x").min(-6).max(9).step(0.01);
	folderSecondPhone.add(gltf.scene.rotation, "y").min(-6).max(9).step(0.01);
	folderSecondPhone.add(gltf.scene.rotation, "z").min(-6).max(9).step(0.01);

	timeline2.to(gltf.scene.rotation, { y: -2.1, duration: 1 });
	timeline2.to(gltf.scene.position, { y: -0.65, duration: 1 }, "-=1");

	ScrollTrigger.create({
		trigger: ".section_3",
		start: "top center",
		markers: true,
		scrub: 2,
		endTrigger: ".section_3",
		end: "center center",
		animation: timeline2,
	});

	sceneSecondPhone.add(gltf.scene);
});

let sizeSecondPhone = {
	width: elementSecondPhone.clientWidth,
	height: elementSecondPhone.clientHeight,
};
const moddifySecondWidth = Math.min(sizeSecondPhone.width * 0.0004, 0.25);

const pointLightForSphereWhite2 = new THREE.AmbientLight(0xffffff, 1);
sceneSecondPhone.add(pointLightForSphereWhite2);

const cameraSecondPhone = new THREE.PerspectiveCamera(75, sizeSecondPhone.width / sizeSecondPhone.height, 0.1, 1000);
cameraSecondPhone.position.x = 0;
cameraSecondPhone.position.y = 0;
cameraSecondPhone.position.z = 1;
sceneSecondPhone.add(cameraSecondPhone);

const rendererSecondPhone = new THREE.WebGLRenderer({
	canvas: elementSecondPhone,
	alpha: true,
});

window.addEventListener("resize", () => {
	sizeFirstPhone.width = elementPhone.clientWidth;
	sizeFirstPhone.height = elementPhone.clientHeight;

	sizeSecondPhone.width = elementSecondPhone.clientWidth;
	sizeSecondPhone.height = elementSecondPhone.clientHeight;

	// firstPhoneModel.scale.set(moddifyFirstWidth, moddifyFirstWidth, moddifyFirstWidth);
	// secondPhoneLoader.scale.set(moddifySecondWidth, moddifySecondWidth, moddifySecondWidth);
	// console.log("wesh $elementPhone.clientWidth");
});

const animate = () => {
	rendererSecondPhone.render(sceneSecondPhone, cameraSecondPhone);
	rendererFirstPhone.render(sceneFirstPhone, cameraFirstPhone);
	window.requestAnimationFrame(animate);
};
rendererSecondPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));
rendererFirstPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));

rendererFirstPhone.setSize(sizeFirstPhone.width, sizeFirstPhone.height);
rendererSecondPhone.setSize(sizeSecondPhone.width, sizeSecondPhone.height);

animate();
