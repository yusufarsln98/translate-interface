'use client'

import { Card, CardBody, CardHeader, Button, Divider } from '@nextui-org/react'
import { Translation } from '../hooks/useTranslationHistory'
import { HistoryOutlined, CloseOutlined } from '@ant-design/icons'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { useCallback } from 'react'

interface TranslationHistoryProps {
  dictionary: Dictionary['home']
  history: Translation[]
  deleteTranslation: (index: number) => void
  clearHistory: () => void
}

export default function TranslationHistory({
  dictionary: t,
  history,
  deleteTranslation,
  clearHistory,
}: TranslationHistoryProps) {
  const formatLanguage = useCallback((lang: string) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1)
  }, [])

  return (
    <div className="flex flex-col gap-4 mt-6">
      {history.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HistoryOutlined className="text-xl text-primary-500" />
              <h3 className="text-xl font-normal text-gray-800">{t.history}</h3>
            </div>
            <Button
              variant="light"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onPress={clearHistory}
            >
              {t.deleteAll}
            </Button>
          </div>

          <div className="grid gap-4">
            {history.map((item, index) => (
              <Card
                key={index}
                className="group transition-all hover:border-gray-200 hover:shadow-sm border border-gray-100"
                radius="sm"
                shadow="none"
                isHoverable
              >
                <CardHeader className="flex justify-between items-center px-4 py-3 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">
                      {formatLanguage(item.sourceLanguage)}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">
                      {formatLanguage(item.targetLanguage)}
                    </span>
                  </div>
                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50"
                    onPress={() => deleteTranslation(index)}
                    aria-label={'delete'}
                  >
                    <CloseOutlined className="text-current" />
                  </Button>
                </CardHeader>

                <Divider className="bg-gray-100" />

                <CardBody className="px-4 py-3 space-y-2">
                  <p className="text-gray-600 text-base line-clamp-2">
                    {item.sourceText}
                  </p>
                  <p className="text-gray-900 font-medium text-base line-clamp-2">
                    {item.targetText}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <HistoryOutlined className="text-3xl text-gray-400 mb-3" />
          <p className="text-gray-500 text-lg">{t.emptyHistory}</p>
        </div>
      )}
    </div>
  )
}
