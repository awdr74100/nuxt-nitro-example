// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    APP_ACCESS_TOKEN_SECRET: 'SECRET',
    APP_REFRESH_TOKEN_SECRET: 'SECRET',
    IMGUR_CLIENT_ID: 'ID',
    IMGUR_CLIENT_SECRET: 'SECRET',
    IMGUR_REFRESH_TOKEN: 'TOKEN',
  },
});
