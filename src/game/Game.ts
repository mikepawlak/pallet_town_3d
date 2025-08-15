import * as THREE from 'three';
import { addLights, addEnvironment, addLab } from './world';
import { addActors, createTimekeepers, updateActors, type Actors, type Timekeepers } from './actors';
import { spawnOutsideBounds } from './spawn';
import { applyFirstPersonCamera } from './camera';

export interface InputState {
  forward: boolean;
  back: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  strafeLeft: boolean;
  strafeRight: boolean;
  jump: boolean;
}

/** Three.js scene with first-person walking (no collisions). */
export class Game {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private frameHandle = 0;
  private clock = new THREE.Clock();
  private previous = 0;

  private actors!: Actors;
  private tks!: Timekeepers;
  private lab!: THREE.Object3D;

  private input: InputState = {
    forward: false, back: false, turnLeft: false, turnRight: false,
    strafeLeft: false, strafeRight: false, jump: false
  };

  private pos = new THREE.Vector3(0, 0, 0);
  private yaw = 0;
  private vy = 0;
  private canJump = true;
  private onGround = true;

  private readonly eyeHeight = 2.1;
  private readonly speed = 3.5;
  private readonly turnSpeed = 2.8;
  private readonly jumpVel = 5.0;
  private readonly gravity = -12.0;

  private readonly spawnSide: 'west'|'east'|'north'|'south' = 'west';
  private readonly spawnDistance = 2.5;
  private readonly spawnFace: 'north'|'east'|'south'|'west' = 'north';
  // tweak to shift the spawn slightly (x = east/west, y = north/south [negative is “up/north”])
  private readonly spawnFineNudge = new THREE.Vector2(0.7, -0.5);

  constructor(private clearColor: string = '#f5e8f3') {}

  attachInput(src: InputState): void { this.input = src; }

  mount(canvas: HTMLCanvasElement): void {
    this.scene = new THREE.Scene();

    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(this.clearColor);

    addLights(this.scene);
    addEnvironment(this.scene);
    this.lab = addLab(this.scene);

    const spawn = spawnOutsideBounds(this.lab, this.spawnSide, this.spawnDistance, this.spawnFace);
    this.setSpawn(spawn.x, spawn.z, spawn.yaw);

    this.actors = addActors(this.scene);
    this.tks = createTimekeepers();

    this.previous = 0;
    this.frameHandle = requestAnimationFrame(this.tick);
  }

  setSpawn(x: number, z: number, yaw: number = 0): void {
    this.pos.set(x + this.spawnFineNudge.x, 0, z + this.spawnFineNudge.y);
    this.yaw = yaw;
    applyFirstPersonCamera(this.camera, this.pos, this.yaw, this.eyeHeight);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  dispose(): void {
    cancelAnimationFrame(this.frameHandle);
    this.scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as unknown as THREE.Mesh;
      if ((mesh as any).isMesh) {
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) (m as any)?.dispose?.();
      }
    });
    this.renderer?.dispose();
  }

  private tick = (): void => {
    const elapsed = this.clock.getElapsedTime();
    const dt = Math.min(0.05, elapsed - this.previous);
    this.previous = elapsed;

    updateActors(elapsed, this.tks, this.actors);

    // 1) Rotate on left/right
    if (this.input.turnLeft)  this.yaw += -this.turnSpeed * dt;
    if (this.input.turnRight) this.yaw +=  this.turnSpeed * dt;

    // 2) Sync camera orientation to yaw so basis is current
    applyFirstPersonCamera(this.camera, this.pos, this.yaw, this.eyeHeight);
    this.camera.updateMatrixWorld(true);

    // 3) Get camera basis (flatten to ground)
    const fwd = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 2).negate();
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    fwd.y = 0; right.y = 0;
    if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
    fwd.normalize(); right.normalize();

    // 4) Build intent: Up/Down = forward/back; A/D (optional) = strafe
    let intentF = 0, intentR = 0;
    if (this.input.forward)      intentF += 1;
    if (this.input.back)         intentF -= 1;
    if (this.input.strafeRight)  intentR += 1;
    if (this.input.strafeLeft)   intentR -= 1;

    if (intentF !== 0 || intentR !== 0) {
      const mag = Math.hypot(intentF, intentR);
      const nf = intentF / mag;
      const nr = intentR / mag;

      const move = new THREE.Vector3()
        .addScaledVector(fwd,  nf)
        .addScaledVector(right, nr)
        .multiplyScalar(this.speed * dt);

      // 5) Apply movement directly (no collisions)
      this.pos.add(move);
    }

    // 6) Gravity / jump (simple ground at y=0)
    this.vy += this.gravity * dt;
    if (this.onGround && this.input.jump && this.canJump) {
      this.vy = this.jumpVel; this.canJump = false; this.onGround = false;
    }
    let y = this.pos.y + this.vy * dt;
    if (y <= 0) { y = 0; this.vy = 0; this.onGround = true; this.canJump = true; }
    else this.onGround = false;
    this.pos.y = y;

    // 7) Final camera placement from new position
    applyFirstPersonCamera(this.camera, this.pos, this.yaw, this.eyeHeight);

    this.renderer.render(this.scene, this.camera);
    this.frameHandle = requestAnimationFrame(this.tick);
  };
}
