'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const achievements = [
  {
    id: 'a1',
    title: 'Designed & Developed 10+ Projects',
    description:
      'Built and deployed 10+ full-stack applications ranging from social platforms to enterprise tools — covering authentication, payments, real-time features, and cloud integrations.',
    icon: 'material-symbols:rocket-launch',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'rgba(34,211,238,0.25)',
    borderColor: 'border-cyan-500/40',
    textColor: 'text-cyan-400',
    bgAccent: 'bg-cyan-500/10',
    stat: '10+',
    statLabel: 'Projects',
  },
  {
    id: 'a2',
    title: 'Solved 150+ DSA Problems',
    description:
      'Consistently solving Data Structures & Algorithms problems on LeetCode and GeeksforGeeks — covering arrays, strings, two pointers, searching and sorting, and system design fundamentals.',
    icon: 'mdi:code-greater-than',
    color: 'from-emerald-400 to-teal-500',
    glowColor: 'rgba(52,211,153,0.25)',
    borderColor: 'border-emerald-500/40',
    textColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    stat: '150+',
    statLabel: 'Problems',
    platforms: [
      {
        name: 'LeetCode',
        icon: 'simple-icons:leetcode',
        url: 'https://leetcode.com/u/PrashantMaurya252/',
        color: 'text-amber-400',
      },
      {
        name: 'GeeksforGeeks',
        icon: 'simple-icons:geeksforgeeks',
        url: 'https://www.geeksforgeeks.org/user/prashantmaurya252/',
        color: 'text-emerald-400',
      },
    ],
  },
]

export default function Achievements({ darkMode = true }) {
  return (
    <section
      id="achievements"
      className={`py-24 px-4 relative overflow-hidden ${darkMode
        ? 'bg-slate-900 border-t border-slate-800'
        : 'bg-white border-t border-gray-200'
        }`}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Achievements
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Milestones and continuous growth
          </p>
        </motion.div>

        {/* ── Achievements ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border p-6 overflow-hidden transition-all duration-300 ${ach.borderColor
                  } ${darkMode ? 'bg-slate-800/60' : 'bg-gray-50'}`}
                style={{
                  boxShadow: `0 0 0 0 ${ach.glowColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${ach.glowColor}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${ach.glowColor}`
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 opacity-5 bg-gradient-to-br ${ach.color}`}
                />

                <div className="relative flex gap-4">
                  {/* Stat block */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center ${ach.bgAccent} border ${ach.borderColor}`}
                  >
                    <span className={`text-2xl font-black leading-none ${ach.textColor}`}>
                      {ach.stat}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-none mt-0.5`}>
                      {ach.statLabel}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1.5">
                      <Icon icon={ach.icon} width="18" height="18" className={ach.textColor} />
                      <h3 className={`font-bold text-sm leading-snug ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {ach.title}
                      </h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {ach.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
