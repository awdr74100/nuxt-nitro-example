<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 蝦皮購物` : '蝦皮購物';
  },
});
</script>

<style scoped>
main {
  padding: 10px;
}
</style>
