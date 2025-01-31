'use client'

import { useTheme } from 'next-themes'
import React from 'react'

const Footer: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <footer
      className={`w-full flex items-center justify-center py-3 fixed bottom-0 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <p>Translate © {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
