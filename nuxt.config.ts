// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    API_ACCESS_TOKEN_SECRET: 'SECRET',
    API_REFRESH_TOKEN_SECRET: 'SECRET',
    GCP_OAUTH_CLIENT_ID: 'ID',
    GCP_OAUTH_CLIENT_SECRET: 'SECRET',
    IMGUR_CLIENT_ID: 'ID',
    IMGUR_CLIENT_SECRET: 'SECRET',
    IMGUR_REFRESH_TOKEN: 'TOKEN',
    NEWEBPAY_MERCHANT_ID: 'ID',
    NEWEBPAY_HASH_KEY: 'KEY',
    NEWEBPAY_HASH_IV: 'IV',
  },
  app: {
    // head: {
    //   title: 'Nuxt & Nitro Demo',
    //   meta: [
    //     {
    //       name: 'description',
    //       content: 'My amazing site',
    //     },
    //   ],
    // },
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore'],
  },
  tailwindcss: {
    viewer: false,
  },
});
