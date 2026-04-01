'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface ProjectCardProps {
  title: string
  titleEn: string
  description: string
  descriptionEn?: string
  metrics: string[]
  metricsEn?: string[]
  technologies: string[]
  link: string | null
  index: number
  period?: string
  role?: string
  roleEn?: string
  background?: string
  backgroundEn?: string
  contributions?: string[]
  contributionsEn?: string[]
  outcomes?: string
  outcomesEn?: string
}

export default function ProjectCard({
  title,
  titleEn,
  description,
  descriptionEn,
  metrics,
  metricsEn,
  technologies,
  link,
  index,
  period,
  role,
  roleEn,
  background,
  backgroundEn,
  contributions,
  contributionsEn,
  outcomes,
  outcomesEn,
}: ProjectCardProps) {
  const { language, t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const displayTitle = language === 'en' ? titleEn : title
  const displayDescription = language === 'en' ? (descriptionEn ?? description) : description
  const displayRole = language === 'en' ? (roleEn ?? role) : role
  const displayMetrics = language === 'en' ? (metricsEn ?? metrics) : metrics
  const displayBackground = language === 'en' ? (backgroundEn ?? background) : background
  const displayContribList = language === 'en' ? (contributionsEn ?? contributions) : contributions
  const displayOutcomes = language === 'en' ? (outcomesEn ?? outcomes) : outcomes

  const renderBackground = () => {
    if (!displayBackground) return null
    return (
      <section className="mb-3">
        <h4 className="text-sm font-semibold mb-1">{t('Background', '项目背景')}</h4>
        <p className="text-sm text-text-secondary">{displayBackground}</p>
      </section>
    )
  }

  const renderContributions = () => {
    if (!displayContribList || (Array.isArray(displayContribList) && displayContribList.length === 0)) return null
    const items = (displayContribList as string[]) ?? []
    return (
      <section className="mb-3">
        <h4 className="text-sm font-semibold mb-1">{t('Contributions', '核心贡献')}</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {items.map((c, i) => (
            <li key={i} className="text-sm text-text-secondary">{c}</li>
          ))}
        </ol>
      </section>
    )
  }

  const renderOutcomes = () => {
    if (!displayOutcomes) return null
    const content = language === 'en' ? (outcomesEn ?? outcomes) : outcomes
    return (
      <section className="mb-3">
        <h4 className="text-sm font-semibold mb-1">{t('Outcomes', '成果')}</h4>
        <p className="text-sm text-text-secondary">{content}</p>
      </section>
    )
  }

  return (
    <motion.div
      className="relative pl-12 mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Timeline dot */}
      <span className="absolute left-[22px] top-6 w-3 h-3 rounded-full bg-accent-primary" aria-hidden="true" />

      {/* Card */}
      <div
        className="bg-background-alt/50 border border-white/5 rounded-xl p-5 cursor-pointer hover:border-accent-primary/30 transition-all"
        onClick={() => setIsExpanded((s) => !s)}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-secondary">{period ?? ''}</span>
              {displayRole && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-text-secondary">{displayRole}</span>
              )}
            </div>
            <h3 className="text-xl font-semibold mt-2">{displayTitle}</h3>
            <p className="text-text-secondary text-sm mt-2 line-clamp-2">{displayDescription}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-text-secondary transition-transform flex-shrink-0 ml-3 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap mt-3 gap-2">
          {displayMetrics.map((m, i) => (
            <span key={`m-${i}`} className="text-xs px-2 py-1 bg-white/10 rounded">{m}</span>
          ))}
          {technologies.map((tkn, i) => (
            <span key={`tech-${i}`} className="text-xs px-2 py-1 bg-accent-primary/10 text-accent-primary rounded">{tkn}</span>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expand"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              <div className="space-y-3 border-t border-white/5 pt-4">
                {renderBackground()}
                {renderContributions()}
                {renderOutcomes()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
