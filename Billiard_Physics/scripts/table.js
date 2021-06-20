import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';
import * as THREE from '../three/build/three';


export function tableLoader() {
    const loader = new GLTFLoader();
    loader.load('./Models/plane.glb', function(gltf) {
        var table = gltf.scene;
        table.position.y = -0.22;
        table.scale.set(12, 1, 8);
        table.name = "table";
        MainScene.addToScene("table", gltf.scene);
        return;

    }, undefined, function(error) {

        console.error(error);

    });
}