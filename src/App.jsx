import React, { useState, useEffect, Suspense } from 'react';
import { usePersonality } from './PersonalityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Mail, Linkedin, Instagram, Terminal as TerminalIcon, 
  ArrowUpRight, Download, Sparkles, Volume2, VolumeX, 
  Compass, Code2, Layers, MapPin, Heart, ChevronUp, Cpu, CheckCircle2 
} from 'lucide-react';
import { sound } from './utils/sound';

import profileImg from './assets/Tharusha Rashmika.png';

// Lazy loaded components for lightning-fast initial bundle & fluid interaction
const CommandPalette = React.lazy(() => import('./components/CommandPalette'));
const MiniStats = React.lazy(() => import('./components/MiniStats'));
const Hero3D = React.lazy(() => import('./components/Hero3D'));
const BentoGrid = React.lazy(() => import('./components/BentoGrid'));
const SkillsDashboard = React.lazy(() => import('./components/SkillsDashboard'));
const Timeline = React.lazy(() => import('./components/Timeline'));
const ProjectCard = React.lazy(() => import('./components/ProjectCard'));
const Workflow = React.lazy(() => import('./components/Workflow'));
const Terminal = React.lazy(() => import('./components/Terminal'));
const SnippetLab = React.lazy(() => import('./components/SnippetLab'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const SimulationOverlay = React.lazy(() => import('./components/SimulationOverlay'));

// Floating Glass Navigation Dock
const Navbar = ({ onOpenCommand }) => {
  const { mode, cycleMode, soundEnabled, toggleSound } = usePersonality();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-4 flex justify-between items-center pointer-events-none">
      {/* Brand Logo */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto"
      >
        <a 
          href="#hero" 
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <span className="w-full h-full bg-[#08090d] rounded-xl flex items-center justify-center text-cyan-300 font-mono font-black text-xs">
              TR
            </span>
          </span>
          <div className="hidden sm:block">
            <span className="text-sm font-bold tracking-tight uppercase font-mono text-white group-hover:text-cyan-300 transition-colors block leading-none">
              Tharusha Rashmika
            </span>
            <span className="text-[10px] font-mono text-zinc-500 block">Full-Stack Engineer</span>
          </div>
        </a>
      </motion.div>

      {/* Center Nav Dock */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-dark px-3.5 sm:px-5 py-2 rounded-full flex items-center gap-2.5 md:gap-5 pointer-events-auto border border-white/10 shadow-2xl backdrop-blur-2xl"
      >
        <div className="hidden md:flex items-center gap-5 text-xs font-mono">
          <a href="#projects" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Projects</a>
          <a href="#skills" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Stack</a>
          <a href="#snippets" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Lab</a>
          <a href="#terminal" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Console</a>
          <a href="#about" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Journey</a>
          <a href="#contact" onClick={() => sound.playClick()} className="text-zinc-400 hover:text-cyan-300 transition-colors">Contact</a>
        </div>

        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        {/* Live Sri Lanka Time Pill */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LK: {time || 'Loading...'}</span>
        </div>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommand}
          className="flex items-center gap-1 text-[11px] font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
          title="Open Command Hub (Ctrl+K)"
        >
          <Sparkles size={12} className="text-cyan-400" />
          <span className="hidden sm:inline">⌘K</span>
        </button>

        {/* Audio FX Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            toggleSound();
          }}
          className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
        >
          {soundEnabled ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} />}
        </button>

        {/* Theme Palette Switcher */}
        <button
          onClick={cycleMode}
          className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title={`Cycle Theme Palette (Active: ${mode})`}
        >
          <TerminalIcon size={15} className="text-purple-400" />
        </button>
      </motion.div>
    </nav>
  );
};

// Projects Grid with Category Filters & Rich UI Visual Mockups
const ProjectsGrid = ({ onSimulate }) => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'smartcart',
      title: "SmartCart E-Commerce Platform",
      mockupKey: "smartcart",
      description: "A responsive consumer shopping experience built with clean JavaScript, HTML5, and CSS3. Features dynamic product filtering, cart drawer management, checkout calculation, and persistent storage.",
      tags: ["JavaScript", "HTML5", "CSS3", "REST APIs", "E-Commerce", "UI/UX"],
      category: "Frontend",
      featured: true,
      github: "https://github.com/RashmikaTR/SmartCart-E-commerceWebsite",
      link: "#"
    },
    {
      id: 'alumni',
      title: "Alumni Management System",
      mockupKey: "alumni",
      description: "An enterprise institutional portal developed using PHP and MySQL. Connects university graduates with active students, featuring role-based authentication, student records search, and network directories.",
      tags: ["PHP", "MySQL", "MVC Architecture", "Apache", "Relational DB"],
      category: "Full-Stack",
      featured: true,
      github: "https://github.com/RashmikaTR/Alumni-Management-System",
      link: "#"
    },
    {
      id: 'portfolio',
      title: "Tharusha 3D Spatial Portfolio",
      mockupKey: "portfolio",
      description: "An award-winning developer portfolio showcasing real-time WebGL spatial graphics, synthesized Web Audio haptics, an interactive terminal CLI, and live repository telemetry.",
      tags: ["React 19", "Three.js", "Tailwind CSS", "Framer Motion", "R3F"],
      category: "Full-Stack",
      featured: true,
      github: "https://github.com/RashmikaTR/Tharusha_Portfolio",
      link: "https://tharusha-portfolio-dev.vercel.app"
    },
    {
      id: 'buildtrack',
      title: "Project Build Track Orchestrator",
      mockupKey: "buildtrack",
      description: "A developer sprint dashboard and build orchestrator designed to track continuous integration workflows, code reviews, and milestone delivery with instant visual status indicators.",
      tags: ["React", "JavaScript", "Tailwind CSS", "Sprint Tools", "CI/CD"],
      category: "Frontend",
      featured: false,
      github: "https://github.com/RashmikaTR/Project_Build_Track",
      link: "#"
    },
    {
      id: 'devfolio',
      title: "Project Devfolio Studio",
      mockupKey: "devfolio",
      description: "A portfolio builder application for software engineers. Allows rapid layout customization, interactive component previews, and automated deployment configurations.",
      tags: ["JavaScript", "HTML5", "CSS3", "Template Engine"],
      category: "Frontend",
      featured: false,
      github: "https://github.com/RashmikaTR/Project_devfolio",
      link: "#"
    },
    {
      id: 'systems',
      title: "Operating Systems Practical Engine (IT2244)",
      mockupKey: "systems",
      description: "Low-level systems modules implementing round-robin CPU scheduling, semaphore synchronization, and virtual memory paging models completed at University of Vavuniya.",
      tags: ["C / C++", "Linux", "POSIX", "Kernel Concepts", "Multithreading"],
      category: "Academic",
      featured: false,
      github: "https://github.com/RashmikaTR/Operating-Systems-IT2244-P-",
      link: "#"
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="py-24 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
            Featured Projects & Systems
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Visual Codebase Showcase
          </h2>
          <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl">
            Each project features full UI previews, live architecture inspection, and direct links to code repositories.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'full-stack', 'frontend', 'academic'].map(category => (
            <button
              key={category}
              onClick={() => {
                sound.playClick();
                setFilter(category);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all capitalize ${
                filter === category
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              {category === 'all' ? 'All Systems' : category}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} {...p} onSimulate={() => onSimulate(p)} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default function App() {
  const { mode } = usePersonality();
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [antigravity, setAntigravity] = useState(false);

  // Keyboard Shortcuts: Ctrl+A for zero gravity, Ctrl+K for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        sound.playPop();
        setAntigravity(prev => !prev);
      }
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main
      className={`min-h-screen bg-[#06070a] text-zinc-100 transition-colors duration-500 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden ${antigravity ? 'animate-pulse-slow' : ''}`}
    >
      <Navbar onOpenCommand={() => setCommandPaletteOpen(true)} />

      <Suspense fallback={null}>
        <CommandPalette />
        <MiniStats />
        <SimulationOverlay
          isOpen={!!activeSimulation}
          onClose={() => setActiveSimulation(null)}
          repoUrl={activeSimulation?.github}
          projectTitle={activeSimulation?.title}
        />
      </Suspense>

      {/* Cinematic Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
          <Hero3D mode={mode} />
        </Suspense>

        {/* Ambient subtle glow backdrops */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            animate={antigravity ? { y: [-15, 15, -15] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Tharusha's Profile Photo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
              className="relative mb-6 group cursor-pointer"
              onClick={() => sound.playPop()}
            >
              {/* Rotating Gradient Ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-spin-slow" />
              <img
                src={profileImg}
                alt="Tharusha Rashmika"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20 relative z-10 p-1 bg-[#0e1017] shadow-2xl"
              />
            </motion.div>

            {/* University & Degree Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-mono font-medium mb-5 shadow-lg shadow-cyan-950/20"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>BSc in IT Undergraduate • University of Vavuniya, Sri Lanka 🇱🇰</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 font-sans text-white"
            >
              Architecting Modern <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Full-Stack Solutions.
              </span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-400 font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Hey there! I am <strong className="text-white">Tharusha Rashmika</strong>. I design and engineer clean, scalable web applications using <span className="text-cyan-300 font-mono">React</span>, <span className="text-purple-300 font-mono">Node.js</span>, <span className="text-indigo-300 font-mono">PHP</span>, and <span className="text-emerald-300 font-mono">MySQL</span>.
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
            >
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                <span>View Projects</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="/Tharusha Rashmika CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-full glass hover:border-cyan-400/40 font-mono text-xs uppercase tracking-wider text-white hover:text-cyan-300 flex items-center gap-2 transition-all"
              >
                <Download size={14} />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#terminal"
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
              >
                <TerminalIcon size={14} className="text-purple-400" />
                <span>Console</span>
              </a>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 text-zinc-500"
            >
              <a
                href="https://github.com/RashmikaTR"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-white transition-colors p-1"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/tharusha-rashmika-4b0204345/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-cyan-400 transition-colors p-1"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:tharusharashmika2001@gmail.com"
                onClick={() => sound.playClick()}
                className="hover:text-purple-400 transition-colors p-1"
                title="Email Tharusha"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://instagram.com/tharusha_rashmika"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-pink-400 transition-colors p-1"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <Suspense fallback={<div className="py-20 text-center opacity-40 font-mono text-xs">Loading Modular Architecture...</div>}>
          
          {/* 1. Bento Grid Core Showcase */}
          <BentoGrid />

          {/* 2. Visual Projects Grid with Live UI Mockup Previews */}
          <ProjectsGrid onSimulate={setActiveSimulation} />

          {/* 3. Skills & Engineering Matrix */}
          <SkillsDashboard />

          {/* 4. Code Snippet Lab */}
          <div id="snippets">
            <SnippetLab />
          </div>

          {/* 5. Terminal Console */}
          <section id="terminal" className="py-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
                Interactive Shell
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Developer Console
              </h2>
              <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl mx-auto">
                Explore my technical profile using terminal syntax or instant one-click commands.
              </p>
            </div>
            <Terminal />
          </section>

          {/* 6. Development Pipeline */}
          <Workflow />

          {/* 7. Academic Journey Timeline */}
          <Timeline />

          {/* 8. Contact Section */}
          <ContactSection />
        </Suspense>
      </div>

      {/* Clean Modern Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#050608] text-center text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center justify-center gap-1.5">
            Designed & Engineered with <Heart size={12} className="text-red-500 inline fill-red-500" /> by <strong className="text-white">Tharusha Rashmika</strong> • 2026
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RashmikaTR/Tharusha_Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Source Code
            </a>
            <span>•</span>
            <button
              onClick={() => {
                sound.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
