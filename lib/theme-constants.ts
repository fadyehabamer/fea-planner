// Deliberately NOT a 'use client' module: the root layout is a Server Component,
// and importing these from a client module hands back client references rather
// than the literal values (the inline theme script became getItem(undefined)).
export type Theme = 'dark' | 'light'

export const THEME_KEY = 'planner.theme'
export const DEFAULT_THEME: Theme = 'dark'

/** Kept in sync with the tokens in globals.css so browser chrome matches the page. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: '#0a1020',
  light: '#f4f6fb',
}
