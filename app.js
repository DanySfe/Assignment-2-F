import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.scale.set(0.5, 0.5, 0.5); // Scale down the bee
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

// Make bee follow the mouse
document.addEventListener('mousemove', (event) => {
    if (bee) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        gsap.to(bee.position, {
            x: mouseX * 5,
            y: mouseY * 5,
            duration: 0.5,
            ease: "power1.out"
        });
    }
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Cyberpunk Scene
const cyberpunkScene = new THREE.Scene();
const cyberpunkRenderer = new THREE.WebGLRenderer({ alpha: true });
cyberpunkRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cyberpunkScene').appendChild(cyberpunkRenderer.domElement);

const cyberpunkLight = new THREE.PointLight(0x00ff99, 1, 100);
cyberpunkLight.position.set(50, 50, 50);
cyberpunkScene.add(cyberpunkLight);

const animateCyberpunk = () => {
    requestAnimationFrame(animateCyberpunk);
    cyberpunkRenderer.render(cyberpunkScene, camera);
};
animateCyberpunk();
