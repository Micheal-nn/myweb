'use client'

import { motion } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'

// GitHub SVG icon (lucide-react doesn't have GitHub export)
const GitHubIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793.261.793.368 0 .178-.012.644-.017 1.264-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .315.21.69.825.57C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
import Link from 'next/link'
import FluidBackground from '@/components/FluidBackground'
import { siteConfig } from '@/lib/config'

export default function IntroPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FluidBackground />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-2">
            {siteConfig.intro.name}
          </h1>
          <p className="text-2xl md:text-3xl text-text-secondary font-light">
            {siteConfig.intro.nameEn}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <p className="text-xl md:text-2xl gradient-text font-medium">
            {siteConfig.intro.title}
          </p>
          <p className="text-lg text-text-secondary mt-2">
            {siteConfig.intro.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Link href="/main">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg flex items-center gap-2 mx-auto"
            >
              {siteConfig.intro.enterText}
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-text-secondary"
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-primary transition-colors"
          >
            <GitHubIcon />
          </a>
          <span className="text-text-secondary/30">·</span>
          <a
            href={siteConfig.links.csdn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-primary transition-colors text-sm"
          >
            CSDN
          </a>
          <span className="text-text-secondary/30">·</span>
          <a
            href={`mailto:${siteConfig.profile.email}`}
            className="hover:text-accent-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </main>
  )
}
