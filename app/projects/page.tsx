'use client'

import PageLayout from '@/components/PageLayout'
import ProjectCard from '@/components/ProjectCard'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectsPage() {
  const { t } = useLanguage()

  return (
    <PageLayout title="Projects" titleZh="项目经历">
      <section className="relative pb-6">
        {/* Timeline vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

        <div>
          {siteConfig.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              titleEn={project.titleEn}
              description={project.description}
              descriptionEn={project.descriptionEn}
              metrics={project.metrics}
              metricsEn={project.metricsEn}
              technologies={project.technologies}
              link={project.link}
              index={index}
              period={project.period}
              role={project.role}
              roleEn={project.roleEn}
              background={project.background}
              backgroundEn={project.backgroundEn}
              contributions={project.contributions}
              contributionsEn={project.contributionsEn}
              outcomes={project.outcomes}
              outcomesEn={project.outcomesEn}
            />
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2"
        >
          {t('View All Projects on GitHub', '查看所有项目')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </PageLayout>
  )
}
