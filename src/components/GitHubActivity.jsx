'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"


const GITHUB_USERNAME = 'PrashantMaurya252'
const AVAILABLE_YEARS = [2026,2025, 2024, 2023]
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const CELL = 13
const GAP = 3

function getLevelColor(level, darkMode) {
  const dark = ['#161b22', '#0d4429', '#006d32', '#26a641', '#39d353']
  const light = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
  return darkMode ? dark[level] : light[level]
}

function generateMockContributions(year) {
  const start = new Date(year, 0, 1)
  const end = year === new Date().getFullYear() ? new Date() : new Date(year, 11, 31)
  const days = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const rand = Math.random()
    let level = 0
    if (rand > 0.55) level = 1
    if (rand > 0.72) level = 2
    if (rand > 0.86) level = 3
    if (rand > 0.94) level = 4
    days.push({
      date: new Date(d).toISOString().split('T')[0],
      count: level === 0 ? 0 : Math.ceil(Math.random() * level * 3),
      level,
    })
  }
  return days
}

function buildCalendarGrid(contributions) {
  if (!contributions.length) return { weeks: [], monthLabels: [] }
  const firstDate = new Date(contributions[0].date + 'T00:00:00')
  const startOffset = firstDate.getDay()
  const paddedDays = [...Array(startOffset).fill(null), ...contributions]
  const weeks = []
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7))
  }
  const monthLabels = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstReal = week.find((d) => d !== null)
    if (firstReal) {
      const m = new Date(firstReal.date + 'T00:00:00').getMonth()
      if (m !== lastMonth) {
        monthLabels.push({ label: MONTH_NAMES[m], weekIndex: wi })
        lastMonth = m
      }
    }
  })
  return { weeks, monthLabels }
}

// ── Monthly bar chart ─────────────────────────────────────────────────────────
// function ActivityChart({ contributions, darkMode }) {
//     console.log(contributions)
//   if (!contributions.length) return null
//   const monthly = {}
//   contributions.forEach((d) => {
//     const key = d.date.slice(0, 7)
//     monthly[key] = (monthly[key] || 0) + d.count
//   })
//   const entries = Object.entries(monthly).sort(([a], [b]) => a.localeCompare(b))
//   const maxVal = Math.max(...entries.map(([, v]) => v), 1)

//   return (
//     <div className={`rounded-xl border p-5 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-gray-200'}`}>
//       <div className="flex items-center gap-2 mb-4">
//         <Icon icon="mdi:chart-bar" width="16" height="16" className="text-cyan-400" />
//         <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//           Monthly Contribution Activity
//         </p>
//       </div>
//       <div className="flex items-end gap-1.5 h-28">
//         {entries.map(([key, val], i) => {
//           const heightPct = (val / maxVal) * 100
//           const month = MONTH_NAMES[parseInt(key.split('-')[1], 10) - 1]
//           return (
//             <div key={key} className="flex-1 flex flex-col items-center gap-1 group relative">
//               <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap text-xs px-2 py-1 rounded-md pointer-events-none shadow-lg ${darkMode ? 'bg-slate-900 text-gray-200 border border-slate-600' : 'bg-gray-800 text-white'}`}>
//                 {month}: <span className="text-emerald-400 font-bold">{val}</span>
//               </div>
//               <motion.div
//                 initial={{ height: 0 }}
//                 animate={{ height: `${Math.max(heightPct, val > 0 ? 4 : 0)}%` }}
//                 transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeOut' }}
//                 className="w-full rounded-t-sm"
//                 style={{
//                   background: val === 0
//                     ? darkMode ? '#1e293b' : '#e5e7eb'
//                     : 'linear-gradient(to top, #10b981, #06b6d4)',
//                   minHeight: val > 0 ? 2 : 0,
//                   opacity: val === 0 ? 0.35 : 1,
//                 }}
//               />
//               <span className={`text-[9px] leading-none ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
//                 {month.slice(0, 1)}
//               </span>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

function ActivityChart({ contributions = [], darkMode }) {
  if (!contributions.length) return null

  // ✅ Aggregate monthly contributions
  const monthly = {}

  contributions.forEach((d) => {
    const key = d.date.slice(0, 7)
    monthly[key] = (monthly[key] || 0) + d.count
  })

  // ✅ Convert to chart data
  const chartData = Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [year, m] = key.split("-")
      return {
        name: `${MONTH_NAMES[Number(m) - 1]} ${year}`,
        value: val,
      }
    })

  return (
    <div
      className={`rounded-xl border p-5 ${
        darkMode
          ? "bg-slate-800/60 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:chart-line" width="16" height="16" className="text-cyan-400" />
        <p
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Monthly Contribution Trend
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />

            {/* Y Axis (Scale) */}
            <YAxis />

            {/* Tooltip */}
            <Tooltip />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Streak / summary cards ────────────────────────────────────────────────────
function StreakStats({ contributions, darkMode }) {
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  let maxStreak = 0, streak = 0
  sorted.forEach((d) => {
    if (d.count > 0) { streak++; maxStreak = Math.max(maxStreak, streak) }
    else streak = 0
  })
  let curStreak = 0
  for (const d of [...sorted].reverse()) {
    if (d.count > 0) curStreak++
    else break
  }
  const activeDays = sorted.filter((d) => d.count > 0).length

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {[
        { label: 'Current Streak', value: `${curStreak}d`, icon: 'mdi:fire', color: 'text-orange-400' },
        { label: 'Longest Streak', value: `${maxStreak}d`, icon: 'mdi:trophy', color: 'text-yellow-400' },
        { label: 'Active Days', value: activeDays, icon: 'mdi:calendar-check', color: 'text-emerald-400' },
      ].map((s, i) => (
        <div key={i} className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-gray-200'}`}>
          <Icon icon={s.icon} width="18" height="18" className={`${s.color} mx-auto mb-1.5`} />
          <p className={`text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{s.value}</p>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}

// ── Contribution Calendar ─────────────────────────────────────────────────────
function ContributionCalendar({ contributions, darkMode, selectedYear, totalContributions }) {
  const [hoveredDay, setHoveredDay] = useState(null)
  const { weeks, monthLabels } = buildCalendarGrid(contributions)
  const isCurrentYear = selectedYear === new Date().getFullYear()
  const rangeLabel = isCurrentYear
    ? `Last 365 days  (Jan ${selectedYear} – Today)`
    : `Full year ${selectedYear}  (Jan – Dec)`

  return (
    <div className={`rounded-xl border p-5 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <p className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <span className="text-emerald-400 font-bold text-base">{totalContributions.toLocaleString()}</span>
            {' '}contributions
          </p>
          <p className={`text-xs mt-0.5 font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {rangeLabel}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Less</span>
          {[0, 1, 2, 3, 4].map((lv) => (
            <div key={lv} className="rounded-[2px]" style={{ width: 12, height: 12, backgroundColor: getLevelColor(lv, darkMode) }} />
          ))}
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>More</span>
        </div>
      </div>

      {/* Scrollable grid */}
      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: weeks.length * (CELL + GAP) + 36, width: 'max-content' }}>
          {/* Month labels */}
          <div className="flex mb-1.5" style={{ paddingLeft: 32, gap: GAP }}>
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find((m) => m.weekIndex === wi)
              return (
                <div key={wi} style={{ width: CELL, flexShrink: 0 }}
                  className={`text-[10px] leading-none ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {lbl ? lbl.label : ''}
                </div>
              )
            })}
          </div>

          {/* Day labels + week columns */}
          <div className="flex" style={{ gap: 0 }}>
            {/* Day-of-week labels */}
            <div className="flex flex-col" style={{ width: 28, gap: GAP, paddingTop: 1, flexShrink: 0 }}>
              {DAY_LABELS.map((lbl, i) => (
                <div key={i} style={{ height: CELL }}
                  className={`text-[9px] leading-none flex items-center ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {lbl}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((day, di) =>
                    day === null ? (
                      <div key={di} style={{ width: CELL, height: CELL, flexShrink: 0 }} />
                    ) : (
                      <motion.div
                        key={di}
                        className="rounded-[2px] cursor-pointer"
                        style={{
                          width: CELL,
                          height: CELL,
                          flexShrink: 0,
                          backgroundColor: getLevelColor(day.level, darkMode),
                          outline: hoveredDay?.date === day.date ? '1.5px solid rgba(34,211,238,0.9)' : 'none',
                          outlineOffset: 1,
                        }}
                        whileHover={{ scale: 1.6, zIndex: 20 }}
                        onHoverStart={() => setHoveredDay(day)}
                        onHoverEnd={() => setHoveredDay(null)}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip bar */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
              darkMode ? 'bg-slate-900 border-slate-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: getLevelColor(hoveredDay.level, darkMode) }} />
            <span>
              <span className="text-emerald-400 font-bold">{hoveredDay.count}</span> contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
              {new Date(hoveredDay.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Event helpers ─────────────────────────────────────────────────────────────
const EVENT_ICONS = { PushEvent: 'mdi:source-commit', CreateEvent: 'mdi:source-branch', PullRequestEvent: 'mdi:source-pull', IssuesEvent: 'mdi:alert-circle-outline', ForkEvent: 'mdi:source-fork', WatchEvent: 'mdi:star-outline', DeleteEvent: 'mdi:delete-outline', ReleaseEvent: 'mdi:tag-outline', IssueCommentEvent: 'mdi:comment-outline' }
const EVENT_COLORS = { PushEvent: ['text-cyan-400', 'bg-cyan-400/10'], CreateEvent: ['text-emerald-400', 'bg-emerald-400/10'], PullRequestEvent: ['text-violet-400', 'bg-violet-400/10'], IssuesEvent: ['text-yellow-400', 'bg-yellow-400/10'], ForkEvent: ['text-blue-400', 'bg-blue-400/10'], WatchEvent: ['text-amber-400', 'bg-amber-400/10'], DeleteEvent: ['text-red-400', 'bg-red-400/10'], ReleaseEvent: ['text-pink-400', 'bg-pink-400/10'], IssueCommentEvent: ['text-teal-400', 'bg-teal-400/10'] }
function formatEvent(ev) {
  const repo = (ev.repo?.name || '').split('/')[1] || ev.repo?.name || ''
  switch (ev.type) {
    case 'PushEvent': return `Pushed ${ev.payload?.commits?.length || 0} commit(s) to ${repo}`
    case 'CreateEvent': return `Created ${ev.payload?.ref_type || 'branch'} in ${repo}`
    case 'PullRequestEvent': return `${ev.payload?.action} PR in ${repo}`
    case 'IssuesEvent': return `${ev.payload?.action} issue in ${repo}`
    case 'ForkEvent': return `Forked ${repo}`
    case 'WatchEvent': return `Starred ${repo}`
    case 'IssueCommentEvent': return `Commented on issue in ${repo}`
    default: return `Activity in ${repo}`
  }
}
function timeAgo(str) {
  const diff = Math.floor((Date.now() - new Date(str)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GitHubActivity({ darkMode = true }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [contributions, setContributions] = useState([])
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('calendar')

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => r.json())
      .then((d) => { if (d.login) setStats({ repos: d.public_repos, name: d.name }) })
      .catch(() => {})

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=20`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setEvents(d.slice(0, 12)) })
      .catch(() => {})
      .finally(() => setEventsLoading(false))
  }, [])

  useEffect(() => {
    setLoading(true)
    const yearParam = selectedYear === new Date().getFullYear() ? new Date().getFullYear() : selectedYear
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${yearParam}`)
      .then((r) => r.json())
      .then((d) => { setContributions(d?.contributions?.length ? d.contributions : generateMockContributions(selectedYear)) })
      .catch(() => setContributions(generateMockContributions(selectedYear)))
      .finally(() => setLoading(false))
  }, [selectedYear])

  const totalContributions = contributions.reduce((s, d) => s + d.count, 0)

  return (
    <section
      id="github"
      className={`py-24 px-4 relative overflow-hidden ${
        darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
      }`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-emerald-400/10 border border-emerald-400/30">
              <Icon icon="mdi:github" width="26" height="26" className="text-emerald-400" />
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className={`text-sm font-mono font-semibold px-3 py-1 rounded-full border transition-colors hover:border-emerald-400 ${darkMode ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' : 'text-emerald-600 border-emerald-400/40 bg-emerald-50'}`}>
              @{GITHUB_USERNAME}
            </a>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Consistent commits, real projects, open source contributions
          </p>
        </motion.div>

        {/* Stats — repos + contributions only */}
        {stats && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
            {[
              { label: 'Public Repos', value: stats.repos, icon: 'mdi:source-repository', color: 'text-cyan-400' },
              { label: 'Contributions', value: totalContributions.toLocaleString(), icon: 'mdi:chart-line', color: 'text-emerald-400' },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -3, boxShadow: '0 0 24px rgba(52,211,153,0.15)' }}
                className={`p-5 rounded-xl border text-center transition-all ${darkMode ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/40' : 'bg-white border-gray-200 hover:border-emerald-400'}`}>
                <Icon icon={s.icon} width="22" height="22" className={`${s.color} mx-auto mb-2`} />
                <p className={`text-3xl font-black mb-0.5 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{s.value}</p>
                <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tabs + Year picker */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className={`flex gap-1 p-1 rounded-xl w-fit ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
            {[
              { id: 'calendar', label: 'Calendar', icon: 'mdi:calendar-month' },
              { id: 'chart', label: 'Activity Chart', icon: 'mdi:chart-bar' },
              { id: 'events', label: 'Recent Events', icon: 'mdi:timeline' },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                <Icon icon={tab.icon} width="15" height="15" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Year pills */}
          <div className="flex items-center gap-2">
            <Icon icon="mdi:calendar-range" width="15" height="15" className="text-emerald-400" />
            <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
              {AVAILABLE_YEARS.map((yr) => (
                <button key={yr} onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-all ${selectedYear === yr ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  {yr}{yr === new Date().getFullYear() && <span className="ml-1 text-[9px] text-emerald-500">●</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && activeTab !== 'events' ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`rounded-xl border flex items-center justify-center h-52 ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-gray-200'}`}>
              <div className="flex flex-col items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Icon icon="eos-icons:loading" width="30" height="30" className="text-emerald-400" />
                </motion.div>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Loading {selectedYear} contributions…</p>
              </div>
            </motion.div>
          ) : activeTab === 'calendar' ? (
            <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <ContributionCalendar contributions={contributions} darkMode={darkMode} selectedYear={selectedYear} totalContributions={totalContributions} />
            </motion.div>
          ) : activeTab === 'chart' ? (
            <motion.div key="chart" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <ActivityChart contributions={contributions} darkMode={darkMode} />
              {/* <StreakStats contributions={contributions} darkMode={darkMode} /> */}
            </motion.div>
          ) : (
            <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-gray-200'}`}>
                {eventsLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Icon icon="eos-icons:loading" width="28" height="28" className="text-emerald-400" />
                    </motion.div>
                  </div>
                ) : events.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <Icon icon="mdi:github" width="40" height="40" className="text-gray-500" />
                    <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>No public events found</p>
                  </div>
                ) : (
                  <div className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-gray-100'}`}>
                    {events.map((ev, i) => {
                      const [textCol, bgCol] = EVENT_COLORS[ev.type] || ['text-gray-400', 'bg-gray-400/10']
                      return (
                        <motion.div key={ev.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                          className={`flex items-center gap-4 px-5 py-3.5 transition-all ${darkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-50'}`}>
                          <div className={`p-2 rounded-lg flex-shrink-0 ${bgCol}`}>
                            <Icon icon={EVENT_ICONS[ev.type] || 'mdi:github'} width="15" height="15" className={textCol} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{formatEvent(ev)}</p>
                            <a href={`https://github.com/${ev.repo?.name}`} target="_blank" rel="noopener noreferrer"
                              className={`text-xs truncate hover:text-cyan-400 transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                              {ev.repo?.name}
                            </a>
                          </div>
                          <span className={`text-xs flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{timeAgo(ev.created_at)}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
                <div className={`px-5 py-3 border-t ${darkMode ? 'border-slate-800' : 'border-gray-100'}`}>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                    <Icon icon="mdi:github" width="15" height="15" />
                    View full GitHub profile
                    <Icon icon="mdi:open-in-new" width="13" height="13" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}