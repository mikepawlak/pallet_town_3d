import * as THREE from 'three';
import { createAide, createAide1, createFatMan, createGirl, createOak } from './meshes/sprites.js';
import { createGirlTimekeeper, updateGirl } from './animations/girl.js';
import { createFatManTimekeeper, updateFatman } from './animations/fatMan.js';
import { createAide1TimeKeeper, updateAide1 } from './animations/aide.js';
import { createAide2TimeKeeper, updateAide2 } from './animations/aide2.js';
import { createOakTimekeeper, updateoak } from './animations/oak.js';

export interface Actors {
  girl: THREE.Object3D;
  fatMan: THREE.Object3D;
  aide1: THREE.Object3D;
  aide2: THREE.Object3D;
  oak: THREE.Object3D;
}

export interface Timekeepers {
  girlTK: ReturnType<typeof createGirlTimekeeper>;
  fatTK: ReturnType<typeof createFatManTimekeeper>;
  aide1TK: ReturnType<typeof createAide1TimeKeeper>;
  aide2TK: ReturnType<typeof createAide2TimeKeeper>;
  oakTK: ReturnType<typeof createOakTimekeeper>;
}

/** Creates and adds NPC actors to the scene; returns references. */
export function addActors(scene: THREE.Scene): Actors {
  const girl = createGirl();  girl.position.set(-10, 1.5, 0);
  const fatMan = createFatMan(); fatMan.position.set(1, 1.5, 15);
  const aide1 = createAide1();   aide1.position.set(7, 1.5, 8);
  const aide2 = createAide();    aide2.position.set(2, 1.5, 7.5);
  const oak = createOak();       oak.position.set(2, 1.5, 3.5);
  scene.add(girl, fatMan, aide1, aide2, oak);
  return { girl, fatMan, aide1, aide2, oak };
}

/** Creates timekeepers for all NPC animations. */
export function createTimekeepers(): Timekeepers {
  return {
    girlTK: createGirlTimekeeper(),
    fatTK: createFatManTimekeeper(),
    aide1TK: createAide1TimeKeeper(),
    aide2TK: createAide2TimeKeeper(),
    oakTK: createOakTimekeeper()
  };
}

/** Updates all NPCs for the given elapsed time. */
export function updateActors(elapsed: number, tk: Timekeepers, a: Actors): void {
  updateGirl(elapsed, tk.girlTK, a.girl);
  updateFatman(elapsed, tk.fatTK, a.fatMan);
  updateAide1(elapsed, tk.aide1TK, a.aide1);
  updateAide2(elapsed, tk.aide2TK, a.aide2);
  updateoak(elapsed, tk.oakTK, a.oak);
}
