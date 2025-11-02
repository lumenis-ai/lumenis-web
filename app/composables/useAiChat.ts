import type { AIMessage, AIMessageChunk } from '@langchain/core/messages'
import { HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'

export interface ChatModel {
  prompt?: string
}

export interface InternalChatModel extends ChatModel {
  provider: 'internal'
  model?: string
}

export interface OpenAIChatModel extends ChatModel {
  provider: 'custom'
  model: string
  apiKey: string
  baseURL: string
}

export interface AiChatOptions {
  model?: InternalChatModel | OpenAIChatModel
}

export type AiChatMessage = HumanMessage | AIMessage

export function useAiChat(model: Ref<InternalChatModel | OpenAIChatModel>) {
  const config = useRuntimeConfig()

  const chatModel = computed(() => {
    if (model.value.provider === 'internal') {
      return new ChatOpenAI({
        model: model.value.model || config.public.defaultModel,
        configuration: {
          apiKey: '',
          baseURL: `${location?.origin || 'http://localhost:7000'}/api/ai`,
        },
      })
    }
    else {
      return new ChatOpenAI({
        model: model.value.model,
        apiKey: model.value.apiKey,
        configuration: {
          baseURL: model.value.baseURL,
        },
      })
    }
  })

  const messages = shallowReactive<Array<AiChatMessage>>([])

  const status = ref<'error' | 'submitted' | 'streaming' | 'ready'>('ready')
  const abortController = shallowRef<AbortController | null>(null)
  const send = async (question: string) => {
    status.value = 'submitted'

    const humanMessage = new HumanMessage([
      {
        type: 'text',
        text: question,
      },
    ])

    messages.push(humanMessage)

    abortController.value = new AbortController()

    try {
      for await (const chunk of await chatModel.value.stream(messages, {
        signal: abortController.value!.signal,
      })) {
        status.value = 'streaming'

        const lastMessage = messages[messages.length - 1]!

        if (!lastMessage || lastMessage.type !== 'ai') {
          messages.push(chunk)
        }
        else {
          messages[messages.length - 1] = (lastMessage as AIMessageChunk).concat(chunk)
        }
      }

      status.value = 'ready'
    }
    catch (error) {
      console.error(error)
      status.value = 'error'
    }
    finally {
      const lastMessage = messages[messages.length - 1]!
      if (lastMessage.type === 'human') {
        lastMessage.id = crypto.randomUUID()
      }
      else {
        humanMessage.id = lastMessage.id
      }
    }
  }
  const stop = () => {
    if (!abortController.value) {
      return
    }

    abortController.value.abort()
    abortController.value = null

    status.value = 'ready'
  }

  return {
    model,
    messages,

    status,
    send,
    stop,
  }
}
