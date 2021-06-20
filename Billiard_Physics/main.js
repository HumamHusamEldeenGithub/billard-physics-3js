import * as THREE from './three';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls';
import Stats from './three/examples/jsm/libs/stats.module';
import * as Ball from './scripts/Ball.js';
import * as Table from './scripts/table';
import * as Movement from './scripts/movment';

var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    directionalLight = null,
    stats = null,
    ambientLight = null;



var SceneObjects = null;

async function init() {
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
    var button = document.createElement('button');
    button.innerHTML = "START";
    button.style = "position: absolute;right: 0;top:0;";
    button.onclick = start;
    document.body.appendChild(button);

    Table.tableLoader();
    createBalls();
}

async function start() {
    Movement.SceneObjects.get('white_ball').velocity = 0.1;
}

export async function changeVelocity(name, value) {
    Movement.SceneObjects.set(name, { reference: value.reference, velocity: value.velocity });
}

var animate = function() {

    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();

};

export async function render() {
    Movement.move();
    renderer.render(scene, camera);
}

export async function addToScene(name, obj) {
    scene.add(obj);
    console.log(scene.children);
}



function createBalls() {
    Ball.createBall({ x: -5, y: 0.3, z: 0 }, 'white_ball', 0xffffff);
    Ball.createBall({ x: 5, y: 0.3, z: 0 }, 'second_ball', 0xffffff);
}
// Ball.create8Balls(7, -0.8);

init();
animate();