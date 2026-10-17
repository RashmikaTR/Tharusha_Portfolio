import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Cpu, Terminal, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

const SkillCard = ({ title, level, icon: Icon, color, category, tags }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="glass-card p-5 rounded-2xl border border-white/[0.08] relative overflow-hidden group hover:shadow-xl hover:shadow-cyan-950/20"
  >
    {/* Subtle Glow Backdrop */}
    <div
      className="absolute -top-12 -right-12 w-28 h-28 blur-3xl opacity-10 group-hover:opacity-25 transition-opacity"
      style={{ backgroundColor: color }}
    />

    <div className="flex items-start justify-between mb-4">
      <div
        className="p-3 rounded-xl border border-white/10 transition-colors"
        style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <div className="text-right">
        <span className="text-[11px] font-mono font-bold text-zinc-300">
          {level}%
        </span>
        <span className="text-[9px] font-mono block text-zinc-500 uppercase tracking-widest">
          Proficiency
        </span>
      </div>
    </div>

    <h4 className="text-base font-bold font-sans text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
      {title}
    </h4>

    <p className="text-xs text-zinc-400 font-mono mb-4">
      {tags.join(' • ')}
    </p>

    {/* Progress Bar */}
    <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </motion.div>
);

const SkillsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases' },
    { id: 'devops', label: 'Tools & DevOps' },
  ];

  const skills = [
    {
      title: 'React 19 & JavaScript (ES6+)',
      level: 95,
      icon: Layout,
      color: '#06b6d4',
      category: 'frontend',
      tags: ['Hooks', 'State Management', 'Vite', 'Framer Motion'],
    },
    {
      title: 'Tailwind CSS & Modern UI',
      level: 92,
      icon: Layers,
      color: '#38bdf8',
      category: 'frontend',
      tags: ['Responsive Layouts', 'Glassmorphism', 'Design Tokens'],
    },
    {
      title: 'PHP & Modern Web Architecture',
      level: 88,
      icon: Server,
      color: '#818cf8',
      category: 'backend',
      tags: ['MVC Pattern', 'PDO Security', 'Session Management'],
    },
    {
      title: 'Node.js & Express.js',
      level: 86,
      icon: Server,
      color: '#a855f7',
      category: 'backend',
      tags: ['REST APIs', 'Middleware', 'Async/Await', 'JSON API'],
    },
    {
      title: 'MySQL & Relational Databases',
      level: 90,
      icon: Database,
      color: '#34d399',
      category: 'database',
      tags: ['Schema Design', 'Normalization', 'Joins & Indexing'],
    },
    {
      title: 'MongoDB & NoSQL',
      level: 82,
      icon: Database,
      color: '#10b981',
      category: 'database',
      tags: ['Documents', 'Mongoose ODM', 'Aggregation'],
    },
    {
      title: 'Git & GitHub Collaboration',
      level: 92,
      icon: Terminal,
      color: '#f59e0b',
      category: 'devops',
      tags: ['Version Control', 'Pull Requests', 'CI/CD Actions'],
    },
    {
      title: '3D Graphics & Three.js',
      level: 78,
      icon: Cpu,
      color: '#ec4899',
      category: 'frontend',
      tags: ['R3F', 'Canvas', 'Custom Shaders', 'Particle Engines'],
    },
    {
      title: 'Linux & Cloud Deployment',
      level: 80,
      icon: Terminal,
      color: '#6366f1',
      category: 'devops',
      tags: ['Vercel', 'Apache', 'Bash Scripting', 'Docker Basics'],
    },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
            Capabilities & Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Engineering Toolchain
          </h2>
          <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl">
            A comprehensive overview of languages, frameworks, and database technologies I leverage to build production-grade web systems.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredSkills.map((skill, i) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SkillsDashboard;
