import * as THREE from 'three';

/** Computes world-space AABB for an object hierarchy. */
export function worldBounds(root: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3();
  root.updateWorldMatrix(true, true);
  root.traverse(obj => {
    const m = obj as THREE.Mesh;
    if ((m as any).isMesh && m.geometry) {
      if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
      const bb = m.geometry.boundingBox?.clone();
      if (bb) { bb.applyMatrix4(m.matrixWorld); box.union(bb); }
    }
  });
  return box;
}

/** Maps compass direction to yaw (radians). */
export function yawFrom(face: 'north'|'east'|'south'|'west'): number {
  switch (face) {
    case 'north': return 0;
    case 'east':  return Math.PI / 2;
    case 'south': return Math.PI;
    case 'west':  return -Math.PI / 2;
  }
}

/** Returns an {x,z,yaw} spawn just outside an object's bounds on a given side. */
export function spawnOutsideBounds(
  obj: THREE.Object3D,
  side: 'west'|'east'|'north'|'south',
  distance: number,
  face: 'north'|'east'|'south'|'west',
  eps = 0.5
): { x: number; z: number; yaw: number } {
  const b = worldBounds(obj);
  const midZ = (b.min.z + b.max.z) * 0.5;
  const midX = (b.min.x + b.max.x) * 0.5;

  let x = midX, z = midZ;
  if (side === 'west')  x = b.min.x - (distance + eps);
  if (side === 'east')  x = b.max.x + (distance + eps);
  if (side === 'north') z = b.min.z - (distance + eps);
  if (side === 'south') z = b.max.z + (distance + eps);

  return { x, z, yaw: yawFrom(face) };
}
