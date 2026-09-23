'use client'

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react'

import { DEFAULT_THEME, THEME_COLORS, THEME_KEY, type Theme } from './theme-constants'

export type { Theme }

// Same external-store pattern as the locale: no cascading render, no hydration
// mismatch, and a second open tab follows along.
const listeners = new Set<() => void>()

function readTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'light' ? 'light' : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function serverTheme(): Theme {
  return DEFAULT_THEME
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onChange)
  }
}

function writeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Not persisted, but the notification below still applies it for this session.
  }
  listeners.forEach((fn) => fn())
}

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void }

const ThemeContext = createContext<Ctx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // The address bar / status bar colour is not covered by CSS variables.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  const setTheme = useCallback((t: Theme) => writeTheme(t), [])
  const toggle = useCallback(() => writeTheme(readTheme() === 'dark' ? 'light' : 'dark'), [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
