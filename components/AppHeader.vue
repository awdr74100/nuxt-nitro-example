<template>
  <header class="header">
    <span class="logo ml-3"></span>
    <ul class="list ml-3">
      <li v-for="({ path, name }, index) in routes" :key="index">
        <RouterLink :to="path" :class="{ active: route.path === path }">
          {{ name }}</RouterLink
        >
      </li>
    </ul>
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
    name: '會員登入',
  },
];

const route = useRoute();
</script>

<style scoped>
.header {
  background-color: #252525;

  display: flex;
  align-items: center;
}

.ml-3 {
  margin-left: 15px !important;
}

.logo {
  display: inline-block;
  width: 47px;
  height: 47px;
  background-image: url('~/assets/img/logo.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.list {
  display: flex;
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.list a {
  display: inline-block;
  color: white;
  text-decoration: none;
  padding: 13px 26px;
}

.list a:hover {
  color: #c2c2c2;
}

.active {
  color: rgb(0, 220, 130) !important;
}
</style>
