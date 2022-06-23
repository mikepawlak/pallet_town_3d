import { createAide1 } from "../meshes/sprites";


let animations = {
    moveForward : [1,0,1,2],
    idle: [1,1,1,1],
    moveBack: [5,4,5,6],
    moveLeft: [8,9,8,9],
    moveRight: [10, 11, 10, 11]
}
let animationsIndex = ["moveForward", "idle", "moveBack", "moveLeft", "moveRight"];
let positionRestrictions = {
    up: 8, 
    down: 8,
    left: 7,
    right: 7
}
let blocked = false;

export function createAide1TimeKeeper() {
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

function move(direction, aide1) {
    switch(direction) {
        case 0: 
            if (aide1.position.z + .3 <= positionRestrictions.down) {
                aide1.position.z += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 1: 
            break;
        case 2: 
            if (aide1.position.z - .3 >= positionRestrictions.up) {
                aide1.position.z -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 3:
            if (aide1.position.x - .3 >= positionRestrictions.left) {
                aide1.position.x -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 4: 
            if (aide1.position.x + .3 <= positionRestrictions.right) {
                aide1.position.x += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
    }
}

function wander(elapsedTime, aideTimekeeper, aide1) {
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
        if (!blocked) index = aideTimekeeper.index;
        move(direction, aide1);

    }

    loop++;
    if (loop >= 12) {
        loop = 0;
        startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;
    }

    return animation[index];

}

export function updateAide1(elapsedTime, aideTimekeeper, aide1) {


    if (aideTimekeeper.prevSec + .25 <= Math.round(elapsedTime*25)/25) {
        aideTimekeeper.prevSec = Math.round(elapsedTime*25)/25;
        aide1 = createAide1(wander(elapsedTime, aideTimekeeper, aide1));
        aideTimekeeper.index++;
        if (aideTimekeeper.index >= 4) {
            aideTimekeeper.index = 0;
        }
    }

}