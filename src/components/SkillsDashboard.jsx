import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Layout, Server, Cpu, Globe } from 'lucide-react';

const SkillCard = ({ title, level, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40`} style={{ backgroundColor: color }}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        <Icon size={24} style={{ color: color }} />
      </div>
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">{level}% Efficiency</span>
    </div>
    <h3 className="text-lg font-bold mb-2 font-mono">{title}</h3>
    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </motion.div>
);

const SkillsDashboard = () => {
  const skills = [
    { title: 'Frontend (MERN)', level: 95, icon: Layout, color: '#06b6d4' },
    { title: 'Backend (Node/Express)', level: 90, icon: Server, color: '#8b5cf6' },
    { title: 'Databases (MongoDB/Postgres)', level: 85, icon: Database, color: '#10b981' },
    { title: 'Languages (Java/C#)', level: 88, icon: Code, color: '#f59e0b' },
    { title: 'DevOps (Docker/Git)', level: 82, icon: Cpu, color: '#ef4444' },
    { title: 'Systems Design', level: 80, icon: Globe, color: '#3b82f6' },
  ];

  return (
    <div id="skills" className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">System Capability</h2>
          <p className="text-zinc-500 font-mono">Real-time skill proficiency and tech stack optimization.</p>
        </div>
        <div className="flex gap-2">
            {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-1 bg-zinc-800 rounded-full">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <SkillCard key={i} {...skill} />
        ))}
      </div>
    </div>
  );
};

// Helper to avoid import error
const Code = ({ size, style }) => <Cpu size={size} style={style} />;

export default SkillsDashboard;
