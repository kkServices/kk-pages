import { useEffect, useState } from 'react'

export function useMediaQuery() {
  const [queryMatch, setQueryMatch] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('sm')

  const map = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  }

  useEffect(() => {
    const mediaQueryList = Object.keys(map).map((key) => {
      const mediaQuery = window.matchMedia(`(min-width: ${map[key as 'sm' | 'md' | 'lg' | 'xl' | '2xl']}px)`)
      mediaQuery.addEventListener('change', (event) => {
        if (event.matches)
          setQueryMatch(key as 'sm' | 'md' | 'lg' | 'xl' | '2xl')
      })
      return mediaQuery
    })
    return () => {
      mediaQueryList.forEach((mediaQuery) => {
        mediaQuery.removeEventListener('change', () => {})
      })
    }
  }, [])
  return queryMatch
}
