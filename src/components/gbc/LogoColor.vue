<script setup lang="ts">
/** GAME BOY + multicolor COLOR letters. */
</script>

<template>
  <div class="wrap">
    <span class="gb">GAME BOY</span>
    <span class="color"><i>C</i><i>O</i><i>L</i><i>O</i><i>R</i></span>
  </div>
</template>

<style scoped>
.wrap{display:flex;align-items:baseline;justify-content:center;gap:10px}
.gb{font-weight:900;letter-spacing:.06em}
.color i{font-style:normal;font-weight:900;letter-spacing:.06em;margin-left:2px;display:inline-block;transform-origin:50% 80%}
.color i:nth-child(1){color:#8b5cf6;transform:rotate(-8deg) skewY(-3deg) translateY(1px)}
.color i:nth-child(2){color:#22c55e;transform:rotate(5deg)  skewY(2deg)  translateY(-1px)}
.color i:nth-child(3){color:#eab308;transform:rotate(-6deg) skewY(-2deg) translateY(0)}
.color i:nth-child(4){color:#ef4444;transform:rotate(8deg)  skewY(3deg)  translateY(-1px)}
.color i:nth-child(5){color:#3b82f6;transform:rotate(-4deg) skewY(-2deg) translateY(1px)}
</style>
