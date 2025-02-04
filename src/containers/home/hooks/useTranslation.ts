import { useState, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ISO6391LanguageCode } from '@/utils/translation_abstract'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { toast } from 'react-toastify'
import { M2MTranslator } from '@/utils/m2m_translator'
import { OllamaTranslator } from '@/utils/ollama_translator'
import { useSearchParams } from 'next/navigation'
import { getTranslators } from '@/utils/queries'

export const useTranslation = (dictionary: Dictionary['home']) => {
  const searchParams = useSearchParams()
  const translatorId = searchParams.get('translator')
  const abortControllerRef = useRef<AbortController | null>(null)

  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('tr')
  const [loading, setLoading] = useState(false)
  const [translator, setTranslator] = useState<
    M2MTranslator | OllamaTranslator
  >()

  useEffect(() => {
    getTranslators('/api/translators').then((translators) => {
      const selectedTranslator = translators.find(
        (translator) => translator.id === translatorId
      )

      if (selectedTranslator?.id === '1') {
        setTranslator(
          new M2MTranslator({ apiUrl: selectedTranslator.modelUrl })
        )
      } else if (selectedTranslator?.id === '2') {
        setTranslator(
          new OllamaTranslator({
            apiUrl: selectedTranslator.modelUrl,
            modelName: selectedTranslator.modelName,
          })
        )
      }
    })
  }, [translatorId])

  const handleTranslate = useDebouncedCallback(
    async (text: string) => {
      if (text.length === 0 || !sourceLanguage || !targetLanguage) {
        setTargetText('')
        return
      }

      // Abort any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

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
        const translation = await translator?.translate({
          text,
          sourceLanguage: sourceLanguage as ISO6391LanguageCode,
          targetLanguage: targetLang as ISO6391LanguageCode,
          abortSignal: signal, // Pass the abort signal to the translator
        })

        // Only update if this request wasn't aborted
        if (!signal.aborted) {
          setTargetText(translation?.translatedText || '')
        }
      } catch (error) {
        // Don't show error toast if the request was aborted
        if (error instanceof Error && !error.message.includes('AbortError')) {
          return
        }

        toast.error(
          error instanceof Error ? error.message : 'Translation failed'
        )
        throw new Error(
          error instanceof Error ? error.message : 'Translation failed'
        )
      } finally {
        // Only update loading state if this request wasn't aborted
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    },
    1000,
    { maxWait: 1500 }
  )

  useEffect(() => {
    if (sourceText) {
      handleTranslate(sourceText)
    }

    // Cleanup function to abort any pending request when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [translatorId]) // eslint-disable-line react-hooks/exhaustive-deps

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
    translatorType: translatorId,
  }
}
