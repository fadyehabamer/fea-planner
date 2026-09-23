import { Archivo, Reem_Kufi } from 'next/font/google'

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
 * Latin. A variable grotesque that holds up at 900 and 10rem, which is what
 * the oversized headlines need. Being variable, one file covers every weight
 * instead of one file per weight.
 */
export const latinFont = Archivo({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
})

/** Arabic. Geometric kufi — the only Arabic family on Google Fonts with the
 *  same squared-off, poster-weight character as Archivo at display size. */
export const arabicFont = Reem_Kufi({
  subsets: ['arabic'],
  variable: '--font-ar',
  display: 'swap',
})

