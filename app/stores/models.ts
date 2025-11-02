import type { OpenAIChatModel } from '~/composables/useAiChat'

export const useModelsStore = defineStore('models', () => {
  const internalModels = ref<string[]>([])
  const customModels = ref<OpenAIChatModel[]>([])

  return {
    internalModels,
    customModels,
  }
}, {
  persist: true,
})
