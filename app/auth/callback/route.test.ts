import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const exchangeCodeForSession = vi.hoisted(() => vi.fn())

vi.mock('@/lib/supabase/server', () => ({
  createClient: async () => ({ auth: { exchangeCodeForSession } }),
}))

const { GET } = await import('./route')

const call = (qs: string) => GET(new NextRequest(`https://daftar.test/auth/callback${qs}`))

beforeEach(() => {
  exchangeCodeForSession.mockReset()
})

describe('GET /auth/callback', () => {
  it('exchanges the code and lands on /habits by default', async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null })
    const res = await call('?code=abc')
    expect(exchangeCodeForSession).toHaveBeenCalledWith('abc')
    expect(res.headers.get('location')).toBe('https://daftar.test/habits')
  })

  it('honours a same-origin ?next= path', async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null })
    const res = await call('?code=abc&next=/goals')
    expect(res.headers.get('location')).toBe('https://daftar.test/goals')
  })

  it.each(['@evil.example', '//evil.example', 'https://evil.example', '.evil.example'])(
    'ignores an off-site ?next=%s',
    async (next) => {
      exchangeCodeForSession.mockResolvedValue({ error: null })
      const res = await call(`?code=abc&next=${encodeURIComponent(next)}`)
      expect(new URL(res.headers.get('location')!).host).toBe('daftar.test')
      expect(res.headers.get('location')).toBe('https://daftar.test/habits')
    },
  )

  it('sends the user back to /login when the exchange fails', async () => {
    exchangeCodeForSession.mockResolvedValue({ error: new Error('expired') })
    const res = await call('?code=stale')
    expect(res.headers.get('location')).toBe('https://daftar.test/login?error=auth')
  })

  it('does not call Supabase without a code', async () => {
    const res = await call('')
    expect(exchangeCodeForSession).not.toHaveBeenCalled()
    expect(res.headers.get('location')).toBe('https://daftar.test/login?error=auth')
  })
})
