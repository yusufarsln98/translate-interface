'use client'

import { FC } from 'react'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { SwitchProps, useSwitch } from '@nextui-org/switch'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'
import clsx from 'clsx'

import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Button } from '@nextui-org/react'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${
      theme === 'light' || isSSR ? 'dark' : 'light'
    } mode`,
  })

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <Button
            isIconOnly
            aria-label="Switch theme"
            endContent={
              <SunFilled style={{ fontSize: 22, color: '#8d8d95' }} />
            }
            variant="light"
            onPress={onChange}
          />
        ) : (
          <Button
            isIconOnly
            aria-label="Switch theme"
            endContent={
              <MoonFilled style={{ fontSize: 22, color: '#8d8d95' }} />
            }
            variant="light"
            onPress={onChange}
          />
        )}
      </div>
    </Component>
  )
}
