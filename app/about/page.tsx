import PageLayout from '@/components/PageLayout'
import { siteConfig } from '@/lib/config'

export default function AboutPage() {
  return (
    <PageLayout title="About" titleZh="关于我">
      <div className="space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-display font-semibold mb-4 text-accent-primary">
            你你好，我是马晨恩
          </h2>
          <p className="text-text-secondary">
            I'm a results-driven AI Technical Product Manager with a unique blend of 
            technical depth and strategic business acumen. Currently at Huawei's Turing 
            Solutions Development, I specialize in bringing cutting-edge AI technologies 
            from research to commercial deployment at scale.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Education & Background
          </h2>
          <p className="text-text-secondary">
            With a Master's from Tokyo Institute of Technology and dual degrees from 
            Beihang University (Engineering + Applied Mathematics minor), I combine 
            strong mathematical foundations with hands-on experience in machine learning, 
            algorithm optimization, and large-scale product development.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Core Expertise
          </h2>
          <ul className="text-text-secondary space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              LLM inference optimization and operator development
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              AI algorithm productization (4+ successful launches)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              Cross-functional team leadership and stakeholder management
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              Data-driven decision making with TB-scale datasets
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Leadership Experience
          </h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-accent-primary">
                Student Union Sports Department Minister
              </h3>
              <p className="text-text-secondary text-sm mt-1">2015 - 2017</p>
              <p className="text-text-secondary mt-2">
                Led 30-person team, organized university sports events with 1000+ participants.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-accent-primary">
                Class League Secretary
              </h3>
              <p className="text-text-secondary text-sm mt-1">2016 - 2017</p>
              <p className="text-text-secondary mt-2">
                Led 30-person团支部 to achieve "Outstanding League Branch" title.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-accent-primary">
                AIESEC Team Builder
              </h3>
              <p className="text-text-secondary text-sm mt-1">2017 - 2018</p>
              <p className="text-text-secondary mt-2">
                Facilitated international youth exchanges and cross-cultural communication.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            Philosophy
          </h2>
          <p className="text-text-secondary italic">
            "Beyond work, I'm passionate about sharing knowledge through technical writing 
            and contributing to the AI community. I believe in building products that 
            create real value for users while pushing the boundaries of what's possible 
            with technology."
          </p>
        </section>
      </div>
    </PageLayout>
  )
}
