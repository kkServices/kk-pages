'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { getHitokoto } from '@/services/mock/api.client'
import { cn } from '@/lib/utils'

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
      {!data ? <div>loading...</div> : <p className={cn(isLoading || isRefetching ? 'opacity-80' : '', 'transition duration-500')}>{data?.hitokoto}</p>}
      <Button loading={isLoading || isRefetching} onClick={() => refetch()}>refetch</Button>
    </div>
  )
}

export default Page
