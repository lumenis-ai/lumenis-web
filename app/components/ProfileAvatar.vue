<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()

const avatarUrl = computed(() => {
  return user.value?.user_metadata.avatar_url
})
const useName = computed(() => {
  return user.value?.user_metadata.preferred_username
    || user.value?.user_metadata.user_name
    || user.value?.user_metadata.name
    || user.value?.email
})

const items = computed(() => [

  [
    {
      type: 'label',
      avatar: {
        src: avatarUrl.value,
      },
      label: useName.value,
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
