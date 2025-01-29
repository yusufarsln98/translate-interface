export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Translate',
  description: 'Translate text, images, and documents to any language',
  navItems: {
    tr: [
      {
        label: 'Çeviri',
        href: '/home',
      },
    ],
    en: [
      {
        label: 'Translate',
        href: '/home',
      },
    ],
  },
}
