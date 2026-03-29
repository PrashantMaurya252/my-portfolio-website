'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

const learningTopics = [
  {
    id: 1,
    title: 'Large Language Models',
    shortTitle: 'LLMs',
    icon: 'hugeicons:ai-brain-05',
    color: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139,92,246,0.3)',
    borderColor: 'border-violet-500/40',
    textColor: 'text-violet-400',
    bgAccent: 'bg-violet-500/10',
    progress: 65,
    status: 'In Progress',
    description:
      'Exploring transformer architectures, attention mechanisms, tokenization, and fine-tuning strategies. Studying GPT, Claude, Gemini internals and how context windows shape model behavior.',
    subtopics: [
      { label: 'Transformer Architecture', done: true },
      { label: 'Attention Mechanisms', done: true },
      { label: 'Tokenization & Embeddings', done: true },
      { label: 'Fine-tuning & RLHF', done: false },
    //   { label: 'RAG Systems', done: false },
    ],
    resources: ['Sherians Youtube Channel', 'Google AI Studio Documents'],
    weeklyHours: 8,
  },
//   {
//     id: 2,
//     title: 'Prompt Engineering',
//     shortTitle: 'Prompting',
//     icon: 'ph:magic-wand-fill',
//     color: 'from-cyan-400 to-blue-500',
//     glowColor: 'rgba(34,211,238,0.3)',
//     borderColor: 'border-cyan-500/40',
//     textColor: 'text-cyan-400',
//     bgAccent: 'bg-cyan-500/10',
//     progress: 78,
//     status: 'Active',
//     description:
//       'Mastering chain-of-thought reasoning, few-shot learning, system prompt design, and adversarial prompt handling. Building reliable prompting pipelines for production applications.',
//     subtopics: [
//       { label: 'Chain-of-Thought (CoT)', done: true },
//       { label: 'Few-shot & Zero-shot', done: true },
//       { label: 'System Prompt Design', done: true },
//       { label: 'ReAct & Tool Use Prompts', done: true },
//       { label: 'Adversarial Robustness', done: false },
//     ],
//     resources: ['Anthropic Prompt Library', 'OpenAI Cookbook', 'DAIR.AI Guide'],
//     weeklyHours: 6,
//   },
//   {
//     id: 3,
//     title: 'Generative AI',
//     shortTitle: 'GenAI',
//     icon: 'mingcute:ai-fill',
//     color: 'from-emerald-400 to-teal-500',
//     glowColor: 'rgba(52,211,153,0.3)',
//     borderColor: 'border-emerald-500/40',
//     textColor: 'text-emerald-400',
//     bgAccent: 'bg-emerald-500/10',
//     progress: 55,
//     status: 'In Progress',
//     description:
//       'Building AI-powered applications with LangChain, integrating APIs like Claude & OpenAI, and exploring multi-modal models. Learning agent frameworks, tool-calling, and agentic workflows.',
//     subtopics: [
//       { label: 'LangChain Fundamentals', done: true },
//       { label: 'OpenAI & Claude APIs', done: true },
//       { label: 'Vector Databases', done: false },
//       { label: 'AI Agents & Tools', done: false },
//       { label: 'Multi-modal Models', done: false },
//     ],
//     resources: ['LangChain docs', 'FastAI course', 'DeepLearning.AI'],
//     weeklyHours: 10,
//   },
]

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}))

export default function CurrentlyLearning({ darkMode = true }) {
  const [activeCard, setActiveCard] = useState(null)
  const [hoveredTopic, setHoveredTopic] = useState(null)

  return (
    <section
      id="learning"
      className={`py-24 px-4 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800'
          : 'bg-gradient-to-b from-gray-50 to-white border-t border-gray-200'
      }`}
    >
      {/* Floating Particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/10 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Neural network background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-learn" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-learn)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="p-2 rounded-full bg-cyan-400/10 border border-cyan-400/30"
            >
              <Icon icon="mingcute:ai-fill" width="28" height="28" className="text-cyan-400" />
            </motion.div>
            <span
              className={`text-sm font-mono font-semibold px-3 py-1 rounded-full border ${
                darkMode
                  ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5'
                  : 'text-cyan-600 border-cyan-400/40 bg-cyan-50'
              }`}
            >
              CURRENTLY LEARNING
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-violet-400 to-blue-500 bg-clip-text text-transparent">
            Diving Into AI & GenAI
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Actively strengthening knowledge in the AI ecosystem — from understanding how LLMs work
            under the hood to building production-ready AI-powered applications.
          </p>
        </motion.div>

        {/* Topic Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {learningTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onHoverStart={() => setHoveredTopic(topic.id)}
              onHoverEnd={() => setHoveredTopic(null)}
              onClick={() => setActiveCard(activeCard === topic.id ? null : topic.id)}
              className={`relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 ${
                topic.borderColor
              } ${
                darkMode ? 'bg-slate-900/80' : 'bg-white'
              } ${activeCard === topic.id ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-cyan-400' : ''}`}
              style={{
                boxShadow:
                  hoveredTopic === topic.id || activeCard === topic.id
                    ? `0 0 40px ${topic.glowColor}`
                    : 'none',
              }}
              whileHover={{ y: -4 }}
            >
              {/* Card glow background */}
              <div
                className={`absolute inset-0 opacity-5 bg-gradient-to-br ${topic.color}`}
              />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${topic.bgAccent} border ${topic.borderColor}`}
                  >
                    <Icon icon={topic.icon} width="28" height="28" className={topic.textColor} />
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-full ${topic.bgAccent} ${topic.textColor} border ${topic.borderColor}`}
                  >
                    {topic.status}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${topic.textColor}`}>{topic.title}</h3>
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {topic.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                      Progress
                    </span>
                    <span className={topic.textColor + ' font-bold'}>{topic.progress}%</span>
                  </div>
                  <div
                    className={`h-1.5 rounded-full ${
                      darkMode ? 'bg-slate-700' : 'bg-gray-200'
                    } overflow-hidden`}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${topic.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${topic.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Weekly hours badge */}
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:schedule"
                    width="14"
                    height="14"
                    className={darkMode ? 'text-gray-500' : 'text-gray-400'}
                  />
                  <span
                    className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    ~{topic.weeklyHours} hrs/week
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {activeCard === topic.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`border-t ${topic.borderColor} px-6 pb-6 pt-4`}
                  >
                    {/* Subtopics checklist */}
                    <p
                      className={`text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      Topics Covered
                    </p>
                    <ul className="space-y-2 mb-4">
                      {topic.subtopics.map((sub, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.07 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className={sub.done ? 'text-emerald-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}>
                            {sub.done ? '✓' : '○'}
                          </span>
                          <span
                            className={`${
                              sub.done
                                ? darkMode
                                  ? 'text-gray-300'
                                  : 'text-gray-700'
                                : darkMode
                                ? 'text-gray-600'
                                : 'text-gray-400'
                            }`}
                          >
                            {sub.label}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Resources */}
                    <p
                      className={`text-xs font-mono font-semibold uppercase tracking-widest mb-2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      Resources
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.resources.map((r, j) => (
                        <span
                          key={j}
                          className={`text-xs px-2 py-0.5 rounded-full ${topic.bgAccent} ${topic.textColor} border ${topic.borderColor}`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click hint */}
              <div className={`px-6 pb-3 flex items-center gap-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                <Icon
                  icon={
                    activeCard === topic.id
                      ? 'material-symbols:keyboard-arrow-up'
                      : 'material-symbols:keyboard-arrow-down'
                  }
                  width="14"
                  height="14"
                />
                <span className="text-xs">
                  {activeCard === topic.id ? 'Collapse' : 'Click to expand'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`rounded-2xl border p-6 flex flex-col sm:flex-row items-center gap-6 justify-between ${
            darkMode
              ? 'bg-slate-900/60 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30"
            >
              <Icon icon="ph:brain-fill" width="32" height="32" className="text-cyan-400" />
            </motion.div>
            <div>
              <p className={`font-bold text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Goal: Building AI-Powered Full Stack Apps
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Combining 2+ years of MERN expertise with GenAI capabilities
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            {['LLMs', 'RAG', 'Agents', 'APIs'].map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-400/10 to-violet-500/10 text-cyan-400 border border-cyan-400/30 font-mono font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}