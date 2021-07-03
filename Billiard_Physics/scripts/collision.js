import * as MainScene from "../main";
import * as THREE from '../three';
import * as Global from './Global';


var thermalEnergy = 0.95;

export async function checkCollision(name, ball) {
    var scene = await MainScene.getScene();
    scene.children.forEach(async(value2, key2) => {
        if (key2 != name && value2.v) {
            try {

                var dx = value2.position.x - ball.position.x;
                var dz = value2.position.z - ball.position.z;
                var dis = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2)));

                if (dis < Global.BALL_RADIUS * 2) {

                    var normalVector = new THREE.Vector3();

                    normalVector.subVectors(value2.position, ball.position);

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

                    while (ball.position.distanceTo(value2.position) < Global.BALL_RADIUS * 2) {
                        ball.position.add(ball.v.clone().multiplyScalar(Global.DELTA_TIME));
                        value2.position.add(value2.v.clone().multiplyScalar(Global.DELTA_TIME));
                    }

                    //console.log("BALL " + ball.name + " -HIT : " + value2.name);
                }
            } catch (e) { console.log(e); }
        } else if (key2 != name) {

            //check if the ball is inside a hole 
            if (value2.name.includes('hole')) {
                var hole_pos = value2.position.clone();
                hole_pos.y = 0.3;
                //console.log(ball.position.distanceTo(hole_pos));
                if (ball.position.distanceTo(hole_pos) < Global.BALL_RADIUS + 0.5) {
                    ball.position.y = -50;
                    ball.v.set(0, 0, 0);

                }

            }



            //check if the current ball colliding with any of the table's walls
            if (value2.name.includes('Wall')) {
                var ball_pos = ball.position.clone().add(ball.v.clone().multiplyScalar(1 / 100));
                var wall_pos = value2.position.clone();
                var newVelocity = new THREE.Vector3();
                if (Math.abs(wall_pos.x - ball_pos.x) < Global.BALL_RADIUS && (value2.name.includes('right') || value2.name.includes('left'))) {
                    newVelocity.x = ball.v.x - 2 * (ball.v.x * value2.normalVector.x) * value2.normalVector.x;
                    ball.position.x = value2.position.x + (value2.normalVector.x * (Global.BALL_RADIUS + 0.0001));
                    ball.v.set(newVelocity.x, 0, ball.v.z);
                    ball.v.multiplyScalar(thermalEnergy);
                } else if (Math.abs(wall_pos.z - ball_pos.z) < Global.BALL_RADIUS && (value2.name.includes('top') || value2.name.includes('bottom'))) {
                    newVelocity.z = ball.v.z - 2 * (ball.v.z * value2.normalVector.z) * value2.normalVector.z;
                    ball.position.z = value2.position.z + (value2.normalVector.z * (Global.BALL_RADIUS + 0.0001));
                    ball.v.set(ball.v.x, 0, newVelocity.z);
                    ball.v.multiplyScalar(thermalEnergy);
                }
            }
        }
    });
}