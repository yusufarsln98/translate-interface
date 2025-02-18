'use client'

import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import clsx from 'clsx'
import { Button, SharedSelection } from '@nextui-org/react'
import { SettingFilled } from '@ant-design/icons'
import { useSearchParams, useRouter } from 'next/navigation'
import UpdateTranslatorModal from './update-translator-modal'
import { getTranslators, updateTranslator } from '@/utils/queries'

type TranslatorType = {
  id: string
  modelName: string
  modelUrl: string
  label: string
}

export const TranslatorSwitch = () => {
  const [translators, setTranslators] = useState<TranslatorType[]>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentTranslator, setCurrentTranslator] = useState<string>(
    searchParams.get('translator') || '2'
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getTranslators('/api/translators').then((translators) => {
      setTranslators(translators)

      // if no translator in the URL, set the first translator as default and update the URL
      if (!searchParams.get('translator') && translators.length > 0) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('translator', translators[1].id)
        router.push(`?${newSearchParams.toString()}`)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectionChange = (selected: SharedSelection) => {
    const selectedKey = Array.from(selected)[0]?.toString()
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (selectedKey) {
      newSearchParams.set('translator', selectedKey)
    } else {
      newSearchParams.delete('translator')
    }
    setCurrentTranslator(selectedKey)
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <div className={clsx('relative inline-block')}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            aria-label="Switch translator"
            endContent={
              <SettingFilled
                style={{
                  color: '#8d8d95',
                  fontSize: '1.25rem',
                }}
              />
            }
            variant="light"
          />
        </DropdownTrigger>
        {translators && (
          <DropdownMenu
            disallowEmptySelection
            aria-label="Language selection"
            selectionMode="single"
            emptyContent="No translators available"
            selectedKeys={new Set([currentTranslator])}
            onSelectionChange={onSelectionChange}
          >
            {translators.map((translator) => (
              <DropdownItem key={translator.id}>
                <div className="flex w-full gap-2 justify-between items-center">
                  <div>{translator.label}</div>
                  <SettingFilled
                    style={{
                      color: '#8d8d95',
                      fontSize: '1rem',
                    }}
                    className="transition-transform hover:rotate-45 duration-200"
                    onClick={() => {
                      setIsModalOpen(true)
                      setCurrentTranslator(translator.id)
                    }}
                  />
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
      <UpdateTranslatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          updateTranslator(`/api/translators`, data).then(
            (updatedTranslator) => {
              if (updatedTranslator) {
                setTranslators(
                  translators?.map((translator) =>
                    translator.id === updatedTranslator.id
                      ? updatedTranslator
                      : translator
                  )
                )
              }
            }
          )
        }}
        translator={
          translators?.find(
            (translator) => translator.id === currentTranslator
          ) || { id: '', modelName: '', modelUrl: '', label: '' }
        }
      />
    </div>
  )
}
