<script setup lang="ts">
const { user, avatarUrl, name } = useUserInfo()
const redirectInfo = useSupabaseCookieRedirect()

const toast = useToast()
watch(user, () => {
  if (user.value) {
    toast.add({
      title: name.value,
      description: 'Welcome to Lumenis AI.',
      avatar: {
        src: avatarUrl.value,
      },
      color: 'success',
    })

    const path = redirectInfo.pluck()

    return navigateTo(path || '/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex items-center justify-center h-full px-10">
    <UPageCard
      class="w-full max-w-sm"
      icon="i-lucide-loader"
      title="Logging In Lumenis AI"
      variant="subtle"
      spotlight
      spotlight-color="warning"
      :ui="{
        leadingIcon: 'animate-spin',
      }"
    />
  </div>
</template>
