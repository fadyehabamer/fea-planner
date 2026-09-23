import { IBM_Plex_Sans_Arabic, Outfit } from 'next/font/google'

/**
 * ─── Switching to Thamanya ────────────────────────────────────────────────
 * Thamanya is published by Thmanyah, not by Google Fonts, so it cannot be
 * pulled in through next/font/google. To use it:
 *
 *   1. Put the web files in app/fonts/ (woff2 preferred), e.g.
 *        app/fonts/Thamanya-Regular.woff2
 *        app/fonts/Thamanya-Medium.woff2
 *        app/fonts/Thamanya-Bold.woff2
 *   2. Uncomment the block below and delete the appFont export under it.
 *
 * Nothing else in the codebase needs to change — everything reads the
 * --font-app variable this file defines.
 *
 * import localFont from 'next/font/local'
 *
 * export const appFont = localFont({
 *   src: [
 *     { path: '../app/fonts/Thamanya-Regular.woff2', weight: '400', style: 'normal' },
 *     { path: '../app/fonts/Thamanya-Medium.woff2',  weight: '500', style: 'normal' },
 *     { path: '../app/fonts/Thamanya-Bold.woff2',    weight: '700', style: 'normal' },
 *   ],
 *   variable: '--font-app',
 *   display: 'swap',
 * })
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * Interim Arabic face. Neutral and modern rather than rounded, which suits a
 * greyscale layout far better than a friendlier face would. Tops out at 700,
 * so `font-extrabold` renders as bold — intentional, not a bug.
 */
export const appFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-app',
  display: 'swap',
})

/** Latin display face for headings. Arabic has no Outfit glyphs and falls
 *  through to appFont via the font-family stack. */
export const displayFont = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
