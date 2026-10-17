import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code, GitCommit, Star, Activity, ChevronDown, ChevronUp, Sparkles, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';

const MiniStats = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [statsData, setStatsData] = useState({
    commits: '1,200+',
    projects: '9',
    stars: '15',
    followers: '7',
    loading: true
  });

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/RashmikaTR');
        if (!userRes.ok) throw new Error('API limit');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/RashmikaTR/repos?per_page=100');
        const reposData = await reposRes.json();
        const totalStars = Array.isArray(reposData) 
          ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
          : 15;

        if (isMounted) {
          setStatsData({
            commits: '1,200+',
            projects: String(userData.public_repos || 9),
            stars: String(totalStars || 15),
            followers: String(userData.followers || 7),
            loading: false
          });
        }
      } catch (error) {
        if (isMounted) {
          setStatsData(prev => ({ ...prev, loading: false }));
        }
      }
    };

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  const stats = [
    { icon: <Code size={13} className="text-cyan-400" />, label: 'Repos', value: statsData.projects },
    { icon: <Star size={13} className="text-amber-400" />, label: 'Stars', value: statsData.stars },
    { icon: <GitCommit size={13} className="text-purple-400" />, label: 'Commits', value: statsData.commits },
  ];

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', damping: 20 }}
      className="fixed bottom-6 right-6 z-40 hidden md:block"
    >
      <div className="glass-card rounded-2xl p-4 shadow-2xl shadow-cyan-950/20 border border-white/10 w-64 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-300">
              Dev Pulse
            </span>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com/RashmikaTR"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="text-zinc-400 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
              title="View GitHub Profile"
            >
              <Github size={14} />
            </a>
            <button
              onClick={() => {
                sound.playClick();
                setCollapsed(!collapsed);
              }}
              className="text-zinc-400 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
            >
              {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2.5 overflow-hidden"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <span className="font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {statsData.loading ? '...' : stat.value}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <MapPin size={10} /> Sri Lanka
                </span>
                <span className="text-zinc-500">Open for Work</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MiniStats;
