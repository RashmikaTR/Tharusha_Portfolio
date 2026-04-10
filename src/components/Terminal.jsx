import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Antigravity OS v1.0.0' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const commandResponses = {
    help: 'Available commands: about, skills, projects, contact, clear, whoami',
    about: 'I am a Full Stack Developer with a DevOps Mindset. Building scalable web applications.',
    skills: 'Frontend: React, Tailwind\nBackend: Node.js, Express\nDevOps: Docker, GitHub Actions, AWS\nDatabases: MongoDB, MySQL',
    projects: '1. Smart Hostel System\n2. CI/CD Pipeline App\n3. DevOps Monitoring',
    contact: 'Email: dev@example.com | GitHub: github.com/devops-builder',
    whoami: 'visitor',
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      
      const newHistory = [...history, { type: 'user', text: `visitor@portfolio:~$ ${cmd}` }];
      
      if (cmd !== '') {
        if (commandResponses[cmd]) {
          const responseLines = commandResponses[cmd].split('\n');
          responseLines.forEach(line => {
            newHistory.push({ type: 'system', text: line });
          });
        } else {
          newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
        }
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="terminal-window w-full max-w-2xl mx-auto overflow-hidden text-sm font-mono text-gray-300 z-10 relative"
    >
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="mx-auto text-xs text-gray-500 font-sans">guest@antigravity-os:~</div>
      </div>
      <div className="p-4 h-64 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}>
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-neonBlue' : 'text-gray-300'}`}
          >
             {line.text}
          </div>
        ))}
        <div className="flex">
          <span className="text-neonBlue mr-2 whitespace-nowrap">visitor@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none text-gray-300 caret-neonBlue w-full"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};

export default Terminal;
