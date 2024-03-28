import React from 'react'
import type { Metadata } from 'next'
import { StyleProvider } from './Provider/Style'

export const metadata: Metadata = {
  title: {
    template: '%s | 小康的自留地',
    default: '小康的网址收藏 | 小康的自留地', // a default is required when creating a template
  },
}

interface LayoutProps {
  children: React.ReactNode
}
export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <StyleProvider>
      {children}
    </StyleProvider>
  )
}
