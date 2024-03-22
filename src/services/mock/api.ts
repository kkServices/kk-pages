import { request } from '@/lib/request'

export function goodsDetailApi(commonId: string, goodsId?: string | null) {
  const urlencoded = new URLSearchParams()
  urlencoded.append('commonId', commonId)
  if (goodsId)
    urlencoded.append('goodsId', goodsId)

  return request('https://mock.apifox.com/m1/4081920-0-default/goods', {
    method: 'post',
    body: urlencoded,
    cache: 'no-cache',
    // next: { revalidate: 10},
  })
}
