import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code, Rocket, ChevronRight } from 'lucide-react';

const Step = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col items-center text-center p-6 glass rounded-3xl border-white/5 relative z-10"
  >
    <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
      <Icon className="text-white" size={28} />
    </div>
    <h4 className="text-xl font-bold mb-2 tracking-tight">{title}</h4>
    <p className="text-zinc-500 text-sm font-mono leading-tight">{desc}</p>
  </motion.div>
);

const Workflow = () => {
    const steps = [
        { icon: Lightbulb, title: "IDEA", desc: "Analyzing problems into scalable solutions.", delay: 0 },
        { icon: PenTool, title: "DESIGN", desc: "Crafting modern, intuitive user experiences.", delay: 0.1 },
        { icon: Code, title: "CODE", desc: "Building robust architectures with MERN.", delay: 0.2 },
        { icon: Rocket, title: "DEPLOY", desc: "Optimizing CI/CD for seamless delivery.", delay: 0.3 },
    ];

  return (
    <div className="py-24 relative">
       <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block -translate-y-12"></div>
       
       <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter">THE PIPELINE</h2>
          <p className="text-zinc-500 font-mono italic text-sm">Translating logic into digital reality.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
                <div key={i} className="relative">
                    <Step {...step} />
                    {i < 3 && (
                        <div className="hidden lg:flex absolute top-1/2 -right-4 z-20 -translate-y-12 text-zinc-700">
                             <ChevronRight size={32} />
                        </div>
                    )}
                </div>
            ))}
       </div>
    </div>
  );
};

export default Workflow;
