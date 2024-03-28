import dataYml from '@data/webstack/data.yml'
import PageClient from './page.client'

const data: WebStack.Data[] = dataYml

export default function Page() {
  return (
    <PageClient data={data} />
  )
}
