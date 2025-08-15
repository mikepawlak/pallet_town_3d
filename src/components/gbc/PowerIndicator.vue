<script setup lang="ts">
/** POWER LED and label. */
</script>

<template>
  <div class="power">
    <span class="led" aria-hidden="true"></span>
    <span class="label">POWER</span>
  </div>
</template>

<style scoped>
.power{
  position:absolute;left:0;top:0;transform:translate(4px,0);
  display:flex;align-items:center;gap:10px;
  font-family:var(--font-ui);font-size:clamp(10px,1.6vmin,12px);
  letter-spacing:.09em;opacity:.98;user-select:none;pointer-events:none;
}
.led{
  width:clamp(12px,2.4vmin,14px);height:clamp(12px,2.4vmin,14px);border-radius:50%;
  background:radial-gradient(circle at 45% 45%,#ffb347 0%,#ff5a36 40%,#ff1f2a 68%,#b5001f 100%);
  box-shadow:0 0 2px 1px rgba(255,120,80,.9),0 0 10px 4px rgba(255,60,60,.9),0 0 18px 8px rgba(255,30,30,.6);
  outline:1px solid rgba(255,255,255,.25);outline-offset:-1px;
}
.label{font-weight:800;color:var(--ink);text-shadow:0 1px 0 rgba(0,0,0,.4)}
</style>
