import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#c8e0d8',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide,
            transparent: true
        })


function generateSideTexture(len) {
    let texture = textureLoader.load('/textures/buildings/roof/pallet_roof_edge.png');

    return texture
}

let roof0Materials = [
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/roof/pallet_roof_top.png'),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        })
    ]

let rooftierMaterials = [
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/roof/pallet_tier_roof_top.png'),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        }),
        new THREE.MeshStandardMaterial({
            map: generateSideTexture(1),
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        })
    ]

export function createRoof(base, start) {
    const roof = new THREE.Group();

    const roof0 = new THREE.Mesh(
        new THREE.BoxGeometry(base.x,base.y,base.z),
        roof0Materials
    );
    roof.add(roof0);

    let tierx = start;
    let tiery = .19;
    for(let i = 0; i < 6; i++) {
        const roofa = new THREE.Mesh(
            new THREE.BoxGeometry(base.y,base.y,base.z),
            rooftierMaterials
        )
        const roofb = new THREE.Mesh(
            new THREE.BoxGeometry(base.y,base.y,base.z),
            rooftierMaterials
        )
        roofa.position.y = -tiery;
        roofa.position.x = tierx;
        roofb.position.y = -tiery;
        roofb.position.x = -tierx;

        roof.add(roofa, roofb)

        tiery = tiery+.165;
        tierx = tierx+.23;
    }

    roof.position.y = 3.1;

    return roof;
};