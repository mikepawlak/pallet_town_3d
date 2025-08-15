import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
            color: '#c8e0d8',
            roughness: 0.8,
            alphaTest: .5,
            side: THREE.DoubleSide
        })

let bookshelftMaterial = [
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_top.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_front.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('/textures/furniture/bookshelf/bookshelf_side.png'),
            roughness: 0.8,
            alphaTest: .5
        }),
    ]


export function createBookshelves(x) {
    const shelves = new THREE.Group;
    
    for (let i = 0; i < x; i++) {
        let bookshelf = new THREE.Mesh(
            new THREE.BoxGeometry(.95, 1.65, .75),
            bookshelftMaterial
        );

        bookshelf.position.x = i * .9;

        shelves.add(bookshelf);
    }



    return shelves;
};