'use client'
import GlobalFetch from 'alova/GlobalFetch'
import type { AlovaMeta } from '@/services/mock/alova.request'
import { WarpAlova } from '@/services/mock/alova.request'

export const requestClient = new WarpAlova({
  requestAdapter: GlobalFetch(),
  localCache: null,
  beforeRequest(method) {
    // const meta = method.meta as AlovaMeta
    // console.log(meta)
    method.config.cache = 'no-cache'
  },
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400)
        throw new Error(response.statusText)
      const meta = method.meta as AlovaMeta
      const data = await response.json()
      if (!meta.isTransformResponse)
        return data
      if (!data.success) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw await Promise.reject(data.errMessage)
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return data.data
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (_err, _method) => {
      // alert(error.message)
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: async (_method) => {
      // 处理请求完成逻辑
    },
  },

})
