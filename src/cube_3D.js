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

let size;
let scale;

function resizing() {
	size = {
		width: container.clientWidth,
		height: container.clientHeight,
	};
	scale = Math.min(Math.max(size.width / 2600, minScale), maxScale);
}

const maxScale = 0.25;
const minScale = 0.17;
resizing();

GltfLoader.load("assets/cube/cube.gltf", (gltf) => {
	cube = gltf;
	gltf.scene.scale.set(scale, scale, scale);
	gltf.scene.rotation.set(0, 0.37, 3.13);
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
	resizing();
	cube.scene.scale.set(scale, scale, scale);
	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();
	renderer.setSize(size.width, size.height);
	renderer.render(scene, camera);
});
const animate = () => {
	controls.update();
	renderer.setSize(size.width, size.height);

	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
};

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

animate();
