'use client'

import React, { useRef } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

interface StyleProviderProps {
  children: React.ReactNode
}
export function StyleProvider(styleProviderProps: StyleProviderProps) {
  const { children } = styleProviderProps
  const inserted = useRef(false)
  useServerInsertedHTML(() => {
    const styleText = `html,body{ height: 100%;}
    [data-theme='dark'] .webstack-theme {
      --background-color: #232323;
      --card-border: #3f4142;
    }
    .webstack-theme {
      --background-color: #fff;
      --card-border: #e4ecf3;
    }`

    if (inserted.current)
      return null

    inserted.current = true

    return (
    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      <style
        id="webstack-global-style"
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    )
  })

  return children
}
