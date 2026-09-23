import { JetBrains_Mono, Noto_Kufi_Arabic } from 'next/font/google'

/**
 * ─── Switching Arabic to Thamanya ─────────────────────────────────────────
 * Thamanya is published by Thmanyah, not Google Fonts, so next/font/google
 * cannot reach it. To use it:
 *
 *   1. Put the web files in app/fonts/ (woff2 preferred).
 *   2. Uncomment the block below and delete the arabicFont export under it.
 *
 * Nothing else changes — everything reads the --font-ar variable.
 *
 * import localFont from 'next/font/local'
 *
 * export const arabicFont = localFont({
 *   src: [
 *     { path: '../app/fonts/Thamanya-Regular.woff2', weight: '400', style: 'normal' },
 *     { path: '../app/fonts/Thamanya-Medium.woff2',  weight: '500', style: 'normal' },
 *     { path: '../app/fonts/Thamanya-Bold.woff2',    weight: '700', style: 'normal' },
 *   ],
 *   variable: '--font-ar',
 *   display: 'swap',
 * })
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * Latin and every numeral. A monospace face is not only the direction here —
 * it is functionally right for a screen that is mostly a grid of figures,
 * because the digits are all one width and columns stop shifting.
 */
export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

/** Arabic. Geometric kufi, which sits with a monospace Latin far better than
 *  a rounded or naskh face would. */
export const arabicFont = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-ar',
  display: 'swap',
})
