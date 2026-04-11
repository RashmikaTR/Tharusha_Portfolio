import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Terminal, Github, Mail, Linkedin, Twitter, Command as CmdIcon, Cpu, User, BookOpen, Send } from 'lucide-react';
import { usePersonality } from '../PersonalityContext';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { mode, toggleMode, theme, toggleTheme } = usePersonality();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { icon: <User size={18} />, label: 'About Me', section: 'about' },
    { icon: <Cpu size={18} />, label: 'Skills Dashboard', section: 'skills' },
    { icon: <BookOpen size={18} />, label: 'Projects', section: 'projects' },
    { icon: <Terminal size={18} />, label: 'Open Terminal', section: 'terminal' },
    { icon: <Send size={18} />, label: 'Contact', section: 'contact' },
    { icon: <Monitor size={18} />, label: `Switch to ${mode === 'professional' ? 'Creative' : 'Professional'} Mode`, action: toggleMode },
    { icon: <Terminal size={18} />, label: 'Toggle Theme', action: toggleTheme },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleAction = (item) => {
    if (item.action) item.action();
    if (item.section) {
      document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-xl glass-dark rounded-xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex items-center p-4 border-b border-white/10">
              <Search className="text-zinc-500 mr-3" size={20} />
              <input 
                autoFocus
                placeholder="What are you looking for?"
                className="bg-transparent border-none outline-none w-full text-zinc-100 placeholder:text-zinc-600 font-mono"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 opacity-40 px-2 py-1 bg-white/5 rounded border border-white/10">
                <span className="text-[10px] font-mono">ESC</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {actions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(item)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
                  <span className="text-zinc-300 group-hover:text-white font-mono text-sm">{item.label}</span>
                </button>
              ))}
              {actions.length === 0 && (
                <div className="p-8 text-center text-zinc-600 font-mono text-sm">
                  No results found for "{query}"
                </div>
              )}
            </div>
            
            <div className="bg-white/5 p-3 flex justify-between items-center px-4 border-t border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 italic">Tharusha Rashmika OS v1.0</span>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] text-zinc-500">Navigation</span>
                   <kbd className="text-[10px] bg-white/10 px-1 rounded border border-white/10 text-zinc-400">↑↓</kbd>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
