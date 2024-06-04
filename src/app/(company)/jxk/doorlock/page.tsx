import { serverApi } from '@/services/kkservice/api.server'
import QrCode from '@/app/(company)/jxk/doorlock/components/QrCode'

export default async function page() {
  const result = await serverApi.getJxkDoorLock()
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <QrCode code={result.result} size={250} />
    </div>
  )
}
