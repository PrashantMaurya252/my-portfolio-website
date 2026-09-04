'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsSection from '@/components/ProjectCard';
import Achievements from '@/components/Achievements';
import AchievementsCertifications from '@/components/AchivementsCertifications';
import Experience from '@/components/Experience';
import PortfolioChatbot from '@/components/PortfolioChatbot';
import LeetCodeActivity from '@/components/LeetCodeActivity';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeNav, setActiveNav] = useState('about');
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  // Text Reveal Animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  // Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Floating Background Animation
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Card Flip Animation
  const flipVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: { rotateY: 5, rotateX: 2 },
  };

  // Icon Bounce Animation
  const bounceVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Rotating Icon Animation
  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Progress Bar Animation
  const progressVariants = {
    hidden: { width: 0 },
    visible: (index) => ({
      width: '100%',
      transition: {
        delay: index * 0.1,
        duration: 1.2,
        ease: 'easeOut',
      },
    }),
  };

  const navItems = [
    { id: 'about', label: 'About', icon: 'material-symbols:person' },
    { id: 'skills', label: 'Skills', icon: 'game-icons:skills' },
    { id: 'projects', label: 'Projects', icon: 'academicons:ideas-repec' },
    { id: 'experience', label: 'Experience', icon: 'material-symbols:work' },
    { id: 'education', label: 'Education', icon: 'ph:certificate-fill' },
    { id: 'contact', label: 'Contact', icon: 'material-symbols:mail' },
  ];

  const projects = [
    {
      title: 'Instagram Clone',
      tags: ['MERN', 'Socket.io', 'Redux', 'Cloudinary'],
      description: 'Real-time social networking platform with live chat, notifications, and image optimization.',
      highlights: ['Real-time messaging', 'Live notifications', '60% image optimization'],
      githubLink: 'https://github.com/PrashantMaurya252/instagram-clone',
      liveLink: 'https://instagram-clone-awa2.onrender.com/login',
    },
    {
      title: 'E-Commerce with PostgreSQL',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Prisma'],
      description: 'Type-safe e-commerce platform with secure payments, inventory management, and optimized queries.',
      highlights: ['JWT + Google OAuth', 'Stripe Payment Intents', 'Real-time inventory'],
      githubLink: 'https://github.com/PrashantMaurya252/e-commerce-with-postgre-and-prisma',
      liveLink: 'https://e-commerce-with-postgre-and-prisma.vercel.app/user/home',
    },
    {
      title: 'MERN Blog Platform',
      tags: ['MERN', 'Redux', 'Firebase', 'Vite'],
      description: 'Full-featured blogging platform with analytics dashboard and role-based access control.',
      highlights: ['Admin analytics', 'Full-text search', 'Dark mode'],
      githubLink: 'https://github.com/PrashantMaurya252/blog-app',
      liveLink: 'https://mern-blog-m5rc.onrender.com/',
    },
  ];

  const skills = {
    'Languages': [
      { name: 'JavaScript (ES6+)', icon: 'logos:javascript' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'HTML5', icon: 'vscode-icons:file-type-html' },
      { name: 'CSS3', icon: 'vscode-icons:file-type-css' },
    ],
    'Frontend': [
      { name: 'React.js', icon: 'logos:react' },
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'Redux Toolkit', icon: 'logos:redux' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'Material UI', icon: 'logos:material-ui' },
    ],
    'Backend': [
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'Express.js', icon: 'skill-icons:expressjs-light' },
      { name: 'NestJS', icon: 'logos:nestjs' },
      { name: 'REST APIs', icon: 'dashicons:rest-api' },
      { name: 'Socket.io', icon: 'logos:socket-io' },
    ],
    'Databases & Caching': [
      { name: 'PostgreSQL (Prisma)', icon: 'logos:postgresql' },
      { name: 'MongoDB (Mongoose)', icon: 'logos:mongodb-icon' },
      { name: 'Redis', icon: 'logos:redis' },
      { name: 'BullMQ', icon: 'mdi:bullseye' },
    ],
    'System Design': [
      { name: 'Scalable Architecture', icon: 'mdi:server-network' },
      { name: 'API Design', icon: 'mdi:api' },
      { name: 'Caching', icon: 'mdi:memory' },
      { name: 'RBAC', icon: 'eos-icons:role-binding' },
    ],
    'DevOps & Tools': [
      { name: 'AWS (S3)', icon: 'logos:aws' },
      { name: 'Docker', icon: 'logos:docker-icon' },
      { name: 'VPS Deployment', icon: 'mdi:server' },
      { name: 'PM2', icon: 'mdi:server-security' },
      { name: 'GitHub', icon: 'mdi:github' },
    ],
    'AI & GenAI': [
      { name: 'LLM Integration', icon: 'logos:openai-icon' },
      { name: 'OpenAI API', icon: 'logos:openai-icon' },
      { name: 'Gemini API', icon: 'logos:google-gemini' },
      { name: 'Prompt Engineering', icon: 'fluent:brain-circuit-20-filled' },
    ],
  };

  const certifications = [
    {
      title: 'SQL and PostgreSQL: The Complete Developer\'s Guide',
      issuer: 'Udemy',
      icon: 'mdi:database',
      certificateLink: 'https://drive.google.com/file/d/1kepevrjs5d3_7_UyxtNr9a65kmhm3tNp/view?usp=sharing',
    },
    {
      title: 'Full Stack Development Bootcamp – MERN Stack',
      issuer: 'upGrad',
      icon: 'mdi:code-braces',
      certificateLink: 'https://drive.google.com/file/d/1kepevrjs5d3_7_UyxtNr9a65kmhm3tNp/view?usp=sharing',
    },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <style>{`
        :root {
          color-scheme: ${darkMode ? 'dark' : 'light'};
        }
        body {
          background: ${darkMode ? '#0a0e27' : '#ffffff'};
          color: ${darkMode ? '#e0e7ff' : '#1f2937'};
        }
      `}</style>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 backdrop-blur-md ${darkMode
            ? 'bg-slate-900/80 border-slate-700'
            : 'bg-white/80 border-gray-200'
          } border-b transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`}
            >
              PM
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-colors ${activeNav === item.id
                      ? 'text-cyan-400'
                      : darkMode
                        ? 'text-gray-400 hover:text-cyan-400'
                        : 'text-gray-600 hover:text-cyan-500'
                    }`}
                >
                  {item.label}
                  {activeNav === item.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode
                  ? 'bg-slate-800 hover:bg-slate-700'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              <Icon
                icon={darkMode ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'}
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Text Reveal & Floating Background */}
      <section
        id="about"
        className={`min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
          }`}
      >
        {/* Floating Background Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Icon with Rotation */}
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                animate="animate"
                variants={rotateVariants}
                className={`inline-block p-4 rounded-full ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-blue-100 border border-blue-300'
                  }`}
              >
                <Icon icon="material-symbols:code" width="48" height="48" className="text-cyan-400" />
              </motion.div>
            </motion.div>

            {/* Text Reveal Animation */}
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              {['Prashant', 'Kumar', 'Maurya'].map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={textRevealVariants}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xl md:text-2xl font-semibold mb-3 text-cyan-300">Full Stack Developer</p>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {['Frontend', 'Backend', 'Full Stack'].map((role, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                        : 'bg-blue-100 text-blue-700 border border-blue-300'
                      }`}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              Full Stack Developer (MERN) building scalable, production-ready applications with real-time features, secure authentication, and AI-powered functionality using LLM APIs.
            </motion.p>

            {/* Button Hover Animations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <motion.a
                whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                href="https://drive.google.com/file/d/1KCkBKjmZl05idpYbv17mywnpxEYjsdnK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon icon="material-symbols:download" width="20" height="20" />
                </motion.div>
                Download Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 font-semibold rounded-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all`}
              >
                Get in Touch
              </motion.button>
            </motion.div>

            {/* Social Links with Icon Animations */}
            <motion.div variants={itemVariants} className="flex gap-6 justify-center">
              {[
                { icon: 'mdi:github', url: 'https://github.com/PrashantMaurya252', label: 'GitHub' },
                { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/pkm252/', label: 'LinkedIn' },
                // { icon: 'mdi:email', url: 'mailto:prashantmaurya252@outlook.com', label: 'Email', isEmail: true },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target={!social.isEmail ? '_blank' : undefined}
                  rel={!social.isEmail ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg ${darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    }`}
                  title={social.label}
                >
                  <motion.div
                    animate={social.icon === 'mdi:github' ? 'animate' : undefined}
                    variants={social.icon === 'mdi:github' ? rotateVariants : undefined}
                  >
                    <Icon icon={social.icon} width="24" height="24" />
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Achievements darkMode={darkMode} />

      {/* Skills Section with Stagger Icons & Progress Bars */}
      <section
        id="skills"
        className={`py-20 px-4 ${darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
          }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Expertise across the full stack
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-lg backdrop-blur-sm ${darkMode
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50'
                    : 'bg-white/50 border border-gray-200 hover:border-cyan-400'
                  } transition-all duration-300`}
              >
                <motion.h3
                  // animate="animate"
                  // variants={rotateVariants}
                  className="text-lg font-bold text-cyan-400 mb-4 inline-flex items-center gap-2"
                >
                  <Icon icon={['mdi:language-javascript', 'mdi:react', 'mdi:nodejs', 'mdi:database', 'mdi:cloud', 'mdi:shield-lock'][categoryIndex]} width="20" height="20" />
                  {category}
                </motion.h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {items.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`group relative flex flex-col items-center justify-center w-24 h-24 p-3 rounded-xl transition-all cursor-pointer ${darkMode
                          ? 'bg-slate-700/50 hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                          : 'bg-white hover:bg-gray-50 hover:shadow-lg'
                        }`}
                    >
                      <Icon
                        icon={skill.icon}
                        width="40"
                        height="40"
                        className={
                          skill.icon.startsWith('mdi:') ||
                            skill.icon.startsWith('fluent:') ||
                            skill.icon.startsWith('eos-icons:') ||
                            skill.icon.startsWith('dashicons:')
                            ? (darkMode ? 'text-cyan-400' : 'text-blue-600')
                            : ''
                        }
                      />
                      <span className={`mt-2 text-[10px] font-medium text-center leading-tight ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {skill.name}
                      </span>

                      {/* Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-black text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap z-10 pointer-events-none shadow-xl border border-gray-700">
                        {skill.name}
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-black rotate-45 border-b border-r border-gray-700"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      <CurrentlyLearning darkMode={darkMode} />
      <GitHubActivity darkMode={darkMode} />
      <LeetCodeActivity darkMode={darkMode} />
      <ProjectsSection darkMode={darkMode} />
      <AchievementsCertifications darkMode={darkMode} />
      <PortfolioChatbot darkMode={darkMode} />



      {/* Contact Section with Icon Animations */}
      <section
        id="contact"
        className={`py-20 px-4 ${darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
          }`}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind? Let's collaborate!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleFormSubmit}
            className={`space-y-6 p-8 rounded-lg ${darkMode
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-white border border-gray-200'
              }`}
          >
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400/20`}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400/20`}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none`}
                placeholder="Your message here..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              disabled={formStatus === 'loading'}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon icon="eos-icons:loading" /> Sending...
                </span>
              ) : formStatus === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon icon="material-symbols:check-circle" /> Message Sent!
                </span>
              ) : formStatus === 'error' ? (
                <span>Error sending message. Please try again.</span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center space-y-4"
          >
            <p className={`text-lg font-semibold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Or reach out directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:prashantmaurya252@outlook.com"
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${darkMode
                    ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon icon="mdi:email" width="18" height="18" />
                </motion.div>
                Email
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+916306315885"
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${darkMode
                    ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon icon="mdi:phone" width="18" height="18" />
                </motion.div>
                Call
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 ${darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-gray-100 border-t border-gray-200'
          }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2026 Prashant Kumar Maurya. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <motion.div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {/* Email Button - Mobile Only */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('contact')}
          className="md:hidden p-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Icon icon="material-symbols:mail" width="24" height="24" />
        </motion.button>

        {/* WhatsApp Button - Visible Everywhere */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/916306315885"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center"
        >
          <Icon icon="mdi:whatsapp" width="28" height="28" />
        </motion.a>
      </motion.div>
    </div>
  );
}
