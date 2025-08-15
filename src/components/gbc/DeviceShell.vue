<script setup lang="ts">
/** Container for the teal case that sizes to the visual viewport. */
</script>

<template>
  <div class="shell"  @contextmenu.prevent>
    <slot />
  </div>
</template>

<style scoped>
.shell{
  display:grid;
  grid-template-rows:auto 1fr auto;
  gap:clamp(10px,2vmin,16px);
  width:min(100dvw - 24px, 560px);
  height:min(100dvh - 24px, 980px);
  margin:12px;
  padding:clamp(12px,2.5vmin,18px);
  border-radius:var(--radius-lg);
  background-color:var(--case);
  background-image:
    radial-gradient(140% 120% at 18% 8%, rgba(255,255,255,.12), transparent 40%),
    linear-gradient(180deg, var(--case), var(--case-dark));
  box-shadow:var(--shadow-inset), var(--shadow-elev);
  border:1px solid rgba(0,0,0,.25);
  overflow:hidden;
}
@media (min-width:900px){
  .shell{
    width:min(100dvw - 48px, 820px);
    height:min(100dvh - 48px, 1220px);
    margin:24px;
  }
}
</style>
