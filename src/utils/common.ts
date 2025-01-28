import { Locale } from '@/dictionaries/i18n-config'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const redirectByLocale = (locale: Locale, pathname: string) => {
  // add locale prefix to the pathname
  return `/${locale}${pathname}`
}

export const redirectReplaceLocale = (locale: Locale, pathname: string) => {
  const localePattern = new RegExp(`^/[^/]{${locale.length}}`)

  return pathname.replace(localePattern, `/${locale}`)
}
