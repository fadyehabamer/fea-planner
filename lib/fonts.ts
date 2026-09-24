import localFont from 'next/font/local'
import { Archivo } from 'next/font/google'

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

/**
 * Arabic: Thamanya (thmanyah sans), self-hosted from app/fonts/thmanyah.
 * next/font/local bundles and fingerprints the files into the build, which is
 * the "compiled, packaged" web embedding its licence permits. Only these four
 * weights are shipped; the vendor folder with the OTFs stays out of git.
 * extrabold (800) resolves to Black, the next weight up.
 */
export const arabicFont = localFont({
  src: [
    { path: '../app/fonts/thmanyah/thmanyahsans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/thmanyah/thmanyahsans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../app/fonts/thmanyah/thmanyahsans-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../app/fonts/thmanyah/thmanyahsans-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-ar',
  display: 'swap',
})
