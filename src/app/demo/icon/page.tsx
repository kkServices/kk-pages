import React from 'react'
import Icon from '@/components/kUi/icon'

interface PageProps {

}
const Page: React.FC<PageProps> = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="card  mt-4">
        <Icon icon="icon-[material-symbols--10k-rounded]" className="text-2xl text-red " />
        <Icon icon="icon-[line-md--github]" className="text-2xl" />
        <Icon icon="icon-[flag--cn-4x3]" className="text-2xl" />
        <Icon icon="icon-[line-md--loading-loop]" className="text-2xl" />
      </div>
    </div>
  )
}

export default Page
