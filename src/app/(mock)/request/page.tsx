import React from 'react'
import { getExampleProfile } from '@/services/mock/api.server'

interface MockRequestProps {

}
const MockRequest: React.FC<MockRequestProps> = async (_props: MockRequestProps) => {
  const result = await getExampleProfile('19953', '2')

  return <div>{JSON.stringify(result)}</div>
}

export default MockRequest
