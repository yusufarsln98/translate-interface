'use client'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'

import { LanguageSwitch } from './language-switch'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo } from '@/components/icons'
import { redirectByLocale } from '@/utils/common'
import { useLanguage } from '@/providers/language-provider'
import { TranslatorSwitch } from './translator-switch'

export const Navbar = () => {
  const lang = useLanguage()

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href={redirectByLocale(lang, siteConfig.navItems[lang][0].href)}
          >
            <Logo />
          </NextLink>
        </NavbarBrand>
        <ul className="lg:flex gap-4 justify-start ml-0">
          {siteConfig.navItems[lang].map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium font-medium text-[#5c5c62]'
                )}
                href={redirectByLocale(lang, item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="sm:flex gap-0">
          <ThemeSwitch />
          <LanguageSwitch />
          <TranslatorSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  )
}
