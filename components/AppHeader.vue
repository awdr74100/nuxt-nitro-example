<template>
  <header class="flex items-center bg-green-600 text-white">
    <span
      class="mx-4 inline-block h-12 w-12 bg-[url(~/assets/img/logo.svg)] bg-cover bg-center bg-no-repeat"
    ></span>
    <nav>
      <ul class="flex items-center">
        <li v-for="({ path, name }, index) in routes" :key="index">
          <NuxtLink
            class="inline-block px-4 py-3 hover:text-gray-300"
            :to="path"
            >{{ name }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const routes = [
  {
    path: '/',
    name: '首頁',
  },
  {
    path: '/products',
    name: '全部商品',
  },
  {
    path: '/signin',
    name: '登入',
  },
  {
    path: '/checkout',
    name: '結帳',
  },
];
</script>
