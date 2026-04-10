import React from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, Terminal as TermIcon } from 'lucide-react';
import Terminal from './Terminal';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonBlue/10 rounded-full blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonPurple/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass border border-neonBlue/30 text-neonBlue font-mono text-sm">
            status: online | ready for deployment
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-white">
            Full Stack Builder <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">
              DevOps Mindset
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl font-sans">
            I design, build, and deploy scalable web applications. Transforming complex problems into elegant, efficient, and resilient systems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-3 rounded-md bg-neonBlue/10 hover:bg-neonBlue/20 border border-neonBlue text-neonBlue flex items-center gap-2 transition-all group font-mono">
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" className="px-8 py-3 rounded-md glass hover:glass-card text-gray-300 flex items-center gap-2 transition-all font-mono">
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Terminal / Antigravity Effect */}
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neonBlue to-neonPurple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <Terminal />
          
          {/* Floating decorative elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-10 -right-10 w-20 h-20 glass rounded-xl flex items-center justify-center text-neonPurple shadow-lg hidden md:flex"
          >
            <TermIcon size={32} />
          </motion.div>
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-8 -left-8 px-4 py-2 glass rounded-lg text-xs font-mono text-neonBlue border border-neonBlue/20 hidden md:block"
          >
            build: passing
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
