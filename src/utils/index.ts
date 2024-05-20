export function formatBody(body: Record<string, any>) {
  const o = new URLSearchParams()
  for (const key in body) {
    if (body[key] !== undefined && body[key] !== null)
      o.append(key, body[key])
  }
  return o
}
