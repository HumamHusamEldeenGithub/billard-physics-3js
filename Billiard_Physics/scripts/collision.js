import { changeVelocity } from "../main";
import * as Movement from "./movment";



export async function checkCollision(name, ball) {

    Movement.SceneObjects.forEach(async(value2, key2) => {
        if (key2 != name) {
            var pos = value2.reference.position;
            var dis = pos.distanceTo(ball.reference.position);
            var result = value2.reference.position.x - ball.reference.position.x;

            if (dis < 1 && result / ball.velocity > 0) {
                // console.log("FROM : " + name);
                // console.log("TO : " + key2);
                if (ball.velocity > value2.velocity) {
                    var tempVelocity = ball.velocity;
                    changeVelocity(name, { reference: ball.reference, velocity: 0 });
                    changeVelocity(key2, { reference: value2.reference, velocity: tempVelocity });
                    //value2.reference.position.x +=;
                    return key2;
                }
            }
        }

    });
}