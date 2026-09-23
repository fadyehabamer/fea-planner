'use client'

import { useEffect } from 'react'
import StatusPage from '@/components/site/StatusPage'
import './globals.css'

/**
 * Last-resort boundary: it replaces the root layout entirely, so it has to
 * render its own document shell. Theme falls back to dark because the
 * no-flash script in the real layout never ran.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Root layout error:', error)
  }, [error])

  return (
    <html lang="ar" dir="rtl" data-theme="dark">
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <StatusPage kind="500" onRetry={reset} />
      </body>
    </html>
  )
}
