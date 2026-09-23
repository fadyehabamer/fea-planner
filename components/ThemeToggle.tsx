'use client'

import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

const SUN =
  'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4'
const MOON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const next = theme === 'dark' ? t.lightMode : t.darkMode

  return (
    <button
      onClick={toggle}
      title={next}
      aria-label={`${t.theme}: ${next}`}
      className={`grid h-11 w-11 place-items-center rounded-full border border-[var(--line-soft)] text-[var(--fg-dim)] transition-colors hover:text-[var(--amber)] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d={theme === 'dark' ? SUN : MOON} />
      </svg>
    </button>
  )
}
