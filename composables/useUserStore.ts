export default defineStore('user', () => {
  const id = ref<null | string>(null);
  const email = ref<null | string>(null);

  const signUp = (email: string, username: string, password: string) => {};

  const signIn = async (usernameOrEmail: string, password: string) => {
    const body = { usernameOrEmail, password };

    const { user, success } = await $fetch('/api/auth/signin', {
      method: 'POST',
      body,
    });

    if (success && user) {
      id.value = user.id;
      email.value = user.email;
      console.log(user);
    }
  };

  const signOut = () => {};

  return { id, email, signIn };
});
