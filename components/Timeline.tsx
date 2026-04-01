"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineItem {
  company: string
  companyEn: string
  role: string
  roleZh?: string
  period: string
  location: string
  locationZh?: string
  description: string
  descriptionZh?: string
  achievements: string[]
  achievementsZh?: string[]
  technologies: string[]
}

// Timeline entry component (local to this file)
const TimelineCard: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const { language, t } = useLanguage();
  const company = language === 'en' ? item.companyEn : (item.company ?? item.companyEn);
  const role = language === 'en' ? item.role : (item.roleZh || item.role);
  const location = language === 'en' ? item.location : (item.locationZh || item.location);
  const description = language === 'en' ? item.description : (item.descriptionZh || item.description);
  const achievements = language === 'en' ? item.achievements : (item.achievementsZh || item.achievements);
  const technologies = item.technologies ?? [];
  const period = item.period;

  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="relative pl-12 mb-8"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      aria-label={`timeline-item-${index}`}
    >
      {/* Timeline line dot aligned with each item */}
      <span className="absolute left-6 top-6 w-3 h-3 rounded-full bg-accent-primary" aria-hidden="true" />

      {/* Collapsed / header card */}
      <div
        className="bg-background-alt/50 border border-white/5 rounded-xl p-5 cursor-pointer"
        onClick={() => setExpanded((s) => !s)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-text-secondary block">{period}</span>
            <div className="text-lg font-semibold mt-1">{company}</div>
            <div className="text-sm text-text-secondary mt-1">{role}</div>
            <div className="flex items-center text-sm text-text-secondary mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-text-primary transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key={`exp-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.25 }}
            className="mt-3"
          >
            <div className="p-4 bg-background-alt rounded-xl border border-white/5">
              {description && <p className="mb-3">{description}</p>}
              {achievements && achievements.length > 0 && (
                <div className="mb-2">
                  <strong className="inline-block mb-1">{t('Achievements','工作成果')}:</strong>
                  <ul className="list-disc pl-6 space-y-1">
                    {achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {technologies.length > 0 && (
                <div className="mt-2">
                  <strong className="inline-block mb-1">{t('Technologies','技术栈')}:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-white/10 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="relative timeline-container pb-6">
      {/* Left vertical line for the timeline */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
