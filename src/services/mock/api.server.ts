import { requestServer } from './request.serve'
import { formatBody } from '@/utils'

export function getExampleProfile(commonId: string, goodsId?: string | null) {
  const body = formatBody({ goodsId, commonId })

  return requestServer.fetch<{ username: string }>('/example/profile', {
    body,
    cache: 'no-cache',
    method: 'post',
    // next: { revalidate: 10},
  })
}
