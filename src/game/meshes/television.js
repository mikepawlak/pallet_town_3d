import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#c8e0d8',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

let tvFrontMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_front.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_back.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

let tvBackMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_panel_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_panel_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_panel_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_panel_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_back.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/television/pallet_tv_back.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

export function createTelevision() {
    const television = new THREE.Group();

    const tvFront = new THREE.Mesh(
        new THREE.BoxGeometry(.75, .75, .25),
        tvFrontMaterial
    );
    const tvBack = new THREE.Mesh(
        new THREE.BoxGeometry(.5, .5, .15),
        tvBackMaterial
    );

    tvBack.position.z = -.15


    television.position.y  = 2;

    television.add(tvFront, tvBack);

    return television;
};