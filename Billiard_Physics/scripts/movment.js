import * as Collision from "./collision";
import * as MainScene from '../main';
import * as THREE from '../three';

const frection = 0.985;


export async function move() {
    var scene = await MainScene.getScene();
    scene.children.forEach(async(value, key) => {
        if (value.v) {

            value.v.multiplyScalar(frection);

            var oldPos = value.position.clone();

            Collision.checkCollision(key, value);

            if (Math.abs(value.v.x) < 0.001 && Math.abs(value.v.z) < 0.001) {
                value.v = new THREE.Vector3();
                return;
            }

            var newPos = value.position.clone().add(value.v.clone().multiplyScalar(1 / 100));
            var dis = newPos.clone().sub(oldPos);
            //                              ball radius
            var angleZ = dis.x / (2 * Math.PI * 1) * Math.PI;
            var angleX = dis.z / (2 * Math.PI * 1) * Math.PI;

            value.rotation.x += angleX < 0 ? -angleX : angleX;
            value.position.z = newPos.z;
            value.rotation.z += angleZ < 0 ? -angleZ : angleZ;
            value.position.x = newPos.x;
        }
    })
}