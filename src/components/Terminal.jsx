import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { usePersonality } from '../PersonalityContext';
import { sound } from '../utils/sound';

const ASCII_LOGO = `
 ████████╗██████╗     ██████╗ ███████╗██╗   ██╗
 ╚══██╔══╝██╔══██╗    ██╔══██╗██╔════╝██║   ██║
    ██║   ██████╔╝    ██║  ██║█████╗  ██║   ██║
    ██║   ██╔══██╗    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ██║   ██║  ██║    ██████╔╝███████╗ ╚████╔╝ 
    ╚═╝   ╚═╝  ╚═╝    ╚═════╝ ╚══════╝  ╚═══╝  
`;

const Terminal = () => {
  const { mode, cycleMode } = usePersonality();
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: 'TharushaOS v3.2.0-LTS (x86_64-pc-srilanka)' },
    { type: 'system', content: 'Welcome! Type "help" or click quick chips below to explore.' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => (
      <div>
        <p className="text-cyan-400 font-bold mb-1">Available System Commands:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-zinc-300">
          <span>• <strong className="text-white">neofetch</strong> - System overview</span>
          <span>• <strong className="text-white">about</strong> - Personal background</span>
          <span>• <strong className="text-white">projects</strong> - Selected builds</span>
          <span>• <strong className="text-white">skills</strong> - Engineering stack</span>
          <span>• <strong className="text-white">contact</strong> - Reach out directly</span>
          <span>• <strong className="text-white">mode</strong> - Toggle visuals</span>
          <span>• <strong className="text-white">matrix</strong> - Digital rain code</span>
          <span>• <strong className="text-white">clear</strong> - Reset screen</span>
        </div>
      </div>
    ),
    neofetch: () => (
      <div className="flex flex-col sm:flex-row gap-4 items-start py-2">
        <pre className="text-cyan-400 font-bold text-[10px] leading-tight hidden sm:block">
          {ASCII_LOGO}
        </pre>
        <div className="space-y-1 text-xs text-zinc-300">
          <p><span className="text-cyan-400 font-bold">user</span>@<span className="text-purple-400 font-bold">Tharusha-Rashmika</span></p>
          <p className="text-zinc-600">----------------------------</p>
          <p><strong className="text-white">Degree:</strong> BSc (Hons) in Information Technology</p>
          <p><strong className="text-white">Institution:</strong> University of Vavuniya, Sri Lanka 🇱🇰</p>
          <p><strong className="text-white">Location:</strong> Kuliyapitiya, North Western, LK</p>
          <p><strong className="text-white">Primary Core:</strong> React 19, JavaScript (ESNext), Node, PHP, MySQL</p>
          <p><strong className="text-white">Toolchain:</strong> Git, Docker, Linux, Tailwind, Three.js</p>
          <p><strong className="text-white">Status:</strong> Open for Software Engineering Opportunities</p>
        </div>
      </div>
    ),
    about: () => (
      <div className="space-y-1 text-zinc-300">
        <p className="text-white font-bold">Tharusha Rashmika</p>
        <p>BSc in Information Technology undergraduate at the University of Vavuniya, Sri Lanka.</p>
        <p>Passionate about crafting high-performance, responsive full-stack applications with clean architecture and modern developer tooling.</p>
      </div>
    ),
    skills: () => (
      <div className="space-y-2 text-zinc-300">
        <p><strong className="text-cyan-400">[Frontend]</strong> React, JavaScript (ES6+), Tailwind CSS, Bootstrap, HTML5/CSS3, Three.js</p>
        <p><strong className="text-purple-400">[Backend]</strong> Node.js, Express.js, PHP, RESTful APIs, MVC Pattern</p>
        <p><strong className="text-emerald-400">[Databases]</strong> MySQL, MongoDB, Database Modeling & Queries</p>
        <p><strong className="text-amber-400">[DevOps/Tools]</strong> Git, GitHub, VS Code, Vercel, Docker basics, Linux</p>
      </div>
    ),
    projects: () => (
      <div className="space-y-2 text-zinc-300">
        <p>1. <strong className="text-cyan-400">Tharusha Portfolio v2</strong> - React 19, Three.js, Tailwind CSS</p>
        <p>2. <strong className="text-purple-400">SmartCart E-Commerce</strong> - JavaScript, Modern Web Platform</p>
        <p>3. <strong className="text-emerald-400">Alumni Management System</strong> - PHP, MySQL Institutional Platform</p>
        <p>4. <strong className="text-amber-400">Project Build Track</strong> - React Sprint & Build Tracker</p>
        <p className="text-xs text-zinc-400 mt-1">Scroll down to the Projects section or click on "Simulate" on each card.</p>
      </div>
    ),
    contact: () => (
      <div className="space-y-1 text-zinc-300">
        <p>• Email: <a href="mailto:tharusharashmika2001@gmail.com" className="text-cyan-400 underline">tharusharashmika2001@gmail.com</a></p>
        <p>• LinkedIn: <a href="https://www.linkedin.com/in/tharusha-rashmika-4b0204345/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">tharusha-rashmika</a></p>
        <p>• GitHub: <a href="https://github.com/RashmikaTR" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/RashmikaTR</a></p>
      </div>
    ),
    mode: () => {
      cycleMode();
      return "Palette cycled successfully.";
    },
    matrix: () => "Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇",
    clear: () => {
      setHistory([]);
      return null;
    },
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    sound.playClick();
    const cmd = raw.toLowerCase();
    const newEntry = { type: 'input', content: raw };

    if (commands[cmd]) {
      const output = commands[cmd]();
      if (output !== null) {
        setHistory((prev) => [...prev, newEntry, { type: 'output', content: output }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        newEntry,
        { type: 'error', content: `command not found: "${raw}". Type "help" to see valid commands.` }
      ]);
    }

    setCommandHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex + 1 < commandHistory.length) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex - 1 >= 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const list = Object.keys(commands);
      const match = list.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className={`w-full transition-all duration-300 ${isExpanded ? 'max-w-6xl' : 'max-w-4xl'} mx-auto`}>
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* Terminal Title Bar */}
        <div className="bg-[#0b0d14] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 cursor-pointer" onClick={() => setHistory([])} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block hover:opacity-100 cursor-pointer" onClick={() => executeCommand('clear')} />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
            <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-1.5 font-semibold">
              <TerminalIcon size={13} className="text-cyan-400" /> tharusha@macbook: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setHistory([]);
              }}
              className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
              title="Clear terminal"
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          </div>
        </div>

        {/* Terminal Screen */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="p-5 font-mono text-xs sm:text-sm bg-[#08090d]/95 overflow-y-auto min-h-[260px] max-h-[420px] space-y-3 cursor-text"
        >
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'system' && (
                <p className="text-zinc-500 italic"># {item.content}</p>
              )}
              {item.type === 'input' && (
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="text-purple-400 font-bold">tharusha@dev:~$</span>
                  <span>{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-zinc-200 mt-1 pl-4 border-l border-cyan-500/30">
                  {item.content}
                </div>
              )}
              {item.type === 'error' && (
                <p className="text-red-400 pl-4 border-l border-red-500/30">{item.content}</p>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-cyan-300 pt-1">
            <span className="text-purple-400 font-bold flex-shrink-0">tharusha@dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none text-zinc-100 font-mono text-xs sm:text-sm"
              placeholder="Type command here (e.g. 'neofetch')..."
              autoFocus
            />
          </div>
        </div>

        {/* Quick Action Chips Footer */}
        <div className="bg-[#0b0d14] p-3 px-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">Quick:</span>
            {['neofetch', 'projects', 'skills', 'about', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.04] hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Tab</kbd> to complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
