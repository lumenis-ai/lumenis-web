<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <Analytics />
  <UApp
    :toaster="{ position: 'top-center' }"
    :tooltip="{ delayDuration: 300 }"
  >
    <div class="h-screen w-screen">
      <NuxtPage />
    </div>
    <UOverlayProvider />
  </UApp>
</template>
