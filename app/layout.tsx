import type { Metadata, Viewport } from 'next'
import RegisterSW from '@/components/RegisterSW'
import { arabicFont, latinFont } from '@/lib/fonts'
import { BRAND } from '@/lib/brand'
import { ThemeProvider } from '@/lib/theme'
import { THEME_COLORS, THEME_KEY } from '@/lib/theme-constants'
import './globals.css'

export const metadata: Metadata = {
  title: BRAND.both,
  description:
    'دوسة واحدة في اليوم، وشهرك كله قدامك: العادات والنوم والمهام والأهداف. One tap a day — habits, sleep, tasks and goals on one monthly page. Free.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: BRAND.en,
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-180.png',
  },
}

export const viewport: Viewport = {
  themeColor: THEME_COLORS.dark,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// Runs before first paint so a light-theme user never sees a dark flash.
const noFlashTheme = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});var d=t==='light'?'light':'dark';document.documentElement.setAttribute('data-theme',d);if(d==='light'){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',${JSON.stringify(
  THEME_COLORS.light,
)});}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      className={`${latinFont.variable} ${arabicFont.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
        {/* Scroll reveals are driven by IntersectionObserver. Without JS nothing
            would ever flip them visible, so opt out of hiding them entirely. */}
        <noscript>
          <style>{'.reveal-item{opacity:1!important;transform:none!important}.draw path{stroke-dashoffset:0!important;animation:none!important}'}</style>
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
        <RegisterSW />
      </body>
    </html>
  )
}
