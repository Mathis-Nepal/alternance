import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let cube;
const container = document.querySelector(".cube_container");

const gui = new dat.GUI();
const scene = new THREE.Scene();

const GltfLoader = new GLTFLoader();
let element = document.querySelector(".cube");

gui.close();

let size = {
	width: element.clientWidth,
	height: element.clientHeight,
};

// let moddifyFirstWidth = sizeFirstPhone.width * 0.0004;

// var folderCube = gui.addFolder("CUBE");
GltfLoader.load("assets/cube/cube.gltf", (gltf) => {
	cube = gltf;
	gltf.scene.scale.set(0.25, 0.25, 0.25);
	gltf.scene.rotation.set(0, 0.37, 3.13);
	// gltf.scene.position.set(0, 0.47, -0.3);
	gltf.scene.position.set(0, 0, 0);
	gui.add(gltf.scene.position, "x").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.position, "y").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.position, "z").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.rotation, "x").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.rotation, "y").min(-6).max(9).step(0.01);
	gui.add(gltf.scene.rotation, "z").min(-6).max(9).step(0.01);

	scene.add(gltf.scene);
});

const renderer = new THREE.WebGLRenderer({
	canvas: element,
	alpha: true,
});

const pointLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;
controls.rotateSpeed = 0.25;

window.addEventListener("resize", () => {
	size.width = container.clientWidth;
	size.height = container.clientHeight;

	// moddifyFirstWidth = container_mockup.clientWidth * 0.0004;

	// if (container_mockup.clientWidth < 400) {
	// 	secondPhone.scene.position.z = -0.35;
	// 	firstPhone.scene.position.z = -0.75;
	// 	console.log(container_mockup.clientWidth);
	// } else {
	// 	secondPhone.scene.position.z = 0.1;
	// 	firstPhone.scene.position.z = -0.3;
	// }

	// console.log(moddifyFirstWidth);
	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();
	rendererFirstPhone.setSize(size.width, size.height);
	rendererFirstPhone.render(scene, camera);
});
const animate = () => {
	controls.update();
	renderer.setSize(size.width, size.height);

	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
};

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

animate();
