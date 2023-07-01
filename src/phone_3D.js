import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let firstPhone;
let secondPhone;

gsap.registerPlugin(ScrollTrigger);
const gui = new dat.GUI();
const scenePhone = new THREE.Scene();

const firstPhoneLoader = new GLTFLoader();
let elementPhone = document.querySelector(".phone");
let timeline1 = gsap.timeline();
let body = document.querySelector("body");

// let bodyWidth = Math.max(body.clientWidth / 2.5, 100);

let sizeFirstPhone = {
	width: Math.max(body.clientWidth / 2.5, 350),
	height: elementPhone.clientHeight,
};

function bodyWidth() {
	sizeFirstPhone.width = Math.max(body.clientWidth / 2.5, 300);
	return sizeFirstPhone.width;
}

// var folderFirstPhone = gui.addFolder("PHONE 1");
firstPhoneLoader.load("assets/phone_1/phone_1.gltf", (gltf) => {
	firstPhone = gltf;
	gltf.scene.scale.set(0.25, 0.25, 0.25);
	gltf.scene.rotation.set(0, -1.5, 0);
	gltf.scene.position.set(0, 1, -0.3);
	// folderFirstPhone.add(gltf.scene.position, "x").min(-6).max(9).step(0.01);
	// folderFirstPhone.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	// folderFirstPhone.add(gltf.scene.position, "z").min(-6).max(9).step(0.01);
	// folderFirstPhone.add(gltf.scene.rotation, "x").min(-6).max(9).step(0.01);
	// folderFirstPhone.add(gltf.scene.rotation, "y").min(-6).max(9).step(0.01);
	// folderFirstPhone.add(gltf.scene.rotation, "z").min(-6).max(9).step(0.01);

	timeline1.to(gltf.scene.rotation, { y: -0.8, duration: 1 });
	timeline1.to(gltf.scene.position, { y: -0.4, duration: 1 }, "-=1");

	ScrollTrigger.create({
		trigger: ".section_3",
		start: "top center",
		scrub: 2,
		endTrigger: ".section_3",
		end: "center center",
		animation: timeline1,
	});

	scenePhone.add(gltf.scene);
});

const rendererFirstPhone = new THREE.WebGLRenderer({
	canvas: elementPhone,
	alpha: true,
});

const secondPhoneLoader = new GLTFLoader();
let timeline2 = gsap.timeline();

// var folderSecondPhone = gui.addFolder("PHONE 2");
secondPhoneLoader.load("assets/phone_2/phone_2.gltf", (gltf) => {
	secondPhone = gltf;
	gltf.scene.scale.set(0.25, 0.25, 0.25);
	gltf.scene.rotation.set(0, -0.5, 0);
	gltf.scene.position.set(0.35, -2, 0.1);
	// folderSecondPhone.add(gltf.scene.position, "x").min(-6).max(9).step(0.01);
	// folderSecondPhone.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	// folderSecondPhone.add(gltf.scene.position, "z").min(-6).max(9).step(0.01);
	// folderSecondPhone.add(gltf.scene.rotation, "x").min(-6).max(9).step(0.01);
	// folderSecondPhone.add(gltf.scene.rotation, "y").min(-6).max(9).step(0.01);
	// folderSecondPhone.add(gltf.scene.rotation, "z").min(-6).max(9).step(0.01);

	timeline2.to(gltf.scene.rotation, { y: -2.1, duration: 1 });
	timeline2.to(gltf.scene.position, { y: -0.65, duration: 1 }, "-=1");

	ScrollTrigger.create({
		trigger: ".section_3",
		start: "top center",
		scrub: 2,
		endTrigger: ".section_3",
		end: "center center",
		animation: timeline2,
	});

	scenePhone.add(gltf.scene);
});

const pointLightForSphereWhite = new THREE.AmbientLight(0xffffff, 1);
scenePhone.add(pointLightForSphereWhite);

const cameraPhone = new THREE.PerspectiveCamera(75, sizeFirstPhone.width / sizeFirstPhone.height, 0.1, 1000);
cameraPhone.position.x = 0;
cameraPhone.position.y = 0;
requestCameraPosition();
scenePhone.add(cameraPhone);

function requestCameraPosition() {
	const clientWidth = body.clientWidth;
	const minClientWidth = 900;
	const maxClientWidth = 1500;
	const minCameraPositionZ = 1.75;
	const maxCameraPositionZ = 1;

	const normalizedWidth = Math.min(Math.max(clientWidth, minClientWidth), maxClientWidth);
	const widthRange = maxClientWidth - minClientWidth;
	const positionZRange = maxCameraPositionZ - minCameraPositionZ;

	const normalizedPositionZ = ((normalizedWidth - minClientWidth) / widthRange) * positionZRange + minCameraPositionZ;

	cameraPhone.position.z = normalizedPositionZ;
}

window.addEventListener("resize", () => {
	sizeFirstPhone.width = Math.max(body.clientWidth / 2.5, 350);
	// console.log(bodyWidth);

	requestCameraPosition();

	cameraPhone.aspect = sizeFirstPhone.width / sizeFirstPhone.height;
	cameraPhone.updateProjectionMatrix();
	rendererFirstPhone.setSize(sizeFirstPhone.width, sizeFirstPhone.height);
	rendererFirstPhone.render(scenePhone, cameraPhone);
	rendererFirstPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const animate = () => {
	rendererFirstPhone.setSize(sizeFirstPhone.width, sizeFirstPhone.height);
	rendererFirstPhone.render(scenePhone, cameraPhone);
	window.requestAnimationFrame(animate);
};

rendererFirstPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));

animate();
