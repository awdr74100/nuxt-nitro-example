// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    databaseUrl: 'mongodb://127.0.0.1:27017/nuxt',
    accessTokenSecret: 'SECRET',
    refreshTokenSecret: 'SECRET',
  },
});
