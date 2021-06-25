import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';
import * as THREE from '../three';
import * as TABLE from './table';
import * as Ball from './Ball';

















function createRay(position, name, color) {
    const loader = new GLTFLoader();
    loader.load('./Models/stick.glb', function(gltf) {
        var stick = gltf.scene;
        stick.position.set(position.x - 2, position.y + 0.5, position.z);
        stick.scale.set(1, 1, 1);
        stick.name = "stick";
        stick.rotation.y = -Math.PI / 2;
        //stick.rotation.x = 1.5;
        //scene.add(gltf.scene);
        return;

    }, undefined, function(error) {

        console.error(error);

    });

}