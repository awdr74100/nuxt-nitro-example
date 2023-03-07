<template>
  <main class="my-4 bg-green-600 p-4 text-white">
    <h1 class="text-2xl">路徑：{{ route.path }}</h1>
    <form action="#" class="mt-4" @submit.prevent="checkout">
      <div>
        <label for="email">信箱：</label>
        <input
          type="email"
          class="rounded-sm px-1.5 py-1 text-black"
          id="email"
          placeholder="請輸入信箱"
          v-model="email"
        />
      </div>
      <div class="mt-2">
        <label for="title">標題：</label>
        <input
          type="text "
          class="rounded-sm px-1.5 py-1 text-black"
          id="title"
          placeholder="請輸入標題"
          v-model="title"
        />
      </div>
      <div class="mt-2">
        <label for="amount">總額：</label>
        <input
          type="number"
          id="amount"
          class="rounded-sm px-1.5 py-1 text-black"
          placeholder="請輸入總額"
          v-model="amount"
        />
      </div>
      <button
        type="submit"
        class="mt-2 rounded-sm bg-green-700 px-2 py-1 hover:bg-green-900"
        @click.prevent="checkout"
      >
        結帳
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '結帳',
});

const route = useRoute();

const email = ref('');
const title = ref('');
const amount = ref('');

const checkout = async () => {
  const { success } = await $fetch('/api/orders', {
    method: 'POST',
    body: {
      email: email.value,
      title: title.value,
      amount: amount.value,
    },
  });
  console.log(success);
};
</script>
