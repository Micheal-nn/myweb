import PageLayout from '@/components/PageLayout'
import ProjectCard from '@/components/ProjectCard'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects" titleZh="项目经历">
      <div className="grid md:grid-cols-2 gap-6">
        {siteConfig.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            titleEn={project.titleEn}
            description={project.description}
            metrics={project.metrics}
            technologies={project.technologies}
            link={project.link}
            index={index}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2"
        >
          View All Projects on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </PageLayout>
  )
}
