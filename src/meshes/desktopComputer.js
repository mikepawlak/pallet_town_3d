import * as THREE from 'three';
import { TextureLoader } from 'three'; 
import { createSign } from './sign';

const textureLoader = new TextureLoader();

let monitorMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_front.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/monitor_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

let keyboardMaterial = [
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_side.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_side.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_top.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_top.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_front.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/keyboard_side.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
]

let towerMaterial = [
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_back.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_back.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_back.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_back.png'),
        roughness: 0.8,
        alphaTest: .5
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_front.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/pc_lab/pc_tower_back.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]


export function createDesktopComputer() {
    const computer = new THREE.Group();

    let monitor = new THREE.Mesh(
        new THREE.BoxGeometry(.6, .6, .25),
        monitorMaterial
    );
    let tower = new THREE.Mesh(
        new THREE.BoxGeometry(.3, .35, .4),
        towerMaterial
    );
    let keyboard = new THREE.Mesh(
        new THREE.BoxGeometry(.55, .05, .2),
        keyboardMaterial
    );

    tower.position.x  = .5;
    tower.position.y = -.105;

    keyboard.position.z = .3;
    keyboard.position.y = -.27;

    computer.add(monitor, tower, keyboard);
    
    return computer;
};