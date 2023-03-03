<template>
  <main class="my-4 bg-green-600 p-4 text-white">
    <h1 class="text-2xl">路徑：{{ route.path }}</h1>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '首頁',
});

const route = useRoute();
</script>
