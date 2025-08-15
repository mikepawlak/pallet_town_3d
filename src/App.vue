<script setup lang="ts">
import '@/styles/tokens.css';
import ViewportBackdrop from '@/components/gbc/ViewportBackdrop.vue';
import DeviceShell from '@/components/gbc/DeviceShell.vue';
import Bezel from '@/components/gbc/Bezel.vue';
import BezelTopRow from '@/components/gbc/BezelTopRow.vue';
import LogoColor from '@/components/gbc/LogoColor.vue';
import ScreenFrame from '@/components/gbc/ScreenFrame.vue';
import ControlsPanel from '@/components/gbc/ControlsPanel.vue';
import GameCanvas from '@/components/GameCanvas.vue';
</script>

<template>
  <ViewportBackdrop>
    <DeviceShell>
      <Bezel>
        <template #top><BezelTopRow /></template>

        <ScreenFrame>
          <GameCanvas>
            <div class="vignette" aria-hidden="true"></div>
            <div class="hud">
              <div class="card">
                <div class="title">Pallet Town — GBC</div>
                <div class="sub">Orbit to look around · Scroll to zoom</div>
              </div>
              <div class="controls-bar">
                <span class="key">A</span><span class="hint">Interact</span>
                <span class="gap"></span>
                <span class="key">B</span><span class="hint">Back</span>
                <span class="gap"></span>
                <span class="key">Start</span><span class="hint">Menu</span>
              </div>
            </div>
          </GameCanvas>
        </ScreenFrame>

        <template #bottom><LogoColor /></template>
      </Bezel>

      <ControlsPanel />
    </DeviceShell>
  </ViewportBackdrop>
</template>

<style>
  /* === Interaction hardening (prevents text highlight / long-press callouts) === */
html, body, #app {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;        /* iOS long-press menu */
  -webkit-tap-highlight-color: transparent; /* iOS gray flash */
}

/* Make the whole device UI non-selectable and drag-proof */
.device, .device * {
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  user-drag: none;
}

/* Controls: already have touch-action in GameCanvas, reinforce here globally */
.dpad span,
.ab .a,
.ab .b,
.start-select,
.start-select * {
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Decorative bezel labels shouldn't steal touches */
.bezel-top,
.bezel-bottom,
.bezel-top *,
.bezel-bottom * {
  pointer-events: none;   /* let touches reach the game/controls underneath */
  -webkit-user-select: none;
  user-select: none;
}

/* Images/canvas shouldn’t trigger drag/select behaviors */
img, svg, canvas {
  -webkit-user-drag: none;
  user-drag: none;
  -webkit-user-select: none;
  user-select: none;
}

</style>

<style scoped>
.vignette{position:absolute;inset:0;z-index:1;pointer-events:none;--vig-inner:60%;--vig-outer:86%;--vig-edge:.55;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) var(--vig-inner),rgba(0,0,0,calc(var(--vig-edge)*.35)) var(--vig-outer),rgba(0,0,0,var(--vig-edge)) 100%);mix-blend-mode:multiply}
.hud{position:absolute;inset:0;z-index:2;pointer-events:none;display:grid;grid-template-rows:1fr auto;align-items:start;padding:10px;gap:8px;color:#fff;font-family:var(--font-mono)}
.card{pointer-events:auto;align-self:start;justify-self:start;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.35);padding:10px 12px;border-radius:10px;backdrop-filter:blur(2px);box-shadow:0 6px 18px rgba(0,0,0,.25);max-width:min(92%,520px)}
.title{font-weight:700;text-transform:uppercase;font-size:14px;margin-bottom:2px}
.sub{font-size:12px;color:#d3d7e0}
.controls-bar{pointer-events:auto;justify-self:center;align-self:end;display:flex;align-items:center;gap:10px;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.35);padding:8px 12px;border-radius:999px;font-size:12px}
.controls-bar .key{display:inline-block;min-width:18px;padding:2px 6px;border:1px solid rgba(255,255,255,.35);border-radius:4px;text-transform:uppercase;font-weight:700;background:rgba(255,255,255,.08);margin-right:6px}
.controls-bar .hint{opacity:.95}
.controls-bar .gap{width:12px;display:inline-block}
/* make on-screen controls actually receive taps */
.controls .dpad span,
.controls .ab .a,
.controls .ab .b {
  touch-action: none;
  user-select: none;
  cursor: pointer;
}
</style>
