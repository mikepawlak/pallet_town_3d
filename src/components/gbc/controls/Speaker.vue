<script setup lang="ts"></script>

<template>
  <div class="speaker" aria-hidden="true">
    <i v-for="n in 28" :key="n"></i>
  </div>
</template>

<style scoped>
.speaker{
  grid-column:3/span 1;justify-self:end;
  width:clamp(92px,22vmin,120px);height:clamp(48px,12vmin,64px);
  display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;gap:clamp(6px,1.5vmin,8px);
  transform:rotate(-12deg) translate(-4%,6%);
}
.speaker i{display:block;width:100%;height:100%;border-radius:50%;background:#0f0f12;box-shadow:inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5)}
</style>
