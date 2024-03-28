import * as fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import PageClient from '@/app/(webstack)/webstack/page.client'

export function generateStaticParams() {
  // eslint-disable-next-line node/prefer-global/process
  return fs.readdirSync(path.resolve(process.cwd(), 'data/webstack/sub')).map((file) => {
    return { slug: [file.replace('.yml', '')] }
  })
}
async function getStaticData(id: string) {
  try {
    return (await import (`@data/webstack/sub/${id}.yml`)).default
  }
  catch (e) {
    return []
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getStaticData(params.slug)
  if (data.length === 0)
    return notFound()
  return <PageClient data={data} />
}
