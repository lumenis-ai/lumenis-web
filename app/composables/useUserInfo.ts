export function useUserInfo() {
  const user = useSupabaseUser()

  const email = computed(() => {
    return user.value?.email
  })
  const name = computed(() => {
    return user.value?.user_metadata.preferred_username
      || user.value?.user_metadata.user_name
      || user.value?.user_metadata.name
      || user.value?.email
  })

  const avatarUrl = computed(() => {
    return user.value?.user_metadata.avatar_url
  })

  return {
    user,

    email,
    name,
    avatarUrl,
  }
}
