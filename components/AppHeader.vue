<template>
  <header class="header">
    <span class="logo ml-3"></span>
    <nav>
      <ul class="list ml-3">
        <li v-for="({ path, name }, index) in routes" :key="index">
          <NuxtLink :to="path" :class="{ active: route.path === path }">{{
            name
          }}</NuxtLink>
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
    path: '/signin',
    name: '會員登入',
  },
  {
    path: '/profile',
    name: '個人資料',
  },
  {
    path: '/products',
    name: '全部商品',
  },
  {
    path: '/products/foo',
    name: '指定商品',
  },
];

const route = useRoute();
</script>

<style scoped>
.header {
  background-color: #252525;
  display: flex;
  align-items: center;
  padding: 9px;
}

.ml-3 {
  margin-left: 15px !important;
}

.logo {
  display: inline-block;
  width: 43px;
  height: 43px;
  background-image: url(~/assets/img/logo.svg);
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
  padding: 11px 26px;
}

.list a:hover {
  color: #c2c2c2;
}

.active {
  color: rgb(0, 220, 130) !important;
}
</style>
