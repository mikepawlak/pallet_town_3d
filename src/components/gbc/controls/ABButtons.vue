<script setup lang="ts"></script>

<template>
  <div class="ab">
    <span class="a">A</span>
    <span class="b">B</span>
  </div>
</template>

<style scoped>
.ab{grid-column:3/span 1;justify-self:center;display:grid;gap:clamp(10px,2.4vmin,14px);transform:rotate(-12deg)}
.a,.b{
  width:clamp(52px,13vmin,68px);height:clamp(52px,13vmin,68px);
  display:grid;place-items:center;border-radius:50%;
  background:#1c1c21;color:#bbb;font-weight:800;letter-spacing:.06em;
  box-shadow:inset 0 3px 0 rgba(255,255,255,.08), inset 0 -4px 0 rgba(0,0,0,.35);
}
.ab .a, .ab .b{ touch-action:none; user-select:none; cursor:pointer; transition:transform .06s ease, filter .06s ease, box-shadow .06s ease; }
.ab .a.is-pressed, .ab .b.is-pressed{
  transform: translateY(1px);
  filter: brightness(0.9);
  box-shadow: inset 0 8px 14px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.03);
}

</style>
