import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  server: React.ReactNode
  client: React.ReactNode
}
export default function Layout({ children, server, client }: Readonly<LayoutProps>) {
  return (
    <div className="mx-auto flex max-w-[1440px] pt-8 gap-4">
      <div className="flex-auto">{children}</div>
      <div className="flex flex-2 flex-col gap-4">
        {server}
        {client}
      </div>
    </div>
  )
}
