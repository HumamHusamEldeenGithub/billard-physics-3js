import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';
import * as THREE from '../three/build/three';


export function tableLoader() {
    const loader = new GLTFLoader();
    loader.load('./Models/plane.glb', function(gltf) {
        var table = gltf.scene;
        table.position.y = -0.22;
        table.scale.set(9, 1, 6);
        MainScene.addToScene(gltf.scene);

    }, undefined, function(error) {

        console.error(error);

    });
}