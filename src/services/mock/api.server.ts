import { requestServer } from './request.serve'

export function getExampleProfile(commonId: string, goodsId?: string | null) {
  const body = { goodsId, commonId }

  return requestServer.fetch<{ username: string }>('/example/profile', {
    body,
    cache: 'no-cache',
    method: 'post',
    // next: { revalidate: 10},
  })
}
