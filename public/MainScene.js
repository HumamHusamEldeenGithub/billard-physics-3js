import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as Ball from './Ball.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 20;
camera.position.y = 30;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

const stats = Stats();
document.body.appendChild(stats.dom);

var animate = function() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
}
animate();



//Adding spheres to the scene 
scene.add(Ball.createBall({ x: 10, y: 0, z: 0 }, 0xff0000));
scene.add(Ball.createBall({ x: 0, y: 0, z: 0 }, 0x00ff00));
scene.add(Ball.createBall({ x: -10, y: 0, z: 0 }, 0xffff00));
scene.add(Ball.createBall({ x: 5, y: 0, z: 9 }, 0x0000ff));
scene.add(Ball.createBall({ x: -5, y: 0, z: 9 }, 0xff000ff));
scene.add(Ball.createBall({ x: 0, y: 0, z: 18 }, 0x00ffff));