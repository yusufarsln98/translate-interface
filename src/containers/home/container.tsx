'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  Textarea,
  Button,
  Autocomplete,
  AutocompleteItem,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { Dictionary } from '@/dictionaries/get-dictionary'
import {
  CopyOutlined,
  FileFilled,
  FileImageFilled,
  SwapOutlined,
} from '@ant-design/icons'
import { useDebouncedCallback } from 'use-debounce'
import { GeminiTranslator } from '@/utils/gemini_translator'
import { toast } from 'react-toastify'
import { ISO6391LanguageCode } from '@/utils/translation_abstract'
import { LanguageIcon } from '@/components/icons'

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
  const [targetLanguage, setTargetLanguage] = useState<string>(
    languageOptions[0].key
  )

  const translator = new GeminiTranslator({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    modelName: process.env.NEXT_PUBLIC_GEMINI_MODEL_NAME || '',
  })

  const handleTranslate = useDebouncedCallback(
    (text: string) => {
      if (text.length === 0) {
        setTargetText('')
        return
      }

      // if source language is auto, detect the language first
      let sourceLang = sourceLanguage
      if (sourceLanguage === detectLanguage.key) {
        translator
          .detectLanguage({ text })
          .then((detection) => {
            sourceLang = detection.languageCode
            setSourceLanguage(sourceLang)
          })
          .catch((error) => {
            toast.error(error.message)
          })
      }

      // if source and target languages are the same, use primary or secondary language
      let targetLang = targetLanguage
      if (sourceLang === targetLang) {
        if (sourceLang === languageOptions[0].key) {
          targetLang = languageOptions[1].key
        } else {
          targetLang = languageOptions[0].key
        }
        setTargetLanguage(targetLang)
      }

      translator
        .translate({
          text,
          sourceLanguage: sourceLang as ISO6391LanguageCode,
          targetLanguage: targetLang as ISO6391LanguageCode,
        })
        .then((translation) => {
          setTargetText(translation.translatedText)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    },
    1000,
    { maxWait: 1500 }
  )

  React.useEffect(() => {
    handleTranslate(sourceText)
  }, [sourceText, sourceLanguage, targetLanguage])

  const handleSourceLanguageChange = (key: string | number | null) => {
    if (key === null) return
    const selectedLanguage = languageOptions
      .concat(detectLanguage)
      .find((option) => option.key === key)
    if (!selectedLanguage) return
    setSourceLanguage(selectedLanguage.key)
  }

  const handleTargetLanguageChange = (key: string | number | null) => {
    if (key === null) return
    const selectedLanguage = languageOptions.find(
      (option) => option.key === key
    )
    if (!selectedLanguage) return
    setTargetLanguage(selectedLanguage.key)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col mt-[20px]">
        <div>
          <Tabs>
            <Tab
              title={
                <div className="flex items-center gap-2">
                  <LanguageIcon height={20} width={20} fill="#2785f1" />
                  {t.text}
                </div>
              }
            >
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex flex-col gap-2 w-full">
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
                            <AutocompleteItem
                              key={option.key}
                              value={option.label}
                            >
                              {option.label}
                            </AutocompleteItem>
                          ))}
                        </>
                      </Autocomplete>
                    </div>
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
                  <div className="flex md:flex-col justify-center">
                    <Button
                      isIconOnly
                      endContent={<SwapOutlined />}
                      variant="light"
                      onPress={() => {
                        setSourceText(targetText)
                        setTargetText('')
                        setSourceLanguage(targetLanguage)
                        setTargetLanguage(sourceLanguage)
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
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
                            <AutocompleteItem
                              key={option.key}
                              value={option.label}
                            >
                              {option.label}
                            </AutocompleteItem>
                          ))}
                        </>
                      </Autocomplete>
                    </div>
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
                            onPress={() => {
                              navigator.clipboard.writeText(targetText)
                              toast.success(t.copied)
                            }}
                          >
                            <CopyOutlined />
                          </Button>
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              title={
                <div className="flex items-center gap-2">
                  <FileFilled
                    style={{
                      fontSize: '20px',
                      color: '#2785f1',
                    }}
                  />
                  {t.document}
                </div>
              }
              isDisabled
            >
              <></>
            </Tab>
            <Tab
              title={
                <div className="flex items-center gap-2">
                  <FileImageFilled
                    style={{
                      fontSize: '20px',
                      color: '#2785f1',
                    }}
                  />
                  {t.image}
                </div>
              }
              isDisabled
            >
              <></>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
