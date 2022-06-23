import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "lil-gui";
import { TextureLoader } from "three";

import { createFloor } from "./meshes/floor.js";
import { createFloor1 } from "./meshes/floor1.js";
import { createHouses } from "./meshes/house.js";
import { createTallGrass } from "./meshes/tallGrass";
import { createSign } from "./meshes/sign";
import { createFlowers } from "./meshes/flowers";
import { createFences } from "./meshes/fence";
import { createLab } from "./meshes/lab";
import { createStumps } from "./meshes/stump";
import { createDinnerTable, createTable } from "./meshes/table";
import { createTelevision } from "./meshes/television";
import { createStairs } from "./meshes/stairs";
import { createFlowerPot } from "./meshes/flowerpot";
import { createAide, createAide1, createFatMan, createGirl, createOak } from "./meshes/sprites";
import { createGirlTimekeeper, updateGirl } from "./animations/girl";
import { createFatManTimekeeper, updateFatman } from "./animations/fatMan";
import { createAide1TimeKeeper, createAideTimeKeeper, createAnimationState, updateAide, updateAide1 } from "./animations/aide";
import { createAide2TimeKeeper, updateAide2 } from "./animations/aide2";
import { createOakTimekeeper, updateoak } from "./animations/oak";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


// these sprites need a TON of refactoring
let girl = createGirl();
girl.position.y = 1.5;
girl.position.x = -10;

let fatMan = createFatMan();
fatMan.position.y = 1.5;
fatMan.position.x = 1;
fatMan.position.z = 15;

let aide1 = createAide1();
aide1.position.y = 1.5;
aide1.position.x = 7;
aide1.position.z = 8;

let aide2 = createAide();
aide2.position.y = 1.5;
aide2.position.x = 2;
aide2.position.z = 7.5;

let oak = createOak();
oak.position.y = 1.5;
oak.position.z = 3.5;
oak.position.x = 2;

/**
 * Floor
 */

scene.add(
  createFloor(40, 40),
  createFloor1(),
  createHouses(),
  createTallGrass(),
  createFlowers(),
  createFences(),
  createLab(),
  createStumps(),
  girl,
  fatMan,
  aide1,
  aide2,
  oak
  
);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);


// const innerLight = new THREE.PointLight( 0xffffff, 1, 100 );
// innerLight.position.set( -8.8, 3, -10 );
// innerLight.castShadow = true;
// scene.add( innerLight );



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 60;
directionalLight.shadow.camera.left = -30;
directionalLight.shadow.camera.top = 30;
directionalLight.shadow.camera.right = 30;
directionalLight.shadow.camera.bottom = -30;
directionalLight.position.set(4, 50, 5);
scene.add(directionalLight);
// scene.add( new THREE.CameraHelper( innerLight.shadow.camera ) );

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-8, 4, 8);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1, 0);
controls.enableDamping = true;

//prod limits
// controls.maxPolarAngle = (Math.PI/2) - .1;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#f5e8f3");

/**
 * Animate
 */
const clock = new THREE.Clock();

let previousTime = 0;
let girlTimekeeper = createGirlTimekeeper();
let fatManTimeKeeper = createFatManTimekeeper();
let aid1TimeKeeper = createAide1TimeKeeper();
let aid2TimeKeeper = createAide2TimeKeeper();
let oakTimekeeper = createOakTimekeeper();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  updateGirl(elapsedTime, girlTimekeeper, girl);
  updateFatman(elapsedTime, fatManTimeKeeper, fatMan);
  updateAide1(elapsedTime, aid1TimeKeeper, aide1);
  updateAide2(elapsedTime, aid2TimeKeeper, aide2);
  updateoak(elapsedTime, oakTimekeeper, oak);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
