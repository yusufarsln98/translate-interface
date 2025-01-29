// hooks/useTranslationHistory.ts
import { useState, useEffect } from 'react'

export interface Translation {
  sourceText: string
  targetText: string
  sourceLanguage: string
  targetLanguage: string
}

const STORAGE_KEY = 'translation_history'

export const useTranslationHistory = () => {
  const [history, setHistory] = useState<Translation[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY)
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const deleteTranslation = (index: number) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory]
      newHistory.splice(index, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
      return newHistory
    })
  }

  const addTranslation = (translation: Translation) => {
    setHistory((prevHistory) => {
      const newHistory = [translation, ...prevHistory].slice(0, 5)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
      return newHistory
    })
  }

  return { history, addTranslation, deleteTranslation, clearHistory }
}
