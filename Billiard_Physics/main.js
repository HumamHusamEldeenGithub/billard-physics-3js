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
    collision();
    move();

    renderer.render(scene, camera);
}


export function addToScene(obj) {
    scene.add(obj);
    console.log(scene);
}


var velocity = 0.2;
var frection = 0.002;
var moving_Ball = "white_ball";

function move() {
    var temp = scene.getObjectByName(moving_Ball);
    if (temp) {

        if (velocity > 0.00001) {
            temp.position.x += velocity;
            velocity -= frection;
        }
    }
}

init();
animate();


Table.tableLoader();
// Ball.create8Balls(7, -0.8);
// Ball.createBall({ x: -5, y: 0, z: 0 }, 'white_ball', 0xffffff);
var position = { x: -9, y: 0.3, z: 0 };
var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
sphere.name = "white_ball";
sphere.position.set(position.x, position.y, position.z);
scene.add(sphere);


var position = { x: -1, y: 0.3, z: 0 };
geometry = new THREE.SphereGeometry(0.5, 32, 32);
material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
sphere = new THREE.Mesh(geometry, material);
sphere.name = "second_ball";
sphere.position.set(position.x, position.y, position.z);
scene.add(sphere);




function collision() {
    var objs = scene.children;
    //console.log(objs);
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].name == "table") {
            continue;
        }
        var ball = objs[i];
        for (var j = 0; j < objs.length; j++) {
            if (ball.id != objs[j].id && objs[j].name != "table") {
                var pos = objs[j].position;
                var dis = pos.distanceTo(ball.position);
                //console.log(dis);
                if (dis < 1) {
                    moving_Ball = "second_ball";
                    //console.log(dis);
                }
            }

        }
    }
    // for (var vertexIndex = 0; vertexIndex < temp.geometry.vertices.length; vertexIndex++) {
    //     var localVertex = temp.geometry.vertices[vertexIndex].clone();
    //     var globalVertex = localVertex.applyMatrix4(temp.matrix);
    //     var directionVector = globalVertex.sub(temp.position);

    //     var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    //     var collisionResults = ray.intersectObjects(collidableMeshList);
    //     if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
    //         velocity = 0;
    // }
}





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