<template>
  <div class="container relative mx-auto">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 酷酷網站` : '酷酷網站';
  },
});
</script>
