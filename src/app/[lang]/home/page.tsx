import HomeContainer from '@/containers/home/container'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { Locale } from '@/dictionaries/i18n-config'

interface HomePageProps {
  params: {
    lang: Locale
  }
}
export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <HomeContainer dictionary={dictionary.home} />
}
