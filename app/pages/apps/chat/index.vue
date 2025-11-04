<script setup lang="ts">
const sidebarCollapsed = ref(false)

const { selectMenuItems } = storeToRefs(useModelsStore())

const prompt = ref('')

const model = shallowRef<InternalChatModel | OpenAIChatModel>({
  provider: 'internal',
})
const { messages, send, stop, status } = useAiChat(model)
function onSend() {
  send(prompt.value)
  prompt.value = ''
}
</script>

<template>
  <UDashboardGroup storage-key="lumenis-apps-chat-sidebar">
    <UDashboardSidebar
      v-model:collapsed="sidebarCollapsed"
      resizable
      collapsible
      :default-size="20"
      :min-size="15"
      :max-size="30"
      :ui="{ footer: 'py-6' }"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="w-full flex items-center justify-between">
          <UIcon name="i-lucide-sparkles" class="size-5 text-primary" />
          <UDashboardSidebarCollapse />
        </div>
        <UIcon v-else name="i-lucide-sparkles" class="size-5 text-primary mx-auto" />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel class="flex flex-col">
      <template #header>
        <UDashboardNavbar title="Lumenis">
          <template v-if="sidebarCollapsed" #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template #right>
            <div class="flex items-center gap-2">
              <UButton
                icon="i-lucide-settings"
                color="neutral"
                size="md"
                variant="ghost"
                @click="navigateTo({
                  name: 'settings-models',
                })"
              />
              <UColorModeButton />
              <ProfileAvatar />
            </div>
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <UChatMessages
          :status="status"
          should-auto-scroll
          should-scroll-to-bottom
        >
          <AiMessage
            v-for="(message, i) in messages"
            :key="message.type + message.id "
            :message="message"
            :show-actions="i === messages.length - 1"
          />
        </UChatMessages>
      </template>
      <template #footer>
        <div class="p-6">
          <UChatPrompt v-model="prompt" placeholder="Ask anything..." :maxrows="6" @submit="onSend">
            <template #footer>
              <div class="w-full flex items-center justify-between">
                <USelectMenu v-model="model" :items="selectMenuItems" label-key="model" placeholder="Select model" />
                <UChatPromptSubmit :status="status" @stop="stop" />
              </div>
            </template>
          </UChatPrompt>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
