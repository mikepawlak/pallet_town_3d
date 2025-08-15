import * as THREE from "three";
import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

const sideMaterial = new THREE.MeshStandardMaterial({
  color: "#a1d0f7",
  roughness: 0.8,
  alphaTest: 0.5,
  side: THREE.DoubleSide,
});

const trunkTopMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("/textures/furniture/flowerPot/tree_trunk_top.png"),
    roughness: 0.8,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
});
const trunkBottomMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("/textures/furniture/flowerPot/tree_trunk_bottom.png"),
    roughness: 0.8,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
});

const potRimMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("/textures/furniture/flowerPot/pot_side.png"),
    roughness: 0.8,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
});

const leafMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("/textures/furniture/flowerPot/tree_top.png"),
    alphaMap: textureLoader.load("/textures/furniture/flowerPot/tree_top_alpha.png"),
    roughness: 0.8,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
});


export function createFlowerPot() {
    const flowerPot = new THREE.Group;
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(.2, .2, .25, 6),
        potRimMaterial
    );

    const potRim = new THREE.Mesh(
        new THREE.CylinderGeometry(.25, .25, .1, 6),
        potRimMaterial
    );
    potRim.position.y = .175;

    const trunk1 = new THREE.Mesh(
        new THREE.CylinderGeometry(.05, .1, .2, 6),
        trunkBottomMaterial
    );

    trunk1.position.y = .31
    
    const trunk2 = new THREE.Mesh(
        new THREE.CylinderGeometry(.03, .06, .75, 6),
        trunkTopMaterial
    );

    trunk2.position.y = .6

    const leaf1 = new THREE.Mesh(
        new THREE.PlaneGeometry(.75, .4),
        leafMaterial
    );

    leaf1.position.y = 1
    leaf1.rotation.y = Math.PI / 4

    const leaf2 = new THREE.Mesh(
        new THREE.PlaneGeometry(.75, .4),
        leafMaterial
    );

    leaf2.position.y = 1
    leaf2.rotation.y = - Math.PI / 4


    flowerPot.add(pot, potRim, trunk1, trunk2, leaf1, leaf2);

    flowerPot.position.y = 1.5;

    return flowerPot;
}