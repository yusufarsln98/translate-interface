'use client'

import * as React from 'react'

import { Dictionary } from '@/dictionaries/get-dictionary'

interface HomeContainerProps {
  dictionary: Dictionary['home']
}
export default function HomeContainer({ dictionary: t }: HomeContainerProps) {
  return <div className="flex flex-col gap-3"></div>
}
