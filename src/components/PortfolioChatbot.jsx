'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const GREETING_MESSAGE = {
  role: 'assistant',
  content: `👋 Hey there! I'm **PM Bot** — Prashant's personal AI assistant.\n\nPrashant is a **Full Stack Developer** (MERN + GenAI) with 2+ years of experience. He's built production-grade apps at Codenia Technologies and has strong expertise in Node.js, Next.js, PostgreSQL, and LLM integration.\n\nAsk me anything — his **skills**, **projects**, **experience**, **education**, or how to **get in touch**! 🚀`,
};

const SUGGESTED_QUESTIONS = [
  'What are his top projects?',
  'Tell me about his experience',
  'What tech stack does he use?',
  'How can I contact him?',
];

// Parse text into segments: plain text, bold (**text**), and links ([label](url))
function parseContent(text) {
  const segments = [];
  // Matches [label](url) or **bold**
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push plain text before this match
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    if (match[1] && match[2]) {
      // Markdown link: [label](url)
      segments.push({ type: 'link', label: match[1], url: match[2] });
    } else if (match[3]) {
      // Bold: **text**
      segments.push({ type: 'bold', content: match[3] });
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments;
}

function MessageContent({ content, isUser, dark }) {
  // Split on newlines first, then parse each line
  const lines = content.split('\n');

  return (
    <span>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx}>
          {parseContent(line).map((seg, segIdx) => {
            if (seg.type === 'link') {
              return (
                <a
                  key={segIdx}
                  href={seg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition-opacity hover:opacity-75 ${
                    isUser
                      ? 'text-white/90 decoration-white/60'
                      : dark
                      ? 'text-cyan-400 decoration-cyan-400/50'
                      : 'text-cyan-600 decoration-cyan-400/60'
                  }`}
                >
                  {seg.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 flex-shrink-0">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              );
            }
            if (seg.type === 'bold') {
              return <strong key={segIdx} className="font-bold">{seg.content}</strong>;
            }
            return <span key={segIdx} style={{ whiteSpace: 'pre-wrap' }}>{seg.content}</span>;
          })}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

export default function PortfolioChatbot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-open on first visit
  useEffect(() => {
    const visited = sessionStorage.getItem('pm_chatbot_visited');
    if (!visited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('pm_chatbot_visited', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowPulse(false);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userText }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't connect right now. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const dark = darkMode;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="open-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
            >
              {showPulse && (
                <>
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20 [animation-delay:300ms]" />
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(true)}
                className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg flex items-center justify-center text-white"
                style={{ boxShadow: '0 0 24px rgba(34,211,238,0.45)' }}
                aria-label="Open chat"
              >
                <Icon icon="fluent:bot-sparkle-24-filled" width="26" height="26" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold pointer-events-none ${
                  dark
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'bg-white text-cyan-600 border border-gray-200 shadow'
                }`}
              >
                Ask me about Prashant ✨
              </motion.div>
            </motion.div>
          ) : (
            <motion.button
              key="close-btn"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg flex items-center justify-center text-white"
              style={{ boxShadow: '0 0 24px rgba(34,211,238,0.45)' }}
              aria-label="Close chat"
            >
              <Icon icon="material-symbols:close-rounded" width="24" height="24" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`fixed bottom-28 left-8 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
              dark
                ? 'bg-slate-900 border border-slate-700/80'
                : 'bg-white border border-gray-200'
            }`}
            style={{
              maxHeight: '520px',
              boxShadow: dark
                ? '0 8px 48px rgba(34,211,238,0.12), 0 2px 16px rgba(0,0,0,0.5)'
                : '0 8px 48px rgba(34,211,238,0.1), 0 2px 16px rgba(0,0,0,0.12)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="fluent:bot-sparkle-24-filled" width="20" height="20" className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-none">PM Bot</p>
                <p className="text-cyan-100 text-xs mt-0.5">Prashant's AI Assistant</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div
              className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${
                dark ? 'bg-slate-900' : 'bg-gray-50'
              }`}
              style={{ minHeight: 0 }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 self-start">
                      <Icon icon="fluent:bot-sparkle-24-filled" width="14" height="14" className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-br-sm'
                        : dark
                        ? 'bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-sm'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    <MessageContent
                      content={msg.content}
                      isUser={msg.role === 'user'}
                      dark={dark}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Icon icon="fluent:bot-sparkle-24-filled" width="14" height="14" className="text-white" />
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center ${
                      dark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (shown only initially) */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`px-4 pb-3 flex flex-wrap gap-1.5 flex-shrink-0 ${
                  dark ? 'bg-slate-900' : 'bg-gray-50'
                }`}
              >
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                      dark
                        ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10'
                        : 'border-cyan-400/50 text-cyan-600 hover:bg-cyan-50'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <div
              className={`px-3 py-3 flex gap-2 items-end flex-shrink-0 ${
                dark
                  ? 'bg-slate-900 border-t border-slate-700/80'
                  : 'bg-white border-t border-gray-200'
              }`}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Prashant..."
                rows={1}
                className={`flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all ${
                  dark
                    ? 'bg-slate-800 text-gray-200 placeholder-gray-500 border border-slate-700 focus:border-cyan-500/60'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-cyan-400'
                }`}
                style={{ maxHeight: '80px', lineHeight: '1.4' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{ boxShadow: '0 0 12px rgba(34,211,238,0.3)' }}
                aria-label="Send"
              >
                <Icon icon="material-symbols:send-rounded" width="18" height="18" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}