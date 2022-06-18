import * as THREE from 'three';
import { TextureLoader } from 'three'; 


const textureLoader = new TextureLoader();

const stumpSideTexture = new THREE.MeshStandardMaterial({
    color: '#c8e0d8',
    roughness: 0.8,
    alphaTest: .5,
    side: THREE.DoubleSide
});

let stumpMaterials = [
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/stump/pallet_stump_side.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/stump/pallet_stump_side.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/stump/pallet_stump_top.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    stumpSideTexture,
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/stump/pallet_stump_side.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/stump/pallet_stump_side.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
]


function generateStumps(x,z,spacing) {
    const stumps = new THREE.Group();

    for (let i=0; i < z; i++) {
        const stump = new THREE.Mesh(
            new THREE.BoxGeometry(1,1.5,1),
            stumpMaterials
        );
        stump.castShadow = true;
        stump.rotation.y = Math.PI / 4;

        stump.position.x = i * spacing;

        stumps.add(stump);
    }

    for (let i=0; i < x; i++) {
        const stump = new THREE.Mesh(
            new THREE.BoxGeometry(1,1.5,1),
            stumpMaterials
        );
        stump.castShadow = true;
        stump.rotation.y = Math.PI / 4;

        stump.position.z = i * spacing;

        stumps.add(stump);
    }
    

    return stumps
}

export function createStumps() {
    const stumpGroup = new THREE.Group();

    let stumps1 = generateStumps(23,11,1.65);
    stumps1.position.z = -17
    stumps1.position.x = -19
    let stumps2 = generateStumps(1,1,0);
    stumps2.position.z = -18.5
    stumps2.position.x = -2.5
    let stumps3 = generateStumps(1,1,0);
    stumps3.position.z = -18.5
    stumps3.position.x = -14
    let stumps4 = generateStumps(1,1,0);
    stumps4.position.z = 19.3
    stumps4.position.x = -17.3
    let stumps5 = generateStumps(1,14,1.65);
    stumps5.position.z = 19.3
    stumps5.position.x = -2.5
    let stumps6 = generateStumps(1,9,1.65);
    stumps6.position.z = -17
    stumps6.position.x = 4
    let stumps7 = generateStumps(22,1,1.65);
    stumps7.position.z = -17
    stumps7.position.x = 19
    let stumps8 = generateStumps(1,1,0);
    stumps8.position.z = -18.5
    stumps8.position.x = 4
    let stumps9 = generateStumps(1,1,0);
    stumps9.position.z = -18.5
    stumps9.position.x = 17.2


    


    


    stumpGroup.add(
        stumps1,
        stumps2,
        stumps3,
        stumps4,
        stumps5,
        stumps6,
        stumps7,
        stumps8,
        stumps9
        );
    stumpGroup.position.y = 1.75;
    
    
    return stumpGroup;
};