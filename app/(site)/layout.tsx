import SiteChrome from '@/components/site/SiteChrome'
import { funFont, handArabicFont, handFont } from '@/lib/site-fonts'
import { I18nProvider } from '@/lib/i18n'

const fonts = [funFont, handFont, handArabicFont].map((f) => f.variable).join(' ')

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className={`site ${fonts}`}>
        <SiteChrome>{children}</SiteChrome>
      </div>
    </I18nProvider>
  )
}
