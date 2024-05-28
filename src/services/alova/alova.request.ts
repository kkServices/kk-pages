import type { Alova, AlovaMethodCreateConfig, AlovaOptions, RequestBody } from 'alova'
import { createAlova } from 'alova'

type ConfigWithMeta<Meta, R, T, RC, RH> = Omit<AlovaMethodCreateConfig<R, T, RC, RH>, 'meta'> & {
  meta?: Meta
}
export class WarpAlova<S, E, RC, RE, RH> {
  public options: AlovaOptions<S, E, RC, RE, RH>
  public instance: Alova<S, E, RC, RE, RH>

  constructor(options: AlovaOptions<S, E, RC, RE, RH>) {
    this.options = options
    this.instance = createAlova<S, E, RC, RE, RH>(this.options)
  }

  private processConfig<R, T = unknown>(config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>): AlovaMethodCreateConfig<R, T, RC, RH> {
    const meta: Service.Meta = {
      isTransformResponse: true,
    }
    if (!config)
      return { meta } as unknown as AlovaMethodCreateConfig<R, T, RC, RH>
    return { ...config, meta: { ...meta, ...config.meta } } as AlovaMethodCreateConfig<R, T, RC, RH>
  }

  Get<R, T = unknown>(url: string, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Get<R, T>(url, this.processConfig(config))
  }

  Post<R, T = unknown>(url: string, data?: RequestBody, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Post<R, T>(url, data, this.processConfig(config))
  }

  Patch<R, T = unknown>(url: string, data?: RequestBody, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Patch<R, T>(url, data, this.processConfig(config))
  }

  Put<R, T = unknown>(url: string, data?: RequestBody, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Put<R, T>(url, data, this.processConfig(config))
  }

  Delete<R, T = unknown>(url: string, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Delete<R, T>(url, this.processConfig(config))
  }

  Options<R, T = unknown>(url: string, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Options<R, T>(url, this.processConfig(config))
  }

  Head<R, T = unknown>(url: string, config?: ConfigWithMeta<Partial<Service.Meta>, R, T, RC, RH>) {
    return this.instance.Head<R, T>(url, this.processConfig(config))
  }
}
