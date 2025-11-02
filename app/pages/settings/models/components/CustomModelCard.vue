<script setup lang="ts">
import { z } from 'zod'

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const data = defineModel<OpenAIChatModel>({ default: () => ({}) })
const isEdit = ref(!data.value.model || !data.value.baseURL || !data.value.apiKey)

const schema = z.object({
  model: z.string().min(1, 'Model is required'),
  baseURL: z.string().min(1, 'Base URL is required').url(),
  apiKey: z.string().min(1, 'API Key is required'),
})
type Schema = z.output<typeof schema>
const formData = reactive<Schema>({
  model: data.value.model,
  baseURL: data.value.baseURL,
  apiKey: data.value.apiKey,
})
watch(data, (newVal) => {
  formData.model = newVal.model
  formData.baseURL = newVal.baseURL
  formData.apiKey = newVal.apiKey
}, {
  deep: true,
})

const showPassword = ref(false)

function onSubmit() {
  isEdit.value = false

  data.value = {
    ...data.value,
    ...formData,
  }
}

const cardRef = useTemplateRef('cardRef')
const isHovered = useElementHover(cardRef)
</script>

<template>
  <div ref="cardRef" class="border border-accented rounded-lg p-4">
    <UForm v-if="isEdit" :state="formData" :schema="schema" class="space-y-2" @submit="onSubmit">
      <UFormField label="Model" name="model">
        <UInput v-model="formData.model" placeholder="Model" class="w-full" />
      </UFormField>
      <UFormField label="Base URL" name="baseURL">
        <UInput v-model="formData.baseURL" placeholder="Base URL" class="w-full" />
      </UFormField>
      <UFormField label="API Key" name="apiKey">
        <UInput
          v-model="formData.apiKey"
          placeholder="API Key"
          :type="showPassword ? 'text' : 'password'"
          class="w-full"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>
      <div class="flex items-center gap-2">
        <UButton type="submit" color="primary" variant="solid">
          Save
        </UButton>
        <UButton type="button" color="error" variant="outline" @click="emit('remove')">
          Remove
        </UButton>
      </div>
    </UForm>
    <div v-else class="flex items-center justify-between gap-6">
      <div class="flex items-center gap-1 flex-1 flex-wrap">
        <span class="text-base font-medium text-highlighted">{{ data.model }}</span>
        <span class="text-sm text-toned">{{ data.baseURL }}</span>
      </div>
      <UButton v-if="isHovered" icon="i-lucide-pencil" color="primary" variant="solid" size="xs" @click="isEdit = true" />
    </div>
  </div>
</template>
