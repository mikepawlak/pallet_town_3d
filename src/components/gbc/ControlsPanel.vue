<script setup lang="ts">
import DPad from './controls/DPad.vue';
import ABButtons from './controls/ABButtons.vue';
import StartSelect from './controls/StartSelect.vue';
import Speaker from './controls/Speaker.vue';
</script>

<template>
  <div class="controls">
    <DPad />
    <ABButtons />
    <StartSelect />
    <Speaker />
  </div>
</template>

<style scoped>
.controls{
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  column-gap:clamp(12px,5vmin,24px);
  row-gap:clamp(10px,2vmin,16px);
  padding:clamp(6px,1.5vmin,10px) clamp(8px,2vmin,12px);
}
</style>
