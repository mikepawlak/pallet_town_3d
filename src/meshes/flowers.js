import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const flowerMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/flowers/pallet_flower.png'),
            alphaMap: textureLoader.load('/textures/flowers/pallet_flower_alpha.png'),
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

function generateFlowers(z, len) {
    const flowers = new THREE.Group();
    
    for (let i =0; i < len; i++) {
        const flower = new THREE.Group();
        const flowersVert = new THREE.Mesh(
            new THREE.PlaneGeometry(.5,.5),
            flowerMaterial
        );
        const flowersHori = new THREE.Mesh(
            new THREE.PlaneGeometry(.5,.5),
            flowerMaterial
        );

        flowersVert.castShadow = true;
        flowersHori.castShadow = true;
        flowersHori.rotation.y = - Math.PI / 2;
        
        flower.add(flowersVert, flowersHori);
        flower.position.x = i*2;
        flowers.add(flower);
    }

    flowers.position.z = z;

    return flowers;
}

export function createFlowers() {
    const flowerSetGroup = new THREE.Group();
    const flowerSet1 = new THREE.Group();
    const flowerSet2 = new THREE.Group();

    let flowers1 = generateFlowers(1, 4);
    let flowers2 = generateFlowers(2.5, 4);

    flowers1.position.x = 1;

    flowerSet1.position.y = 1.25;
    flowerSet1.position.x = -11.5;
    flowerSet1.position.z = 4.4;
    flowerSet1.add(flowers1, flowers2);

    let flowers1a = generateFlowers(1, 4);
    let flowers2a = generateFlowers(2.5, 4);

    flowers1a.position.x = 1;

    flowerSet2.position.y = 1.25;
    flowerSet2.position.x = .5;
    flowerSet2.position.z = 12.5;
    flowerSet2.add(flowers1a, flowers2a);


    flowerSetGroup.add(flowerSet1, flowerSet2);
    flowerSetGroup.castShadow = true;

    return flowerSetGroup;
};