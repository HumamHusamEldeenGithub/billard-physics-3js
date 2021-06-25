import * as MainScene from "../main";
import * as Movement from "./movment";
import * as THREE from '../three';
import { TABLE_DIMENSIONS } from "./table";


var thermalEnergy = 0.95;

export async function checkCollision(name, ball) {
    var one = true;
    var scene = await MainScene.getScene();
    var list = [];
    scene.children.forEach(async(value2, key2) => {
        if (key2 != name && value2.v) {
            try {
                var ball1_pos = ball.position.clone().add(ball.v.clone().multiplyScalar(1 / 100));
                var ball2_pos = value2.position.clone().add(value2.v.clone().multiplyScalar(1 / 100));

                var dis = ball2_pos.distanceTo(ball1_pos);

                if (dis < 1) {

                    var normalVector = new THREE.Vector3();

                    normalVector.subVectors(ball2_pos, ball1_pos);

                    //TODO : set the ball diameter var 
                    var mtd = normalVector.clone().multiplyScalar((0.5 - dis) / dis);
                    ball.position.add(mtd.clone().multiplyScalar(0.1));
                    value2.position.sub(mtd.clone().multiplyScalar(0.1));

                    normalVector.normalize();

                    var ut = new THREE.Vector3(-normalVector.z, normalVector.y, normalVector.x);

                    var v1n = normalVector.dot(ball.v);
                    var v1t = ut.dot(ball.v);
                    var v2n = normalVector.dot(value2.v);
                    var v2t = ut.dot(value2.v);

                    var v1nTag = v2n;
                    var v2nTag = v1n;

                    v1nTag = normalVector.clone().multiplyScalar(v1nTag);
                    var v1tTag = ut.clone().multiplyScalar(v1t);
                    v2nTag = normalVector.clone().multiplyScalar(v2nTag);
                    var v2tTag = ut.clone().multiplyScalar(v2t);

                    ball.v = v1nTag.add(v1tTag);
                    value2.v = v2nTag.add(v2tTag);
                    ball.v.multiplyScalar(thermalEnergy);
                    value2.v.multiplyScalar(thermalEnergy);
                    console.log("BALL " + ball.name + " -HIT : " + value2.name);
                }
            } catch (e) { console.log(e); }
        } else if (key2 != name) {
            //check if the current ball colliding with any of the table's walls

            //BALL DIAMETER = 1 
            if ((ball.position.z <= TABLE_DIMENSIONS.TOP + 1)) {
                ball.v = new THREE.Vector3(ball.v.x, 0, -ball.v.z);
                ball.position.z = TABLE_DIMENSIONS.TOP + 1.000001;
                ball.v.multiplyScalar(0.95);
            }
            if (ball.position.z >= TABLE_DIMENSIONS.BOTTOM - 1) {
                ball.v = new THREE.Vector3(ball.v.x, 0, -ball.v.z);
                ball.position.z = TABLE_DIMENSIONS.BOTTOM - 1.000001;
                ball.v.multiplyScalar(0.95);
            }
            if (ball.position.x >= TABLE_DIMENSIONS.RIGHT - 1) {
                ball.v = new THREE.Vector3(-ball.v.x, 0, ball.v.z);
                ball.position.x = TABLE_DIMENSIONS.RIGHT - 1.000001;
                ball.v.multiplyScalar(0.95);
            }
            if ((ball.position.x <= TABLE_DIMENSIONS.LEFT + 1)) {
                ball.v = new THREE.Vector3(-ball.v.x, 0, ball.v.z);
                ball.position.x = TABLE_DIMENSIONS.LEFT + 1.000001;
                ball.v.multiplyScalar(0.95);
            }

        }
    });
}