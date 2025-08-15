<script setup lang="ts"></script>

<template>
  <div class="dpad">
    <span class="up"></span><span class="right"></span>
    <span class="down"></span><span class="left"></span>
    <span class="center"></span>
  </div>
</template>

<style scoped>
.dpad{justify-self:center;position:relative;width:clamp(84px,22vmin,120px);height:clamp(84px,22vmin,120px)}
.dpad span{position:absolute;background:#1c1c1f;border-radius:8px;box-shadow:inset 0 3px 0 rgba(255,255,255,.08), inset 0 -3px 0 rgba(0,0,0,.3)}
.up{left:50%;transform:translateX(-50%);top:0;width:28%;height:45%}
.down{left:50%;transform:translateX(-50%);bottom:0;width:28%;height:45%}
.left{top:50%;transform:translateY(-50%);left:0;width:45%;height:28%}
.right{top:50%;transform:translateY(-50%);right:0;width:45%;height:28%}
.center{left:50%;top:50%;transform:translate(-50%,-50%);width:28%;height:28%;border-radius:50%;background:#141416;box-shadow:inset 0 2px 0 rgba(255,255,255,.06), inset 0 -2px 0 rgba(0,0,0,.4)}
/* allow taps/clicks + visual press */
.dpad span{ touch-action:none; user-select:none; cursor:pointer; transition:filter .06s ease, box-shadow .06s ease; }
.dpad span.is-pressed{
  filter: brightness(0.85) contrast(1.05);
  box-shadow: inset 0 6px 10px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04);
}
</style>
