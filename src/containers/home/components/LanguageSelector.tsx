// components/LanguageSelector.tsx
'use client'

import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

interface LanguageSelectorProps {
  label: string
  options: Array<{ key: string; label: string }>
  selectedKey: string
  onSelectionChange: (key: string) => void
  className?: string
}

export const LanguageSelector = ({
  label,
  options,
  selectedKey,
  onSelectionChange,
  className,
}: LanguageSelectorProps) => (
  <div className={className}>
    <Autocomplete
      aria-label={label}
      radius="sm"
      placeholder="Select"
      variant="faded"
      selectedKey={selectedKey}
      onSelectionChange={(key) => key && onSelectionChange(key.toString())}
      isClearable={false}
    >
      {options.map((option) => (
        <AutocompleteItem key={option.key} value={option.label}>
          {option.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  </div>
)
