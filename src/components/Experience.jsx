'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Experience({ darkMode }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Codenia Technologies LLP',
      period: 'Feb 2025 – March 2026',
      highlights: [
        'Delivered 4+ production-grade full stack applications across finance & insurance domains',
        'Architected scalable backend systems using Node.js, Express & PostgreSQL (Prisma)',
        'Designed secure authentication with JWT, OAuth2 & RBAC',
        'Built configurable approval workflows with audit trail tracking',

        // 🔥 Extra (hidden initially)
        'Optimized database queries improving performance by 45%',
        'Improved API response time by 50% with structured architecture',
        'Integrated AI-powered chatbot using OpenAI API for smart user interaction',
        'Implemented LLM-based features using prompt engineering techniques',
        'Integrated Gemini API for contextual AI responses and automation',
        'Enabled document data extraction using Azure OCR services',
        'Built real-time features using Socket.io (notifications, updates)',
        'Structured backend with middleware, validation & centralized error handling',
        'Enhanced logging system reducing debugging time by 60%',
        'Improved frontend performance reducing load time by 40%',
      ],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Virtual Cybertrons',
      period: 'Apr 2024 – Jan 2025',
      highlights: [
        'Developed modular, reusable UI components using React & Next.js',
        'Integrated Firebase Authentication for social login',
        'Integrated 25+ APIs with optimized data fetching',
        'Reduced network requests by 30%',

        // extra
        'Implemented caching strategies for performance optimization',
        'Built responsive and accessible UI components',
        'Managed global state using Context API',
        'Improved UX with proper error handling & loading states',
      ],
    },
  ]

  return (
    <section
      id="experience"
      className={`py-20 px-4 ${
        darkMode
          ? 'bg-slate-900 border-t border-slate-800'
          : 'bg-white border-t border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Professional Experience
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, i) => {
            const isExpanded = expandedIndex === i
            const visiblePoints = isExpanded
              ? exp.highlights
              : exp.highlights.slice(0, 4)

            return (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className={`p-6 rounded-lg border-l-4 border-cyan-400 ${
                  darkMode
                    ? 'bg-slate-800/50 border border-slate-700'
                    : 'bg-blue-50 border border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      {exp.role}
                    </h3>
                    <p
                      className={`text-lg font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium mt-2 md:mt-0 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {visiblePoints.map((highlight, j) => (
                    <li
                      key={j}
                      className={`flex gap-3 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-cyan-400 mt-1">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* 🔥 Read More / Show Less */}
                {exp.highlights.length > 4 && (
                  <button
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : i)
                    }
                    className="mt-4 text-cyan-400 hover:underline text-sm font-medium"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}