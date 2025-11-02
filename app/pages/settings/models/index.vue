<script setup lang="ts">
import CustomModelCard from './components/CustomModelCard.vue'

const { internalModels, customModels } = storeToRefs(useModelsStore())

const { data: internalModelsOptions, status } = useFetch('/api/ai/models', {
  transform: (data: OpenRouterModelData[]) => {
    return data?.map(item => ({
      label: item.id,
      value: item.id,
    })) ?? []
  },
})

function addCustomModel() {
  customModels.value.push({
    provider: 'custom',
    apiKey: '',
    baseURL: '',
    model: '',
  })
}
function removeCustomModel(index: number) {
  customModels.value.splice(index, 1)
}
</script>

<template>
  <div>
    <UForm class="space-y-4">
      <UFormField label="Internal Models">
        <USelectMenu
          v-model="internalModels"
          class="w-full"
          :items="internalModelsOptions"
          value-key="value"
          :loading="status === 'pending'"
          placeholder="Select internal models"
          multiple
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
        />
      </UFormField>
      <UFormField label="Custom Models">
        <div class="space-y-2">
          <CustomModelCard
            v-for="(_, index) in customModels"
            :key="index"
            v-model="customModels[index]"
            @remove="removeCustomModel(index)"
          />
          <UButton color="neutral" variant="outline" icon="i-lucide-plus" block @click="addCustomModel">
            Add Custom Model
          </UButton>
        </div>
      </UFormField>
    </UForm>
  </div>
</template>
