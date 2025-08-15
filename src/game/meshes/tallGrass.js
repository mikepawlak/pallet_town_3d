import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const tallGrassMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/tallGrass/pallet_tall_grass.png'),
            alphaMap: textureLoader.load('/textures/tallGrass/pallet_tall_grass_alpha.png'),
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

function generateGrass(x, z) {
    const grass = new THREE.Group();
    const tallGrassVert = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        tallGrassMaterial
    );
    const tallGrassHori = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        tallGrassMaterial
    );

    tallGrassHori.castShadow = true;
    tallGrassVert.castShadow = true;

    tallGrassHori.rotation.y = - Math.PI / 2;

    grass.add(tallGrassVert, tallGrassHori);

    return grass;
}

export function createTallGrass() {
    const tallGrass = new THREE.Group();
    let x = 0;
    let z = 0;
    for (let i = 0; i < 16; i++) {
        if (i % 4 == 0) {
            x++;
            z = 0
        }
        z++;
        let grass = generateGrass(2, 2);

        grass.position.x = x,
        grass.position.z = z
        tallGrass.add(grass);
    }

    tallGrass.position.z = -20;
    tallGrass.position.x = -2;

    tallGrass.position.y = 1.51;

    return tallGrass;
};