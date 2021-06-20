import * as Collision from "./collision";

export var SceneObjects = new Map();


const frection = 0.0002;


export async function move() {
    var list = [];
    SceneObjects.forEach(async(value, key) => {
        if (!list.includes(key)) {
            var ref = Collision.checkCollision(key, value);
            if (ref) {
                list.push(ref);
            }
            if (value.velocity > 0.00001) {
                console.log(key + "MOVE");
                value.reference.position.x += value.velocity;
                value.velocity -= frection;
            }
        }
    })
}