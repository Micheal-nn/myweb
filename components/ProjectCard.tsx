'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  title: string
  titleEn: string
  description: string
  metrics: string[]
  technologies: string[]
  link: string | null
  index: number
}

export default function ProjectCard({
  title,
  titleEn,
  description,
  metrics,
  technologies,
  link,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card card-hover group"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-text-secondary text-sm">{titleEn}</p>
      </div>

      <p className="text-text-secondary mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {metrics.map((metric, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm"
          >
            {metric}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-white/5 text-text-secondary rounded text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent-primary hover:underline text-sm"
        >
          View Project
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  )
}
