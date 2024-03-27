import { StyleProvider } from '@/app/(study)/study/layout/Provider/Style'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (

    <>
      <StyleProvider>

        {children}
      </StyleProvider>
    </>
  )
}
