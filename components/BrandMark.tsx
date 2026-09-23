/**
 * The mark is the product's one gesture: a sheet of boxes, one of them ticked.
 * Drawn rather than lettered, so it reads the same in Arabic and English.
 */
export default function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="var(--fg)" />
      <rect x="8" y="8" width="8.5" height="8.5" rx="2.2" fill="var(--bg)" opacity="0.35" />
      <rect x="19.5" y="8" width="8.5" height="8.5" rx="2.2" fill="var(--bg)" opacity="0.35" />
      <rect x="8" y="19.5" width="8.5" height="8.5" rx="2.2" fill="var(--bg)" opacity="0.35" />
      <rect x="19.5" y="19.5" width="8.5" height="8.5" rx="2.2" fill="var(--pop)" />
    </svg>
  )
}
