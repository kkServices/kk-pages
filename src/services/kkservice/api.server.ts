import { requestServer } from '@/services/alova/request.serve'

const serverApi = {
  getJxkDoorLock: () => requestServer.Get<KkService.JXKDoorLock>('/company/jxk/doorlock', { cache: 'no-cache' }),
}
export { serverApi }
