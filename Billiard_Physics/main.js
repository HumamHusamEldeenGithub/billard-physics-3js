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
    move();
    renderer.render(scene, camera);
}


export function addToScene(obj) {
    scene.add(obj);
}


var velocity = 0.2;
var frection = 0.002;

function move() {
    var temp = scene.getObjectByName("white_ball");
    if (temp) {
        if (velocity > 0.001) {
            temp.position.x += velocity;
            velocity -= frection;
        }
    }
}

init();
animate();


Table.tableLoader();
Ball.create8Balls(7, -0.8);
Ball.createBall({ x: -5, y: 0, z: 0 }, 'white_ball', 0xffffff);



// function addKnot() {
//     var knot = new THREE.Mesh(
//         new THREE.TorusKnotGeometry(0.5, 0.1),
//         new MeshNormalMaterial({ Color: 0x000000 }));

//     var knotBSphere = new Sphere(
//         knot.position,
//         knot.geometry.boundingSphere.radius);

//     knot.scale.set(2, 2, 2);
//     knotBSphere.radius = knot.geometry.radius * 2;

//     scene.add(knotBSphere);
//     console.log(scene);
// }
// addKnot();