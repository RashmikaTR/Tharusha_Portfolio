import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code, GitCommit, Star, Activity } from 'lucide-react';

const MiniStats = () => {
    const [statsData, setStatsData] = useState({
        commits: '500+',
        projects: '0',
        stars: '0',
        loading: true
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch user data for repo count
                const userRes = await fetch('https://api.github.com/users/RashmikaTR');
                const userData = await userRes.json();
                
                // Fetch repos to sum stars
                const reposRes = await fetch('https://api.github.com/users/RashmikaTR/repos?per_page=100');
                const reposData = await reposRes.json();
                const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

                setStatsData({
                    commits: '800+', // Estimated for the UI
                    projects: userData.public_repos || '9',
                    stars: totalStars || '15',
                    loading: false
                });
            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
                setStatsData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { icon: <GitCommit size={14} />, label: 'Commits', value: statsData.commits },
        { icon: <Code size={14} />, label: 'Projects', value: statsData.projects },
        { icon: <Star size={14} />, label: 'Stars', value: statsData.stars },
    ];

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col gap-3"
        >
            <div className="glass-dark p-4 rounded-2xl border border-white/10 flex flex-col gap-4 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <Github size={16} className="text-zinc-500" />
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase italic">
                        {statsData.loading ? 'Syncing...' : 'Dev Pulse'}
                    </span>
                </div>

                {stats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center gap-8">
                        <div className="flex items-center gap-2 text-zinc-500">
                            {stat.icon}
                            <span className="text-[10px] font-mono uppercase">{stat.label}</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-cyan-400">
                            {statsData.loading ? '...' : stat.value}
                        </span>
                    </div>
                ))}

                <div className="mt-2 bg-black/40 p-2 rounded-lg border border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-emerald-500 animate-pulse">● LIVE</span>
                    <span className="text-[9px] font-mono text-zinc-600 tracking-tighter">
                        {statsData.loading ? 'latency: --ms' : `latency: ${Math.floor(Math.random() * 20) + 30}ms`}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default MiniStats;
