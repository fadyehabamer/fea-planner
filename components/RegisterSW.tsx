'use client'

import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    // Registration failures are non-fatal: the app works fine without it.
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  }, [])

  return null
}
