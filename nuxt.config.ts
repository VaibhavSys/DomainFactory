// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "nuxt-shiki"],
  shiki: {
    defaultTheme: 'github-dark',
  },
  app: {
    head: {
      script: [
        {
          src: 'https://atmosphere.butterservers.com/crust',
          defer: true,
          'data-website-id': 'b9a83a75-d472-42be-bc85-e8b65207d44d'
        }
      ]
    }
  }
})