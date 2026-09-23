import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// An explicit allow-list of the signed-in app, rather than a list of public
// paths. Guarding by exclusion meant every unknown URL was redirected to
// /login, so a signed-out visitor could never reach the 404 page.
const PROTECTED_PREFIXES = ['/habits', '/tasks', '/goals', '/year', '/settings']

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Without credentials there is nothing to verify; let the page render its own setup notice.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return response

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/habits'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    // sw.js and the manifest must stay public, or the browser cannot register
    // the service worker and the app stops being installable.
    '/((?!_next/static|_next/image|favicon.ico|sw\\.js|manifest\\.webmanifest|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
