import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('myCanvas') as HTMLCanvasElement,
});

//Texture Loader and Orbit Controls
const loader = new THREE.TextureLoader();
new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground texture
const groundTexture = loader.load(
  '/textures/leafy_grass_diff_4k.jpg'
);
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });

// Create a plane as the ground
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
scene.add(plane);

// Building texture
const buildingTexture = loader.load(
  '/textures/white_sandstone_blocks_02_diff_4k.jpg'
);
buildingTexture.wrapS = buildingTexture.wrapT = THREE.RepeatWrapping;
const buildingMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture });

// Create a building
const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
building.position.y = 5;  // Raise the building half its height to rest on the ground
scene.add(building);

// Roof texture
const roofTexture = loader.load(
  '/textures/red_slate_roof_tiles_01_diff_4k.jpg'
);
const roofMaterial = new THREE.MeshBasicMaterial({ map: roofTexture });

// Add a simple pyramid roof
const roofGeometry = new THREE.ConeGeometry(3, 2, 4);
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 10;  // Position the roof on top of the building
roof.rotation.y = Math.PI / 4;  // Align the roof's corners with the building
scene.add(roof);

// Adjust camera
camera.position.z = 20;
camera.position.y = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();