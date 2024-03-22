/* eslint-disable unused-imports/no-unused-vars */
interface RequestInitOverrides extends RequestInit {
  /**
   * 自动进行 JSON 解析
   */
  isOnlyResponseData?: boolean

}
export function request<T>(input: string, init: RequestInitOverrides): Promise<T>
export function request<T>(input: string, init: RequestInitOverrides & { isOnlyResponseData: false }): Promise<Response>
export function request<T>(input: string, init: RequestInitOverrides & { isOnlyResponseData: true | undefined }): Promise<T>
export async function request<T = any>(input: string, init: RequestInitOverrides): Promise<T | Response> {
  // const input = init.input
  init = defaultInit(init)
  if (init.isOnlyResponseData) {
    const response = await fetch(input, init)
    const data: T = await response.json()
    return data
  }
  return fetch(input, init)
}

function defaultInit(init: RequestInitOverrides): RequestInitOverrides {
  return {
    isOnlyResponseData: true,
    ...init,
  }
}
