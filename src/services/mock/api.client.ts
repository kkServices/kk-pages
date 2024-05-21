'use client'
import { requestClient } from '@/services/mock/request.client'

export async function getHitokoto() {
  return requestClient.Get<{ hitokoto: string }>('https://international.v1.hitokoto.cn/', {
    params: {
      t: Date.now(),
    },
    meta: {
      isTransformResponse: false,
    },
  })
}
