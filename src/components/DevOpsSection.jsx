import React from 'react';
import { motion } from 'framer-motion';
import { Play, GitMerge, Cloud, Activity } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const DevOpsSection = () => {
  const steps = [
    { name: "Code", icon: <Github size={28} />, color: "border-blue-500", glow: "shadow-[0_0_15px_#3b82f6]", text: "text-blue-500" },
    { name: "Build", icon: <GitMerge size={28} />, color: "border-yellow-500", glow: "shadow-[0_0_15px_#eab308]", text: "text-yellow-500" },
    { name: "Test", icon: <Play size={28} />, color: "border-green-500", glow: "shadow-[0_0_15px_#22c55e]", text: "text-green-500" },
    { name: "Deploy", icon: <Cloud size={28} />, color: "border-purple-500", glow: "shadow-[0_0_15px_#a855f7]", text: "text-purple-500" },
    { name: "Monitor", icon: <Activity size={28} />, color: "border-red-500", glow: "shadow-[0_0_15px_#ef4444]", text: "text-red-500" }
  ];

  return (
    <section id="devops" className="py-24 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">&gt;</span> Pipeline Architecture
          </h2>
          <p className="text-gray-400 font-mono">My standard CI/CD workflow for robust deployment.</p>
        </motion.div>

        {/* Pipeline Visual */}
        <div className="relative mt-20 mb-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-800 -z-10 hidden md:block rounded">
            <motion.div 
               className="h-full bg-gradient-to-r from-neonBlue to-neonPurple"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "linear" }}
            />
          </div>

          <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gray-800 -z-10 md:hidden block rounded">
             <motion.div 
               className="w-full bg-gradient-to-b from-neonBlue to-neonPurple"
               initial={{ height: "0%" }}
               whileInView={{ height: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "linear" }}
            />
          </div>

          {steps.map((step, idx) => (
             <motion.div 
               key={idx}
               initial={{ scale: 0, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.4, type: "spring" }}
               className="relative flex flex-col items-center mb-16 md:mb-0 bg-[#0d1117] p-2 rounded-full"
             >
                <div className={`w-20 h-20 rounded-full glass flex items-center justify-center border-2 ${step.color} ${step.glow} mb-4 relative ${step.text}`}>
                   {step.icon}
                   {/* Pinging pulse */}
                   <div className="absolute inset-0 rounded-full border border-inherit animate-ping opacity-20"></div>
                </div>
                <span className="font-mono text-gray-300 font-bold bg-[#0d1117] px-2">{step.name}</span>
             </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 1 }}
           className="mt-16 bg-gray-900 border border-gray-800 rounded-xl p-8 font-mono text-sm text-gray-300 max-w-2xl mx-auto"
        >
          <div className="flex gap-4 mb-4 items-center">
            <span className="text-green-500 text-xl">✔</span> <span className="text-base">Docker containerization for consistent environments</span>
          </div>
          <div className="flex gap-4 mb-4 items-center">
            <span className="text-green-500 text-xl">✔</span> <span className="text-base">Automated integration testing via GitHub Actions</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-green-500 text-xl">✔</span> <span className="text-base">Zero-downtime automated deployment strategies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevOpsSection;
