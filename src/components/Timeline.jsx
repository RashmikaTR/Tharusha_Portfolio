import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Award, BookOpen, Layers } from 'lucide-react';

const TimelineItem = ({ year, title, subtitle, description, tags, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-4 sm:gap-8 mb-12 relative group"
  >
    {/* Left Icon & Line */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-card flex items-center justify-center border border-white/10 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(127,219,255,0.25)] transition-all z-10 bg-[#0e1017]">
        <Icon size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
      </div>
      <div className="w-[1px] h-full bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent mt-2" />
    </div>

    {/* Content Card */}
    <div className="flex-grow pb-4">
      <div className="glass-card p-6 rounded-2xl border border-white/[0.08] group-hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
            {year}
          </span>
          <span className="text-xs font-mono text-zinc-500">Milestone #{index + 1}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-mono text-purple-300 mb-3 italic">
          {subtitle}
        </p>

        <p className="text-sm text-zinc-400 leading-relaxed mb-4 font-sans">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            {tags.map((t, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const Timeline = () => {
  const events = [
    {
      year: "2024 - Present",
      title: "BSc in Information Technology (Undergraduate)",
      subtitle: "University of Vavuniya, Sri Lanka 🎓",
      description: "Pursuing rigorous academic training in Software Engineering, Web Services & Server Technologies (IT2234), Operating Systems (IT2244), and Database Design. Applying theoretical principles directly to modern software projects.",
      tags: ["Operating Systems", "Server Technologies", "Database Systems", "Software Architecture"],
      icon: GraduationCap,
    },
    {
      year: "2024 - 2025",
      title: "Full-Stack Web Engineering & Systems Development",
      subtitle: "Alumni Management & Enterprise Platforms",
      description: "Architected and delivered the Alumni Management System utilizing PHP, MySQL, and structured MVC principles. Engineered dynamic search, administrative management, and secured database queries.",
      tags: ["PHP", "MySQL", "Authentication", "MVC Pattern"],
      icon: Code2,
    },
    {
      year: "2025 - 2026",
      title: "E-Commerce & Reactive Frontend Development",
      subtitle: "SmartCart & Project Build Track",
      description: "Engineered responsive consumer web platforms and build tracking utilities with JavaScript, React, and Tailwind CSS. Implemented clean component state management and optimized rendering performance.",
      tags: ["React", "JavaScript", "Tailwind CSS", "UI/UX"],
      icon: Layers,
    },
    {
      year: "Next Vision",
      title: "Scalable Distributed Systems & AI Integration",
      subtitle: "Global Engineering & Open Source",
      description: "Expanding into microservices, containerization with Docker, and integrating intelligent features into full-stack web architectures.",
      tags: ["Cloud Computing", "Docker", "Next.js", "Open Source"],
      icon: Rocket,
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
          Academic & Engineering Path
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Journey & Milestones
        </h2>
        <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl mx-auto">
          The progression of learning, university projects, and software craftsmanship.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {events.map((event, i) => (
          <TimelineItem key={i} {...event} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
