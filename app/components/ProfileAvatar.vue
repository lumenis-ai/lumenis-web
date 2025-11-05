<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { avatarUrl, name } = useUserInfo()

const items = computed(() => [

  [
    {
      type: 'label',
      avatar: {
        src: avatarUrl.value,
      },
      label: name.value,
    },
    {
      type: 'separator',
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onClick: () => {
        useSupabaseClient().auth.signOut().then(({ error }) => {
          if (!error) {
            navigateTo({
              name: 'login',
            })
          }
        })
      },
    },
  ],

] as DropdownMenuItem[])
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton
      :avatar="{
        src: avatarUrl,
      }"
      size="md"
      variant="ghost"
    />
  </UDropdownMenu>
</template>
