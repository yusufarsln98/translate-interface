import { title } from '@/components/primitives'
import { Dictionary } from '@/dictionaries/get-dictionary'

interface AboutContainerProps {
  dictionary: Dictionary['about']
}
export const AboutContainer = ({ dictionary: t }: AboutContainerProps) => {
  return (
    <div>
      <h1 className={title()}>{t.title}</h1>
      <p>{t.content}</p>
    </div>
  )
}
