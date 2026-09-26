import { describe, expect, it } from 'vitest'
import { APP_URL, marketing } from './copy'

/** Every leaf path in an object, with array lengths folded into the path. */
function shape(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))]
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k))
  }
  return [path]
}

function leaves(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(leaves)
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves)
  return [value]
}

describe('marketing copy', () => {
  it('has the same structure in Arabic and English', () => {
    expect(shape(marketing.ar).sort()).toEqual(shape(marketing.en).sort())
  })

  it('has no empty strings', () => {
    for (const locale of ['ar', 'en'] as const) {
      for (const leaf of leaves(marketing[locale])) {
        if (typeof leaf === 'string') expect(leaf.trim()).not.toBe('')
      }
    }
  })

  it('points at an https app URL', () => {
    expect(new URL(APP_URL).protocol).toBe('https:')
  })
})
