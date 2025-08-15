import * as THREE from "three";
import { TextureLoader, ZeroCurvatureEnding } from "three";
import { createBookshelves } from "./bookshelf";
import { createFlowerPot } from "./flowerpot";
import { createRoof } from "./roof";
import { createSign } from "./sign";
import { createStairs } from "./stairs";
import { createDinnerTable, createTable } from "./table";
import { createTelevision } from "./television";

const textureLoader = new TextureLoader();

const standardMaterial = new THREE.MeshStandardMaterial({
  color: "#c8e0d8",
  roughness: 0.8,
  alphaTest: 0.5,
  transparent: true,
  side: THREE.DoubleSide,
});

const standardWrapMaterial = new THREE.MeshStandardMaterial({
  color: "#1a1212",
  roughness: 0.8,
  alphaTest: 0.5,
  side: THREE.DoubleSide,
});

function createFloor(x, z) {
  let texture = textureLoader.load(
    "/textures/buildings/house/pallet_floor_brick.png"
  );

  texture.repeat.set(x, z);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
}

function createInner() {
  const innerGroup = new THREE.Group();

  const innerRearUpper = new THREE.Mesh(
    new THREE.PlaneGeometry(6.125, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_rear_inner.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_rear_inner_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerRearUpper.position.y = 2.15;
  innerRearUpper.position.z = -2.061;

  innerGroup.add(innerRearUpper);

  const innerFrontUpper = new THREE.Mesh(
    new THREE.PlaneGeometry(6.125, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_front_inner.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_front_inner_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerFrontUpper.position.y = 2.15;
  innerFrontUpper.position.z = 2.061;

  innerGroup.add(innerFrontUpper);

  const innerLeftSide = new THREE.Mesh(
    new THREE.PlaneGeometry(4.12, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_side_inner.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerLeftSide.position.y = 2.15;
  innerLeftSide.rotation.y = -Math.PI / 2;
  innerLeftSide.position.x = -1.82;

  innerGroup.add(innerLeftSide);

  const innerRightSide = new THREE.Mesh(
    new THREE.PlaneGeometry(4.12, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_upper_side_inner.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerRightSide.position.y = 2.15;
  innerRightSide.rotation.y = Math.PI / 2;
  innerRightSide.position.x = 1.82;

  innerGroup.add(innerRightSide);


  const innerRear = new THREE.Mesh(
    new THREE.PlaneGeometry(5.99, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_rear_inner.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_rear_inner_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );


  innerRear.position.z = -1.99;
  innerRear.rotation.y = Math.PI;


  innerGroup.add(innerRear);

  const innerFront = new THREE.Mesh(
    new THREE.PlaneGeometry(5.99, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_front_inner.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_front_inner_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );


  innerFront.position.z = 1.98;

  innerGroup.add(innerFront);

  const innerLeftSideLower = new THREE.Mesh(
    new THREE.PlaneGeometry(3.99, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_side_inner.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerLeftSideLower.rotation.y = -Math.PI / 2;
  innerLeftSideLower.position.x = -2.99;

  innerGroup.add(innerLeftSideLower);

  const innerRightSideLower = new THREE.Mesh(
    new THREE.PlaneGeometry(3.99, 2),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/inner/pallet_house_side_inner.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  innerRightSideLower.rotation.y = Math.PI / 2;
  innerRightSideLower.position.x = 2.99;

  innerGroup.add(innerRightSideLower);

  return innerGroup;
}

function createUpperFurniture() {
  const furnitureGroup = new THREE.Group();

  const table = new createTable();
  table.position.y = 1.45;
  table.position.z = -1.46;
  table.position.x = -0.25;
  furnitureGroup.add(table);

  const television = new createTelevision();
  television.position.y = 1.45;

  furnitureGroup.add(television);
  return furnitureGroup;
}

function createLowerFurniture() {
  const furnitureGroup = new THREE.Group();

  const table = new createDinnerTable();
  table.position.y = -0.7;

  table.position.x = -0.25;

  const television = new createTelevision();
  television.position.y = -0.6;
  television.position.z = -1.6;

  const shelvesLeft = createBookshelves(1);
  shelvesLeft.position.y = -0.15;
  shelvesLeft.position.x = -2.5;
  shelvesLeft.position.z = -1.6;


  const stairs = createStairs();
  stairs.position.x = 2.83
  stairs.position.y = -.62;
  stairs.position.z = -1.4;

  const flowerPotRight = createFlowerPot();
  flowerPotRight.position.y = -.87;
  flowerPotRight.position.x = 2.65
  flowerPotRight.position.z = 1.5;

  const flowerPotLeft = createFlowerPot();
  flowerPotLeft.position.y = -.87;
  flowerPotLeft.position.x = -2.65
  flowerPotLeft.position.z = 1.5;


  furnitureGroup.add(table, television, shelvesLeft, stairs, flowerPotRight, flowerPotLeft);
  return furnitureGroup;
}

function createHouse(x, z) {
  const house = new THREE.Group();

  let floor1Materials = [
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_side.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_side.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    null,
    new THREE.MeshStandardMaterial({
      map: createFloor(5, 4),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_front.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_front_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_rear.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_rear_alpha.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    }),
  ];

  let wrapMaterials = [
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_wrap_side.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_wrap_side.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
    }),
    standardWrapMaterial,
    standardWrapMaterial,
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_wrap_front.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_wrap_front.png"
      ),
      roughness: 0.8,
      alphaTest: 0.5,
      transparent: true,
    }),
  ];

  let floor2Materials = [
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_side.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_side_alpha.png"
      ),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_side.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_side_alpha.png"
      ),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
    null,
    new THREE.MeshStandardMaterial({
      map: createFloor(3.5, 3),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_front.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_front_alpha.png"
      ),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_rear.png"
      ),
      alphaMap: textureLoader.load(
        "/textures/buildings/house/pallet_house_upper_rear_alpha.png"
      ),
      roughness: 0.8,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    }),
  ];

  const floor1 = new THREE.Mesh(
    new THREE.BoxGeometry(6, 2, 4, 1),
    floor1Materials
  );
  floor1.castShadow = true;

  const wrap = new THREE.Mesh(
    new THREE.BoxGeometry(6.25, 0.25, 4.25, 1),
    wrapMaterials
  );
  wrap.castShadow = true;
  wrap.position.y = 1;

  const floor2 = new THREE.Mesh(
    new THREE.BoxGeometry(6.125, 2, 4.125, 1),
    floor2Materials
  );

  const roof = createRoof({ x: 3.65, y: 0.25, z: 4.5 }, 1.9);

  const sign = createSign();

  sign.position.x = -3.7;
  sign.position.y = -0.5;
  sign.position.z = 1.8;

  floor2.castShadow = true;
  floor2.position.y = 2.13;

  house.add(
    floor1,
    wrap,
    floor2,
    roof,
    sign,
    createInner(),
    createUpperFurniture(),
    createLowerFurniture()
  );

  house.position.y = 2.01;
  house.position.x = x;
  house.position.z = z;

  house.castShadow = true;

  return house;
}

export function createHouses() {
  const houses = new THREE.Group().add(
    createHouse(-8.8, -10),
    createHouse(5.5, -10)
  );

  return houses;
}
