import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Terminal, Github, Mail, Linkedin, Volume2, VolumeX, Cpu, User, BookOpen, Send, Download, Sparkles, X } from 'lucide-react';
import { usePersonality } from '../PersonalityContext';
import { sound } from '../utils/sound';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { mode, cycleMode, soundEnabled, toggleSound } = usePersonality();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playPop();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { icon: <User size={16} className="text-cyan-400" />, label: 'About & Journey', section: 'about' },
    { icon: <BookOpen size={16} className="text-purple-400" />, label: 'Selected Projects', section: 'projects' },
    { icon: <Cpu size={16} className="text-emerald-400" />, label: 'Tech Stack & Skills', section: 'skills' },
    { icon: <Terminal size={16} className="text-amber-400" />, label: 'Open Interactive Console', section: 'terminal' },
    { icon: <Send size={16} className="text-blue-400" />, label: 'Contact Tharusha', section: 'contact' },
    { icon: <Monitor size={16} className="text-pink-400" />, label: `Cycle Theme Palette (Current: ${mode})`, action: cycleMode },
    { icon: soundEnabled ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} className="text-zinc-500" />, label: `Sound Effects (${soundEnabled ? 'Enabled' : 'Muted'})`, action: toggleSound },
    { icon: <Download size={16} className="text-cyan-400" />, label: 'Download Resume / CV (PDF)', action: () => window.open('/Tharusha Rashmika CV.pdf', '_blank') },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleAction = (item) => {
    sound.playClick();
    if (item.action) item.action();
    if (item.section) {
      document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            className="relative w-full max-w-xl glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/15 bg-[#0d0f17]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center p-4 border-b border-white/10 bg-[#08090d]">
              <Search className="text-cyan-400 mr-3" size={18} />
              <input
                autoFocus
                placeholder="Type a command or jump to section..."
                className="bg-transparent border-none outline-none w-full text-zinc-100 placeholder:text-zinc-500 font-mono text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>

            {/* Action Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
              {actions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(item)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-white/[0.04] border border-white/5 group-hover:border-white/10">
                      {item.icon}
                    </span>
                    <span className="text-zinc-200 group-hover:text-cyan-300 font-mono text-xs sm:text-sm font-medium transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    Jump ↵
                  </span>
                </button>
              ))}

              {actions.length === 0 && (
                <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                  No matching commands found for "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#08090d] p-3 px-4 flex justify-between items-center border-t border-white/5 text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-cyan-400" />
                Tharusha Command Hub
              </span>
              <div className="flex gap-2">
                <span>Select <kbd className="bg-white/10 px-1 py-0.5 rounded text-zinc-300">↵</kbd></span>
                <span>Close <kbd className="bg-white/10 px-1 py-0.5 rounded text-zinc-300">ESC</kbd></span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
