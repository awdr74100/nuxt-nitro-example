<template>
  <Title>會員登入</Title>

  <h1>會員登入</h1>
  <form action="#" @submit.prevent="signin">
    <div class="mt-3">
      <label for="usernameOrEmail">帳號：</label>
      <input
        type="text"
        id="usernameOrEmail"
        placeholder="username or email"
        v-model.trim="usernameOrEmail"
      />
    </div>
    <div class="mt-3">
      <label for="password">密碼：</label>
      <input
        type="password"
        id="password"
        placeholder="password"
        v-model.trim="password"
      />
    </div>
    <button type="submit" class="mt-3">登入</button>
  </form>
</template>

<script setup lang="ts">
const usernameOrEmail = ref('');
const password = ref('');

const signin = () => {
  console.log(usernameOrEmail.value, password.value);
};
</script>

<style scoped>
.mt-3 {
  margin-top: 15px;
}
</style>
