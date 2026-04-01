'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="fixed top-6 right-6 z-50 w-9 h-9 rounded-full border border-white/20 bg-background/80 backdrop-blur-sm text-xs font-medium text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-all"
      aria-label="Switch language"
    >
      {language === 'en' ? '中' : 'EN'}
    </button>
  )
}
