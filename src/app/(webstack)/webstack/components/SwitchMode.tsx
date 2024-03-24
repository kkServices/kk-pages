'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SwitchMode() {
  const { setTheme, systemTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted)
    return null

  function toggle() {
    let currentTheme = theme
    if (currentTheme === 'system')
      currentTheme = systemTheme

    if (currentTheme === 'dark')
      setTheme('light')

    else if (currentTheme === 'light')
      setTheme('dark')
  }

  return (
    <div onClick={toggle} className="flex items-center justify-center cursor-pointer size-16 border-t-primary hover:border-t">
      <span className="icon-[fa6-solid--sun]"></span>
    </div>
  )
}
