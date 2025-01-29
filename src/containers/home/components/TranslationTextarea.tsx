// components/TranslationTextarea.tsx
'use client'

import { Textarea } from '@nextui-org/react'

interface TranslationTextareaProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  isReadOnly?: boolean
  characterCount?: number
  maxCharacterCount?: number
  endContent?: React.ReactNode
  onClear?: () => void
}

export const TranslationTextarea = ({
  value,
  onChange,
  placeholder,
  isReadOnly = false,
  characterCount = 0,
  maxCharacterCount = 5000,
  endContent,
  onClear,
}: TranslationTextareaProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Textarea
      radius="sm"
      placeholder={placeholder}
      value={value}
      minRows={5}
      onChange={(e) => onChange?.(e.target.value)}
      isInvalid={characterCount > maxCharacterCount}
      fullWidth
      color="default"
      variant={isReadOnly ? 'faded' : 'bordered'}
      size="lg"
      onClear={onClear}
      isReadOnly={isReadOnly}
      endContent={endContent}
    />
    {!isReadOnly && (
      <div className="p-2 text-right text-default-500 text-xs">
        {characterCount} / {maxCharacterCount}
      </div>
    )}
  </div>
)
