import React from 'react'
import { getExampleProfile } from '@/services/mock/api.server'

interface MockRequestProps {

}
const MockRequest: React.FC<MockRequestProps> = async (_props: MockRequestProps) => {
  const result = await getExampleProfile('19953', '2')

  return (
    <div className="min-h-64 rounded-xl bg-white p-2 text-center shadow transition duration-300 hover:shadow-xl">
      {JSON.stringify(result)}
    </div>
  )
}

export default MockRequest
