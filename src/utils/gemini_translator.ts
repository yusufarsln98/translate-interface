import {
  TranslationLLM,
  TranslateInput,
  TranslateOutput,
} from './translation_abstract'
import { GoogleGenerativeAI } from '@google/generative-ai'

type GeminiConfig = {
  apiKey: string
  modelName: string
}

export class GeminiTranslator extends TranslationLLM<GeminiConfig> {
  private genAI: GoogleGenerativeAI

  constructor(config: GeminiConfig) {
    super(config)
    this.genAI = new GoogleGenerativeAI(config.apiKey)
  }

  async translate(input: TranslateInput): Promise<TranslateOutput> {
    if (input.sourceLanguage === input.targetLanguage) {
      return { translatedText: input.text }
    }
    try {
      const prompt = `Text: ${input.text},
                      Source Language: ${input.sourceLanguage},
                      Target Language: ${input.targetLanguage},
      If text is not belong to the source language, respond ONLY '$INVALID$'.
      Otherwise, translate the text to the target language and respond ONLY with the translated text.
      `
      const model = this.genAI.getGenerativeModel({
        model: this.config.modelName,
      })
      const result = await model.generateContent(prompt)
      const translatedText = result.response.text().trim()
      if (translatedText === '$INVALID$') {
        throw new Error(`Invalid source language: ${input.sourceLanguage}`)
      }
      return { translatedText }
    } catch (error) {
      throw new Error(
        `Translation failed: ${error instanceof Error ? error.message : error}`
      )
    }
  }
}
