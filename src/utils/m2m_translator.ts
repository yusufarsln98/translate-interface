import {
  TranslateInput,
  TranslateOutput,
  TranslationLLM,
} from './translation_abstract'

interface M2MConfig {
  apiUrl: string
}
export class M2MTranslator extends TranslationLLM<M2MConfig> {
  constructor(config: M2MConfig) {
    super(config)
  }

  async translate(input: TranslateInput): Promise<TranslateOutput> {
    try {
      const response = await fetch(`${this.config.apiUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input.text,
          src_lang: input.sourceLanguage,
          tgt_lang: input.targetLanguage,
        }),
        signal: input.abortSignal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Translation failed')
      }

      const data = await response.json()
      return { translatedText: data.translated_text }
    } catch (error) {
      console.error('Translation error:', error)
      throw new Error('An error occurred while translating')
    }
  }
}
