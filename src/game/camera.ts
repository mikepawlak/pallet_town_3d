import * as THREE from 'three';

/** Positions a first-person camera at `pos + (0, eyeHeight, 0)` and looks along `yaw`. */
export function applyFirstPersonCamera(
  camera: THREE.PerspectiveCamera,
  pos: THREE.Vector3,
  yaw: number,
  eyeHeight: number
): void {
  const eye = new THREE.Vector3(pos.x, pos.y + eyeHeight, pos.z);
  const fwd = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw)); // yaw 0 => -Z
  camera.position.copy(eye);
  camera.lookAt(eye.clone().add(fwd));
}
