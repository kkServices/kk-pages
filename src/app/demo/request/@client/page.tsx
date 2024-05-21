'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { getHitokoto } from '@/services/mock/api.client'

interface PageProps {}
const Page: React.FC<PageProps> = () => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['request'],
    queryFn: getHitokoto,
    // refetchInterval: false,
    // refetchIntervalInBackground: false,
    // refetchOnWindowFocus: false,
  })
  return (
    <div className="rounded-xl bg-white p-2 text-center shadow transition hover:cursor-pointer hover:shadow-xl">
      {isLoading || isRefetching ? <div>loading...</div> : <p>{data?.hitokoto}</p>}
      <Button loading={isLoading} onClick={() => refetch()}>refetch</Button>
    </div>
  )
}

export default Page
