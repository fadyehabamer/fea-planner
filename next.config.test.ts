import { afterEach, describe, expect, it, vi } from 'vitest'

async function loadHeaders() {
  vi.resetModules()
  const { default: config } = await import('./next.config')
  const rules = await config.headers!()
  const all = rules.find((r) => r.source === '/:path*')!.headers
  const get = (key: string) => all.find((h) => h.key === key)?.value
  return { config, rules, get }
}

const directive = (csp: string, name: string) =>
  csp.split('; ').find((d) => d.startsWith(`${name} `))

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('next.config security headers', () => {
  it('allows the Supabase origin (https + wss) in connect-src', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://abc.supabase.co/rest/v1')
    const { get } = await loadHeaders()
    expect(directive(get('Content-Security-Policy')!, 'connect-src')).toBe(
      "connect-src 'self' https://abc.supabase.co wss://abc.supabase.co",
    )
  })

  it('falls back to same-origin only when Supabase is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    const { get } = await loadHeaders()
    expect(directive(get('Content-Security-Policy')!, 'connect-src')).toBe("connect-src 'self'")
  })

  it('locks down framing, sniffing and object embeds', async () => {
    const { get, config } = await loadHeaders()
    const csp = get('Content-Security-Policy')!
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(get('X-Frame-Options')).toBe('DENY')
    expect(get('X-Content-Type-Options')).toBe('nosniff')
    expect(config.poweredByHeader).toBe(false)
  })

  it('never lets the service worker be cached', async () => {
    const { rules } = await loadHeaders()
    const sw = rules.find((r) => r.source === '/sw.js')!
    expect(sw.headers).toContainEqual({
      key: 'Cache-Control',
      value: 'public, max-age=0, must-revalidate',
    })
  })
})
