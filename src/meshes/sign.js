import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#1a1212',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

let postMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_post.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_post.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        standardMaterial,
        standardMaterial,
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_post.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_post.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

let bannerMaterial = [
        new THREE.MeshStandardMaterial({
            alphaMap: textureLoader.load('/textures/buildings/signs/pallet_sign_edge_alpha.png'),
            color: '#1a1212',
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            alphaMap: textureLoader.load('/textures/buildings/signs/pallet_sign_edge_alpha.png'),
            color: '#1a1212',
            roughness: 0.8,
            alphaTest: .5
        }),
        standardMaterial,
        standardMaterial,
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_front.png'),
            alphaMap: textureLoader.load('/textures/buildings/signs/pallet_sign_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/buildings/signs/pallet_sign_back.png'),
            alphaMap: textureLoader.load('/textures/buildings/signs/pallet_sign_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

export function createSign() {
    const sign = new THREE.Group();

    const pole = new THREE.Mesh(
        new THREE.BoxGeometry(.25,1,.25),
        postMaterial
    );
    pole.castShadow = true;
    

    const banner = new THREE.Mesh(
        new THREE.BoxGeometry(.7,.75,.0625),
        bannerMaterial
    );
    banner.castShadow = true;

    const bannerTop = new THREE.Mesh(
        new THREE.PlaneGeometry(.7,.0625),
        standardMaterial
    );
    
    bannerTop.castShadow = true;

    bannerTop.rotation.x = - Math.PI / 2;
    bannerTop.position.y = .33
    bannerTop.position.x = -.5

    banner.position.x = -.5;
    banner.position.y = .05;

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(.9,.125,.125),
        standardMaterial
    );

    top.castShadow = true;

    top.position.x = -.44;
    top.position.y = .43;


    sign.add(pole,banner,bannerTop,top);

    sign.position.y = 1.51;

    return sign;
};