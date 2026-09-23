import { BRAND } from '@/lib/brand'
import StatusPage from '@/components/site/StatusPage'

export const metadata = { title: `404 · ${BRAND.en}` }

export default function NotFound() {
  return <StatusPage kind="404" />
}
