<script setup lang="ts">
import PowerIndicator from './PowerIndicator.vue';
import BrandTop from './BrandTop.vue';
</script>

<template>
  <div class="row">
    <PowerIndicator />
    <BrandTop />
  </div>
</template>

<style scoped>
.row{position:relative;min-height:0}
</style>
