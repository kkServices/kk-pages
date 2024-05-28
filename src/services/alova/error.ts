export class BusinessException extends Error {
  readonly response: MockService.ErrorRes
  constructor(options: MockService.ErrorRes) {
    super(`${options.code}:${options.message}`)
    this.name = `RequestError`
    this.response = options
  }
}
