import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Cpu, GitBranch, GitCommit, Database, Zap, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

const SimulationOverlay = ({ isOpen, onClose, repoUrl, projectTitle }) => {
  const [logs, setLogs] = useState([]);
  const [repoData, setRepoData] = useState(null);
  const [status, setStatus] = useState('initializing'); // initializing, cloning, analyzing, ready
  const [activeTab, setActiveTab] = useState('console'); // console, architecture, metrics

  const repoPath = repoUrl?.replace('https://github.com/', '');

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setRepoData(null);
      setStatus('initializing');
      return;
    }

    sound.playPop();
    let isCancelled = false;

    const runSimulation = async () => {
      setLogs(['[SYSTEM] Initializing virtual sandbox environment...', '[SYSTEM] Allocating thread pool & memory buffers...']);
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;

      setStatus('cloning');
      setLogs(prev => [
        ...prev,
        `[GIT] git clone --depth=1 ${repoUrl || 'https://github.com/RashmikaTR'}`,
        '>>> Resolving remote deltas: 100% completed.',
        '>>> Unpacking repository tree structures...',
      ]);
      await new Promise(r => setTimeout(r, 600));
      if (isCancelled) return;

      setStatus('analyzing');
      setLogs(prev => [
        ...prev,
        '[ANALYSIS] Parsing dependency tree (package.json / composer.json)...',
        '[ANALYSIS] Inspecting component hierarchy and database models...',
      ]);

      try {
        if (repoPath) {
          const res = await fetch(`https://api.github.com/repos/${repoPath}`);
          if (res.ok) {
            const data = await res.json();
            if (!isCancelled) setRepoData(data);
          }
        }
      } catch (e) {
        // Fallback gracefully
      }

      await new Promise(r => setTimeout(r, 500));
      if (isCancelled) return;

      setLogs(prev => [
        ...prev,
        `[STATUS] Core simulation verified.`,
        `[METRICS] Ready for architecture inspection.`,
      ]);
      setStatus('ready');
      sound.playSuccess();
    };

    runSimulation();
    return () => { isCancelled = true; };
  }, [isOpen, repoUrl]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="relative w-full max-w-4xl h-[75vh] max-h-[680px] bg-[#0c0e15] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#08090d] px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Cpu size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>Stack Simulator:</span>
                  <span className="text-cyan-300 font-normal">{projectTitle}</span>
                </h4>
                <p className="text-[10px] font-mono text-zinc-500">Live Architecture & Codebase Inspector</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5"
                >
                  <span>Open Repo</span>
                  <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Sub Header Tabs */}
          <div className="bg-[#0e1017] px-5 py-2 border-b border-white/5 flex gap-4 text-xs font-mono">
            <button
              onClick={() => { sound.playClick(); setActiveTab('console'); }}
              className={`pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'console' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Terminal size={13} /> Virtual Terminal
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('architecture'); }}
              className={`pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'architecture' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <GitBranch size={13} /> Architecture Blueprint
            </button>
          </div>

          {/* Body */}
          <div className="flex-grow p-5 overflow-y-auto font-mono text-xs text-zinc-300 space-y-3 bg-[#08090d]/90">
            {activeTab === 'console' && (
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-zinc-600 select-none">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className={
                      log.includes('[SYSTEM]') ? 'text-zinc-400' :
                      log.includes('[GIT]') ? 'text-purple-400' :
                      log.includes('[STATUS]') ? 'text-emerald-400 font-bold' :
                      log.includes('[ANALYSIS]') ? 'text-cyan-400' : 'text-zinc-300'
                    }>
                      {log}
                    </span>
                  </div>
                ))}
                {status !== 'ready' && (
                  <div className="flex items-center gap-2 text-cyan-400 pt-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Executing simulation pipeline...</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-5 text-sm font-sans">
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    Core Architectural Highlights
                  </h5>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Built following modern modular principles. Components are decoupled to ensure maintainability, low bundle overhead, and optimal client-side render speed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">Default Branch</span>
                    <span className="text-cyan-300 font-bold">{repoData?.default_branch || 'main'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">Open Issues</span>
                    <span className="text-emerald-300 font-bold">{repoData?.open_issues_count || 0} Issues</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">Repository Visibility</span>
                    <span className="text-purple-300 font-bold">Public (Open Source)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">License</span>
                    <span className="text-amber-300 font-bold">{repoData?.license?.name || 'MIT Standard'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-[#0a0c12] px-5 py-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Simulation State: <strong className="text-emerald-400 uppercase">{status}</strong></span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              Close Sandbox
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SimulationOverlay;
