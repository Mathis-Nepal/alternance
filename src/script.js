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
const normalTexture = textureLoader.load("/textures/NormalMap.png");

const gltfLoaderForPhone = new GLTFLoader();
const gui = new dat.GUI();
const elementWebGl = document.getElementById("webgl");
let timeline = gsap.timeline();
const scene = new THREE.Scene();

gltfLoaderForPhone.load("assets/pop.gltf", (gltf) => {
	gltf.scene.scale.set(0.15, 0.15, 0.15);
	gltf.scene.rotation.set(0, 6, 0);
	scene.add(gltf.scene);
	gui.add(gltf.scene.rotation, "x").min(0).max(9);
	gui.add(gltf.scene.rotation, "y").min(0).max(9);
	gui.add(gltf.scene.rotation, "z").min(0).max(9);
	gui.add(pointLightForPhone.position, "x").min(0).max(9);
	gui.add(pointLightForPhone.position, "y").min(0).max(9);
	gui.add(pointLightForPhone.position, "z").min(0).max(9);
	timeline.to(gltf.scene.rotation, { y: 4.75, x: 0, z: 0, duration: 1 });
	timeline.to(gltf.scene.scale, { y: 0.12, x: 0.12, z: 0.12, duration: 1 }, "-=1");
	timeline.to(gltf.scene.position, { x: 0.5, duration: 1 }, "-=0.5");
});

// Lights
const pointLightForPhone = new THREE.AmbientLight(0xffffff, 1);
pointLightForPhone.position.x = 2;
pointLightForPhone.position.y = 3;
pointLightForPhone.position.z = 4;
scene.add(pointLightForPhone);

const sizesForPhone = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const sizesForSphere = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizesForSphere.width = window.innerWidth;
	sizesForPhone.height = window.innerHeight;

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
	sphere.scale.set(sizesForSphere.width * 0.0015, sizesForSphere.width * 0.0015, sizesForSphere.width * 0.0015);
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
const sphereGeometry = new THREE.SphereGeometry(0.2, 80, 80);
const material = new THREE.MeshStandardMaterial({
	color: 0x292929,
	metalness: 0.5,
	roughness: 0.2,
	// flatShading: true,
	normalMap: normalTexture,
});

const guiForSPhere = new dat.GUI();
const elementsphere = document.getElementById("sphere");
const sceneForSphere = new THREE.Scene();
console.log(sizesForSphere.width * 0.003);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.scale.set(sizesForSphere.width * 0.0015, sizesForSphere.width * 0.0015, sizesForSphere.width * 0.0015);

guiForSPhere.add(sphere.scale, "x").min(0).max(9);
guiForSPhere.add(sphere.scale, "y").min(0).max(9);
guiForSPhere.add(sphere.scale, "z").min(0).max(9);
guiForSPhere.add(sphere.rotation, "x").min(0).max(9);
guiForSPhere.add(sphere.rotation, "y").min(0).max(9);
guiForSPhere.add(sphere.rotation, "z").min(0).max(9);

sceneForSphere.add(sphere);

const pointLightForSphere = new THREE.PointLight(0xffffff, 1);
pointLightForSphere.position.x = 2;
pointLightForSphere.position.y = 3;
pointLightForSphere.position.z = 4;
sceneForSphere.add(pointLightForSphere);

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

const tick1 = () => {
	rendererForSphere.render(sceneForSphere, cameraForSphere);
	window.requestAnimationFrame(tick1);
	sphere.rotation.y -= 0.011;
	sphere.rotation.x -= 0.011;
};

tick1();
