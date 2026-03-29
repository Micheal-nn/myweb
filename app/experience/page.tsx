import PageLayout from '@/components/PageLayout'
import Timeline from '@/components/Timeline'
import { siteConfig } from '@/lib/config'

export default function ExperiencePage() {
  return (
    <PageLayout title="Experience" titleZh="工作经历">
      <Timeline items={siteConfig.experience} />
    </PageLayout>
  )
}
