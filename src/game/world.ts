import * as THREE from 'three';
import { createFloor } from './meshes/floor.js';
import { createFloor1 } from './meshes/floor1.js';
import { createHouses } from './meshes/house.js';
import { createTallGrass } from './meshes/tallGrass.js';
import { createFlowers } from './meshes/flowers.js';
import { createFences } from './meshes/fence.js';
import { createLab } from './meshes/lab.js';
import { createStumps } from './meshes/stump.js';

/** Adds ambient + directional lights. */
export function addLights(scene: THREE.Scene): void {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 0.4);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  dir.shadow.camera.far = 60;
  dir.shadow.camera.left = -30;
  dir.shadow.camera.top = 30;
  dir.shadow.camera.right = 30;
  dir.shadow.camera.bottom = -30;
  dir.position.set(4, 50, 5);
  scene.add(dir);
}

/** Adds static environment (ground, houses, foliage, fences, stumps). */
export function addEnvironment(scene: THREE.Scene): void {
  scene.add(
    createFloor(40, 40),
    createFloor1(),
    createHouses(),
    createTallGrass(),
    createFlowers(),
    createFences(),
    createStumps()
  );
}

/** Creates and adds the Lab object; returns it. */
export function addLab(scene: THREE.Scene): THREE.Object3D {
  const lab = createLab();
  lab.name = 'lab';
  scene.add(lab);
  return lab;
}
