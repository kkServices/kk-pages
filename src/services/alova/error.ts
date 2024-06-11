export class BusinessException extends Error {
  readonly response: KkService.ErrorRes
  constructor(options: KkService.ErrorRes) {
    super(`${options.code}:${options.message}`)
    this.name = `RequestError`
    this.response = options
  }
}
