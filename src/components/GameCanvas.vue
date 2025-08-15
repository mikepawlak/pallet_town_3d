<template>
  <div class="root">
    <canvas ref="canvasEl" class="canvas"></canvas>
    <div class="overlay"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Game, type InputState } from '@/game/Game';

const canvasEl = ref<HTMLCanvasElement | null>(null);
let game: Game | null = null;
let ro: ResizeObserver | null = null;

const input: InputState = {
  forward: false, back: false,
  turnLeft: false, turnRight: false,
  strafeLeft: false, strafeRight: false,
  jump: false
};

function resizeToCanvas() {
  if (!canvasEl.value || !game) return;
  const r = canvasEl.value.getBoundingClientRect();
  game.resize(r.width || 1, r.height || 1);
}

function setPressed(sel: string, v: boolean) {
  const el = document.querySelector(sel);
  if (el) el.classList.toggle('is-pressed', v);
}

/* Keyboard
 * Up/Down → forward/back
 * Left/Right (arrows) → ROTATE only
 * A/D → STRAFE (optional, keyboard only)
 * Space/Z → jump; X → B visual
 */
function bindKeyboard() {
  const handle = (e: KeyboardEvent, down: boolean) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':     input.forward = down; setPressed('.dpad .up', down); break;
      case 'ArrowDown':
      case 'KeyS':     input.back = down;    setPressed('.dpad .down', down); break;

      // ROTATE ONLY on arrow left/right
      case 'ArrowLeft': input.turnLeft  = down; setPressed('.dpad .left', down); break;
      case 'ArrowRight':input.turnRight = down; setPressed('.dpad .right', down); break;

      // Optional strafing on A/D for keyboard users
      case 'KeyA':     input.strafeLeft  = down; break;
      case 'KeyD':     input.strafeRight = down; break;

      case 'Space':
      case 'KeyZ':     input.jump = down; setPressed('.ab .a', down); break;
      case 'KeyX':     setPressed('.ab .b', down); break;

      default: return;
    }
    if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault();
  };

  const kd = (e: KeyboardEvent) => handle(e, true);
  const ku = (e: KeyboardEvent) => handle(e, false);
  window.addEventListener('keydown', kd);
  window.addEventListener('keyup', ku);

  const blur = () => {
    Object.assign(input, {
      forward:false, back:false,
      turnLeft:false, turnRight:false,
      strafeLeft:false, strafeRight:false,
      jump:false
    });
    document.querySelectorAll('.is-pressed').forEach(n => n.classList.remove('is-pressed'));
  };
  window.addEventListener('blur', blur);

  return () => {
    window.removeEventListener('keydown', kd);
    window.removeEventListener('keyup', ku);
    window.removeEventListener('blur', blur);
  };
}

/* Touch D-pad: one active direction; Left/Right = ROTATE only */
function bindDpad() {
  const dpad = document.querySelector('.dpad') as HTMLElement | null;
  if (!dpad) return () => {};

  let activeId: number | null = null;

  const clearAll = () => {
    input.forward = input.back = input.strafeLeft = input.strafeRight = false;
    input.turnLeft = input.turnRight = false;
    dpad.querySelectorAll('.is-pressed').forEach(n => n.classList.remove('is-pressed'));
  };

  const setDir = (dir: 'up' | 'down' | 'left' | 'right' | null) => {
    input.forward = input.back = input.strafeLeft = input.strafeRight = false;
    input.turnLeft = input.turnRight = false;
    dpad.querySelectorAll('.is-pressed').forEach(n => n.classList.remove('is-pressed'));
    if (!dir) return;

    dpad.querySelector(`.${dir}`)?.classList.add('is-pressed');

    if (dir === 'up') input.forward = true;
    else if (dir === 'down') input.back = true;
    else if (dir === 'left')  input.turnLeft  = true;   // rotate only
    else if (dir === 'right') input.turnRight = true;   // rotate only
  };

  const pickDirAt = (clientX: number, clientY: number): 'up' | 'down' | 'left' | 'right' | null => {
    const r = dpad.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dead = Math.min(r.width, r.height) * 0.12;
    if (Math.hypot(dx, dy) < dead) return null;
    return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
  };

  const onDown = (e: PointerEvent) => {
    if (activeId !== null) return;
    activeId = e.pointerId;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDir(pickDirAt(e.clientX, e.clientY));
    e.preventDefault();
  };
  const onMove = (e: PointerEvent) => {
    if (activeId !== e.pointerId) return;
    setDir(pickDirAt(e.clientX, e.clientY));
    e.preventDefault();
  };
  const end = (e: PointerEvent) => {
    if (activeId !== e.pointerId) return;
    activeId = null;
    clearAll();
    e.preventDefault();
  };

  dpad.addEventListener('pointerdown', onDown, { passive: false });
  dpad.addEventListener('pointermove', onMove, { passive: false });
  dpad.addEventListener('pointerup', end, { passive: false });
  dpad.addEventListener('pointercancel', end, { passive: false });
  dpad.addEventListener('pointerleave', end, { passive: false });

  return () => {
    dpad.removeEventListener('pointerdown', onDown);
    dpad.removeEventListener('pointermove', onMove);
    dpad.removeEventListener('pointerup', end);
    dpad.removeEventListener('pointercancel', end);
    dpad.removeEventListener('pointerleave', end);
  };
}

/* Touch A/B */
function bindButtons() {
  const aBtn = document.querySelector('.ab .a') as HTMLElement | null;
  const bBtn = document.querySelector('.ab .b') as HTMLElement | null;

  const bind = (el: HTMLElement | null, onDown: () => void, onUp: () => void) => {
    if (!el) return () => {};
    const down = (e: PointerEvent) => { el.classList.add('is-pressed'); onDown(); e.preventDefault(); };
    const up   = (e: PointerEvent) => { el.classList.remove('is-pressed'); onUp();   e.preventDefault(); };
    el.addEventListener('pointerdown', down, { passive: false });
    el.addEventListener('pointerup', up, { passive: false });
    el.addEventListener('pointercancel', up, { passive: false });
    el.addEventListener('pointerleave', up, { passive: false });
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('pointerleave', up);
    };
  };

  const cleanA = bind(aBtn, () => { input.jump = true; }, () => { input.jump = false; });
  const cleanB = bind(bBtn, () => {}, () => {});
  return () => { cleanA(); cleanB(); };
}

let unbindKeys: (() => void) | null = null;
let unbindDpad: (() => void) | null = null;
let unbindButtons: (() => void) | null = null;

onMounted(() => {
  if (!canvasEl.value) return;
  game = new Game('#f5e8f3');
  game.attachInput(input);
  game.mount(canvasEl.value);

  resizeToCanvas();
  window.addEventListener('resize', resizeToCanvas, { passive: true });
  ro = new ResizeObserver(resizeToCanvas);
  ro.observe(canvasEl.value);

  unbindKeys = bindKeyboard();
  unbindDpad = bindDpad();
  unbindButtons = bindButtons();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeToCanvas);
  ro?.disconnect(); ro = null;
  unbindKeys?.(); unbindKeys = null;
  unbindDpad?.(); unbindDpad = null;
  unbindButtons?.(); unbindButtons = null;
  game?.dispose(); game = null;
});
</script>

<style scoped>
.root { position: relative; width: 100%; height: 100%; overflow: hidden; }
.canvas { display: block; width: 100%; height: 100%; }
.overlay { position: absolute; inset: 0; pointer-events: none; }

:global(.dpad span),
:global(.ab .a),
:global(.ab .b) { touch-action: none; user-select: none; cursor: pointer; }

:global(.dpad span.is-pressed) {
  filter: brightness(0.86) contrast(1.04);
  box-shadow: inset 0 6px 10px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04);
}
:global(.ab .a.is-pressed), :global(.ab .b.is-pressed) {
  transform: translateY(1px);
  filter: brightness(0.9);
  box-shadow: inset 0 8px 14px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.03);
}
</style>
