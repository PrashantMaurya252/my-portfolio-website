'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsSection from '@/components/ProjectCard';
import AchievementsCertifications from '@/components/AchivementsCertifications';
import Experience from '@/components/Experience';

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
    'Languages': ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
    'Frontend': ['React.js', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion'],
    'Backend': ['Node.js', 'Express.js', 'Socket.io', 'RESTful APIs'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Mongoose'],
    'DevOps & Tools': ['AWS (Basic S3,EC2)', 'Azure (OCR Service)', 'Docker (Basic)', 'Git', 'GitHub', 'Firebase','Postman', 'Browser DevTools'],
    'Security': ['JWT', 'OAuth2', 'RBAC', 'Bcrypt'],
    'AI & GenAI':['Prompt Engineering',
    'LLM API Integration (OpenAI, Gemini)',
    'AI-powered Feature Development',
    'Response Structuring & Optimization'],
    // 'Tools':['Postman','Browser Dev Tools','Lovable','Chatgpt','Claude']
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
        className={`fixed top-0 w-full z-50 backdrop-blur-md ${
          darkMode
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
                  className={`relative text-sm font-medium transition-colors ${
                    activeNav === item.id
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
              className={`p-2 rounded-lg transition-colors ${
                darkMode
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
        className={`min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden ${
          darkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
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
                className={`inline-block p-4 rounded-full ${
                  darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-blue-100 border border-blue-300'
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
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
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
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      darkMode
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
              className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
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
                href="https://drive.google.com/file/d/1Rg4i-oL7Z-7xPEHCsjS91ByAtPpkjzJV/view?usp=sharing"
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
                  className={`p-3 rounded-lg ${
                    darkMode
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

      {/* Skills Section with Stagger Icons & Progress Bars */}
      <section
        id="skills"
        className={`py-20 px-4 ${
          darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
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
                className={`p-6 rounded-lg backdrop-blur-sm ${
                  darkMode
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
                <div className="space-y-3">
                  {items.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {skill}
                        </span>
                      </div>
                      <motion.div
                        custom={i}
                        variants={progressVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`h-2 rounded-full ${
                          i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-purple-400'
                        } origin-left`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section
        id="experience"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Experience
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                role: 'Full Stack Developer',
                company: 'Codenia Technologies LLP',
                period: 'Feb 2025 – March 2026',
                highlights: [
                  'Architected 4+ production-grade full stack projects',
                  'Designed enterprise authentication with JWT & RBAC',
                  'Built complex approval workflows with audit systems',
                  'Optimized queries improving performance by 45%',
                  'Achieved 99.8% uptime through systematic debugging',
                ],
              },
              {
                role: 'Frontend Developer Intern',
                company: 'Virtual Cybertrons',
                period: 'Apr 2024 – Jan 2025',
                highlights: [
                  'Developed modular, reusable UI components',
                  'Integrated Firebase Authentication for social login',
                  'Integrated 25+ APIs with intelligent caching',
                  'Reduced network requests by 30%',
                  'Implemented accessible UI components',
                ],
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className={`p-6 rounded-lg border-l-4 border-cyan-400 ${
                  darkMode
                    ? 'bg-slate-800/50 border border-slate-700'
                    : 'bg-blue-50 border border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`text-sm font-medium mt-2 md:mt-0 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className={`flex gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-cyan-400 mt-1">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}
      <Experience darkMode={darkMode}/>

      {/* Projects Section with Card Flip & Zoom */}
      {/* <section
        id="projects"
        className={`py-20 px-4 ${
          darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
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
              Featured Projects
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Production-ready applications I've built
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={flipVariants}
                whileHover="hover"
                className={`rounded-lg overflow-hidden backdrop-blur-sm perspective ${
                  darkMode
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50'
                    : 'bg-white/50 border border-gray-200 hover:border-cyan-400'
                } transition-all duration-300`}
                style={{ transformStyle: 'preserve-3d' }}
              >
               
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`h-32 bg-gradient-to-br overflow-hidden ${
                    i === 0 ? 'from-cyan-500/20 to-blue-500/20' :
                    i === 1 ? 'from-purple-500/20 to-pink-500/20' :
                    'from-green-500/20 to-cyan-500/20'
                  }`}
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">{project.title}</h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="mb-4 space-y-2">
                    {project.highlights.map((highlight, j) => (
                      <div key={j} className="flex gap-2 text-sm">
                        <span className="text-cyan-400">✓</span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode
                            ? 'bg-slate-700 text-cyan-300'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate="animate"
                        variants={rotateVariants}
                      >
                        <Icon icon="mdi:github" width="16" height="16" />
                      </motion.div>
                      Code
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2 rounded-lg border-2 border-cyan-400 text-cyan-400 font-semibold text-center hover:bg-cyan-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2`}
                    >
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icon icon="mdi:open-in-new" width="16" height="16" />
                      </motion.div>
                      Live
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      <CurrentlyLearning darkMode={darkMode} />
<GitHubActivity darkMode={darkMode} />
<ProjectsSection darkMode={darkMode} />
<AchievementsCertifications darkMode={darkMode} />

      {/* Education Section */}
      {/* <section
        id="education"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Certifications & Education
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className={`p-6 rounded-lg flex items-start gap-4 ${
                  darkMode
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50'
                    : 'bg-blue-50 border border-gray-200 hover:border-cyan-400'
                } transition-all duration-300`}
              >
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-slate-700' : 'bg-blue-200'
                }`}>
                  <Icon icon={cert.icon} width="24" height="24" className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-cyan-400">{cert.title}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {cert.issuer} • Certificate
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-cyan-400'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  } transition-all`}
                  title="View Certificate"
                >
                  <Icon icon="mdi:external-link" width="20" height="20" />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Contact Section with Icon Animations */}
      <section
        id="contact"
        className={`py-20 px-4 ${
          darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'
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
            className={`space-y-6 p-8 rounded-lg ${
              darkMode
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
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  darkMode
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
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  darkMode
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
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  darkMode
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
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  darkMode
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
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  darkMode
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
        className={`py-8 px-4 ${
          darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-gray-100 border-t border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Prashant Kumar Maurya. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Menu Button */}
      <motion.div className="md:hidden fixed bottom-8 right-8 z-40 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('contact')}
          className="p-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Icon icon="material-symbols:mail" width="24" height="24" />
        </motion.button>
      </motion.div>
    </div>
  );
}
