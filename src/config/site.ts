export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'My App',
  description: 'My App description',
  navItems: {
    tr: [
      {
        label: 'Local Translate',
        href: '/home',
      },
    ],
    en: [
      {
        label: 'Local Translate',
        href: '/home',
      },
    ],
  },
}
