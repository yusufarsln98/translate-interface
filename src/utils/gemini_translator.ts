import {
  TranslationLLM,
  DetectLanguageInput,
  DetectLanguageOutput,
  TranslateInput,
  TranslateOutput,
} from './translation_abstract'
import { GoogleGenerativeAI } from '@google/generative-ai'

type GeminiConfig = {
  apiKey: string
  modelName: string
  primaryLang: string
  secondaryLang: string
}

export class GeminiTranslator extends TranslationLLM<GeminiConfig> {
  private genAI: GoogleGenerativeAI

  constructor(config: GeminiConfig) {
    super(config)
    this.genAI = new GoogleGenerativeAI(config.apiKey)
  }

  async detectLanguage(
    input: DetectLanguageInput
  ): Promise<DetectLanguageOutput> {
    const model = this.genAI.getGenerativeModel({
      model: this.config.modelName,
    })

    const prompt = `Detect the ISO 639-1 language code for: "${input.text}". Respond ONLY with the code.`

    try {
      const result = await model.generateContent(prompt)
      const code = result.response.text().trim()
      this.validateLanguageCode(code)

      return {
        languageCode: code,
        confidence: 1.0,
      }
    } catch (error) {
      throw new Error(
        `Language detection failed: ${
          error instanceof Error ? error.message : error
        }`
      )
    }
  }

  async translate(input: TranslateInput): Promise<TranslateOutput> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.config.modelName,
      })
      const detection = await this.detectLanguage({ text: input.text })
      const sourceLang = detection.languageCode

      let targetLang = ''

      // if target and source language are the same, select target either primary or secondary
      if (sourceLang === input.targetLanguage) {
        if (sourceLang === this.config.primaryLang) {
          targetLang = this.config.secondaryLang
        } else {
          targetLang = this.config.primaryLang
        }
      } else {
        targetLang = input.targetLanguage
      }

      const prompt = `Translate from ${sourceLang} to ${targetLang}: ${input.text}. Respond ONLY with the translated text.`
      const result = await model.generateContent(prompt)
      const translatedText = result.response.text().trim()

      return {
        translatedText,
        sourceLang,
        targetLang,
      }
    } catch (error) {
      throw new Error(
        `Translation failed: ${error instanceof Error ? error.message : error}`
      )
    }
  }
}
