import * as THREE from 'three';
import { Sprite, TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const pokeballMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/itemBall_sprite.png"),
    alphaMap: textureLoader.load("/textures/sprites/itemBall_sprite_alpha.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide,
});


const girlMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/pallet_girl_sprite.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide
})

const fatManMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/pallet_fat_man_sprite.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide
})

const aideMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/pallet_aid_sprite.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide
})

const aide1Material = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/pallet_aid_sprite2.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide
})

const oakMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/sprites/pallet_oak_sprite.png"),
      alphaTest: 0.5,
      transparent: false,
      side: THREE.DoubleSide
})

export function createSprite(material, x, y) {
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(x,y,1)
    return sprite;
}

export function createPokeball() {
    return createSprite(pokeballMaterial, .5, .5);
}



export function createPerson(tile = 0, material) {
    let tilesHoriz = 4;
    let tilesVert = 3;
    let currentTile = tile;

    let offsetX  = (currentTile % tilesHoriz) / tilesHoriz;
    let offsetY = (tilesVert - Math.floor(currentTile / tilesHoriz) -1 ) / tilesVert;
    

    material.map.offset.x = offsetX;
    material.map.offset.y = offsetY;

    material.map.magFilter = THREE.NearestFilter;
    material.map.repeat.set(1/tilesHoriz, 1/tilesVert);


    return createSprite(material, 1, 1)
}

export function createGirl(tile) {
    return createPerson(tile, girlMaterial);
}

export function createFatMan(tile) {
    return createPerson(tile, fatManMaterial);
}

export function createAide(tile) {
    return createPerson(tile, aideMaterial);
}

export function createAide1(tile) {
    return createPerson(tile, aide1Material);
}

export function createOak(tile) {
    return createPerson(tile, oakMaterial);
}

export function updatePerson(tile, material) {
    let tilesHoriz = 4;
    let tilesVert = 3;
    let currentTile = tile;

    let offsetX  = (currentTile % tilesHoriz) / tilesHoriz;
    let offsetY = (tilesVert - Math.floor(currentTile / tilesHoriz) -1 ) / tilesVert;

    material.map.offset.x = offsetX;
    material.map.offset.y = offsetY;

    material.map.magFilter = THREE.NearestFilter;
    material.map.repeat.set(1/tilesHoriz, 1/tilesVert);

}
