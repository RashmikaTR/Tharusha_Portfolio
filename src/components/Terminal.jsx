import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Maximize2, ChevronRight } from 'lucide-react';
import { usePersonality } from '../PersonalityContext';

const PROMPT = "tharusha@dev:~$ ";

const Terminal = () => {
  const { mode, theme } = usePersonality();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooted, setIsBooted] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => "Available commands: about, skills, projects, contact, clear, personality, date, whoami",
    about: () => "I am Tharusha Rashmika, an IT Undergraduate at the University of Vavuniya. I build scalable digital ecosystems using the MERN stack and DevOps practices.",
    skills: () => "Main: Java, C#, C++, JavaScript\nStack: MERN (MongoDB, Express, React, Node.js)\nTools: Git, Docker",
    projects: () => "1. Alumni Management System - PHP/MySQL\n2. VUC - University Connect\n3. Project Management - Build Track Tool\nType 'project <name>' for more.",
    contact: () => "Email: tharusharashmika2001@gmail.com\nLinkedIn: https://www.linkedin.com/in/tharusha-rashmika-4b0204345/\nGitHub: github.com/RashmikaTR",
    date: () => new Date().toString(),
    whoami: () => "guest@portfolio",
    personality: () => `System running in [${mode.toUpperCase()}] mode. Visit the Navbar to toggle visually.`,
    clear: () => {
      setHistory([]);
      return null;
    },
  };

  useEffect(() => {
    if (isBooted) return;
    const bootSequence = [
      "Initializing kernel...",
      "Loading TharushaOS v2.4.0...",
      "Mounting file systems...",
      "Connecting to neural-link via Portfolio-v5...",
      "System Ready.",
      "Type 'help' to begin."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setHistory(prev => [...prev, { type: 'system', content: bootSequence[i] }]);
        i++;
      } else {
        setIsBooted(true);
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [isBooted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { type: 'input', content: cmd }];

      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result !== null) {
          newHistory.push({ type: 'output', content: result });
        }
      } else if (cmd.startsWith('project ')) {
        const pName = cmd.split('project ')[1].toLowerCase();
        const pDetails = {
          'alumni': "Alumni Management System: A PHP/MySQL platform for university networking.",
          'vuc': "VUC: A student collaboration hub for Vavuniya University.",
          'management': "Project Management: A specialized build tracking tool built with React."
        };
        const detail = Object.keys(pDetails).find(k => pName.includes(k));
        newHistory.push({ type: 'output', content: detail ? pDetails[detail] : `Project '${pName}' not found. Try: alumni, vuc, or management.` });
      } else {
        newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type 'help' for assistance.` });
      }

      setHistory(newHistory);
      setCommandHistory([input, ...commandHistory]);
      setHistoryIndex(-1);
      setInput('');
    }

    if (e.key === 'ArrowUp') {
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }

    if (e.key === 'ArrowDown') {
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(c => c.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12" id="terminal">
      <div className="glass-dark rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-white/10 px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="flex items-center gap-2 opacity-30 text-xs font-mono">
            <TerminalIcon size={12} />
            <span>zsh — TharushaOS</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div className="flex flex-col md:flex-row h-[400px]">
          <div
            className="flex-grow p-6 overflow-y-auto font-mono text-sm leading-relaxed"
            onClick={() => inputRef.current?.focus()}
            ref={scrollRef}
          >
            <AnimatePresence initial={false}>
              {history.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-1 ${line.type === 'input' ? 'text-white' : line.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
                >
                  {line.type === 'input' && <span className="text-purple-400">{PROMPT}</span>}
                  {line.content}
                </motion.div>
              ))}
            </AnimatePresence>

            {isBooted && (
              <div className="flex items-center">
                <span className="text-purple-400">{PROMPT}</span>
                <input
                  ref={inputRef}
                  autoFocus
                  className="bg-transparent border-none outline-none flex-grow text-white ml-1 caret-emerald-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  spellCheck="false"
                />
              </div>
            )}
          </div>

          {/* Quick Guide / Cheat Sheet */}
          {isBooted && (
            <div className="w-full md:w-48 bg-white/5 p-6 border-l border-white/5 hidden md:block select-none overflow-y-auto">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Command Guide</h3>
              <div className="space-y-4">
                {[
                  { cmd: 'about', desc: 'Bio info' },
                  { cmd: 'skills', desc: 'Tech stack' },
                  { cmd: 'projects', desc: 'Work list' },
                  { cmd: 'contact', desc: 'Socials' },
                  { cmd: 'clear', desc: 'Reset' },
                  { cmd: 'TAB', desc: 'Auto-complete', key: true },
                ].map((item, id) => (
                  <div key={id} className="group">
                    <span className={`text-[11px] font-mono ${item.key ? 'text-purple-400' : 'text-emerald-500'} block mb-0.5`}>
                      {item.cmd}
                    </span>
                    <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-[10px] text-center font-mono text-zinc-600 uppercase tracking-widest italic animate-pulse">
        System active — Interaction encouraged
      </p>
    </div>
  );
};

export default Terminal;
