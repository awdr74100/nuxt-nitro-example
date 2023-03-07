<template>
  <main class="my-4 bg-green-600 p-4 text-white">
    <h1 class="text-2xl">路徑：{{ route.path }}</h1>
    <form
      class="mt-4"
      action="#"
      @submit.prevent="user.signIn(usernameOrEmail, password)"
    >
      <div>
        <label for="usernameOrEmail">用戶名稱或信箱：</label>
        <input
          type="text"
          id="usernameOrEmail"
          placeholder="請輸入用戶名稱或信箱"
          class="rounded-sm px-1.5 py-1 text-black"
          v-model="usernameOrEmail"
        />
      </div>
      <div class="mt-2">
        <label for="password">密碼：</label>
        <input
          type="password"
          class="rounded-sm px-1.5 py-1 text-black"
          placeholder="請輸入密碼"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="mt-2 rounded-sm bg-green-700 px-2 py-1 hover:bg-green-900"
      >
        登入
      </button>
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
