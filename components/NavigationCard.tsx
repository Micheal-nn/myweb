'use client'

import { motion } from 'framer-motion'
import { LucideIcon, User, Briefcase, Rocket, Mail, Code, Edit } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, LucideIcon> = {
  User,
  Briefcase,
  Rocket,
  Mail,
  Code,
  Edit,
}

interface NavigationCardProps {
  icon: string
  label: string
  labelZh: string
  href: string
  index: number
}

export default function NavigationCard({ icon, label, labelZh, href, index }: NavigationCardProps) {
  const Icon = iconMap[icon] || User

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="card card-hover cursor-pointer flex flex-col items-center justify-center p-6 min-w-[140px]"
        >
          <Icon className="w-10 h-10 text-accent-primary mb-3" />
          <span className="text-base font-medium">{label}</span>
          <span className="text-sm text-text-secondary mt-1">{labelZh}</span>
        </motion.div>
      </Link>
    </motion.div>
  )
}
