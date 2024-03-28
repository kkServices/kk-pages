import React from 'react'
import { StyleProvider } from './Provider/Style'

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
