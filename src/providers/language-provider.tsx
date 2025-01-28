'use client'

import React from 'react'

import { Locale } from '@/dictionaries/i18n-config'

// Create a context for the language
const LanguageContext = React.createContext<Locale | undefined>(undefined)

export const LanguageProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Locale
}) => {
  return (
    <LanguageContext.Provider value={lang}>
      <div lang={lang}>{children}</div>
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = React.useContext(LanguageContext)

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
