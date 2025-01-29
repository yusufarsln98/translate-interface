// type ISO6391LanguageCode = 'tr' | 'en' | 'ru' | 'de' | 'fr' | 'es' | 'ar' | 'el'
export const VALID_LANGUAGE_CODES = [
  'tr',
  'en',
  'ru',
  'de',
  'fr',
  'es',
  'ar',
  'el',
] as const
export type ISO6391LanguageCode = (typeof VALID_LANGUAGE_CODES)[number]

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
    if (!VALID_LANGUAGE_CODES.includes(code as ISO6391LanguageCode)) {
      throw new Error(`Invalid language code: ${code}`)
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
