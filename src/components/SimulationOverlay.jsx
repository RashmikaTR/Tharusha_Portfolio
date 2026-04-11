import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Cpu, GitBranch, GitCommit, Database, Zap, BookOpen } from 'lucide-react';

const SimulationOverlay = ({ isOpen, onClose, repoUrl, projectTitle }) => {
  const [logs, setLogs] = useState([]);
  const [repoData, setRepoData] = useState(null);
  const [status, setStatus] = useState('initializing'); // initializing, cloning, analytics, ready

  const repoPath = repoUrl?.replace('https://github.com/', '');

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setRepoData(null);
      setStatus('initializing');
      return;
    }

    const runSimulation = async () => {
      // Step 1: Initialization
      setLogs(['[SYSTEM] Initializing simulation instance...', '[SYSTEM] Allocating neural resources...']);
      await new Promise(r => setTimeout(r, 600));

      // Step 2: Virtual Cloning
      setStatus('cloning');
      setLogs(prev => [...prev, `[GIT] cloning ${repoUrl}...`, '>>> connecting to github.com...', '>>> fetching objects: 100% (422/422), done.']);
      await new Promise(r => setTimeout(r, 1200));

      // Step 3: Fetching Real Analytics
      setStatus('analytics');
      setLogs(prev => [...prev, '[SYSTEM] Running codebase analytics...', '[SYSTEM] Primary language detected.', '[SYSTEM] Mapping architecture...']);
      
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        const data = await res.json();
        setRepoData(data);
        
        // Fetch languages
        const langRes = await fetch(`https://api.github.com/repos/${repoPath}/languages`);
        const langData = await langRes.json();
        
        // Fetch recent commits
        const commitRes = await fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=3`);
        const commitData = await commitRes.json();

        setLogs(prev => [
            ...prev, 
            `[SUCCESS] Repository ${data.name} synchronized.`,
            `[INFO] Size: ${(data.size / 1024).toFixed(2)} MB`,
            `[INFO] Principal Stack: ${Object.keys(langData).join(', ')}`,
            `[LOG] Recent Push: "${commitData[0]?.commit.message}"`
        ]);
        setStatus('ready');
      } catch (err) {
        setLogs(prev => [...prev, '[ERROR] Simulation failed to fetch live data. Reverting to static mode.']);
        setStatus('ready');
      }
    };

    runSimulation();
  }, [isOpen, repoUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-5xl h-[80vh] glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Simulation Console (Left) */}
            <div className="flex-grow p-6 flex flex-col font-mono text-xs sm:text-sm">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <Terminal className="text-purple-400" size={18} />
                        <span className="text-white uppercase tracking-widest font-bold">Simulator Instance_v1.0</span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto space-y-2 text-zinc-400 custom-scrollbar">
                    {logs.map((log, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ x: -10, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }}
                            className={log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : log.includes('[SYSTEM]') ? 'text-zinc-500' : ''}
                        >
                            {log}
                        </motion.div>
                    ))}
                    {status !== 'ready' && (
                        <div className="w-12 h-4 bg-emerald-500/20 rounded animate-pulse mt-2" />
                    )}
                </div>
            </div>

            {/* Simulated Dashboard (Right) */}
            <div className="w-full md:w-96 bg-white/5 border-l border-white/5 p-8 overflow-y-auto">
                <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter text-white">{projectTitle}</h2>
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Simulation Active</span>
                </div>

                <div className="space-y-6">
                    <div className="glass-dark p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-zinc-500 mb-2">
                             <Cpu size={14} />
                             <span className="text-[10px] uppercase font-mono tracking-widest">Repository Analytics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <span className="block text-zinc-600 text-[9px] uppercase font-mono">Stars</span>
                                <span className="text-xl font-bold text-cyan-400">{repoData?.stargazers_count ?? '--'}</span>
                            </div>
                            <div>
                                <span className="block text-zinc-600 text-[9px] uppercase font-mono">Forks</span>
                                <span className="text-xl font-bold text-cyan-400">{repoData?.forks_count ?? '--'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-dark p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-zinc-500 mb-4">
                             <GitBranch size={14} />
                             <span className="text-[10px] uppercase font-mono tracking-widest">Branch Topology</span>
                        </div>
                        <div className="space-y-3">
                             {['main', 'dev', 'feature/ui-v2'].map((b, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-[11px] font-mono text-zinc-300">{b}</span>
                                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
                                </div>
                             ))}
                        </div>
                    </div>

                    <div className="glass-dark p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-zinc-500 mb-4">
                             <Zap size={14} />
                             <span className="text-[10px] uppercase font-mono tracking-widest">Quick Actions</span>
                        </div>
                        <a 
                            href={repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform"
                        >
                            <BookOpen size={14} />
                            Source Code
                        </a>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimulationOverlay;
