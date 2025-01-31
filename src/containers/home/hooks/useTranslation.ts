import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ISO6391LanguageCode } from '@/utils/translation_abstract'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { toast } from 'react-toastify'
import { M2MTranslator } from '@/utils/m2m_translator'
import { OllamaTranslator } from '@/utils/ollama_translator'
import { useSearchParams } from 'next/navigation'

export const useTranslation = (dictionary: Dictionary['home']) => {
  const searchParams = useSearchParams()
  const translatorType = searchParams.get('translator') || 'm2m_1.2b'

  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('tr')
  const [loading, setLoading] = useState(false)

  const translator =
    translatorType === 'm2m_1.2b'
      ? new M2MTranslator({
          apiUrl: process.env.NEXT_PUBLIC_M2M_API_URL || '',
        })
      : new OllamaTranslator({
          apiUrl: process.env.NEXT_PUBLIC_OLLAMA_API_URL || '',
          modelName: process.env.NEXT_PUBLIC_OLLAMA_MODEL_NAME || '',
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
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    },
    1000,
    { maxWait: 1500 }
  )

  useEffect(() => {
    if (sourceText) {
      handleTranslate(sourceText)
    }
  }, [translatorType]) // eslint-disable-line react-hooks/exhaustive-deps

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
    loading,
    translatorType,
  }
}
