import * as THREE from 'three';
import { TextureLoader } from 'three'; 

const textureLoader = new TextureLoader();

const floorEdgeColorTexture = textureLoader.load('/textures/pallet_floor_edge.png');
const floorSurfaceGrass = textureLoader.load('/textures/pallet_surface_grass.png');

floorSurfaceGrass.repeat.set(10, 10);
floorSurfaceGrass.wrapS = THREE.RepeatWrapping;
floorSurfaceGrass.wrapT = THREE.RepeatWrapping;

function generateEdgeColorTexture(x){
    let texture = textureLoader.load('/textures/pallet_floor_edge.png');

    texture.repeat.set(x, 1);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
}



function createUpperArea(z, x) {
    let materials = [
        new THREE.MeshStandardMaterial({
            map: generateEdgeColorTexture(x),
            roughness: 0.8
        }),
        new THREE.MeshStandardMaterial({
            map: generateEdgeColorTexture(x),
            roughness: 0.8
        }),
        new THREE.MeshStandardMaterial({
            map: floorSurfaceGrass,
            roughness: 0.8
        }),
        new THREE.MeshStandardMaterial({
            color: '#f8e8f8',
            roughness: 0.8
        }),
        new THREE.MeshStandardMaterial({
            map: generateEdgeColorTexture(z),
            roughness: 0.8
        }),
        new THREE.MeshStandardMaterial({
            map: generateEdgeColorTexture(z),
            roughness: 0.8
        }),
    ]

    let box = new THREE.Mesh(
        new THREE.BoxGeometry(z,1,x,1),
        materials
    );
    box.receiveShadow = true;
    return box;
}

function createGrassPlane(z, x, texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(z, x);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(z, x),
        new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
    );
    plane.receiveShadow = true;

    plane.rotation.x = - Math.PI * 0.5;
    plane.position.y = 1.01;


    return plane;
};

export function createFloor1() {
    const floor1 = new THREE.Group();

    
    const upperArea1 = createUpperArea(40, 32);
    upperArea1.position.y = .5;
    upperArea1.position.z = -4;

    const upperArea2 = createUpperArea(24, 8);
    upperArea2.position.y = .5;
    upperArea2.position.z = 16;
    upperArea2.position.x = 8;

    const upperArea3 = createUpperArea(8, 8);
    upperArea3.position.y = .5;
    upperArea3.position.z = 16;
    upperArea3.position.x = -16;

    const grassPlaneLeftBottom = createGrassPlane(8, 8, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneLeftBottom.position.z = 16;
    grassPlaneLeftBottom.position.x = -16;

    const grassPlaneLeftTop = createGrassPlane(4, 32, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneLeftTop.position.z = -4;
    grassPlaneLeftTop.position.x = -18;
    
    const grassPlaneTopLeft = createGrassPlane(14, 4, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneTopLeft.position.z = -18;
    grassPlaneTopLeft.position.x = -10

    const grassPlaneTopRight = createGrassPlane(16, 4, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneTopRight.position.z = -18;
    grassPlaneTopRight.position.x = 12;

    const grassPlaneRight = createGrassPlane(4, 36, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneRight.position.z = 2;
    grassPlaneRight.position.x = 18;

    const grassPlaneCenterRight = createGrassPlane(12, 4, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneCenterRight.position.x = 6;
    grassPlaneCenterRight.position.z = 14;

    const grassPlaneCenterLeft = createGrassPlane(8, 4, textureLoader.load('/textures/pallet_floor_grass.png'));
    grassPlaneCenterLeft.position.x = -8;
    grassPlaneCenterLeft.position.z = 6

    const shortGrassPlaneTopLeft = createGrassPlane(4, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneTopLeft.position.x = -14;
    shortGrassPlaneTopLeft.position.z = -10

    const shortGrassPlaneBottomLeft = createGrassPlane(8, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneBottomLeft.position.x = -8;
    shortGrassPlaneBottomLeft.position.z = 2

    const shortGrassPlaneTopRight = createGrassPlane(4, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneTopRight.position.z = -10;

    const shortGrassPlaneBottomRight0 = createGrassPlane(4, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneBottomRight0.position.z = 14;
    shortGrassPlaneBottomRight0.position.x = -2;
    const shortGrassPlaneBottomRight1 = createGrassPlane(20, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneBottomRight1.position.z = 18;
    shortGrassPlaneBottomRight1.position.x = 6;
    const shortGrassPlaneBottomRight2 = createGrassPlane(4, 8, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneBottomRight2.position.z = 12;
    shortGrassPlaneBottomRight2.position.x = 14;
    const shortGrassPlaneBottomRight3 = createGrassPlane(12, 4, textureLoader.load('/textures/pallet_floor_short_grass.png'));
    shortGrassPlaneBottomRight3.position.z = 10;
    shortGrassPlaneBottomRight3.position.x = 6;

    
    floor1.add(
        upperArea1, 
        upperArea2, 
        upperArea3,
        grassPlaneLeftBottom,
        grassPlaneLeftTop,
        grassPlaneTopLeft,
        grassPlaneTopRight,
        grassPlaneRight,
        grassPlaneCenterLeft,
        grassPlaneCenterRight,
        shortGrassPlaneTopLeft,
        shortGrassPlaneTopRight,
        shortGrassPlaneBottomLeft,
        shortGrassPlaneBottomRight0,
        shortGrassPlaneBottomRight1,
        shortGrassPlaneBottomRight2,
        shortGrassPlaneBottomRight3
        );

    return floor1;
}