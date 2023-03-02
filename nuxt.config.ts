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
});
