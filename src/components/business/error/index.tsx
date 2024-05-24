'use client'

interface BusinessErrorProps {
  code: number
  message: string
  requestId?: string
}

export function BusinessError({ code, message, requestId }: BusinessErrorProps) {
  return (
    <div>
      接口请求遇错啦,
      {code}
      {' '}
      -
      {message}
      <p>
        requestId:
        {requestId}
      </p>
    </div>
  )
}
