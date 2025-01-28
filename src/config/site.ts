export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'My App',
  description: 'My App description',
  navItems: {
    tr: [
      {
        label: 'Ana Sayfa',
        href: '/home',
      },
      {
        label: 'Hakkında',
        href: '/about',
      },
    ],
    en: [
      {
        label: 'Home',
        href: '/home',
      },
      {
        label: 'About',
        href: '/about',
      },
    ],
  },
  links: {
    github: 'https://github.com/',
  },
}
