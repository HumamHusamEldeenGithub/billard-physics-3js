import * as THREE from '../three';
import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';
import { SceneObjects } from './movment';


export function createBall(position, name, color) {
    // const loader = new GLTFLoader();
    // loader.load('./Models/ball.glb', function(gltf) {
    //     var ball = gltf.scene;
    //     ball.position.set(position.x, position.y, position.z);
    //     ball.name = name;
    //     MainScene.addToScene(ball);

    // }, undefined, function(error) {

    //     console.error(error);

    // });
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = name;
    sphere.position.set(position.x, position.y, position.z);
    MainScene.addToScene(name, sphere);
    SceneObjects.set(name, { reference: sphere, velocity: 0 });
}


export function create8Balls(init_x, init_z) {
    var z_pos = init_z;
    var x_pos = init_x;


    for (var i = 0; i < 4; i++) {
        var newZ = z_pos + (0.44 * i);
        createBall({ x: x_pos, y: 0, z: newZ }, 0xffffff);
    }
    z_pos += 0.22;
    x_pos -= 0.44;
    for (var i = 0; i < 3; i++) {
        var newZ = z_pos + (0.44 * i);
        createBall({ x: x_pos, y: 0, z: newZ }, 0xffffff);
    }
    z_pos += 0.22;
    x_pos -= 0.44;
    for (var i = 0; i < 2; i++) {
        var newZ = z_pos + (0.44 * i);
        createBall({ x: x_pos, y: 0, z: newZ }, 0xffffff);
    }
    z_pos += 0.22;
    x_pos -= 0.44;
    createBall({ x: x_pos, y: 0, z: z_pos }, 0xffffff);

    MainScene.render();

}