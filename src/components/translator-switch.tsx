'use client'

import React, { useEffect } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import clsx from 'clsx'
import { Button, Selection, SharedSelection } from '@nextui-org/react'
import { SettingFilled } from '@ant-design/icons'
import { useSearchParams, useRouter } from 'next/navigation'

const TRANSLATORS: {
  key: string
  label: string
}[] = [
  { key: 'm2m_1.2b', label: 'M2M 1.2B' },
  { key: 'local_ai', label: 'Local AI' },
]

export const TranslatorSwitch = ({}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get the translator from URL or use default
  const currentTranslator = searchParams.get('translator') || 'm2m_1.2b'

  const selectedTranslator: Selection = new Set([currentTranslator])

  const onSelectionChange = (selected: SharedSelection) => {
    // Convert Selection type to string
    const selectedKey = Array.from(selected)[0]?.toString()

    // Create new URLSearchParams object
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (selectedKey) {
      newSearchParams.set('translator', selectedKey)
    } else {
      newSearchParams.delete('translator')
    }

    // Update URL with new search params
    router.push(`?${newSearchParams.toString()}`)
  }

  // Set default translator if none is selected
  useEffect(() => {
    if (!searchParams.get('translator')) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('translator', 'm2m_1.2b')
      router.push(`?${newSearchParams.toString()}`)
    }
  }, [searchParams, router])

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
        <DropdownMenu
          disallowEmptySelection
          aria-label="Language selection"
          selectedKeys={selectedTranslator}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {TRANSLATORS.map((translator) => (
            <DropdownItem key={translator.key}>{translator.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
