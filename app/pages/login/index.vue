<script setup lang="ts">
import type { AuthFormField, ButtonProps } from '@nuxt/ui'

const auth = useSupabaseClient()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox',
}]

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
      <UAuthForm title="Login" description="Enter your credentials to access your account." :fields="fields" :providers="providers" />
    </UPageCard>
  </div>
</template>
