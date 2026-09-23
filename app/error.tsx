'use client'

import { useEffect } from 'react'
import StatusPage from '@/components/site/StatusPage'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surfaces in the Vercel function logs with the digest shown to the user.
    console.error('Unhandled application error:', error)
  }, [error])

  return <StatusPage kind="500" onRetry={reset} />
}
