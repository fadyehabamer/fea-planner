import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

type CookieAdapter = {
  getAll: () => { name: string; value: string }[]
  setAll: (c: { name: string; value: string; options?: object }[]) => void
}

const supabase = vi.hoisted(() => ({
  user: null as null | { id: string },
  cookiesToSet: [] as { name: string; value: string; options?: object }[],
  createServerClient: vi.fn(),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: supabase.createServerClient,
}))

const { proxy } = await import('./proxy')

function request(path: string) {
  return new NextRequest(new URL(path, 'https://daftar.test'))
}

beforeEach(() => {
  supabase.user = null
  supabase.cookiesToSet = []
  supabase.createServerClient.mockImplementation(
    (_url: string, _key: string, opts: { cookies: CookieAdapter }) => ({
      auth: {
        getUser: async () => {
          // A token refresh writes new session cookies through the adapter.
          if (supabase.cookiesToSet.length) opts.cookies.setAll(supabase.cookiesToSet)
          return { data: { user: supabase.user } }
        },
      },
    }),
  )
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project.supabase.test')
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key')
})

describe('proxy', () => {
  it('passes everything through when Supabase is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    const res = await proxy(request('/habits'))
    expect(res.headers.get('location')).toBeNull()
    expect(supabase.createServerClient).not.toHaveBeenCalled()
  })

  it.each(['/habits', '/tasks', '/goals', '/year', '/settings', '/habits/2026-09'])(
    'redirects a signed-out visitor from %s to /login',
    async (path) => {
      const res = await proxy(request(path))
      expect(res.status).toBe(307)
      expect(new URL(res.headers.get('location')!).pathname).toBe('/login')
    },
  )

  it.each(['/', '/why', '/policy', '/login', '/does-not-exist', '/habitsfoo'])(
    'lets a signed-out visitor reach public path %s',
    async (path) => {
      const res = await proxy(request(path))
      expect(res.headers.get('location')).toBeNull()
    },
  )

  it('sends a signed-in user away from /login to the app', async () => {
    supabase.user = { id: 'u1' }
    const res = await proxy(request('/login'))
    expect(new URL(res.headers.get('location')!).pathname).toBe('/habits')
  })

  it('lets a signed-in user through to protected pages', async () => {
    supabase.user = { id: 'u1' }
    const res = await proxy(request('/tasks'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('forwards refreshed session cookies on the response', async () => {
    supabase.user = { id: 'u1' }
    supabase.cookiesToSet = [{ name: 'sb-access-token', value: 'fresh', options: { path: '/' } }]
    const res = await proxy(request('/habits'))
    expect(res.cookies.get('sb-access-token')?.value).toBe('fresh')
  })

  it('reads cookies from the incoming request', async () => {
    const req = request('/habits')
    req.cookies.set('sb-access-token', 'abc')
    let seen: { name: string; value: string }[] = []
    supabase.createServerClient.mockImplementationOnce(
      (_u: string, _k: string, opts: { cookies: CookieAdapter }) => ({
        auth: {
          getUser: async () => {
            seen = opts.cookies.getAll()
            return { data: { user: null } }
          },
        },
      }),
    )
    await proxy(req)
    expect(seen).toContainEqual(expect.objectContaining({ name: 'sb-access-token', value: 'abc' }))
  })
})
