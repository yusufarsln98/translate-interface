'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  Textarea,
  Button,
  Autocomplete,
  AutocompleteItem,
  Alert,
} from '@nextui-org/react'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { CopyOutlined } from '@ant-design/icons'
import { useDebouncedCallback } from 'use-debounce'
import { GeminiTranslator } from '@/utils/gemini_translator'

const MAX_CHARACTER_COUNT = 5000

interface HomeContainerProps {
  dictionary: Dictionary['home']
}

export default function HomeContainer({ dictionary: t }: HomeContainerProps) {
  const languageOptions = t.languageOptions
  const detectLanguage: (typeof t.languageOptions)[0] = {
    key: 'auto',
    label: t.detectLanguage,
  }
  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState(detectLanguage.key)
  const [targetLanguage, setTargetLanguage] = useState<string | undefined>(
    languageOptions[0].key
  )
  const [showAlert, setShowAlert] = useState(false)

  const translator = new GeminiTranslator({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    modelName: process.env.NEXT_PUBLIC_GEMINI_MODEL_NAME || '',
    primaryLang: languageOptions[0].key,
    secondaryLang: languageOptions[1].key,
  })

  const handleTranslate = useDebouncedCallback(
    (text: string) => {
      if (text.length === 0) {
        setTargetText('')
        return
      }
      translator
        .translate({
          text,
          sourceLanguage,
          targetLanguage: targetLanguage || 'auto',
        })
        .then((output) => {
          console.log(output)
          setSourceLanguage(output.sourceLang)
          setTargetLanguage(output.targetLang)
          setTargetText(output.translatedText)
        })
        .catch((error) => {
          console.error(error)
          setShowAlert(true)
        })
    },
    1000,
    { maxWait: 1500 }
  )

  React.useEffect(() => {
    handleTranslate(sourceText)
  }, [sourceText])

  const handleSourceLanguageChange = (key: string | number | null) => {
    if (key === null) return
    const selectedLanguage = languageOptions.find(
      (option) => option.key === key
    )
    if (!selectedLanguage) return
    setSourceLanguage(selectedLanguage.key)

    // if both of the languages are exist, translate the text
    if (targetLanguage) {
      handleTranslate(sourceText)
    }
  }

  const handleTargetLanguageChange = (key: string | number | null) => {
    if (key === null) return
    const selectedLanguage = languageOptions.find(
      (option) => option.key === key
    )
    if (!selectedLanguage) return
    setTargetLanguage(selectedLanguage.key)

    // if both of the languages are exist, translate the text
    if (sourceLanguage) {
      handleTranslate(sourceText)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col mt-[20px]">
        <div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-[180px]">
                <Autocomplete
                  aria-label="Source language"
                  radius="sm"
                  placeholder={t.select}
                  variant="faded"
                  defaultSelectedKey={sourceLanguage}
                  isClearable={false}
                  onSelectionChange={handleSourceLanguageChange}
                  selectedKey={sourceLanguage}
                >
                  <>
                    <AutocompleteItem
                      key={detectLanguage.key}
                      value={detectLanguage.label}
                      variant="faded"
                    >
                      {detectLanguage.label}
                    </AutocompleteItem>
                    {languageOptions.map((option) => (
                      <AutocompleteItem key={option.key} value={option.label}>
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </>
                </Autocomplete>
              </div>
              <div className="w-[180px]">
                <Autocomplete
                  aria-label="Target language"
                  radius="sm"
                  placeholder={t.select}
                  variant="faded"
                  defaultSelectedKey={targetLanguage}
                  isClearable={false}
                  onSelectionChange={handleTargetLanguageChange}
                  selectedKey={targetLanguage}
                >
                  <>
                    {languageOptions.map((option) => (
                      <AutocompleteItem key={option.key} value={option.label}>
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </>
                </Autocomplete>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <Textarea
                  radius="sm"
                  placeholder={t.enterText}
                  value={sourceText}
                  minRows={5}
                  onChange={(e) => {
                    setSourceText(e.target.value)
                  }}
                  errorMessage={t.limitExceeded}
                  isInvalid={sourceText.length > MAX_CHARACTER_COUNT}
                  fullWidth
                  color="default"
                  variant="bordered"
                  size="lg"
                  isClearable={true}
                  onClear={() => setSourceText('')}
                />
                <div className="p-2 text-right text-default-500 text-xs">
                  {sourceText.length} / {MAX_CHARACTER_COUNT}
                </div>
              </div>
              <div className="flex flex-col">
                <Textarea
                  radius="sm"
                  value={targetText}
                  minRows={5}
                  fullWidth
                  color="default"
                  variant="faded"
                  isReadOnly
                  size="lg"
                  endContent={
                    targetText.length > 0 && (
                      <Button
                        size="sm"
                        color="default"
                        variant="light"
                        isIconOnly
                      >
                        <CopyOutlined />
                      </Button>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Alert
        color="danger"
        variant="bordered"
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        title={t.errorTitle}
        description={t.errorDescription}
      />
    </div>
  )
}
