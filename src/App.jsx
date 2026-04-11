import React, { useState, useEffect, Suspense } from 'react';
import { usePersonality } from './PersonalityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Linkedin, Twitter, Terminal as TerminalIcon, ArrowUpRight, Heart, Download } from 'lucide-react';

const CommandPalette = React.lazy(() => import('./components/CommandPalette'));
const MiniStats = React.lazy(() => import('./components/MiniStats'));
const Hero3D = React.lazy(() => import('./components/Hero3D'));
const SkillsDashboard = React.lazy(() => import('./components/SkillsDashboard'));
const Timeline = React.lazy(() => import('./components/Timeline'));
const ProjectCard = React.lazy(() => import('./components/ProjectCard'));
const Workflow = React.lazy(() => import('./components/Workflow'));
const Terminal = React.lazy(() => import('./components/Terminal'));
const SimulationOverlay = React.lazy(() => import('./components/SimulationOverlay'));

import profileImg from './assets/Tharusha Rashmika.png';

const Navbar = () => {
    const { mode, toggleMode, theme, toggleTheme } = usePersonality();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-6 flex justify-between items-center pointer-events-none">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto"
            >
                <span className="text-xl font-bold tracking-tighter uppercase font-mono bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                    {mode === 'professional' ? 'TR.DEV' : '<THARUSHA />'}
                </span>
            </motion.div>

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-dark px-4 py-2 rounded-full flex gap-4 md:gap-8 items-center pointer-events-auto border border-white/5"
            >
                <div className="hidden md:flex gap-6">
                    <a href="#about" className="text-[10px] font-mono tracking-widest uppercase hover:text-purple-400 transition-colors">Journey</a>
                    <a href="#projects" className="text-[10px] font-mono tracking-widest uppercase hover:text-purple-400 transition-colors">Projects</a>
                    <a href="#contact" className="text-[10px] font-mono tracking-widest uppercase hover:text-purple-400 transition-colors">Contact</a>
                </div>
                <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                <button onClick={toggleMode} className="p-2 hover:bg-white/5 rounded-full transition-all group">
                    <TerminalIcon size={16} className={mode === 'creative' ? 'text-purple-400' : 'text-zinc-500'} />
                </button>
            </motion.div>
        </nav>
    );
};

const ProjectsGrid = ({ onSimulate }) => {
    const projects = [
        {
            title: "Alumni Management System",
            description: "A comprehensive PHP and MySQL based platform for managing university alumni, featuring profile tracking and institutional networking.",
            tags: ["PHP", "MySQL", "UI/UX", "Web Development"],
            github: "https://github.com/RashmikaTR/Alumni-Management-System",
            link: "#"
        },
        {
            title: "VUC (Vavuniya University Connect)",
            description: "A centralized platform for university students to connect, collaborate, and manage course materials effectively.",
            tags: ["React", "Express", "Node.js", "MongoDB"],
            github: "https://github.com/RashmikaTR/VUC",
            link: "#"
        },
        {
            title: "Project Management",
            description: "A specialized tool for tracking build progress and orchestrating project milestones, integrated with real-time analytics.",
            tags: ["React", "JavaScript", "Tailwind", "Framer Motion"],
            github: "https://github.com/RashmikaTR/Project_Build_Track",
            link: "#"
        }
    ];

    return (
        <section id="projects" className="py-24">
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter italic opacity-30 uppercase font-mono">/ SELECTED WORK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => <ProjectCard key={i} {...p} onSimulate={() => onSimulate(p)} />)}
            </div>
        </section>
    );
}

const ContactSection = () => (
    <section id="contact" className="py-24">
        <div className="glass-dark p-12 rounded-[3rem] border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Mail size={200} />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Let's build <br /> the future.</h2>
            <p className="text-zinc-500 font-mono mb-12 max-w-xl mx-auto italic">Currently open to collaborations and full-stack opportunities.</p>
            <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:tharusharashmika2001@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    <Mail size={20} /> tharusharashmika2001@gmail.com
                </a>
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/tharusha-rashmika-4b0204345/" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:bg-white/10 transition-colors"><Linkedin /></a>
                    <a href="https://github.com/RashmikaTR" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:bg-white/10 transition-colors"><Github /></a>
                    <a href="https://instagram.com/tharusha_rashmika" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:bg-white/10 transition-colors"><Twitter /></a>
                </div>
            </div>
        </div>
    </section>
);

export default function App() {
    const { mode, theme } = usePersonality();
    const [antigravity, setAntigravity] = useState(false);
    const [activeSimulation, setActiveSimulation] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'a' && e.ctrlKey) {
                setAntigravity(prev => !prev);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <main
            className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-zinc-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-700 selection:bg-purple-500 selection:text-white relative`}
            style={antigravity ? { perspective: '1000px' } : {}}
        >
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

            {/* 3D Hero Section */}
            <section id="hero" className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
                <Suspense fallback={<div className="absolute inset-0 bg-transparent animate-pulse" />}>
                   <Hero3D mode={mode} />
                </Suspense>

                <div className="z-10 text-center max-w-5xl">
                    <motion.div
                        animate={antigravity ? { y: -500, rotateX: 45, opacity: 0 } : { y: 0 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className="flex flex-col items-center"
                    >
                        {/* Profile Photo */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
                            className="relative mb-8 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <img
                                src={profileImg}
                                alt="Tharusha Rashmika"
                                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-white/10 glass relative z-10 p-1"
                            />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-mono uppercase tracking-[0.4em] mb-4 block text-purple-400 font-bold"
                        >
                            {mode === 'professional' ? 'Full-Stack Developer' : 'Architect of Code'}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none"
                            style={{ WebkitTextStroke: mode === 'creative' ? '1px rgba(255,255,255,0.1)' : 'none' }}
                        >
                            {mode === 'professional' ? 'THARUSHA RASHMIKA.' : 'BEYOND THE STACK.'}
                        </motion.h1>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center gap-6">
                            <a 
                                href="/Tharusha Rashmika CV.pdf" 
                                target="_blank"
                                className="px-8 py-3 glass rounded-full font-mono text-xs uppercase tracking-widest hover:border-purple-400 transition-colors flex items-center justify-center gap-2"
                            >
                                <Download size={14} /> Resume
                            </a>
                            <button 
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-zinc-100 text-black rounded-full font-mono text-xs uppercase tracking-widest border border-white hover:bg-transparent hover:text-white transition-all"
                            >
                                Connect
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* Main Content Sections */}
            <div className="max-w-7xl mx-auto px-6 overflow-hidden">
                <Suspense fallback={<div className="py-24 text-center opacity-20 font-mono text-xs uppercase tracking-[0.3em]">Loading Modular Systems...</div>}>
                    <section className="py-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter italic opacity-30 uppercase font-mono">/ Console Access</h2>
                        </div>
                        <Terminal />
                    </section>
                    <Timeline />
                    <Workflow />
                    <SkillsDashboard />
                    <ProjectsGrid onSimulate={setActiveSimulation} />
                    <ContactSection />
                </Suspense>
            </div>

            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 flex items-center justify-center gap-2">
                    Designed & Built with <Heart size={10} className="text-red-500" /> by Tharusha Rashmika © 2026
                </p>
            </footer>
        </main>
    );
}
