'use client'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'next-themes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {},
      }),
  )

  return (
    <ThemeProvider defaultTheme="system">
      <ConfigProvider theme={{ cssVar: true }}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>
            {children}
          </ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeProvider>
  )
}
