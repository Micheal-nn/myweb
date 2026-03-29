import PageLayout from '@/components/PageLayout'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function BlogPage() {
  return (
    <PageLayout title="Blog" titleZh="博客">
      <div className="text-center py-12">
        <p className="text-xl text-text-secondary mb-8">
          I share my thoughts and technical insights on CSDN.
        </p>
        
        <a
          href={siteConfig.links.csdn}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 text-lg"
        >
          Visit My CSDN Blog
          <ExternalLink className="w-5 h-5" />
        </a>

        <div className="mt-12 card text-left max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Topics I Write About:</h3>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-center gap-2">
              <span className="text-accent-primary">▸</span>
              AI & Machine Learning
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-primary">▸</span>
              Product Management
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-primary">▸</span>
              Career Development
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-primary">▸</span>
              Technical Tutorials
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
