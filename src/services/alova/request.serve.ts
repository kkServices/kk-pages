/* eslint-disable ts/ban-ts-comment */
import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import GlobalFetch from 'alova/GlobalFetch'
import { nanoid } from 'nanoid'
import { WarpAlova } from './alova.request'
import { logger } from '@/lib/logger'
import { BusinessException } from '@/services/alova/error'

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, any>
}

export class RequestServer {
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

const requestServer = new WarpAlova({
  localCache: null,
  requestAdapter: GlobalFetch(),
  baseURL: 'http://127.0.0.1:3000/api',
  beforeRequest: (method) => {
    if (!method.config.cache && !method.config.next) {
      method.config.cache = 'no-cache'
    }

    if (['http://', 'https://'].some(item => method.url.startsWith(item))) {
      method.baseURL = ''
    }

    method.meta._startTime = Date.now()
  },
  responded: {
    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例

    onComplete: async (_method) => {
      // 处理请求完成逻辑
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err, method) => {
      const requestId = nanoid()
      method.meta._endTime = Date.now()
      method.meta._duration = method.meta._endTime - method.meta._startTime
      logger.error(`服务端请求发送失败！`, { request: method, error: err, requestId })
      throw new BusinessException({ code: 500, message: `服务端请求发送失败！`, requestId })
    },

    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      const meta = method.meta as Service.Meta
      const data = await response.json()
      method.meta._endTime = Date.now()
      method.meta._duration = method.meta._endTime - method.meta._startTime

      logger.info('服务端请求发送成功！', { request: method, response: data })

      if (!meta.isTransformResponse)
        return data

      if (response.status >= 400 && !data.success) {
        logger.warn('服务端请求发送成功,但业务状态码失败！', { request: method, response: data })
        return Promise.reject(new BusinessException(data))
      }
      else {
        logger.info('服务端请求发送成功！', { request: method, response: data })
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return data.data
    },
  },
})

export { requestServer }
