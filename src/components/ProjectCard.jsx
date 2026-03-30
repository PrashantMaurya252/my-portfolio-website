'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

// ─── ProjectCard ─────────────────────────────────────────────────────────────
// Props:
//   project: {
//     title, description, tags, highlights, githubLink, liveLink,
//     images: [{ src, alt }, ...] // up to 4 images
//   }
//   darkMode: boolean
// ─────────────────────────────────────────────────────────────────────────────

function ImageFallback({ alt, gradient, index }) {
  const gradients = [
    'from-cyan-500/40 via-blue-600/30 to-violet-500/20',
    'from-emerald-500/40 via-teal-600/30 to-cyan-500/20',
    'from-violet-500/40 via-purple-600/30 to-pink-500/20',
    'from-amber-500/40 via-orange-600/30 to-red-500/20',
  ]
  const icons = ['mdi:monitor-screenshot', 'mdi:application', 'mdi:database', 'mdi:api']
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${
        gradient || gradients[index % gradients.length]
      } relative overflow-hidden`}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`p-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#p-${index})`} />
        </svg>
      </div>
      <Icon icon={icons[index % icons.length]} width="36" height="36" className="text-white/50 mb-2" />
      <span className="text-white/40 text-xs font-mono">{alt || `Preview ${index + 1}`}</span>
    </div>
  )
}

function ProjectModal({ project, darkMode, onClose }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${
            darkMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon icon="material-symbols:close" width="20" height="20" />
          </button>

          {/* Image Gallery */}
          <div className="relative">
            {/* Main image */}
            <div className="w-full h-64 relative overflow-hidden rounded-t-2xl">
              {project.images && project.images[currentImage]?.src ? (
                <img
                  src={project.images[currentImage].src}
                  alt={project.images[currentImage].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageFallback
                  alt={project.images?.[currentImage]?.alt}
                  index={currentImage}
                />
              )}

              {/* Image navigation arrows */}
              {project.images && project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p - 1 + project.images.length) % project.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                  >
                    <Icon icon="material-symbols:chevron-left" width="20" height="20" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p + 1) % project.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                  >
                    <Icon icon="material-symbols:chevron-right" width="20" height="20" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? 'bg-cyan-400 w-5' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            {project.images && project.images.length > 1 && (
              <div className={`flex gap-2 p-3 ${darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-1 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage
                        ? 'border-cyan-400 opacity-100'
                        : darkMode
                        ? 'border-slate-700 opacity-50 hover:opacity-75'
                        : 'border-gray-200 opacity-50 hover:opacity-75'
                    }`}
                  >
                    {img?.src ? (
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    ) : (
                      <ImageFallback alt={img?.alt} index={i} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal content */}
          <div className="p-6">
            {/* Title + Tags */}
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                    darkMode
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.longDescription || project.description}
            </p>

            {/* Highlights */}
            {project.highlights && (
              <div className="mb-5">
                <p
                  className={`text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  Key Features
                </p>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-sm">
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">▸</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech breakdown */}
            {project.techBreakdown && (
              <div className="mb-5">
                <p
                  className={`text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  Tech Breakdown
                </p>
                <div className="space-y-2">
                  {project.techBreakdown.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className={`text-xs w-20 flex-shrink-0 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        {t.layer}
                      </span>
                      <div
                        className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                          darkMode ? 'bg-slate-700' : 'bg-gray-200'
                        }`}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${t.percent}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                      <span className={`text-xs w-8 text-right ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {t.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <Icon icon="mdi:github" width="18" height="18" />
                  View Code
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 rounded-lg border-2 border-cyan-400 text-cyan-400 font-semibold flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-slate-900 transition-all`}
                >
                  <Icon icon="mdi:open-in-new" width="18" height="18" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Single Card ──────────────────────────────────────────────────────────────
export function ProjectCard({ project, darkMode = true }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  // Auto-rotate images every 3s when not hovered and autoRotate is enabled
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return
    if (!autoRotate || isHovered || isModalOpen) return
    const timer = setInterval(() => {
      setCurrentImage((p) => (p + 1) % project.images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [project.images, autoRotate, isHovered, isModalOpen])

  const selectImage = (i) => {
    setCurrentImage(i)
    setAutoRotate(false)
    setTimeout(() => setAutoRotate(true), 8000)
  }

  const images = project.images || []

  return (
    <>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
          darkMode
            ? 'bg-slate-800/60 border-slate-700 hover:border-cyan-500/50'
            : 'bg-white border-gray-200 hover:border-cyan-400'
        }`}
        style={{
          boxShadow: isHovered ? '0 20px 60px rgba(34,211,238,0.12)' : 'none',
        }}
      >
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {images[currentImage]?.src ? (
                <img
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageFallback alt={images[currentImage]?.alt} index={currentImage} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Image thumbnails (bottom strip, visible on hover) */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 px-3"
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => selectImage(i)}
                  className={`flex-1 max-w-[60px] h-9 rounded overflow-hidden border-2 transition-all ${
                    i === currentImage
                      ? 'border-cyan-400 opacity-100 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  {img?.src ? (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  ) : (
                    <ImageFallback alt={img?.alt} index={i} />
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* Auto-rotate indicator */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 flex gap-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentImage ? 'w-4 bg-cyan-400' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-cyan-400 leading-tight lg:text-red-500">{project.title}</h3>
            {images.length > 1 && (
              <span
                className={`text-xs flex-shrink-0 ml-2 px-1.5 py-0.5 rounded font-mono ${
                  darkMode ? 'text-white bg-slate-700' : 'text-gray-400 bg-gray-100'
                }`}
              >
                {currentImage + 1}/{images.length}
              </span>
            )}
          </div>

          <p
            className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags?.slice(0, 4).map((tag, j) => (
              <span
                key={j}
                className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  darkMode
                    ? 'bg-slate-700 text-cyan-300'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {tag}
              </span>
            ))}
            {project.tags?.length > 4 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 hover:shadow-md hover:shadow-cyan-500/30 transition-all"
            >
              <Icon icon="material-symbols:expand-content" width="14" height="14" />
              Details
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-1.5 transition-all ${
                darkMode
                  ? 'border-slate-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                  : 'border-gray-200 text-gray-500 hover:border-cyan-400 hover:text-cyan-500'
              }`}
            >
              <Icon icon="mdi:github" width="16" height="16" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-1.5 transition-all ${
                darkMode
                  ? 'border-slate-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                  : 'border-gray-200 text-gray-500 hover:border-cyan-400 hover:text-cyan-500'
              }`}
            >
              <Icon icon="mdi:open-in-new" width="16" height="16" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <ProjectModal
          project={project}
          darkMode={darkMode}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

// ─── Projects Section (uses ProjectCard) ─────────────────────────────────────
const sampleProjects = [
  {
    title: 'Instagram Clone',
    tags: ['MERN', 'Socket.io', 'Redux', 'Cloudinary', 'MongoDB'],
    description: 'Real-time social networking platform with live chat, notifications, and image optimization.',
    longDescription:
      'A full-featured Instagram clone built with the MERN stack. Features real-time messaging via Socket.io, live notifications for likes & comments, Cloudinary-powered image optimization, user profiles, follow system, nested comments, bookmarks, and an Explore page.',
    highlights: [
      'Real-time messaging with Socket.io (< 100ms latency)',
      'Live notifications for likes, comments & follows',
      '60% image size reduction via Cloudinary transformations',
      'Full user profile system with follow/unfollow',
      'Nested comments & bookmark collections',
      'Explore page with suggested users',
    ],
    techBreakdown: [
      { layer: 'Frontend', percent: 45 },
      { layer: 'Backend', percent: 35 },
      { layer: 'Real-time', percent: 12 },
      { layer: 'Cloud', percent: 8 },
    ],
    images: [
      { src: '/images/instagram-pic-1.png', alt: 'Feed' },
      { src: '/images/instagram-pic-2.png', alt: 'Profile' },
      { src: '/images/instagram-pic-3.png', alt: 'Chat' },
      { src: '/images/instagram-pic-4.png', alt: 'Explore' },
    ],
    githubLink: 'https://github.com/PrashantMaurya252/instagram-clone',
    liveLink: 'https://instagram-clone-awa2.onrender.com/login',
  },
  {
    title: 'E-Commerce Platform',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Prisma', 'TypeScript'],
    description: 'Type-safe e-commerce platform with secure payments, inventory management, and optimized queries.',
    longDescription:
      'Production-grade e-commerce built with Next.js and TypeScript. Features JWT + Google OAuth, Stripe Payment Intents with webhooks, real-time inventory management, advanced filtering, and optimized PostgreSQL queries via Prisma.',
    highlights: [
      'JWT + Google OAuth2 dual authentication',
      'Stripe Payment Intents with webhook handling',
      'Real-time inventory & shopping cart sync',
      'Advanced product filtering & full-text search',
      'Order history, returns & dispute tracking',
      '45% faster queries via schema optimization',
    ],
    techBreakdown: [
      { layer: 'Frontend', percent: 40 },
      { layer: 'Backend', percent: 30 },
      { layer: 'Database', percent: 20 },
      { layer: 'Payments', percent: 10 },
    ],
    images: [
      { src: '/images/e-commerce-1.png', alt: 'Home' },
      { src: '/images/e-commerce-2.png', alt: 'Products' },
      { src: '/images/e-commerce-3.png', alt: 'Cart' },
      { src: '/images/e-commerce-4.png', alt: 'Dashboard' },
    ],
    githubLink: 'https://github.com/PrashantMaurya252/e-commerce-with-postgre-and-prisma',
    liveLink: 'https://e-commerce-with-postgre-and-prisma.vercel.app/auth/login',
  },
  {
    title: 'MERN Blog Platform',
    tags: ['MERN', 'Redux', 'Firebase', 'Vite', 'MongoDB'],
    description: 'Full-featured blogging platform with analytics dashboard and role-based access control.',
    longDescription:
      'A complete blogging platform with an admin analytics dashboard, full-text search, draft/publish workflow, RBAC for authors and admins, dark/light theme, and 30-day content trend visualizations.',
    highlights: [
      'Admin dashboard with 30-day analytics trends',
      'Full-text search & category filtering',
      'Draft → Review → Published workflow',
      'Role-based access (Author, Editor, Admin)',
      'Dark/light theme with system detection',
      'Responsive design with offline support',
    ],
    techBreakdown: [
      { layer: 'Frontend', percent: 50 },
      { layer: 'Backend', percent: 30 },
      { layer: 'Auth', percent: 12 },
      { layer: 'Analytics', percent: 8 },
    ],
    images: [
      { src: '/images/blog-pic-1.png', alt: 'Blog Home' },
      { src: '/images/blog-pic-2.png', alt: 'Post View' },
      { src: '/images/blog-pic-3.png', alt: 'Admin Panel' },
      { src: '/images/blog-pic-4.png', alt: 'Editor' },
    ],
    githubLink: 'https://github.com/PrashantMaurya252/blog-app',
    liveLink: 'https://mern-blog-m5rc.onrender.com/',
  },
]

export default function ProjectsSection({ darkMode = true }) {
  return (
    <section
      id="projects"
      className={`py-24 px-4 ${
        darkMode
          ? 'bg-slate-950 border-t border-slate-800'
          : 'bg-gray-50 border-t border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Production-ready applications — hover a card to browse screenshots
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 screen-900:grid-cols-2 screen-1350:grid-cols-3 gap-6 items-start">
        {/* <div className="w-full flex gap-6 sm:"> */}
          {sampleProjects.map((project, i) => (
            <ProjectCard key={i} project={project} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  )
}