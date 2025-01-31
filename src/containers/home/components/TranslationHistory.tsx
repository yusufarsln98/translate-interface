'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@nextui-org/react'
import { Translation } from '../hooks/useTranslationHistory'
import { HistoryOutlined, CloseOutlined } from '@ant-design/icons'
import { Dictionary } from '@/dictionaries/get-dictionary'
import { useCallback } from 'react'
import { useTheme } from 'next-themes'

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

  const { theme } = useTheme()
  const isDark = theme === 'dark'
  // drawer state
  const { isOpen, onOpen, onClose } = useDisclosure()

  const HistoryHeaderContent = () => {
    return (
      <>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <HistoryOutlined
              className={`text-xl ${
                isDark ? 'text-primary-300' : 'text-primary-500'
              }`}
            />
            <h3
              className={`text-xl font-normal ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              {t.history}
            </h3>
          </div>
          <Button
            variant="light"
            size="sm"
            className={`${
              isDark
                ? 'text-red-400 hover:bg-red-900'
                : 'text-red-600 hover:bg-red-50'
            }`}
            onPress={() => {
              clearHistory()
              onClose()
            }}
          >
            {t.deleteAll}
          </Button>
        </div>
      </>
    )
  }

  const HistoryBodyContent = () => {
    return (
      <>
        <div className="grid gap-4">
          {history.map((item, index) => (
            <Card
              key={index}
              className={`group transition-all border ${
                isDark
                  ? 'hover:border-gray-700 border-gray-600 hover:shadow-lg'
                  : 'hover:border-gray-200 border-gray-100 hover:shadow-sm'
              }`}
              radius="sm"
              shadow="none"
              isHoverable
            >
              <CardHeader
                className={`flex justify-between items-center px-4 py-3 ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <span className="font-medium">
                    {formatLanguage(item.sourceLanguage)}
                  </span>
                  <span
                    className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    →
                  </span>
                  <span className="font-medium">
                    {formatLanguage(item.targetLanguage)}
                  </span>
                </div>
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark
                      ? 'text-red-400 hover:bg-red-900'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                  onPress={() => deleteTranslation(index)}
                  aria-label={'delete'}
                >
                  <CloseOutlined className="text-current" />
                </Button>
              </CardHeader>

              <Divider
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
              />

              <CardBody className="px-4 py-3 space-y-2">
                <p
                  className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } text-base line-clamp-2`}
                >
                  {item.sourceText}
                </p>
                <p
                  className={`${
                    isDark ? 'text-gray-100' : 'text-gray-900'
                  } font-medium text-base line-clamp-2`}
                >
                  {item.targetText}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {history.length > 0 ? (
        <div
          className="flex flex-col items-center justify-center py-8 px-4 text-center cursor-pointer opacity-100 hover:opacity-80 transition-opacity"
          onClick={onOpen}
        >
          <HistoryOutlined
            className={`text-3xl ${
              isDark ? 'text-blue-400' : 'text-blue-500'
            } mb-3`}
          />
          <p
            className={`${isDark ? 'text-blue-400' : 'text-blue-500'} text-lg`}
          >
            {t.history}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <HistoryOutlined
            className={`text-3xl ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            } mb-3`}
          />
          <p
            className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-lg`}
          >
            {t.emptyHistory}
          </p>
        </div>
      )}

      <Drawer isOpen={isOpen} onClose={onClose} radius="none" hideCloseButton>
        <DrawerContent>
          <DrawerHeader>
            <HistoryHeaderContent />
          </DrawerHeader>
          <DrawerBody>
            <HistoryBodyContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
