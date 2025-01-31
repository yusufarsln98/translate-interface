import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { Navbar } from '@/components/navbar'
import { Providers } from './providers'
import Footer from '@/components/footler'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers
      themeProps={{
        attribute: 'class',
        defaultTheme: 'dark',
        enableSystem: true,
      }}
    >
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <div className="relative flex flex-col h-screen">{children}</div>
      </div>
      <Footer />
    </Providers>
  )
}
