'use client' // Error components must be Client Components

import { startTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="btn"
        onClick={() => reload()}
      >
        Try again
      </button>
    </div>
  )
}
