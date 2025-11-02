import type { InternalChatModel, OpenAIChatModel } from '~/composables/useAiChat'

export const useModelsStore = defineStore('models', () => {
  const internalModels = ref<string[]>([])
  const customModels = ref<OpenAIChatModel[]>([])

  const selectMenuItems = computed(() => {
    const items = []

    if (internalModels.value.length) {
      items.push(
        internalModels.value.map(model => ({
          provider: 'internal',
          model,
        }) as InternalChatModel),
      )
    }

    if (customModels.value.length) {
      items.push(customModels.value.map(model => ({
        provider: 'custom',
        model: model.model,
        apiKey: model.apiKey,
        baseURL: model.baseURL,
      }) as OpenAIChatModel))
    }

    return items
  })

  return {
    internalModels,
    customModels,

    selectMenuItems,
  }
}, {
  persist: {
    pick: ['internalModels', 'customModels'],
  },
})
