'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import NavigationCard from '@/components/NavigationCard'
import WaveBackground from '@/components/WaveBackground'
import { siteConfig } from '@/lib/config'

const avatars = ['/photos/avatar1.png', '/photos/avatar2.png']

// GitHub SVG icon
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387-.599 2.666-.812 3.533-.812 3.533 0 0 2.147.093 4.427-.027 6.793-.812-3.533 0 0-2.147-.093-4.427-.027-6.793.812 3.533.812 3.533 0 0 2.147.093 4.427.027 6.793z"/>
  </svg>
)

export default function MainPage() {
  const [avatarIdx, setAvatarIdx] = useState(0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#0a0a0a] text-white relative">
      <WaveBackground />
      {/* Avatar — click to toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#3b82f6]/30 cursor-pointer group"
        onClick={() => setAvatarIdx((i) => (i + 1) % avatars.length)}
        title="Click to change photo"
      >
        <Image
          src={avatars[avatarIdx]}
          alt={siteConfig.intro.nameEn}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">Click</span>
        </div>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          {siteConfig.intro.nameEn}
        </h1>
        <p className="text-xl text-[#a0a0a0] mt-1">
          {siteConfig.intro.name}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[#a0a0a0] text-center mt-4 max-w-md italic"
      >
        &quot;{siteConfig.profile.tagline}&quot;
      </motion.p>

      {/* Navigation Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {siteConfig.navigation.map((item, index) => (
          <NavigationCard
            key={item.id}
            icon={item.icon}
            label={item.label}
            labelZh={item.labelZh}
            href={item.href}
            index={index}
          />
        ))}
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 flex flex-col items-center gap-3 text-[#a0a0a0] text-sm"
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {siteConfig.profile.location}
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {siteConfig.profile.email}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={siteConfig.links.csdn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3b82f6] transition-colors"
          >
            CSDN
          </a>
        </div>
      </motion.div>
    </main>
  )
}
