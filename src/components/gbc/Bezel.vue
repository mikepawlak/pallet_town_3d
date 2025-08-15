<script setup lang="ts">
/** Black bezel with 3 slots: top (labels), screen, bottom (logo). */
</script>

<template>
  <div class="bezel">
    <div class="top"><slot name="top" /></div>
    <div class="screen"><slot /></div>
    <div class="bottom"><slot name="bottom" /></div>
  </div>
</template>

<style scoped>
.bezel{
  background:var(--bezel);
  border-radius:var(--radius-md);
  padding:clamp(12px,2vmin,18px);
  box-shadow:inset 0 0 28px rgba(0,0,0,.7);
  display:grid;
  grid-template-rows:auto 1fr auto;
  gap:clamp(6px,1.4vmin,10px);
  color:var(--ink);
}
.top{position:relative;min-height:0}
.screen{
  margin:0 auto;width:100%;max-width:100%;
  aspect-ratio:var(--screen-ar);
  background:#000;border-radius:var(--radius-sm);
  overflow:hidden;position:relative;z-index:0;
}
.bottom{display:flex;align-items:baseline;justify-content:center;gap:10px;user-select:none;pointer-events:none}
</style>
