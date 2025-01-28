export type ISO6391LanguageCode = string

export interface DetectLanguageInput {
  readonly text: string
}

export interface DetectLanguageOutput {
  readonly languageCode: ISO6391LanguageCode
  readonly confidence: number
}

export interface TranslateInput {
  readonly text: string
  readonly sourceLanguage: ISO6391LanguageCode
  readonly targetLanguage: ISO6391LanguageCode
}

export interface TranslateOutput {
  readonly translatedText: string
  readonly sourceLang: ISO6391LanguageCode
  readonly targetLang: ISO6391LanguageCode
}

export abstract class TranslationLLM<ConfigType = unknown> {
  protected readonly config: ConfigType

  constructor(config: ConfigType) {
    this.config = config
  }

  abstract detectLanguage(
    input: DetectLanguageInput
  ): Promise<DetectLanguageOutput>

  abstract translate(input: TranslateInput): Promise<TranslateOutput>

  protected validateLanguageCode(code: string): void {
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(code)) {
      throw new Error(`Invalid ISO 639-1 language code: ${code}`)
    }
  }

  async detectAndTranslate(
    text: string,
    targetLanguage: ISO6391LanguageCode
  ): Promise<TranslateOutput> {
    const detection = await this.detectLanguage({ text })
    return this.translate({
      text,
      sourceLanguage: detection.languageCode,
      targetLanguage,
    })
  }
}
