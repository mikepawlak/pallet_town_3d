import { createOak } from "../meshes/sprites";


let animations = {
    moveForward : [1,0,1,2],
    idle: [1,1,1,1],
    moveBack: [5,4,5,6],
    moveLeft: [8,9,8,9],
    moveRight: [10, 11, 10, 11]
}
let animationsIndex = ["moveForward", "idle", "moveBack", "moveLeft", "moveRight"];
let positionRestrictions = {
    up: 3.5, 
    down: 5,
    left: 1,
    right: 5
}
let blocked = false;

export function createOakTimekeeper() {
    return  {
        prevSec : 0,
        index : 0
    }
}

let loop = 0;
let direction;
let animation = animations.idle;
let index = 0;
let startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;

function move(direction, oak) {
    switch(direction) {
        case 0: 
            if (oak.position.z + .3 <= positionRestrictions.down) {
                oak.position.z += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 1: 
            break;
        case 2: 
            if (oak.position.z - .3 >= positionRestrictions.up) {
                oak.position.z -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 3:
            if (oak.position.x - .3 >= positionRestrictions.left) {
                oak.position.x -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 4: 
            if (oak.position.x + .3 <= positionRestrictions.right) {
                oak.position.x += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
    }
}

function wander(elapsedTime, oakTimekeeper, oak) {
   if (startSeed > 0) {
        startSeed--;
        return animation[index];
    } 

    if (loop <= 6) {
        index = 0;
    } else if (loop === 7) {
        direction = Math. floor(Math. random() * (4 - 0 + 1)) + 0;
    } else {
        animation = animations[animationsIndex[direction]];
        if (!blocked) index = oakTimekeeper.index;
        move(direction, oak);

    }

    loop++;
    if (loop >= 12) {
        loop = 0;
        startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;
    }

    return animation[index];

}

export function updateoak(elapsedTime, oakTimekeeper, oak) {


    if (oakTimekeeper.prevSec + .25 <= Math.round(elapsedTime*25)/25) {
        oakTimekeeper.prevSec = Math.round(elapsedTime*25)/25;
        oak = createOak(wander(elapsedTime, oakTimekeeper, oak));
        oakTimekeeper.index++;
        if (oakTimekeeper.index >= 4) {
            oakTimekeeper.index = 0;
        }
    }

}