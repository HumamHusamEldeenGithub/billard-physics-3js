import * as THREE from '../three/build/three';
import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';


export function createBall(position, color) {
    const loader = new GLTFLoader();
    loader.load('./Models/ball.glb', function(gltf) {
        var ball = gltf.scene;
        ball.position.set(position.x, position.y, position.z);
        MainScene.addToScene(ball);

    }, undefined, function(error) {

        console.error(error);

    });
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