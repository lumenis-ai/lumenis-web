<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const auth = useSupabaseClient()

const providers: ButtonProps[] = [
  {
    label: 'Google',
    icon: 'i-logos-google-icon',
    onClick: () => {
      auth.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window?.location?.origin}/login/callback`,
        },
      })
    },
  },
  {
    label: 'Github',
    icon: 'i-logos-github-icon',
    onClick: async () => {
      auth.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window?.location?.origin}/login/callback`,
        },
      })
    },
  },
]
</script>

<template>
  <div class="flex items-center justify-center h-full px-10">
    <UPageCard
      class="w-full max-w-sm"
      spotlight
      spotlight-color="primary"
    >
      <UAuthForm title="Lumenis AI" description="Log in using your usual account." :providers="providers" />
    </UPageCard>
  </div>
</template>
