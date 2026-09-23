import type { NextConfig } from 'next'

/**
 * The browser talks to Supabase directly (auth + all reads and writes), so its
 * origin has to be allowed in connect-src. Everything else is same-origin:
 * next/font self-hosts the font files at build time, so there is no runtime
 * request to Google.
 */
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : ''

const connectSrc = ["'self'", supabaseOrigin, supabaseOrigin.replace('https://', 'wss://')]
  .filter(Boolean)
  .join(' ')

/**
 * script-src keeps 'unsafe-inline' deliberately. Next.js emits its own inline
 * bootstrap and streaming scripts on every page; locking them down needs a
 * per-request nonce, which forces the static marketing pages to render
 * dynamically on every visit. The app renders no user-supplied HTML — every
 * value goes through React's escaping — so the trade was not worth it here.
 * To tighten later: emit a nonce from proxy.ts and swap 'unsafe-inline' for
 * "'nonce-<value>' 'strict-dynamic'".
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src ${connectSrc}`,
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Vercel already sends HSTS; stated here so the policy lives with the code.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Redundant with frame-ancestors, kept for browsers that predate CSP level 2.
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // The service worker must never be cached at the edge, or a stale one
        // can pin users to an old build.
        source: '/sw.js',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
    ]
  },
}

export default nextConfig
