'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

interface PageLayoutProps {
  title: string
  titleZh?: string
  children: React.ReactNode
}

export default function PageLayout({ title, titleZh, children }: PageLayoutProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <LanguageToggle />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/main"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('Back', '返回')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
            {t(title, titleZh || title)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
