import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, MapPin, GitCommit, Code, Sparkles, 
  Layers, Volume2, VolumeX, ArrowUpRight, Cpu, Terminal, Clock, Star
} from 'lucide-react';
import { sound } from '../utils/sound';
import { usePersonality } from '../PersonalityContext';

const BentoGrid = () => {
  const { soundEnabled, toggleSound, mode } = usePersonality();
  const [time, setTime] = useState('');
  const [reposCount, setReposCount] = useState('9+');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Fetch repos count
    fetch('https://api.github.com/users/RashmikaTR')
      .then(res => res.json())
      .then(data => {
        if (data.public_repos) setReposCount(String(data.public_repos));
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Bento 1: Academic & University Core (Spans 2 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-2 glass-card rounded-2xl p-6 border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GraduationCap size={20} />
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 font-semibold">
                Class of 2026
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              BSc (Hons) in Information Technology
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
              Studying at <strong className="text-white">University of Vavuniya, Sri Lanka</strong>. Focused on modern software engineering, web architectures, distributed systems, and database optimization.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Operating Systems</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Web Services & Servers</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Database Engineering</span>
          </div>
        </motion.div>

        {/* Bento 2: Real-Time Sri Lanka Coordinates */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MapPin size={20} />
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="my-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              Base Location
            </span>
            <h4 className="text-lg font-bold text-white">Kuliyapitiya, LK</h4>
            <p className="text-xs text-zinc-400 font-mono mt-1">UTC +05:30 (Asia/Colombo)</p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Clock size={12} className="text-emerald-400" /> Live Clock
            </span>
            <span className="text-emerald-300 font-bold">{time || '07:15 PM'}</span>
          </div>
        </motion.div>

        {/* Bento 3: Live GitHub Stats */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GitCommit size={20} />
            </span>
            <a
              href="https://github.com/RashmikaTR"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="text-zinc-400 hover:text-white p-1"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="my-4">
            <span className="text-3xl font-black text-white font-mono">{reposCount}</span>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">Public Repositories</p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px] font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Commits velocity:</span>
              <span className="text-cyan-300 font-bold">1,200+</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>GitHub Handle:</span>
              <span className="text-purple-300">@RashmikaTR</span>
            </div>
          </div>
        </motion.div>

        {/* Bento 4: Engineering Core (Spans 2 cols on lg) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-2 glass-card rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Layers size={20} />
              </span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Full-Stack Architecture
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">MERN & PHP Stack</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="text-xs font-bold font-mono text-cyan-300 block">React 19</span>
              <span className="text-[9px] text-zinc-500 font-mono">Frontend</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="text-xs font-bold font-mono text-purple-300 block">PHP / Node</span>
              <span className="text-[9px] text-zinc-500 font-mono">Backend</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="text-xs font-bold font-mono text-emerald-300 block">MySQL</span>
              <span className="text-[9px] text-zinc-500 font-mono">Relational DB</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <span className="text-xs font-bold font-mono text-pink-300 block">Three.js</span>
              <span className="text-[9px] text-zinc-500 font-mono">Spatial 3D</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-sans mt-2">
            Architecting robust web systems by merging clean component ergonomics with normalized database performance.
          </p>
        </motion.div>

        {/* Bento 5: Audio & Haptic Engine */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-2 glass-card rounded-2xl p-6 border border-white/[0.08] flex items-center justify-between relative overflow-hidden group"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const s = toggleSound();
                if (s) sound.playSuccess();
              }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-lg"
              title="Toggle Audio Engine"
            >
              {soundEnabled ? <Volume2 size={22} className="text-emerald-400" /> : <VolumeX size={22} className="text-zinc-500" />}
            </button>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Synthesizer Audio Feedback</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${soundEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {soundEnabled ? 'ONLINE' : 'MUTED'}
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time oscillator synthesis via Web Audio API. Zero audio asset payload.
              </p>
            </div>
          </div>

          <button
            onClick={() => sound.playSuccess()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 border border-white/5 transition-colors"
          >
            <Sparkles size={12} />
            <span>Test Sound</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
