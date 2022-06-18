import * as THREE from 'three';
import { TextureLoader } from 'three'; 


const textureLoader = new TextureLoader();
const waterColorTexture = textureLoader.load('/textures/pallet_water.png');

waterColorTexture.repeat.set(7, 7);
waterColorTexture.wrapS = THREE.RepeatWrapping;
waterColorTexture.wrapT = THREE.RepeatWrapping;


export function createFloor(x, z) {
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(x, z),
        new THREE.MeshStandardMaterial({
            map: waterColorTexture,
            roughness: 0.8,
            side: THREE.DoubleSide
        })
    );
    floor.receiveShadow = true;
    floor.rotation.x = - Math.PI * 0.5;

    return floor;
}