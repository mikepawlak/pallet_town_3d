import { createAide } from "../meshes/sprites";


let animations = {
    moveForward : [1,0,1,2],
    idle: [1,1,1,1],
    moveBack: [5,4,5,6],
    moveLeft: [8,9,8,9],
    moveRight: [10, 11, 10, 11]
}
let animationsIndex = ["moveForward", "idle", "moveBack", "moveLeft", "moveRight"];
let positionRestrictions = {
    up: 6.9, 
    down: 9,
    left: .9,
    right: 4
}
let blocked = false;

export function createAide2TimeKeeper() {
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

function move(direction, aide2) {
    switch(direction) {
        case 0: 
            if (aide2.position.z + .3 <= positionRestrictions.down) {
                aide2.position.z += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 1: 
            break;
        case 2: 
            if (aide2.position.z - .3 >= positionRestrictions.up) {
                aide2.position.z -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 3:
            if (aide2.position.x - .3 >= positionRestrictions.left) {
                aide2.position.x -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 4: 
            if (aide2.position.x + .3 <= positionRestrictions.right) {
                aide2.position.x += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
    }
}

function wander(elapsedTime, aideTimekeeper, aide2) {
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
        move(direction, aide2);

    }

    loop++;
    if (loop >= 12) {
        loop = 0;
        startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;
    }

    return animation[index];

}

export function updateAide2(elapsedTime, aideTimekeeper, aide2) {


    if (aideTimekeeper.prevSec + .25 <= Math.round(elapsedTime*25)/25) {
        aideTimekeeper.prevSec = Math.round(elapsedTime*25)/25;
        aide2 = createAide(wander(elapsedTime, aideTimekeeper, aide2));
        aideTimekeeper.index++;
        if (aideTimekeeper.index >= 4) {
            aideTimekeeper.index = 0;
        }
    }

}