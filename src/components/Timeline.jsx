import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Star } from 'lucide-react';

const TimelineItem = ({ year, title, company, description, icon: Icon, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`flex gap-8 mb-16 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
  >
    {/* Marker */}
    <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden md:flex flex-col items-center">
      <div className="w-12 h-12 glass rounded-full flex items-center justify-center border-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] z-10">
        <Icon size={20} className="text-purple-400" />
      </div>
      <div className="w-[2px] h-full bg-gradient-to-b from-purple-500/50 to-transparent mt-2"></div>
    </div>

    <div className="w-full md:w-[45%]">
      <div className="glass-dark p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
        <span className="text-purple-400 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{year}</span>
        <h3 className="text-xl font-bold mb-1 tracking-tight">{title}</h3>
        <p className="text-zinc-500 font-mono text-sm mb-4 italic">{company}</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
    
    <div className="hidden md:block md:w-[10%]" />
    <div className="hidden md:block md:w-[45%]" />
  </motion.div>
);

const Timeline = () => {
  const events = [
    {
      year: "2021 - Present",
      title: "BSc in IT (Undergraduate)",
      company: "University of Vavuniya",
      description: "Specializing in software engineering and cloud computing. Maintaining a strong academic record and participating in multiple tech hackathons.",
      icon: GraduationCap
    },
    {
      year: "2023",
      title: "Full-Stack Project Lead",
      company: "AlumSphere Development",
      description: "Led a team to build a comprehensive alumni management system using the MERN stack. Implemented real-time messaging and event tracking.",
      icon: Award
    },
    {
      year: "2024",
      title: "DevOps Integration",
      company: "VUC Platform",
      description: "Automated deployment pipelines using GitHub Actions and Docker. Reduced deployment time by 60% for the university connect platform.",
      icon: Briefcase
    },
    {
       year: "Future",
       title: "Innovating Scale",
       company: "Global Tech Industry",
       description: "Aiming to contribute to large-scale distributed systems and innovative full-stack solutions globally.",
       icon: Star
    }
  ];

  return (
    <div id="about" className="py-24 relative">
       <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 hidden md:block"></div>
       
       <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">My Journey</h2>
          <p className="text-zinc-500 font-mono italic">The timeline of optimization and growth.</p>
       </div>

       <div className="relative">
          {events.map((event, i) => (
            <TimelineItem key={i} {...event} index={i} />
          ))}
       </div>
    </div>
  );
};

export default Timeline;
