'use client'

import React, { FC, useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import clsx from 'clsx'
import { Button, Selection, SharedSelection } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { LanguageIcon } from './icons'

import { useLanguage } from '@/providers/language-provider'
import { redirectReplaceLocale } from '@/utils/common'
import { Locale } from '../dictionaries/i18n-config'
export interface LanguageSwitchProps {
  className?: string
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({ className }) => {
  const router = useRouter()
  const pathname = usePathname()
  const lang = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState<Selection>(
    new Set([lang])
  )

  const languages: {
    key: Locale
    label: string
  }[] = [
    { key: 'en', label: 'English' },
    { key: 'tr', label: 'Türkçe' },
  ]

  const onSelectionChange = (selected: SharedSelection) => {
    const newLang = selected.currentKey as Locale
    const newPath = redirectReplaceLocale(newLang, pathname)

    router.push(newPath)
    setSelectedLanguage(selected)
  }

  return (
    <div className={clsx('relative inline-block', className)}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            aria-label="Switch language"
            endContent={<LanguageIcon size={22} />}
            variant="light"
          />
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Language selection"
          selectedKeys={selectedLanguage}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {languages.map((lang) => (
            <DropdownItem key={lang.key}>{lang.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
