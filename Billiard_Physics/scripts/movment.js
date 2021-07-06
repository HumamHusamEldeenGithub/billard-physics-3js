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

            if (Math.abs(value.v.x) < Global.MAXIMUM_ACCELERATION && Math.abs(value.v.z) < Global.MAXIMUM_ACCELERATION) {
                value.v = new THREE.Vector3();
                return;
            }
            var accX = 0,
                accZ = 0;
            try {
                var angle = Math.atan(value.v.z / value.v.x);
                angle = Math.cos(angle);
                accX = calculateFriction(value.v.x, angle) / Global.BALL_MASS;
            } catch (e) { value.v.set(0, 0, value.v.z); }
            try {
                var angle = Math.atan(value.v.z / value.v.x);
                angle = Math.sin(angle);
                accZ = calculateFriction(value.v.z, angle) / Global.BALL_MASS;
            } catch (e) { value.v.set(value.v.x, 0, 0); }

            var newVelocityX = value.v.x + accX * Global.DELTA_TIME;
            var newVelocityZ = value.v.z + accZ * Global.DELTA_TIME;

            if (Math.abs(newVelocityX) < Global.MAXIMUM_ACCELERATION && Math.abs(newVelocityZ) < Global.MAXIMUM_ACCELERATION) {
                value.v.set(0, 0, 0);
                return;

            }

            value.v.set(newVelocityX, 0, newVelocityZ);

            var newPos = new THREE.Vector3();
            newPos.x = value.position.x + newVelocityX * Global.DELTA_TIME;
            newPos.z = value.position.z + newVelocityZ * Global.DELTA_TIME;

            rotateBall(value, newPos, oldPos);

            value.position.z = newPos.z;
            value.position.x = newPos.x;
        }
    })
}

function calculateFriction(velocity, angle) {
    if (velocity == 0)
        return 0;
    var friction = Global.KINETIC_FRICTION_COEFFICIENT * Global.BALL_RADIUS * Global.GRAVITY * Global.BALL_MASS * angle * Global.SCALER;
    friction = Math.abs(friction) * -1 * (velocity / Math.abs(velocity));

    return friction;
}

function rotateBall(object, newPos, prevPos) {
    var velocityX = newPos.x - prevPos.x;
    var velocityZ = newPos.z - prevPos.z;
    var velocity = new THREE.Vector3(velocityX, 0, velocityZ);
    var ballRotationAxis = new THREE.Vector3(0, 1, 0);
    ballRotationAxis.cross(velocity).normalize();
    var velocityMag = velocity.length();
    var rotationalSpeed = velocityMag * (Math.PI * 2) / Global.CIRCUMFERENCE;
    object.rotateOnWorldAxis(ballRotationAxis, rotationalSpeed)
}