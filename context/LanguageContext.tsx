'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, zh: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language | null
      if (saved === 'en' || saved === 'zh') {
        setLanguageState(saved)
      }
    } catch {
      // ignore localStorage errors
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('language', language)
      } catch {
        // ignore
      }
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => setLanguageState(lang)

  const t = (en: string, zh: string): string => {
    return language === 'en' ? en : zh
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
