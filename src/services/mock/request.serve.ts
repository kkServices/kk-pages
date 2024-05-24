/* eslint-disable ts/ban-ts-comment */
import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { logger } from '@/lib/logger'

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, any>
}

export class BusinessException extends Error {
  readonly response: MockService.ErrorRes
  constructor(options: MockService.ErrorRes) {
    super(`${options.code}:${options.message}`)
    this.name = `RequestError`
    this.response = options
  }
}

class RequestServer {
  baseUrl = ''
  constructor(options: { baseUrl: string } = { baseUrl: '' }) {
    this.baseUrl = options.baseUrl
  }

  async fetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
    if (!url.startsWith('http'))
      url = this.baseUrl + url
    const body = this.addExtraInfoToBody(options.body)
    const headers = this.addExtraInfoToHeader(options.headers)
    const requestInit = this.processFetchOptions({ ...options, body, headers })
    let response: any = null
    try {
      response = await (await fetch(url, requestInit)).json()
    }
    catch (e) {
      logger.error(`2请求${url}失败`, { request: options, response, stack: (e as Error).stack })
      throw new Error('请求失败')
    }
    // console.info('发送请求')
    if (!response.success) {
      logger.warn(`请求成功，业务响应错误错误`, { url, request: requestInit, response })
      // throw new RequestError({ response: result })

      return Promise.reject(new BusinessException(response))
    }

    return response
  }

  private getCookie(...args: [name: string] | [RequestCookie]) {
    const cookieStore = cookies()
    return cookieStore.get(...args)
  }

  /**
   * 对请求添加添加额外信息header信息
   * @private
   * @param headers
   */
  private addExtraInfoToHeader(headers: HeadersInit = {}) {
    const token = this.getCookie('token')
    headers = { 'Content-Type': 'application/json', ...headers }

    if (token?.value)
      (headers as any).Authorization = `Bearer ${token.value}`

    return headers
  }

  /**
   * 对请求添加额外信息body信息
   * @param body
   * @private
   */
  private addExtraInfoToBody(body: Record<string, any> = {}) {
    const token = this.getCookie('token')

    if (token?.value)
      body.token = token.value

    return body
  }

  private processFetchOptions(options: FetchOptions): RequestInit {
    // 如果是 post 请求,并且body是json对象，需要转换为字符串
    let body = options.body

    if (options.method?.toLowerCase() !== 'get') {
    // 如果请求头是json格式，需要转换为字符串
      // @ts-expect-error
      if (options.headers?.['Content-Type'].includes('application/json'))
        body = JSON.stringify(options.body) as any
      // @ts-expect-error
      if (options.headers?.['Content-Type'].includes('application/x-www-form-urlencoded')) {
        body = new URLSearchParams()
        for (const key in options.body)
          body.append(key, options.body[key])
      }
      // @ts-expect-error
      if (options.headers?.['Content-Type'].includes('multipart/form-data')) {
        body = new FormData()
        for (const key in options.body)
          body.append(key, options.body[key])
      }
    }

    return { ...options, body: (body as any) }
  }
}

const requestServer = new RequestServer({ baseUrl: 'http://127.0.0.1:3000/api' })
export { requestServer }
