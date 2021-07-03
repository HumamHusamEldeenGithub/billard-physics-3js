import * as THREE from './three';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import Stats from './three/examples/jsm/libs/stats.module';
import * as Movement from './scripts/movment';
import * as Global from './scripts/Global';

export var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    directionalLight = null,
    stats = null,
    ambientLight = null;

const TABLE_DIMENSIONS = {
    TOP: -15,
    RIGHT: 26,
    BOTTOM: 15,
    LEFT: -26
};


async function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.y = 20;
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10)
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
    createWorld();
}


var animate = function() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();
};

export async function render() {
    Movement.move();
    //updateCameraPosition();
    renderer.render(scene, camera);
}

export async function addToScene(obj) {
    scene.add(obj);
}
export async function getScene() {
    return scene;
}

init();
animate();



export async function start() {
    var white_ball = scene.getObjectByName("white-ball");
    hitBall(5, 0.2, Global.POWER, white_ball);
}
export async function hitBall(x, z, v, ball) {
    // var vector = new THREE.Vector3();
    // camera.getWorldDirection(vector);
    var vector = new THREE.Vector3(1, 0, 0);
    var dx = vector.x - ball.position.x;
    var dz = vector.z - ball.position.z;
    var h = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2)));
    var sin = dz / h;
    var cos = dx / h;
    var newX = cos * v;
    var newZ = sin * v;
    ball.v = new THREE.Vector3(newX, 0, newZ);
}

export function createWorld() {
    tableLoader();
    createWalls();
    createBalls();

}

function createBalls() {
    createBall({ x: -15, y: 0.3, z: 0 }, 'white-ball', 0xffffff);
    create15Balls(18, -5);

}


export function tableLoader() {
    var geometry = new THREE.BoxGeometry(52, 0.1, 30);
    var material = new THREE.MeshBasicMaterial({ color: 0x00750c });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -0.8, 0);
    cube.name = 'table';
    cube.normalVector = new THREE.Vector3(-1, 0, 0);
    scene.add(cube);

}
export function createWalls() {
    //right wall 
    var geometry = new THREE.BoxGeometry(0.5, 2.5, 30);
    var material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.RIGHT, -0.8, 0);
    cube.name = 'rightWall';
    cube.normalVector = new THREE.Vector3(-1, 0, 0);
    scene.add(cube);

    //left wall 
    geometry = new THREE.BoxGeometry(0.5, 2.5, 30);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT, -0.8, 0);
    cube.name = 'leftWall';
    cube.normalVector = new THREE.Vector3(1, 0, 0);
    scene.add(cube);

    //top wall 
    geometry = new THREE.BoxGeometry(52, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -0.8, TABLE_DIMENSIONS.TOP);
    cube.name = 'topWall';
    cube.normalVector = new THREE.Vector3(0, 0, 1);
    scene.add(cube);

    //bottom wall 
    geometry = new THREE.BoxGeometry(52, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -0.8, TABLE_DIMENSIONS.BOTTOM);
    cube.name = 'bottomWall';
    cube.normalVector = new THREE.Vector3(0, 0, -1);
    scene.add(cube);
}


export function createBall(position, name, color) {
    const geometry = new THREE.SphereGeometry(Global.BALL_RADIUS, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        shininess: 140,
        reflectivity: 0.1,
        combine: THREE.AddOperation,
        flatShading: THREE.SmoothShading
    });
    var textureLoader = new THREE.TextureLoader();

    textureLoader.load('../assets/balls/' + name + '.png', function(tex) {
        material.map = tex;
        material.needsUpdate = true;
    });
    var sphere = new THREE.Mesh(geometry, material);

    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.name = name;
    sphere.position.set(position.x, position.y, position.z);
    sphere.v = new THREE.Vector3(0, 0, 0);
    sphere.rotateX(1.2);
    sphere.rotateZ(1);
    scene.add(sphere);
}


export function create15Balls(init_x, init_z) {
    var z_pos = init_z;
    var x_pos = init_x;

    var cnt = 1;
    for (var i = 0; i < 5; i++) {
        var newZ = z_pos + (Global.BALL_RADIUS * 2.1 * i);
        // createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += Global.BALL_RADIUS;
    x_pos -= Global.BALL_RADIUS * 2;
    for (var i = 0; i < 4; i++) {
        var newZ = z_pos + (Global.BALL_RADIUS * 2.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += Global.BALL_RADIUS;
    x_pos -= Global.BALL_RADIUS * 2;
    for (var i = 0; i < 3; i++) {
        var newZ = z_pos + (Global.BALL_RADIUS * 2.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += Global.BALL_RADIUS;
    x_pos -= Global.BALL_RADIUS * 2;
    for (var i = 0; i < 2; i++) {
        var newZ = z_pos + (Global.BALL_RADIUS * 2.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += Global.BALL_RADIUS;
    x_pos -= Global.BALL_RADIUS * 2;
    createBall({ x: x_pos, y: 0.3, z: z_pos }, cnt + "ball", 0xff0000);
}


function updateStickRotation() {
    var vector = new THREE.Vector3();
    camera.getWorldDirection(vector);
    var stick = scene.getObjectByName("stick");
    stick.rotation.x = vector.x;
}

function createRay() {
    // const loader = new GLTFLoader();
    // loader.load('./Models/stick.glb', function(gltf) {
    //     var stick = gltf.scene;
    //     stick.position.set(position.x - 2, position.y + 0.5, position.z);
    //     stick.scale.set(1, 1, 1);
    //     stick.name = "stick";
    //     stick.rotation.y = -Math.PI / 2;
    //     //stick.rotation.x = 1.5;
    //     //scene.add(gltf.scene);
    //     return;

    // }, undefined, function(error) {

    //     console.error(error);

    // });

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    cube.name = 'ray';
    scene.add(cube);

}

function updateCameraPosition() {

    var white_ball = scene.getObjectByName("white-ball");
    if (Math.abs(white_ball.v.x) > 0.01 || Math.abs(white_ball.v.z) > 0.01) {
        if (white_ball.position.distanceTo(camera.position) < 5) {
            camera.position.y = 5;
            var disX = white_ball.position.x - camera.position.x;
            var disZ = white_ball.position.z - camera.position.z;
            console.log(disX);
            if (disX > 1) {
                camera.position.x += 0.1;
            } else if (disX < 0.8) {
                camera.position.x -= 0.1;
            }
            if (disZ > 1) {
                camera.position.Z += 0.1;
            } else if (disZ < 0.8) {
                camera.position.x -= 0.1;
            }
        }
    }
}