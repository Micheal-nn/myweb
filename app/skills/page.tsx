import PageLayout from '@/components/PageLayout'
import { siteConfig } from '@/lib/config'

const skillCategories = [
  { key: 'programming', title: 'Programming Languages', titleZh: '编程语言' },
  { key: 'aiml', title: 'AI/ML Frameworks', titleZh: 'AI/ML框架' },
  { key: 'product', title: 'Product Management', titleZh: '产品管理' },
  { key: 'domain', title: 'Domain Expertise', titleZh: '领域专长' },
  { key: 'tools', title: 'Tools & Platforms', titleZh: '工具与平台' },
] as const

export default function SkillsPage() {
  return (
    <PageLayout title="Skills" titleZh="技能">
      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.key} className="card">
            <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{category.titleZh}</p>
            
            <div className="flex flex-wrap gap-2">
              {siteConfig.skills[category.key].map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-accent-primary/10 text-accent-primary rounded-lg hover:bg-accent-primary/20 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
