import * as THREE from 'three';
import { TextureLoader } from 'three'; 
import { createBookshelves } from './bookshelf';
import { createDesktopComputer } from './desktopComputer';
import { createRoof } from './roof';
import { createTable } from './table';

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#cfc2cf',
            roughness: 0.8,
            alphaTest: .5,
            transparent: true
        })

let labMaterials = [
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/buildings/lab/pallet_lab_side.png'),
        alphaMap: textureLoader.load('/textures/buildings/lab/pallet_lab_side_alpha.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/buildings/lab/pallet_lab_side.png'),
        alphaMap: textureLoader.load('/textures/buildings/lab/pallet_lab_side_alpha.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    null,
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/buildings/lab/pallet_lab_floor.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/buildings/lab/pallet_lab_front.png'),
        alphaMap: textureLoader.load('/textures/buildings/lab/pallet_lab_front_alpha.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('/textures/buildings/lab/pallet_lab_rear.png'),
        alphaMap: textureLoader.load('/textures/buildings/lab/pallet_lab_rear_alpha.png'),
        roughness: 0.8,
        alphaTest: .5,
        side: THREE.DoubleSide,
        transparent: true
    }),
]

function addFurniture(lab) {
    const computerTable = createTable();
    const workTable = createTable();
    const pokeTable = createTable();

    computerTable.position.y = -1.7;
    computerTable.position.x = -3.5;
    computerTable.position.z = -3.49;
    computerTable.castShadow = true;

    workTable.position.y = -1.7;
    workTable.position.x = -1.69;
    workTable.position.z = -3.49;
    workTable.castShadow = true;

    pokeTable.position.y = -1.7;
    pokeTable.position.x = 2;
    pokeTable.position.z = -1.7;
    pokeTable.castShadow = true;

    const shelvesBack = createBookshelves(4);
    shelvesBack.position.y = -1.12;
    shelvesBack.position.z = -3.5;
    shelvesBack.position.x = 1.3;

    const shelvesLeft = createBookshelves(4);
    shelvesLeft.position.y = -1.12;
    shelvesLeft.position.z = 0;
    shelvesLeft.position.x = -3.9;

    const shelvesRight = createBookshelves(4);
    shelvesRight.position.y = -1.12;
    shelvesRight.position.z = 0;
    shelvesRight.position.x = 1.3;

    const computer = createDesktopComputer();
    computer.position.y = -1.345;
    computer.position.x = -3.8;
    computer.position.z = -3.5;
    computer.castShadow = true;

    lab.add(
        computerTable, 
        workTable,
        pokeTable,
        shelvesBack,
        shelvesLeft,
        shelvesRight,
        computer
        );

    return lab;
}

export function createLab() {
    let lab = new THREE.Group();

    lab = addFurniture(lab)

    const labBuilding = new THREE.Mesh(
        new THREE.BoxGeometry(9,4,8),
        labMaterials
    );

    labBuilding.castShadow = true;
    labBuilding.receiveShadow = true;
    let roof = createRoof({x: 6.85, y: .25, z: 8.5},3.5);
    roof.position.y = 2.06;

    lab.add(labBuilding);
    
    lab.position.y = 3.02;
    lab.position.z = 6;
    lab.position.x = 5;


    return lab;
}