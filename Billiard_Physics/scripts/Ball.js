import * as THREE from '../three';
import * as MainScene from '../main';


export const BALL = {
    DIMATER: 1
};

export function createBall(position, name, color) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        shininess: 140,
        reflectivity: 0.1,
        combine: THREE.AddOperation,
        shading: THREE.SmoothShading
    });
    var textureLoader = new THREE.TextureLoader();
    console.log(name);
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
    MainScene.addToScene(sphere);
}


export function create8Balls(init_x, init_z) {
    var z_pos = init_z;
    var x_pos = init_x;

    var cnt = 1;
    for (var i = 0; i < 5; i++) {
        var newZ = z_pos + (1.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += 0.5;
    x_pos -= 1;
    for (var i = 0; i < 4; i++) {
        var newZ = z_pos + (1.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += 0.5;
    x_pos -= 1;
    for (var i = 0; i < 3; i++) {
        var newZ = z_pos + (1.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += 0.5;
    x_pos -= 1;
    for (var i = 0; i < 2; i++) {
        var newZ = z_pos + (1.1 * i);
        createBall({ x: x_pos, y: 0.3, z: newZ }, cnt + "ball", 0xff0000);
        cnt++;
    }
    z_pos += 0.5;
    x_pos -= 1;
    createBall({ x: x_pos, y: 0.3, z: z_pos }, cnt + "ball", 0xff0000);


}