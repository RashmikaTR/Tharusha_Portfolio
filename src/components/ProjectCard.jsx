import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Cpu, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { sound } from '../utils/sound';
import { 
  SmartCartMockup, 
  AlumniMockup, 
  BuildTrackMockup, 
  Portfolio3DMockup, 
  DevfolioMockup, 
  SystemsMockup 
} from './ProjectMockups';

const mockupsMap = {
  'smartcart': SmartCartMockup,
  'alumni': AlumniMockup,
  'buildtrack': BuildTrackMockup,
  'portfolio': Portfolio3DMockup,
  'devfolio': DevfolioMockup,
  'systems': SystemsMockup,
};

const ProjectCard = ({ 
  id, 
  title, 
  description, 
  tags, 
  link, 
  github, 
  category, 
  featured, 
  mockupKey,
  onSimulate 
}) => {
  const MockupComponent = mockupsMap[mockupKey] || SmartCartMockup;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col h-full group hover:shadow-2xl hover:shadow-cyan-950/40 hover:border-cyan-400/30 transition-all duration-300 relative ${
        featured ? 'ring-1 ring-cyan-500/20' : ''
      }`}
    >
      {/* 1. VISUAL PROJECT MOCKUP IMAGE PREVIEW (16:9 banner) */}
      <div className="relative w-full h-56 sm:h-60 bg-[#080a10] border-b border-white/[0.08] overflow-hidden p-2 sm:p-3">
        {/* Render the bespoke UI preview */}
        <MockupComponent />

        {/* Hover overlay with quick preview button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Sparkles size={11} className="text-cyan-400" />
              Interactive UI Preview
            </span>
          </div>
        </div>
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Header row: Category & Links */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
              {category || 'Full-Stack'}
            </span>

            <div className="flex items-center gap-1">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="GitHub Repository"
                >
                  <Github size={16} />
                </a>
              )}
              {link && link !== '#' && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
            {description}
          </p>
        </div>

        {/* Tags & Action Buttons */}
        <div>
          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={() => {
                sound.playClick();
                onSimulate();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/25 border border-purple-500/30 hover:border-purple-400 transition-all"
            >
              <Cpu size={12} className="text-purple-400" />
              <span>Simulate Architecture</span>
            </button>

            {link && link !== '#' ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Live Launch</span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <span>Inspect Repo</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
