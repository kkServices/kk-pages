'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { useEffect, useState } from 'react'

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme, systemTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  function onClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const checked = e.currentTarget.checked
    setTheme(checked ? 'light' : 'dark')
  }

  return (
    <input
      className="btn-mode-toggle"
      type="checkbox"
      defaultChecked={currentTheme === 'light'}
      onClick={onClick}
    />

  )
}
