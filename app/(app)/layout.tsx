import Providers from '@/components/Providers'

// Every page in this group is per-user and auth-gated, so there is nothing
// worth prerendering at build time — and prerendering would require database
// credentials to exist before the first deploy.
export const dynamic = 'force-dynamic'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
