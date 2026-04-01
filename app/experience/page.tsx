'use client'

import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'
import PageLayout from '@/components/PageLayout'
import Timeline from '@/components/Timeline'

export default function ExperiencePage() {
  const { t } = useLanguage()
  const items = siteConfig.experience

  return (
    <PageLayout title="Experience" titleZh="工作经历">
      <Timeline items={items} />
    </PageLayout>
  )
}
