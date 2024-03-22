import { ThemeProvider } from 'next-themes'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
      >
        {children}
      </ThemeProvider>
    </>
  )
}
