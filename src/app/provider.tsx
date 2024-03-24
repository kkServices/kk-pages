import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'next-themes'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
      >
        <ConfigProvider theme={{ cssVar: true }}>
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </>
  )
}
