interface AlovaResponse<T> extends Omit<Response, 'json'> {
  json: () => Promise<T>
}

declare namespace Service {
  interface Meta {
    /**
     * 是否需要对响应数据进行转换
     * @default true
     */
    isTransformResponse: boolean
    _startTime?: number
    _endTime?: number
    _duration?: number
  }
}
