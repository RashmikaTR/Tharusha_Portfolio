import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Monitor, Layout, Box } from 'lucide-react';

const ProjectCard = ({ title, description, tags, link, github, image, onSimulate }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-dark rounded-3xl border border-white/5 overflow-hidden group flex flex-col h-full"
    >
      {/* Mock Window Header */}
      <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <div className="flex items-center gap-2 opacity-30">
            <Monitor size={12} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Instance_01</span>
        </div>
      </div>

      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <div className="flex gap-2">
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white">
              <Github size={20} />
            </a>
            <a href={link} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <p className="text-zinc-400 mb-8 font-mono text-sm leading-relaxed italic border-l-2 border-purple-500/30 pl-4">
          "{description}"
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] uppercase font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/5 mt-auto flex items-center justify-between border-t border-white/5">
         <span className="text-[9px] font-mono text-emerald-500">SYSTEM: ONLINE</span>
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSimulate}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-lg transition-all"
         >
            <Monitor size={14} className="text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Live Simulation</span>
         </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
