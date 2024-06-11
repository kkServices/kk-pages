'use client'

import { requestClient } from '@/services/alova/request.client'

const clientApi = {
  getJxkDoorLock: () => requestClient.Get<KkService.JXKDoorLock>('http://localhost:3000/api/company/jxk/doorlock', {}),
  getHitokoto: () => requestClient.Get<KkService.Hitokoto>('https://v1.hitokoto.cn/', {}).send(),
}
export { clientApi }
