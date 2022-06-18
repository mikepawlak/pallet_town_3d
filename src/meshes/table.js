import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#c8e0d8',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

let tableTopMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_side_narrow.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_side_narrow.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

let tableBottomMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_bottom_narrow.png'),
            alphaMap: textureLoader.load('/textures/furniture/table/pallet_table_bottom_narrow_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_bottom_narrow.png'),
            alphaMap: textureLoader.load('/textures/furniture/table/pallet_table_bottom_narrow_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        standardMaterial,
        null,
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_bottom.png'),
            alphaMap: textureLoader.load('/textures/furniture/table/pallet_table_bottom_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/table/pallet_table_bottom.png'),
            alphaMap: textureLoader.load('/textures/furniture/table/pallet_table_bottom_alpha.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]

export function createTable() {
    const table = new THREE.Group();

    const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(1.75,.125,1),
        tableTopMaterial
    );

    const tableBottom = new THREE.Mesh(
        new THREE.BoxGeometry(1.5,.3,.85),
        tableBottomMaterial
    );

    tableBottom.position.y = -.15


    table.add(tableTop, tableBottom);

    return table;
};