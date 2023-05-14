import "./scss/style.scss";
// import "./style.css";
import Aos from "aos";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import "./app.js";
// import Aos from "aos";

//loadng
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap (9).png");

const gltfLoaderForPhone = new GLTFLoader();
const gui = new dat.GUI();
const elementWebGl = document.getElementById("webgl");
let timeline = gsap.timeline();
const scene = new THREE.Scene();

gltfLoaderForPhone.load("assets/olo/Iphone.gltf", (gltf) => {
	// gltf.scene.scale.set(0.15, 0.15, 0.15);
	gltf.scene.scale.set(sizesForPhone.width * 0.001, sizesForPhone.width * 0.001, sizesForPhone.width * 0.001);
	gltf.scene.rotation.set(0, 6, 0);
	gltf.scene.position.set(-1, -0.34, 0);
	scene.add(gltf.scene);
	gui.add(gltf.scene.position, "x").min(-6).max(9);
	gui.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.position, "z").min(-6).max(9);
	gui.add(gltf.scene.rotation, "x").min(0).max(9);
	gui.add(gltf.scene.rotation, "y").min(0).max(9);
	gui.add(gltf.scene.rotation, "z").min(0).max(9);
	// gui.add(pointLightForPhone.position, "x").min(0).max(9);
	// gui.add(pointLightForPhone.position, "y").min(0).max(9);
	// gui.add(pointLightForPhone.position, "z").min(0).max(9);
	timeline.to(gltf.scene.rotation, { y: 4.75, x: 0, z: 0, duration: 1 });
	timeline.to(
		gltf.scene.scale,
		{ y: sizesForPhone.width * 0.00035, x: sizesForPhone.width * 0.00035, z: sizesForPhone.width * 0.00035, duration: 1 },
		"-=1"
	);
	timeline.to(gltf.scene.position, { x: -0.2, y: -0.34, z: 0, duration: 1 }, "-=0.5");
});

// Lights
const pointLightForPhone = new THREE.PointLight(0xffffff, 2);
pointLightForPhone.position.set(0.7, 0.6, 0.35);
pointLightForPhone.intensity = 0.5;

var folderLightPhone = gui.addFolder("Light-Phone");
folderLightPhone.add(pointLightForPhone.position, "x").min(0).max(9);
folderLightPhone.add(pointLightForPhone.position, "y").min(0).max(9);
folderLightPhone.add(pointLightForPhone.position, "z").min(0).max(9);
folderLightPhone.add(pointLightForPhone, "intensity").min(0).max(9);
scene.add(pointLightForPhone);

const HelperLightPhone = new THREE.PointLightHelper(pointLightForPhone, 0.2);
scene.add(HelperLightPhone);

const sizesForPhone = {
	width: window.innerWidth / 2,
	height: window.innerHeight,
};

const sizesForSphere = {
	width: window.innerWidth * 0.5,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizesForSphere.height = window.innerHeight;
	sizesForSphere.width = window.innerWidth / 2;
	sizesForPhone.height = window.innerHeight;
	sizesForPhone.width = window.innerWidth / 2;

	// Update camera
	cameraForPhone.aspect = sizesForPhone.width / sizesForPhone.height;
	cameraForPhone.updateProjectionMatrix();

	cameraForSphere.aspect = sizesForSphere.width / sizesForSphere.height;
	cameraForSphere.updateProjectionMatrix();

	// Update renderer
	rendererForPhone.setSize(sizesForPhone.width, sizesForPhone.height);
	rendererForPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	rendererForSphere.setSize(sizesForSphere.width, sizesForSphere.height);
	rendererForSphere.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	//gltfLoaderForPhone.load.scene.scale.set(sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022);
	// gltfLoaderForPhone.load.scene.scale.set(sizesForPhone.width * 0.001, sizesForPhone.width * 0.001, sizesForPhone.width * 0.001);
	sphere.scale.set(sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022);
});

const cameraForPhone = new THREE.PerspectiveCamera(75, sizesForPhone.width / sizesForPhone.height, 0.1, 100);
cameraForPhone.position.x = 0;
cameraForPhone.position.y = 0;
cameraForPhone.position.z = 1;
scene.add(cameraForPhone);

const rendererForPhone = new THREE.WebGLRenderer({
	canvas: elementWebGl,
	alpha: true,
});
rendererForPhone.setSize(sizesForPhone.width, sizesForPhone.height);
rendererForPhone.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
	rendererForPhone.render(scene, cameraForPhone);
	window.requestAnimationFrame(tick);
};

tick();
Aos.init();

// const gltfLoaderForSphere = new GLTFLoader();
const sphereGeometry = new THREE.SphereGeometry(0.2, 64, 64);
const material = new THREE.MeshStandardMaterial({
	color: 0x232323,
	metalness: 0.6,
	roughness: 0.2,
	normalMap: normalTexture,
});

const guiForSPhere = new dat.GUI();
const elementsphere = document.getElementById("sphere");
const sceneForSphere = new THREE.Scene();

guiForSPhere.close();

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.scale.set(sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022, sizesForSphere.width * 0.0022);
// sphere.rotation.z = 0.5;

// guiForSPhere.add(sphere.scale, "x").min(0).max(9);
// guiForSPhere.add(sphere.scale, "y").min(0).max(9);
// guiForSPhere.add(sphere.scale, "z").min(0).max(9);
// guiForSPhere.add(sphere.rotation, "x").min(0).max(9);
// guiForSPhere.add(sphere.rotation, "y").min(0).max(9);
// guiForSPhere.add(sphere.rotation, "z").min(-6).max(9).step(0.1);

gui.close();
sceneForSphere.add(sphere);

const pointLightForSphereWhite = new THREE.PointLight(0xffffff, 1);
pointLightForSphereWhite.position.set(-3, -0.5, 2.2);
pointLightForSphereWhite.intensity = 3;

var folderSphereWhiteLight = guiForSPhere.addFolder("White-Light");
folderSphereWhiteLight.add(pointLightForSphereWhite, "intensity").min(-6).max(9).step(0.1);
folderSphereWhiteLight.add(pointLightForSphereWhite.position, "x").min(-6).max(9).step(0.1);
folderSphereWhiteLight.add(pointLightForSphereWhite.position, "y").min(-6).max(9).step(0.1);
folderSphereWhiteLight.add(pointLightForSphereWhite.position, "z").min(-6).max(9).step(0.1);
sceneForSphere.add(pointLightForSphereWhite);

const pointLightForSphereRed = new THREE.PointLight(0xaf23f8, 1);
pointLightForSphereRed.position.set(7, 4.5, -2.6);
pointLightForSphereRed.intensity = 7;

var folderSphereRedLight = guiForSPhere.addFolder("Red-Light");
folderSphereRedLight.add(pointLightForSphereRed, "intensity").min(-6).max(9).step(0.1);
folderSphereRedLight.add(pointLightForSphereRed.position, "x").min(-6).max(9).step(0.1);
folderSphereRedLight.add(pointLightForSphereRed.position, "y").min(-6).max(9).step(0.1);
folderSphereRedLight.add(pointLightForSphereRed.position, "z").min(-6).max(9).step(0.1);
sceneForSphere.add(pointLightForSphereRed);

const HelperLightPhoneWhite = new THREE.PointLightHelper(pointLightForSphereWhite, 0.2);
sceneForSphere.add(HelperLightPhoneWhite);
const HelperLightPhoneRed = new THREE.PointLightHelper(pointLightForSphereRed, 0.2);
sceneForSphere.add(HelperLightPhoneRed);

const cameraForSphere = new THREE.PerspectiveCamera(75, sizesForSphere.width / sizesForSphere.height, 0.1, 100);
cameraForSphere.position.x = 0;
cameraForSphere.position.y = 0;
cameraForSphere.position.z = 1;
sceneForSphere.add(cameraForSphere);
const rendererForSphere = new THREE.WebGLRenderer({
	canvas: elementsphere,
	alpha: true,
});
rendererForSphere.setSize(sizesForSphere.width, sizesForSphere.height);
rendererForSphere.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

const scrollSphere = (event) => {
	sphere.position.y = window.scrollY * 0.0005;
};

const FirstLastName = document.getElementById("first_last_name");

const scrollTitle = (event) => {
	FirstLastName.style.top = `${window.scrollY * 0.08}px`;
	console.log(window.scrollY * 0.0005);
};

document.addEventListener("scroll", scrollSphere);
document.addEventListener("scroll", scrollTitle);

const clock = new THREE.Clock();

const tick1 = () => {
	const elapsedTime = clock.getElapsedTime();
	sphere.rotation.y = 0.5 * elapsedTime;
	// sphere.rotation.z = 0.3 * elapsedTime;
	// sphere.rotation.x = 0.4 * elapsedTime;
	targetX = mouseX * 0.0012;
	targetY = mouseY * 0.0012;

	sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
	sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
	sphere.position.z += -0.02 * (targetY - sphere.rotation.x);
	rendererForSphere.render(sceneForSphere, cameraForSphere);
	window.requestAnimationFrame(tick1);
};

tick1();
