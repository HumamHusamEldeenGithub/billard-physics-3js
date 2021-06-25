import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
import * as MainScene from '../main';
import * as THREE from '../three';

export const TABLE_DIMENSIONS = {
    TOP: -12,
    RIGHT: 18,
    BOTTOM: 12,
    LEFT: -18
};

export function tableLoader() {
    const loader = new GLTFLoader();
    loader.load('./Models/plane.glb', function(gltf) {
        var table = gltf.scene;
        table.position.y = -0.22;
        table.scale.set(18, 1, 12);
        table.name = "table";
        MainScene.addToScene(gltf.scene);
        return;

    }, undefined, function(error) {

        console.error(error);

    });

}
export function createWalls() {
    //right wall 
    var geometry = new THREE.BoxGeometry(0.5, 1, 24);
    var material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.RIGHT, 0.2, 0);
    cube.name = 'rightWall';
    MainScene.addToScene(cube);

    //left wall 
    geometry = new THREE.BoxGeometry(0.5, 1, 24);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(TABLE_DIMENSIONS.LEFT, 0.2, 0);
    cube.name = 'leftWall';
    MainScene.addToScene(cube);

    //top wall 
    geometry = new THREE.BoxGeometry(36.5, 1, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.2, TABLE_DIMENSIONS.TOP);
    cube.name = 'topWall';
    MainScene.addToScene(cube);

    //bottom wall 
    geometry = new THREE.BoxGeometry(36.5, 1, 0.5);
    material = new THREE.MeshBasicMaterial({ color: 0x402000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.2, TABLE_DIMENSIONS.BOTTOM);
    cube.name = 'bottomWall';
    MainScene.addToScene(cube);
}