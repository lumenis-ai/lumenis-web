<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <div class="h-screen w-screen">
      <NuxtPage />
    </div>
    <UOverlayProvider />
  </UApp>
</template>
