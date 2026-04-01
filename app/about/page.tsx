'use client'

import PageLayout from '@/components/PageLayout'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

import { Mail, MapPin } from 'lucide-react'

const leadershipData = [
  {
    title: 'Student Union Sports Department Minister',
    titleZh: '学生会体育部部长',
    period: '2015 - 2017',
    description: 'Led 30-person team, organized university sports events with 1000+ participants.',
    descriptionZh: '带领30人团队，组织校级体育赛事，参与人数1000+。',
  },
  {
    title: 'Class League Secretary',
    titleZh: '团支书书记',
    period: '2016 - 2017',
    description: 'Led 30-person team to achieve "Outstanding League Branch" title.',
    descriptionZh: '带领30人团支部获得"优秀团支部"称号。',
  },
  {
    title: 'AIESEC Team Builder',
    titleZh: 'AIESEC团队建设',
    period: '2017 - 2018',
    description: 'Facilitated international youth exchanges and cross-cultural communication.',
    descriptionZh: '促进国际青年交流与跨文化沟通。',
  },
]

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <PageLayout title="About" titleZh="关于我">
      <div className="space-y-8 text-lg leading-relaxed">
        {/* Intro section */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            {t('Education & Background', '教育背景')}
          </h2>
          <p className="text-text-secondary">
            {t(
              "With a Master's from Tokyo Institute of Technology and dual degrees from Beihang University (Engineering + Applied Mathematics minor), I combine strong mathematical foundations with hands-on experience in machine learning, algorithm optimization, and large-scale product development.",
              "拥有东京工业大学工学硕士学位和北京航空航天大学工学学士及应用数学理学学士双学位，结合扎实的数理基础与机器学习、算法优化和大规模产品开发的实践经验。"
            )}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            {t('Core Expertise', '核心专长')}
          </h2>
          <ul className="text-text-secondary space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              {t('LLM inference optimization and operator development', '大模型推理优化与算子开发')}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              {t('AI algorithm productization (4+ successful launches)', 'AI算法产品化（4+成功落地）')}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              {t('Data-driven decision making with TB-scale datasets', 'TB级数据驱动的决策能力')}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              {t('Cross-functional team leadership and stakeholder management', '跨职能团队领导与利益相关者管理')}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">▸</span>
              {t('Data-driven decision making with TB-scale datasets', 'TB级数据驱动的决策能力')}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            {t('Leadership Experience', '领导经历')}
          </h2>
          <div className="space-y-4">
            {leadershipData.map((item) => (
              <div key={item.title} className="card">
                <h3 className="font-semibold text-accent-primary">{t(item.title, item.titleZh)}</h3>
                <p className="text-text-secondary text-sm mt-1">{item.period}</p>
                <p className="text-text-secondary mt-2">{t(item.description, item.descriptionZh)}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-4">
            {t('Philosophy', '理念')}
          </h2>
          <p className="text-text-secondary italic">
            {t(
              '"Beyond work, I\'m passionate about sharing knowledge through technical writing and contributing to the AI community. I believe in building products that create real value for users while pushing the boundaries of what\'s possible with technology.\"',
              '"工作之外，我热衷于通过技术写作分享知识，为AI社区做出贡献。我相信构建真正为用户创造价值的产品，同时不断突破技术的边界。"'
            )}
          </p>
        </section>
      </div>
    </PageLayout>
  )
}
