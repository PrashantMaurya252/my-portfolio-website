'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function LeetCodeActivity({ darkMode }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://alfa-leetcode-api.onrender.com/Prashant_Maurya2000/solved')
      .then(res => res.json())
      .then(data => {
        if (data && data.solvedProblem !== undefined) {
          setStats(data)
        } else {
          setStats(null) // API failed or returned unexpected schema
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <section
      id="leetcode"
      className={`py-20 px-4 ${
        darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            LeetCode Progress
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Problem Solving & Data Structures
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Icon icon="eos-icons:loading" width="48" height="48" className="text-yellow-500" />
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-lg border text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
            >
              <h3 className="text-xl font-bold text-gray-400">Total Solved</h3>
              <p className="text-4xl font-bold text-yellow-500 mt-2">{stats.solvedProblem}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-lg border text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
            >
              <h3 className="text-xl font-bold text-teal-400">Easy</h3>
              <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{stats.easySolved}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-lg border text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
            >
              <h3 className="text-xl font-bold text-yellow-400">Medium</h3>
              <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.mediumSolved}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-lg border text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
            >
              <h3 className="text-xl font-bold text-red-400">Hard</h3>
              <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{stats.hardSolved}</p>
            </motion.div>
          </div>
        ) : (
          <div className="text-center text-red-500">Failed to load LeetCode stats. Please check back later.</div>
        )}
      </div>
    </section>
  )
}
