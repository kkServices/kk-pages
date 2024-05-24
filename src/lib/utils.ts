/**
 * 客户端服务端通用工具函数
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatBody(body: Record<string, any>) {
  const o = new URLSearchParams()
  for (const key in body) {
    if (body[key] !== undefined && body[key] !== null)
      o.append(key, body[key])
  }
  return o
}
