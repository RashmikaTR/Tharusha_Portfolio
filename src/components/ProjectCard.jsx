import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, ArrowUpRight, Star, GitFork, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

const ProjectCard = ({ title, description, tags, link, github, category, featured, onSimulate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col h-full group hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 relative"
    >
      {/* Top Bar / Mac Style */}
      <div className="bg-[#0b0d14]/90 px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">
            {category || 'Software'}
          </span>
        </div>

        {featured && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors tracking-tight">
              {title}
            </h3>
            <div className="flex items-center gap-1">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="View GitHub Repository"
                >
                  <Github size={17} />
                </a>
              )}
              {link && link !== '#' && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                  title="Visit Live Application"
                >
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
            {description}
          </p>
        </div>

        {/* Tech Tags */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button: Live Simulation */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: READY
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onSimulate();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 transition-all group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <Cpu size={13} className="text-purple-400" />
              <span>Simulate Stack</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
