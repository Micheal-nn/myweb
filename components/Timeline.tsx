'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'

interface TimelineItem {
  company: string
  companyEn: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-purple-500" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12"
          >
            <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-accent-primary border-4 border-background" />

            <div className="card card-hover">
              <div
                className="cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.company}</h3>
                    <p className="text-text-secondary text-sm">{item.companyEn}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                  </motion.div>
                </div>

                <p className="text-accent-primary font-medium mt-2">{item.role}</p>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                  <span>{item.period}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                </div>

                <p className="text-text-secondary mt-3">{item.description}</p>
              </div>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-text-secondary">
                            <span className="text-accent-primary mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
