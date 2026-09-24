import { Bricolage_Grotesque, Caveat, Marhey } from 'next/font/google'

/* ─── Marketing site only ─────────────────────────────────────────────────
 * The landing pages are a paper notebook, so they get friendlier faces than
 * the app. Kept out of lib/fonts.ts on purpose: next/font preloads every
 * font declared in a module the page imports, and the root layout imports
 * that one, so declaring these there made app routes download them too.
 */

/** Latin display + body: a quirky grotesque with real personality at size. */
export const funFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-fun',
  display: 'swap',
  axes: ['opsz'],
})

/* Arabic display + body is Thamanya, shared with the app (lib/fonts.ts). */

/** Handwritten margin notes, one per script. */
export const handFont = Caveat({ subsets: ['latin'], variable: '--font-hand', display: 'swap' })
export const handArabicFont = Marhey({
  subsets: ['arabic'],
  variable: '--font-hand-ar',
  display: 'swap',
})
