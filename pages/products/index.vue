<template>
  <main class="my-4 bg-green-600 p-4 text-white">
    <h1 class="text-2xl">路徑：{{ route.path }}</h1>
    <ul class="mt-4 flex items-center">
      <li>
        <button class="border-2 border-green-300 px-4 py-1" @click="refresh()">
          重新獲取
        </button>
      </li>
    </ul>
    <ul class="-mx-2 mt-4 flex flex-wrap">
      <li
        v-for="(product, index) in data?.products"
        :key="index"
        class="w-1/5 p-2"
      >
        <div class="border-2 p-4">
          <p>名稱：{{ product.title }}</p>
          <p>價格：{{ product.price }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '全部商品',
});

const route = useRoute();

const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));

await delay();

const { data, refresh } = await useFetch('/api/products', {
  pick: ['products'],
});
</script>
