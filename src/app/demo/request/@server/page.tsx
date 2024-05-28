import React from 'react'
import { requestServer } from '@/services/alova/request.serve'

interface PageProps {}
const Page: React.FC<PageProps> = async () => {
  const result = await requestServer
    .Get<AlovaResponse<{ hitokoto: string }>>(
      'https://international.v1.hitokoto.cn/',
      { meta: { isTransformResponse: false }, next: { revalidate: 3600, tags: ['hitokoto'] } },
    )

  return (
    <div className="rounded-xl bg-white p-2 text-center shadow transition hover:cursor-pointer hover:shadow-xl">
      <p>
        {JSON.stringify(result)}
      </p>
    </div>
  )
}

export default Page
