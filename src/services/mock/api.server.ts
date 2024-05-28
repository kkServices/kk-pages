import { requestServer } from '@/services/alova/request.serve'

export function getExampleProfile(commonId: string, goodsId?: string | null) {
  const body = { goodsId, commonId }

  return requestServer.Post('/example/profile', body)
}
