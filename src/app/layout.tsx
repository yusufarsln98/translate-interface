import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'

export const metadata: Metadata = {
  title: {
    default: 'siteConfig.name',
    template: '',
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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="relative flex flex-col h-screen">
          <main>{children}</main>
          <footer className="w-full flex items-center justify-center py-3 fixed bottom-0">
            <p>Translate © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
