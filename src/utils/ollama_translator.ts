import {
  TranslateInput,
  TranslateOutput,
  TranslationLLM,
} from './translation_abstract'

interface OllamaConfig {
  apiUrl: string
  modelName: string
}
export class OllamaTranslator extends TranslationLLM<OllamaConfig> {
  constructor(config: OllamaConfig) {
    super(config)
  }

  async translate(input: TranslateInput): Promise<TranslateOutput> {
    const system =
      'You are an expert translator with deep understanding of language nuances, cultural context, and specialized terminology. Provide accurate and natural-sounding translations while preserving the original meaning.'
    const prompt = `Translate the following text from ${input.sourceLanguage} to ${input.targetLanguage}:\n\n${input.text}`
    const format = {
      type: 'object',
      properties: {
        translated_text: {
          type: 'string',
        },
      },
      required: ['translated_text'],
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.modelName,
          prompt: prompt,
          system: system,
          format: format,
          stream: false,
        }),
        signal: input.abortSignal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Translation failed')
      }

      const data = await response.json()
      return { translatedText: JSON.parse(data.response).translated_text }
    } catch (error) {
      console.error('Translation error:', error)
      throw new Error('An error occurred while translating')
    }
  }
}
