import * as Collision from "./collision";
import * as MainScene from '../main';
import * as THREE from '../three';

const frection = 0.985;


export async function move() {
    var scene = await MainScene.getScene();
    scene.children.forEach(async(value, key) => {
        if (value.v) {
            value.v.multiplyScalar(frection);
            Collision.checkCollision(key, value);
            if (Math.abs(value.v.x) < 0.001 && Math.abs(value.v.z) < 0.001) {
                value.v = new THREE.Vector3();
                return;
            }
            var newPos = value.position.clone().add(value.v.clone().multiplyScalar(1 / 100));
            value.position.set(newPos.x, 0.3, newPos.z);
            value.rotation.set(newPos.x, 0.3, newPos.z);
        }
    })
}