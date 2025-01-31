'use client'

import { Dictionary } from '@/dictionaries/get-dictionary'
import { Button, Tab, Tabs } from '@nextui-org/react'
import {
  CopyOutlined,
  FileFilled,
  FileImageFilled,
  SwapOutlined,
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import { LanguageIcon } from '@/components/icons'
import { useTranslation } from './hooks/useTranslation'
import { LanguageSelector } from './components/LanguageSelector'
import { TranslationTextarea } from './components/TranslationTextarea'
import TranslationHistory from './components/TranslationHistory'
import { useTranslationHistory } from './hooks/useTranslationHistory'

const MAX_CHARACTER_COUNT = 5000

interface HomeContainerProps {
  dictionary: Dictionary['home']
}

export default function HomeContainer({ dictionary: t }: HomeContainerProps) {
  const {
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
  } = useTranslation(t)
  const { addTranslation, history, deleteTranslation, clearHistory } =
    useTranslationHistory()

  const languageOptions = t.languageOptions

  const handleCopy = () => {
    navigator.clipboard.writeText(targetText)
    toast.success(t.copied)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col mt-[20px]">
        <Tabs>
          <Tab
            title={
              <div className="flex items-center gap-2">
                <LanguageIcon height={20} width={20} fill="#2785f1" />
                {t.text}
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <div className="flex flex-col gap-2 w-full">
                <LanguageSelector
                  label="Source language"
                  options={languageOptions}
                  selectedKey={sourceLanguage}
                  onSelectionChange={setSourceLanguage}
                  className="w-[180px]"
                />
                <TranslationTextarea
                  value={sourceText}
                  onChange={(value) => {
                    if (value.length === 0 && targetText.length > 0) {
                      addTranslation({
                        sourceText,
                        targetText,
                        sourceLanguage,
                        targetLanguage,
                      })
                    }
                    setSourceText(value)
                    handleTranslate(value)
                  }}
                  placeholder={t.enterText}
                  characterCount={sourceText.length}
                  maxCharacterCount={MAX_CHARACTER_COUNT}
                  onClear={() => {
                    addTranslation({
                      sourceText,
                      targetText,
                      sourceLanguage,
                      targetLanguage,
                    })
                    setSourceText('')
                    setTargetText('')
                    setTargetLanguage('auto')
                  }}
                />
              </div>

              <div className="flex md:flex-col justify-center">
                {loading ? (
                  <>
                    <Button isLoading={true} isIconOnly variant="light" />
                  </>
                ) : (
                  <>
                    <Button
                      isIconOnly
                      endContent={<SwapOutlined />}
                      variant="light"
                      onPress={() => {
                        swapLanguages()
                        handleTranslate(targetText)
                      }}
                      isDisabled={sourceLanguage === 'auto'}
                    />
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <LanguageSelector
                  label="Target language"
                  options={languageOptions}
                  selectedKey={targetLanguage}
                  onSelectionChange={setTargetLanguage}
                  className="w-[180px]"
                />
                <TranslationTextarea
                  value={targetText}
                  isReadOnly={true}
                  endContent={
                    targetText.length > 0 && (
                      <Button
                        size="sm"
                        color="default"
                        variant="light"
                        isIconOnly
                        onPress={handleCopy}
                      >
                        <CopyOutlined />
                      </Button>
                    )
                  }
                />
              </div>
            </div>
            <TranslationHistory
              history={history}
              deleteTranslation={deleteTranslation}
              dictionary={t}
              clearHistory={clearHistory}
            />
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
  )
}
