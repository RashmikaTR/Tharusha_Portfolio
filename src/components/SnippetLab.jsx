import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Copy, Check, Play, Terminal, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

const SNIPPETS = [
  {
    id: 'hook',
    title: 'useDebounce.js',
    lang: 'JavaScript / React',
    code: `import { useState, useEffect } from 'react';

// Custom hook to debounce fast user input (e.g. search / filter)
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    output: '✓ Hook compiled. Ready to debounce search queries with zero re-render lag.'
  },
  {
    id: 'php',
    title: 'Database.php',
    lang: 'PHP / PDO',
    code: `<?php
class Database {
    private $host = "localhost";
    private $db_name = "alumni_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
        }
        return $this->conn;
    }
}`,
    output: '✓ PDO connection initialized with prepared statements & UTF-8 multibyte support.'
  },
  {
    id: 'three',
    title: 'particleMath.js',
    lang: 'Three.js / WebGL',
    code: `// Generate 3D spherical particle field coordinates
export function generateSphereParticles(count = 500, radius = 5) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}`,
    output: '✓ Vector arrays computed for GPU buffer allocation (O(n) complexity).'
  }
];

const SnippetLab = () => {
  const [selectedId, setSelectedId] = useState('hook');
  const [copied, setCopied] = useState(false);
  const [ranTest, setRanTest] = useState(false);

  const currentSnippet = SNIPPETS.find(s => s.id === selectedId) || SNIPPETS[0];

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    sound.playSuccess();
    setRanTest(true);
    setTimeout(() => setRanTest(false), 3000);
  };

  return (
    <section className="py-20 relative">
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
          Interactive Code Showcase
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Code Craft & Snippet Lab
        </h2>
        <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl mx-auto">
          Sample implementations demonstrating clean code patterns, database safety, and WebGL mathematics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Top Tab Bar */}
        <div className="bg-[#0b0d14] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-cyan-400" />
            <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
              {SNIPPETS.map(snippet => (
                <button
                  key={snippet.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedId(snippet.id);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    selectedId === snippet.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {snippet.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30 transition-colors"
            >
              <Play size={12} />
              <span>Simulate</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono border border-white/10 transition-colors"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-6 bg-[#08090d]/95 font-mono text-xs sm:text-sm overflow-x-auto text-zinc-300">
          <div className="text-[11px] text-zinc-500 mb-3 select-none flex justify-between items-center pb-2 border-b border-white/5">
            <span>Language: <strong className="text-purple-300">{currentSnippet.lang}</strong></span>
            <span>Lines: {currentSnippet.code.split('\n').length}</span>
          </div>

          <pre className="text-cyan-200/90 leading-relaxed">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>

        {/* Simulation Output Area */}
        <div className="bg-[#0b0d14] px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal size={14} className="text-emerald-400" />
            <span className={ranTest ? 'text-emerald-300 font-semibold animate-pulse' : 'text-zinc-400'}>
              {ranTest ? '>>> Executing in Node runtime... Success!' : currentSnippet.output}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">TypeScript / Strict Mode</span>
        </div>
      </div>
    </section>
  );
};

export default SnippetLab;
