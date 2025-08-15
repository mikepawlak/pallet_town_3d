<script setup lang="ts"></script>

<template>
  <div class="row">
    <span class="pill">SELECT</span>
    <span class="pill">START</span>
  </div>
</template>

<style scoped>
.row{grid-column:1/span 3;justify-self:center;display:flex;gap:clamp(12px,3.5vmin,20px)}
.pill{
  font-family:var(--font-ui);font-size:clamp(10px,2.5vmin,12px);
  color:#1b1e22;letter-spacing:.06em;background:#cfd2da;border-radius:999px;
  padding:clamp(6px,1.6vmin,8px) clamp(12px,3vmin,16px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 0 rgba(0,0,0,.25);
}
</style>
