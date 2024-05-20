import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

class RequestServer {
  baseUrl = ''
  constructor(options: { baseUrl: string } = { baseUrl: '' }) {
    this.baseUrl = options.baseUrl
  }

  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (!url.startsWith('http'))
      url = this.baseUrl + url

    const o = this.addExtraInfo(options)

    const result = await (await fetch(url, o)).json()
    if (!result.success)
      return Promise.reject(result)

    return result
  }

  private getCookie(...args: [name: string] | [RequestCookie]) {
    const cookieStore = cookies()
    return cookieStore.get(...args)
  }

  /**
   * 对请求添加额外信息
   * @param options
   * @private
   */
  private addExtraInfo(options: RequestInit = {}) {
    if (!options.headers)
      options.headers = {}
    if (!options.body)
      options.body = new URLSearchParams()

    const token = this.getCookie('token')
    if (token?.value)
      (options.headers as any).Authorization = `Bearer ${token.value}`

    if (options.body instanceof URLSearchParams)
      options.body.append('test-key', '自定义添加的内容')

    return options
  }
}

const requestServer = new RequestServer({ baseUrl: 'http://127.0.0.1:3000/api' })
export { requestServer }
