import * as THREE from 'three';

/** Builds static AABB colliders for the scene, skipping very flat geometry. */
export function buildColliders(scene: THREE.Scene): THREE.Box3[] {
  const boxes: THREE.Box3[] = [];
  scene.updateMatrixWorld(true);
  scene.traverse(obj => {
    const mesh = obj as unknown as THREE.Mesh & { userData?: any };
    if (!(mesh as any).isMesh || !mesh.geometry) return;
    if (mesh.userData?.noCollide) return;
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    const bb = mesh.geometry.boundingBox?.clone();
    if (!bb) return;
    bb.applyMatrix4(mesh.matrixWorld);
    const height = bb.max.y - bb.min.y;
    if (height < 0.6) return;
    boxes.push(bb);
  });
  return boxes;
}

/** Axis-separated push-out in XZ. Mutates `pos`. */
export function resolveCollisionsAxis(
  pos: THREE.Vector3,
  radius: number,
  colliders: THREE.Box3[],
  axis: 'x' | 'z'
): void {
  for (const b of colliders) {
    const minX = b.min.x - radius, maxX = b.max.x + radius;
    const minZ = b.min.z - radius, maxZ = b.max.z + radius;
    const insideX = pos.x > minX && pos.x < maxX;
    const insideZ = pos.z > minZ && pos.z < maxZ;
    if (insideX && insideZ) {
      if (axis === 'x') {
        const pushL = pos.x - minX;
        const pushR = maxX - pos.x;
        pos.x += (pushL < pushR) ? -pushL : pushR;
      } else {
        const pushT = pos.z - minZ;
        const pushB = maxZ - pos.z;
        pos.z += (pushT < pushB) ? -pushT : pushB;
      }
    }
  }
}
