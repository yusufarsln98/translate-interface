import { Poppins as FontSans, Roboto as FontMono } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400', // Normal weight for better readability
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400', // Normal weight for better readability
})
