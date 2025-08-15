import * as THREE from "three";
import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

const topMaterial = new THREE.MeshStandardMaterial({
  color: "#f8e8f8",
  roughness: 0.8,
  alphaTest: 0.5,
  side: THREE.DoubleSide,
});

const sideMaterial = new THREE.MeshStandardMaterial({
  color: "#a1d0f7",
  roughness: 0.8,
  alphaTest: 0.5,
  side: THREE.DoubleSide,
});


const stairMaterial = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    topMaterial,
    sideMaterial,
    sideMaterial
]



export function createStairs() {
  const stairs = new THREE.Group();

  const topStair = new THREE.Mesh(
    new THREE.BoxGeometry(.3, .75, .75),
    stairMaterial
  );
  const middleStair = new THREE.Mesh(
    new THREE.BoxGeometry(.3, .5, .75),
    stairMaterial
  );
  middleStair.position.x = -.3;
  middleStair.position.y = -.125;

  const bottomStair = new THREE.Mesh(
    new THREE.BoxGeometry(.3, .25, .75),
    stairMaterial
  );
  bottomStair.position.x = -.6;
  bottomStair.position.y = -.25;


  stairs.add(
    topStair,
    middleStair,
    bottomStair
  );

  return stairs;
}


