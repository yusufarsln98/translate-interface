'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useParams, useRouter } from 'next/navigation'
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes'

import { LanguageProvider } from '@/providers/language-provider'
import { Locale } from '@/dictionaries/i18n-config'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const { lang } = useParams()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <LanguageProvider lang={lang as Locale}>{children}</LanguageProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
