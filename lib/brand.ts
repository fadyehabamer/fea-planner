// Deliberately NOT a 'use client' module, so the root layout (a Server
// Component) reads the literal strings. Rename the product here.
export const BRAND = {
  en: 'Daftar',
  ar: 'دفتر',
  /** Used where one string has to serve both languages (tab title, manifest). */
  both: 'Daftar · دفتر',
} as const
