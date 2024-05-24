'use client'

import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

interface PageError extends Error {
  digest?: string
}
interface ErrorProps {
  error: PageError
  reset: () => void

}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <div>
      <h2>
        {`${`${error} Something went wrong!`}`}
      </h2>
      <button type="button" className="btn" onClick={() => reload()}>
        Try again
      </button>
    </div>
  )
}
