<template>
  <main class="my-4 bg-green-600 p-4 text-white">
    <h1 class="text-2xl">路徑：{{ route.path }}</h1>
    <form
      class="mt-4"
      action="#"
      @submit.prevent="user.signIn(usernameOrEmail, password)"
    >
      <label for="usernameOrEmail">用戶名稱或信箱：</label>
      <input
        type="text"
        id="usernameOrEmail"
        placeholder="username or email..."
        class="text-green-600"
        v-model="usernameOrEmail"
      />
      <label for="password">密碼：</label>
      <input
        type="password"
        class="text-green-600"
        placeholder="password..."
        v-model="password"
      />
      <button type="submit" class="border-2 border-red-400">登入</button>
    </form>

    <p v-if="user.id">{{ user.id }}</p>
    <p v-if="user.email">{{ user.email }}</p>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '登入',
});

const route = useRoute();

const user = useUserStore();

const usernameOrEmail = ref('');
const password = ref('');
</script>
