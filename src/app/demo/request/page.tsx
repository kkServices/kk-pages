import React from 'react'
import to from 'await-to-js'
import { getExampleProfile } from '@/services/mock/api.server'
import { BusinessError } from '@/components/business/error'
import type { BusinessException } from '@/services/alova/error'

export const dynamic = 'force-dynamic'
interface MockRequestProps {

}
const MockRequest: React.FC<MockRequestProps> = async (_props: MockRequestProps) => {
  const [error, result] = await to<any, BusinessException>(getExampleProfile('19953', '2').send())
  if (error) {
    const { response } = error
    return <BusinessError message={response?.message || '请求失败'} code={response?.code || 500} requestId={response?.requestId || ''} />
  }
  return (
    <div className="min-h-64 break-all rounded-xl bg-white p-2 text-center shadow transition duration-300 hover:shadow-xl">
      {JSON.stringify(result)}
    </div>
  )
}

export default MockRequest
