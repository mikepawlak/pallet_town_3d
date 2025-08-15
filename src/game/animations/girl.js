import { createGirl } from "../meshes/sprites";


let animations = {
    moveForward : [1,0,1,2],
    idle: [1,1,1,1],
    moveBack: [5,4,5,6],
    moveLeft: [8,9,8,9],
    moveRight: [10, 11, 10, 11]
}
let animationsIndex = ["moveForward", "idle", "moveBack", "moveLeft", "moveRight"];
let positionRestrictions = {
    up: -4, 
    down: 3,
    left: -12,
    right: -3
}
let blocked = false;

export function createGirlTimekeeper() {
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

function move(direction, girl) {
    switch(direction) {
        case 0: 
            if (girl.position.z + .3 <= positionRestrictions.down) {
                girl.position.z += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 1: 
            break;
        case 2: 
            if (girl.position.z - .3 >= positionRestrictions.up) {
                girl.position.z -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 3:
            if (girl.position.x - .3 >= positionRestrictions.left) {
                girl.position.x -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 4: 
            if (girl.position.x + .3 <= positionRestrictions.right) {
                girl.position.x += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
    }
}

function wander(elapsedTime, girlTimekeeper, girl) {
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
        if (!blocked) index = girlTimekeeper.index;
        move(direction, girl);

    }

    loop++;
    if (loop >= 12) {
        loop = 0;
        startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;
    }

    return animation[index];

}

export function updateGirl(elapsedTime, girlTimekeeper, girl) {


    if (girlTimekeeper.prevSec + .25 <= Math.round(elapsedTime*25)/25) {
        girlTimekeeper.prevSec = Math.round(elapsedTime*25)/25;
        girl = createGirl(wander(elapsedTime, girlTimekeeper, girl));
        girlTimekeeper.index++;
        if (girlTimekeeper.index >= 4) {
            girlTimekeeper.index = 0;
        }
    }

}