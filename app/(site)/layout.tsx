import SiteChrome from '@/components/site/SiteChrome'
import { I18nProvider } from '@/lib/i18n'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SiteChrome>{children}</SiteChrome>
    </I18nProvider>
  )
}
