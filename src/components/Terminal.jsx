import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Tharusha_OS v1.0.0 (IT Undergraduate)' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const commandResponses = {
    help: 'Available commands: about, skills, projects, contact, clear, whoami',
    about: 'Motivated BSc IT undergrad at the University of Vavuniya. Passionate about clean code and MERN stack development.',
    skills: 'Tech: MERN Stack, Java, C#, C++, Git, Docker\nCore: Problem-solving, Adaptability, Teamwork',
    projects: '1. Construction Management Dashboard (2026)\n2. Vavuniya University Connect - VUC (2026)\n3. AlumSphere (2025)',
    contact: 'Email: tharusharashmika2001@gmail.com | Location: Kuliyapitiya, Sri Lanka',
    whoami: 'guest_user',
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
      
      const newHistory = [...history, { type: 'user', text: `guest@tharusha:~$ ${cmd}` }];
      
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
        <div className="mx-auto text-xs text-gray-500 font-sans">guest@tharusha-os:~</div>
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
          <span className="text-neonBlue mr-2 whitespace-nowrap">guest@tharusha:~$</span>
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
