// @vitest-environment jsdom
import { act, cleanup, render, renderHook, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { I18nProvider, MONTHS, WEEKDAYS, WEEKDAYS_SHORT, dict, useI18n } from './i18n'

const STORAGE_KEY = 'planner.locale'

describe('dictionaries', () => {
  it('define the same keys in Arabic and English', () => {
    expect(Object.keys(dict.ar).sort()).toEqual(Object.keys(dict.en).sort())
  })

  it('have no empty strings', () => {
    for (const locale of ['ar', 'en'] as const) {
      for (const [key, value] of Object.entries(dict[locale])) {
        expect(value.trim(), `${locale}.${key}`).not.toBe('')
      }
    }
  })

  it('list 12 months and 7 Sunday-first weekdays per language', () => {
    for (const locale of ['ar', 'en'] as const) {
      expect(MONTHS[locale]).toHaveLength(12)
      expect(WEEKDAYS[locale]).toHaveLength(7)
      expect(WEEKDAYS_SHORT[locale]).toHaveLength(7)
    }
    expect(WEEKDAYS.en[0]).toBe('Sunday')
    expect(WEEKDAYS.en[new Date(2026, 8, 26).getDay()]).toBe('Saturday')
  })
})

function Probe() {
  const { locale, dir, t, setLocale } = useI18n()
  return (
    <div>
      <span data-testid="state">{`${locale}|${dir}|${t.settings}`}</span>
      <button onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}>switch</button>
    </div>
  )
}

describe('I18nProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('defaults to Arabic, right-to-left', () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('state').textContent).toBe(`ar|rtl|${dict.ar.settings}`)
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('restores a saved locale', () => {
    window.localStorage.setItem(STORAGE_KEY, 'en')
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('state').textContent).toBe('en|ltr|Settings')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('ignores an unknown saved value', () => {
    window.localStorage.setItem(STORAGE_KEY, 'fr')
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('state').textContent.startsWith('ar|rtl')).toBe(true)
  })

  it('switches language, persists it and updates <html>', () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    act(() => screen.getByText('switch').click())
    expect(screen.getByTestId('state').textContent).toBe('en|ltr|Settings')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('still works when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    expect(screen.getByTestId('state').textContent.startsWith('ar|rtl')).toBe(true)
    expect(() => act(() => screen.getByText('switch').click())).not.toThrow()
  })

  it('useI18n throws outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useI18n())).toThrow(/inside I18nProvider/)
  })
})
