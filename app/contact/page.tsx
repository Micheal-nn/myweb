'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Download, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'
import PageLayout from '@/components/PageLayout'

// Contact page with bilingual EN/ZH support
export default function ContactPage() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = `Contact from ${formData.name}`
    const body = `${formData.message}\n\nFrom: ${formData.email}`
    const mailto = `mailto:${siteConfig.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailto

    // Reset after attempting to mail
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <PageLayout title={t('Contact', '联系我')}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Message form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-background-alt/50 border border-white/5 rounded-xl p-6 w-full"
        >
          <h2 className="text-2xl font-semibold mb-4">{t('Send a Message', '发送消息')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80">
                {t('Name', '姓名')}
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={update}
                placeholder={t('Your name', '您的姓名')}
                required
                className="mt-1 w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                {t('Email', '邮箱')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={update}
                placeholder={t('Your email', '您的邮箱')}
                required
                className="mt-1 w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80">
                {t('Message', '留言')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={update}
                placeholder={t('Your message', '您的留言')}
                required
                className="mt-1 w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? t('Sending...', '发送中...') : t('Send Message', '发送消息')}</span>
            </button>
          </form>
        </motion.div>

        {/* Right: Contact info */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-background-alt/50 border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-3">{t('Contact Info', '联系方式')}</h3>

          <div className="flex items-center gap-2 mb-3 text-white/90">
            <MapPin className="w-5 h-5" />
            <span>{siteConfig.profile.location}</span>
          </div>

          <div className="flex items-center gap-2 mb-4 text-white/90">
            <Mail className="w-5 h-5" />
            <span>{siteConfig.profile.email}</span>
          </div>

          <div className="mt-2">
            <div className="text-sm font-semibold mb-2">{t('Social', '社交')}</div>
            <ul className="flex space-x-4">
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-white/80 hover:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.csdn} target="_blank" rel="noreferrer" className="text-white/80 hover:underline">
                  CSDN
                </a>
              </li>
            </ul>
          </div>
        </motion.aside>
      </div>

      {/* Resume section */}
      <div className="mt-6 bg-background-alt/50 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Download className="w-5 h-5" />
          <span>{t('Request Resume (PDF)', '申请下载简历 (PDF)')}</span>
        </div>
        <a
          href={`mailto:${siteConfig.profile.email}?subject=${encodeURIComponent('Resume Request')}&body=${encodeURIComponent('I would like to request a download of the resume. Please grant access.')}`}
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-md"
          target="_blank"
          rel="noreferrer"
        >
          <Send className="w-4 h-4" /> {t('Email to request resume','通过邮件请求简历')}
        </a>
      </div>

      <p className="mt-2 text-sm text-white/70">
        {t('Resume download requires email approval', '简历下载需邮件申请，经审批后提供')}
      </p>
    </PageLayout>
  )
}
