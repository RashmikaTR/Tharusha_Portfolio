import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2, Rocket, ShieldCheck, ChevronRight } from 'lucide-react';

const Step = ({ icon: Icon, title, stage, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center text-center p-6 glass-card rounded-2xl border border-white/[0.08] relative z-10 group hover:border-cyan-400/40 transition-all"
  >
    <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
      <Icon className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={26} />
    </div>
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold mb-1">
      {stage}
    </span>
    <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h4>
    <p className="text-zinc-400 text-xs font-sans leading-relaxed">{desc}</p>
  </motion.div>
);

const Workflow = () => {
  const steps = [
    {
      stage: 'Phase 01',
      icon: Lightbulb,
      title: 'Analyze & Spec',
      desc: 'Deconstructing problem requirements into clean data models, system boundaries, and user flows.',
      delay: 0,
    },
    {
      stage: 'Phase 02',
      icon: ShieldCheck,
      title: 'Architecture',
      desc: 'Designing relational database schemas (MySQL), REST API contracts, and modular component structures.',
      delay: 0.1,
    },
    {
      stage: 'Phase 03',
      icon: Code2,
      title: 'Full-Stack Code',
      desc: 'Writing clean, idiomatic code with React, PHP/Node, Tailwind, and proper state management.',
      delay: 0.2,
    },
    {
      stage: 'Phase 04',
      icon: Rocket,
      title: 'Ship & Optimize',
      desc: 'Automating builds with GitHub Actions, deploying on Vercel/cloud hosts, and monitoring UX latency.',
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 block">
          Development Methodology
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          The Engineering Pipeline
        </h2>
        <p className="text-zinc-400 text-sm font-sans mt-2 max-w-xl mx-auto">
          How I take an idea from whiteboard architecture to production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <Step {...step} />
            {i < 3 && (
              <div className="hidden lg:flex absolute top-1/2 -right-3.5 z-20 -translate-y-8 text-zinc-600">
                <ChevronRight size={26} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workflow;
