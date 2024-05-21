import React from 'react'

interface PageProps {}
const Page: React.FC<PageProps> = () => {
  return (
    <div className="rounded-xl bg-white p-2 text-center shadow transition hover:cursor-pointer hover:shadow-xl">
      this is server display
    </div>
  )
}

export default Page
