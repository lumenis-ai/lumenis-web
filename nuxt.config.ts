import process from 'node:process'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: {
    enabled: true,
  },
  pages: {
    pattern: ['**\/*.vue', '!**\/components\/*.vue'],
  },
  runtimeConfig: {
    public: {
      defaultModel: process.env.AI_OPEN_ROUTER_DEFAULT_MODEL,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/mdc',
    '@nuxtjs/supabase',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  ui: {
    fonts: false,
    experimental: {
      componentDetection: true,
    },
  },
  pinia: {
    storesDirs: ['app/stores/**'],
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/login/callback',
    },
  },
})
