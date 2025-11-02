export interface OpenRouterModelData {
  id: string
  name: string
  description: string
  pricing: Record<string, number | string | null>
  supported_parameters: string[]
  architecture: {
    modality: string | null
    input_modalities: Array<'text' | 'image' | 'file' | 'audio' | 'video'>
    output_modalities: Array<'text' | 'image' | 'embeddings'>
  }
}
