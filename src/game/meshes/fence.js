
import * as THREE from 'three';
import { TextureLoader } from 'three'; 
import { createSign } from './sign';

const textureLoader = new TextureLoader();

const fenceSideTexture = new THREE.MeshStandardMaterial({
    map: textureLoader.load('/textures/buildings/post_side.png'),
    roughness: 0.8,
    alphaTest: .5,
    side: THREE.DoubleSide
});

const fenceTopTexture = new THREE.MeshStandardMaterial({
            color: '#a1d0f7',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })


        
const fenceTexture = [
    fenceSideTexture,
    fenceSideTexture,
    fenceTopTexture,
    fenceSideTexture,
    fenceSideTexture,
    fenceSideTexture,
]


function generateFence(additionalPosts) {
    const fence = new THREE.Group();

    for (let i = 0; i < 6; i++) {
        const post = new THREE.Mesh(
            new THREE.BoxGeometry(.25,1,.25),
            fenceTexture
        )
        post.castShadow = true;
        post.rotation.y = Math.PI / 4;
        post.position.x = i;

        fence.add(post);
    }

    let sign = createSign();
    sign.position.y = 0;
    sign.position.x = 7

    fence.add(sign);
    
    for (let i = 0; i < additionalPosts; i++) {
        const post = new THREE.Mesh(
            new THREE.BoxGeometry(.25,1,.25),
            fenceTexture
        )
        post.castShadow = true;
        post.rotation.y = Math.PI / 4;
        post.position.x = 8 + i;

        fence.add(post);
    }

    return fence
}

export function createFences() {
    const fenceGroup = new THREE.Group();

    let fence1 = generateFence(0);
    let fence2 = generateFence(4);

    fence1.position.x = -11.5;
    fence1.position.z = 4;
    fence2.position.x = .5
    fence2.position.z = 12

    fenceGroup.add(fence1, fence2);
    fenceGroup.position.y = 1.5;
    
    return fenceGroup;
};