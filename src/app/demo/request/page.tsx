import React from 'react'

export const dynamic = 'force-dynamic'
interface MockRequestProps {

}
const MockRequest: React.FC<MockRequestProps> = async (_props: MockRequestProps) => {
  return (
    <div className="min-h-64 break-all rounded-xl bg-white p-2 text-center shadow transition duration-300 hover:shadow-xl">
    </div>
  )
}

export default MockRequest
