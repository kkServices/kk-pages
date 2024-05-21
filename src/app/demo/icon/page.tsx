import React from 'react'

interface PageProps {

}
const Page: React.FC<PageProps> = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="card  mt-4 ">
        <i className="icon-[material-symbols--10k-rounded] align-middle text-3xl"></i>
        <i className="icon-[line-md--github] align-middle text-3xl"></i>
        <i className="icon-[line-md--loading-loop] align-middle text-3xl"></i>
        <i className="icon-[flag--cn-4x3] align-middle text-3xl"></i>
      </div>
    </div>
  )
}

export default Page
