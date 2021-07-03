import * as Collision from "./collision";
import * as MainScene from '../main';
import * as THREE from '../three';
import * as Global from './Global';


export async function move() {
    var scene = await MainScene.getScene();
    scene.children.forEach(async(value, key) => {
        if (value.v) {

            var oldPos = value.position.clone();

            Collision.checkCollision(key, value);


            if (Math.abs(value.v.x) < 0.001 && Math.abs(value.v.z) < 0.001) {
                value.v = new THREE.Vector3();
                return;
            }

            var accX = calculateFriction(value.v.x);
            var accZ = calculateFriction(value.v.z);
            //TODO : add delta time ; 
            var newVelocityX = value.v.x + accX * Global.DELTA_TIME;
            var newVelocityZ = value.v.z + accZ * Global.DELTA_TIME;
            value.v.set(isNaN(newVelocityX) ? 0 : newVelocityX, 0, isNaN(newVelocityZ) ? 0 : newVelocityZ);
            var newPos = new THREE.Vector3();
            newPos.x = value.position.x + newVelocityX;
            newPos.z = value.position.z + newVelocityZ;
            rotateBall(value, newPos, oldPos);
            value.position.z = newPos.z;
            value.position.x = newPos.x;
        }
    })
}

function calculateFriction(velocity) {
    var friction = (Global.STATIC_FRICTION_COEFFICIENT + Global.KINETIC_FRICTION_COEFFICIENT) * Global.GRAVITY / Global.BALL_RADIUS;
    if (Math.abs(velocity) < friction)
        return -velocity;
    friction = friction * -1 * velocity / Math.abs(velocity);
    return friction;
}

function rotateBall(object, newPos, prevPos) {
    var totalXMovment = newPos.x - prevPos.x;
    var totalZMovment = newPos.z - prevPos.z;
    var distance = new THREE.Vector3(totalXMovment, 0, totalZMovment);
    var ballRotationAxis = new THREE.Vector3(0, 1, 0);
    ballRotationAxis.cross(distance).normalize();
    var velocityMag = distance.length();
    var rotationAmount = velocityMag * (Math.PI * 2) / Global.CIRCUMFERENCE;
    object.rotateOnWorldAxis(ballRotationAxis, rotationAmount)
}