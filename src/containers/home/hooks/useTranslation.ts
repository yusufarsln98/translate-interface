// hooks/useTranslation.ts
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { GeminiTranslator } from '@/utils/gemini_translator'
import { ISO6391LanguageCode } from '@/utils/translation_abstract'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { toast } from 'react-toastify'

export const useTranslation = (dictionary: Dictionary['home']) => {
  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('tr')

  const translator = new GeminiTranslator({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    modelName: process.env.NEXT_PUBLIC_GEMINI_MODEL_NAME || '',
  })

  const handleTranslate = useDebouncedCallback(
    async (text: string) => {
      if (text.length === 0 || !sourceLanguage || !targetLanguage) {
        setTargetText('')
        return
      }

      let targetLang = targetLanguage
      if (sourceLanguage === targetLang) {
        targetLang =
          dictionary.languageOptions[0].key === targetLang
            ? dictionary.languageOptions[1].key
            : dictionary.languageOptions[0].key
        setTargetLanguage(targetLang)
      }

      try {
        const translation = await translator.translate({
          text,
          sourceLanguage: sourceLanguage as ISO6391LanguageCode,
          targetLanguage: targetLang as ISO6391LanguageCode,
        })
        setTargetText(translation.translatedText)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Translation failed'
        )
        throw new Error(
          error instanceof Error ? error.message : 'Translation failed'
        )
      }
    },
    1000,
    { maxWait: 1500 }
  )

  const swapLanguages = () => {
    setSourceText(targetText)
    setTargetText('')
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
  }

  return {
    sourceText,
    targetText,
    sourceLanguage,
    targetLanguage,
    setSourceText,
    setTargetText,
    setSourceLanguage,
    setTargetLanguage,
    handleTranslate,
    swapLanguages,
  }
}
