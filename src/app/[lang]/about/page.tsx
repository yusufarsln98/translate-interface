import { AboutContainer } from '@/containers/about/container'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { Locale } from '@/dictionaries/i18n-config'

interface AboutPageProps {
  params: {
    lang: Locale
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <AboutContainer dictionary={dictionary.about} />
}
