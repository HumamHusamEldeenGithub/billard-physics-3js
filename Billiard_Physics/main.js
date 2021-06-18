import * as THREE from './three';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls';
import Stats from './three/examples/jsm/libs/stats.module';
import * as Ball from './scripts/Ball.js';
import * as Table from './scripts/table';

var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    directionalLight = null,
    stats = null,
    ambientLight = null;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    camera.position.y = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 10, 10)
    scene.add(directionalLight);

    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }, false);

    stats = Stats();
    document.body.appendChild(stats.dom);
}


var animate = function() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();
};

export function render() {
    renderer.render(scene, camera);
}


export function addToScene(obj) {
    scene.add(obj);
}

init();
animate();


Table.tableLoader();
Ball.create8Balls(7, -0.8);
Ball.createBall({ x: -5, y: 0, z: 0 }, 0xffffff);