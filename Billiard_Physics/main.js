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
    button.innerHTML = "HIT";
    button.style = "position: absolute;right: 0;top:0;padding:20px";
    button.onclick = start;
    document.body.appendChild(button);
    setSceneInputs();
    getSceneInputs();
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
    updateStickPosition();
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

function setSceneInputs() {
    var inputs = document.querySelector('.inputs-div').querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        switch (inputs[i].placeholder) {
            case 'BALL_RADIUS':
                inputs[i].value = Global.BALL_RADIUS;
                break;
            case 'BALL_MASS':
                inputs[i].value = Global.BALL_MASS;
                break;
            case 'POWER':
                inputs[i].value = Global.POWER;
                break;
            case 'STATIC_FRICTION_COEFFICIENT':
                inputs[i].value = Global.STATIC_FRICTION_COEFFICIENT;
                break;
            case 'KINETIC_FRICTION_COEFFICIENT':
                inputs[i].value = Global.KINETIC_FRICTION_COEFFICIENT;
                break;
            case 'GRAVITY':
                inputs[i].value = Global.GRAVITY;
                break;
            case 'THERMAL_ENERGY':
                inputs[i].value = Global.THERMAL_ENERGY;
                break;
            case 'WALL_LOSS_ENERGY':
                inputs[i].value = Global.WALL_LOSS_ENERGY;
                break;
        }
    }
}

function getSceneInputs() {
    var save = document.querySelector('#save-button');
    save.onclick = updateGlobalValues;
}

function updateGlobalValues() {
    var inputs = document.querySelector('.inputs-div').querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i].placeholder + "\t" + inputs[i].value);
        Global.setValue(inputs[i].placeholder, parseFloat(inputs[i].value));
    }
}
export async function start() {
    var white_ball = scene.getObjectByName("white-ball");
    var stick = scene.getObjectByName("stick");
    var rotation = stick.rotation.x != 0 ? Math.PI + stick.rotation.y : -stick.rotation.y;
    if (white_ball.v.x == 0 && white_ball.v.z == 0)
        hitBall(rotation, Global.POWER, white_ball);
}
export async function hitBall(angle, v, ball) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var newX = cos * v;
    var newZ = sin * v;
    ball.v = new THREE.Vector3(newX, 0, newZ);
}

export function createWorld() {
    tableLoader();
    createStick();
    createHols();
    createWalls();
    createBalls();

}

function createBalls() {
    createBall({ x: -15, y: 0.3, z: 0 }, 'white-ball', 0xffffff);
    create15Balls(18, -2.75);

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

    //top wall 1
    geometry = new THREE.BoxGeometry(24, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 12, -0.8, TABLE_DIMENSIONS.TOP);
    cube.name = 'topWall';
    cube.normalVector = new THREE.Vector3(0, 0, 1);
    scene.add(cube);
    //top wall mid
    geometry = new THREE.BoxGeometry(5, 2.5, 0.1);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 26, -0.8, TABLE_DIMENSIONS.TOP - 0.2);
    scene.add(cube);

    //top wall 2
    geometry = new THREE.BoxGeometry(24, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 40, -0.8, TABLE_DIMENSIONS.TOP);
    cube.name = 'topWall';
    cube.normalVector = new THREE.Vector3(0, 0, 1);
    scene.add(cube);

    //bottom wall 
    geometry = new THREE.BoxGeometry(24, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 12, -0.8, TABLE_DIMENSIONS.BOTTOM);
    cube.name = 'bottomWall1';
    cube.normalVector = new THREE.Vector3(0, 0, -1);
    scene.add(cube);

    //bottom wall mid
    geometry = new THREE.BoxGeometry(5, 2.5, 0.1);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 26, -0.8, TABLE_DIMENSIONS.BOTTOM + 0.2);
    scene.add(cube);

    //bottom wall 
    geometry = new THREE.BoxGeometry(24, 2.5, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT + 40, -0.8, TABLE_DIMENSIONS.BOTTOM);
    cube.name = 'bottomWall';
    cube.normalVector = new THREE.Vector3(0, 0, -1);
    scene.add(cube);
}

function createHols() {
    //top left 
    var geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    var sphere = new THREE.Mesh(geometry, material);
    sphere.name = "top-left-hole";
    sphere.position.set(TABLE_DIMENSIONS.LEFT, -0.74, TABLE_DIMENSIONS.TOP + 0.5);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);
    sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 4.0);
    scene.add(sphere);
    //bottom left 
    geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "bottom-left-hole";
    sphere.position.set(TABLE_DIMENSIONS.LEFT, -0.74, TABLE_DIMENSIONS.BOTTOM - 0.5);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);
    sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -0.7);
    scene.add(sphere);
    //top right 
    geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "top-right-hole";
    sphere.position.set(TABLE_DIMENSIONS.RIGHT, -0.74, TABLE_DIMENSIONS.TOP + 0.5);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);
    sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 2.53073);
    scene.add(sphere);
    //bottom right 
    geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "bottom-right-hole";
    sphere.position.set(TABLE_DIMENSIONS.RIGHT, -0.74, TABLE_DIMENSIONS.BOTTOM - 0.5);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);
    sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.7);
    scene.add(sphere);
    //top mid 
    geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "top-mid-hole";
    sphere.position.set(0, -0.74, TABLE_DIMENSIONS.TOP - 0.5);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);
    sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 3.14);
    scene.add(sphere);
    //bottom mid 
    geometry = new THREE.CircleGeometry(Global.HOLE_RADIUS, 32, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.side = THREE.DoubleSide;
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "top-mid-hole";
    sphere.position.set(0, -0.74, TABLE_DIMENSIONS.BOTTOM + 0.5);
    //sphere.position.set(0, 2, 0);
    sphere.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 1.57);

    scene.add(sphere);
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
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
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


function createStick() {
    const loader = new GLTFLoader();
    loader.load('./Models/stick.glb', function(gltf) {
        var stick = gltf.scene;
        stick.scale.set(5, 5, 5);
        stick.name = "stick";
        scene.add(gltf.scene);
        return;

    }, undefined, function(error) {

        console.error(error);

    });

}

function updateStickPosition() {
    var white_ball = scene.getObjectByName("white-ball");
    var stick = scene.getObjectByName("stick");
    if (!white_ball.v || !stick)
        return;
    if (white_ball.v.x != 0 || white_ball.v.z != 0)
        stick.visible = false;
    else {
        stick.visible = true;
        stick.position.set(white_ball.position.x, 0, white_ball.position.z);
    }
}

document.addEventListener('keydown', updateStickRotation);
var stickRotation = 0;

function updateStickRotation(e) {
    if (e.code == 'KeyW') {
        var stick = scene.getObjectByName("stick");
        stickRotation = 0.04;
        stick.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), stickRotation);
    }
    if (e.code == 'KeyS') {
        var stick = scene.getObjectByName("stick");
        stickRotation = -0.04;
        stick.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), stickRotation);
    }
}