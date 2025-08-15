<script setup lang="ts"></script>

<template>
  <div class="frame">
    <slot />
  </div>
</template>

<style scoped>
.frame{
  width:100%;
  aspect-ratio: var(--screen-ar);
  position:relative;
  overflow:hidden;
}
</style>
