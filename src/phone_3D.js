import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let firstPhone;
let secondPhone;
const container_mockup = document.querySelector(".container_mockup");

gsap.registerPlugin(ScrollTrigger);
const gui = new dat.GUI();
const scenePhone = new THREE.Scene();

const firstPhoneLoader = new GLTFLoader();
let elementPhone = document.querySelector(".phone");
let timeline1 = gsap.timeline();

let sizeFirstPhone = {
	width: elementPhone.clientWidth,
	height: elementPhone.clientHeight,
};

let moddifyFirstWidth = sizeFirstPhone.width * 0.0004;

var folderFirstPhone = gui.addFolder("PHONE 1");
firstPhoneLoader.load("assets/phone_1/phone_1.gltf", (gltf) => {
	firstPhone = gltf;
	gltf.scene.scale.set(0.25, 0.25, 0.25);
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

	scenePhone.add(gltf.scene);
});

const rendererFirstPhone = new THREE.WebGLRenderer({
	canvas: elementPhone,
	alpha: true,
});

const secondPhoneLoader = new GLTFLoader();
let timeline2 = gsap.timeline();

var folderSecondPhone = gui.addFolder("PHONE 2");
secondPhoneLoader.load("assets/phone_2/phone_2.gltf", (gltf) => {
	secondPhone = gltf;
	gltf.scene.scale.set(0.25, 0.25, 0.25);
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

	scenePhone.add(gltf.scene);
});

const pointLightForSphereWhite = new THREE.AmbientLight(0xffffff, 1);
scenePhone.add(pointLightForSphereWhite);

const cameraPhone = new THREE.PerspectiveCamera(75, sizeFirstPhone.width / sizeFirstPhone.height, 0.1, 1000);
cameraPhone.position.x = 0;
cameraPhone.position.y = 0;
cameraPhone.position.z = 1;
scenePhone.add(cameraPhone);

window.addEventListener("resize", () => {
	sizeFirstPhone.width = container_mockup.clientWidth;
	sizeFirstPhone.height = container_mockup.clientHeight;

	moddifyFirstWidth = container_mockup.clientWidth * 0.0004;

	if (container_mockup.clientWidth < 400) {
		secondPhone.scene.position.z = -0.35;
		firstPhone.scene.position.z = -0.75;
	} else {
		secondPhone.scene.position.z = 0.1;
		firstPhone.scene.position.z = -0.3;
	}

	
	cameraPhone.aspect = sizeFirstPhone.width / sizeFirstPhone.height;
	cameraPhone.updateProjectionMatrix();
	rendererFirstPhone.setSize(sizeFirstPhone.width, sizeFirstPhone.height);
	rendererFirstPhone.render(scenePhone, cameraPhone);
});

const animate = () => {
	rendererFirstPhone.setSize(sizeFirstPhone.width, sizeFirstPhone.height);

	rendererFirstPhone.render(scenePhone, cameraPhone);
	window.requestAnimationFrame(animate);
};

rendererFirstPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));

animate();
