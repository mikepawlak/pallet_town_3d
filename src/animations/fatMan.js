import { createFatMan } from "../meshes/sprites";



let animations = {
    moveForward : [1,0,1,2],
    idle: [1,1,1,1],
    moveBack: [5,4,5,6],
    moveLeft: [8,9,8,9],
    moveRight: [10, 11, 10, 11]
}
let animationsIndex = ["moveForward", "idle", "moveBack", "moveLeft", "moveRight"];
let positionRestrictions = {
    up: 12.59, 
    down: 17.5,
    left: -2.59,
    right: 10
}
let blocked = false;

export function createFatManTimekeeper() {
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

function move(direction, fatMan) {
    switch(direction) {
        case 0: 
            if (fatMan.position.z + .3 <= positionRestrictions.down) {
                fatMan.position.z += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 1: 
            break;
        case 2: 
            if (fatMan.position.z - .3 >= positionRestrictions.up) {
                fatMan.position.z -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 3:
            if (fatMan.position.x - .3 >= positionRestrictions.left) {
                fatMan.position.x -= .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
        case 4: 
            if (fatMan.position.x + .3 <= positionRestrictions.right) {
                fatMan.position.x += .3;
                blocked = false;
            } else {
                blocked = true;
            }
            break;
    }
}

function wander(elapsedTime, fatManTimekeeper, fatMan) {
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
        if (!blocked) index = fatManTimekeeper.index;
        move(direction, fatMan);

    }

    loop++;
    if (loop >= 12) {
        loop = 0;
        startSeed = Math. floor(Math. random() * (5 - 0 + 1)) + 0;
    }

    return animation[index];

}

export function updateFatman(elapsedTime, fatManTimekeeper, fatMan) {


    if (fatManTimekeeper.prevSec + .25 <= Math.round(elapsedTime*25)/25) {
        fatManTimekeeper.prevSec = Math.round(elapsedTime*25)/25;
        fatMan = createFatMan(wander(elapsedTime, fatManTimekeeper, fatMan));
        fatManTimekeeper.index++;
        if (fatManTimekeeper.index >= 4) {
            fatManTimekeeper.index = 0;
        }
    }

}