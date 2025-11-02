<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

definePageMeta({
  redirect: {
    name: 'settings-models',
  },
})

const sidebarCollapsed = ref(false)

const menuItems: NavigationMenuItem[][] = [
  [
    {
      label: 'Models',
      to: {
        name: 'settings-models',
      },
    },
  ],
]
</script>

<template>
  <UDashboardGroup storage-key="lumenis-settings-sidebar">
    <UDashboardSidebar
      v-model:collapsed="sidebarCollapsed"
      resizable
      collapsible
      :default-size="20"
      :min-size="15"
      :max-size="30"
      :ui="{ body: 'py-6' }"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="w-full flex items-center justify-between">
          <UIcon name="i-lucide-sparkles" class="size-5 text-primary" />
          <UDashboardSidebarCollapse />
        </div>
        <UIcon v-else name="i-lucide-sparkles" class="size-5 text-primary mx-auto" />
      </template>
      <UNavigationMenu orientation="vertical" :items="menuItems" />
    </UDashboardSidebar>
    <UDashboardPanel class="flex flex-col">
      <template #header>
        <UDashboardNavbar title="Settings">
          <template v-if="sidebarCollapsed" #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template #right>
            <div class="flex items-center gap-2">
              <UButton
                icon="i-lucide-boom-box"
                color="neutral"
                size="md"
                variant="ghost"
                @click="navigateTo({
                  name: 'apps',
                })"
              />
              <UColorModeButton />
            </div>
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <NuxtPage />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
