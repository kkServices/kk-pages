declare namespace MockService {

  interface ErrorRes {
    code: number
    data: null
    message: string
    errorShowType: number
    requestId: string
    success: boolean
    timestamp: string
    digest: string
  }

}
