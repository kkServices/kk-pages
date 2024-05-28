// defaults to auto

import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(_request: Request) {
  revalidateTag('hitokoto')
  return NextResponse.json('hitokoto tag刷新成功', { status: 200 })
}
