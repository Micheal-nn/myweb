'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { Mail, MapPin, Phone, Download, Send } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const mailtoLink = `mailto:${siteConfig.profile.email}?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`
    window.location.href = mailtoLink
    
    setIsSubmitting(false)
  }

  return (
    <PageLayout title="Contact" titleZh="联系我">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-background-alt border border-white/10 rounded-lg focus:outline-none focus:border-accent-primary transition-colors resize-none"
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-6">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Location</p>
                  <p>{siteConfig.profile.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <a href={`mailto:${siteConfig.profile.email}`} className="hover:text-accent-primary transition-colors">
                    {siteConfig.profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p>{siteConfig.profile.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Social</h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-2 px-4 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387-.599 2.666-.812 3.533-.812 3.533 0 0 2.147.093 4.427.073 4.427 5.373 4.427 5.373 0-2.595 0-1.342-2.197.986-3.053-.533 1.266-1.794 1.456g-.975.896-.454 1.534.454h3.054c1.134-.412 1.122.07g 1.166-.376 1.927.066-1.166-.376 1.926-.644 1.635-1.237 1.436-1.284 1.681-.624 1.164 1.681h4.127c.085.074 4.127c.085.074h1.484c.091-.453-.068-.776-.091-.45-.068.776-.515.677-.352 2.073-1.507 1.613-.393 1.868-.476 2.484 2.675.3-1.507 1.613.393 1.868.476 2.484-2.675.3z"/>
                </svg>
                GitHub
              </a>
              <a
                href={siteConfig.links.csdn}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-2 px-4 py-3"
              >
                CSDN
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Resume</h3>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
