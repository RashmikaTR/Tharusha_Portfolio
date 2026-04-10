import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Database, Play } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "Construction Dashboard",
      problem: "Inefficient manual management of construction sites, labor, and inventory.",
      solution: "A unified platform to effortlessly manage sites and foster structured communication.",
      techStack: ["React.js", "React Router", "Axios", "Lottie Player"],
      devops: "Component-driven UI (2026)",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "AlumSphere System",
      problem: "Universities struggling to manage growing alumni data and events.",
      solution: "A robust management platform with an admin panel, CSV handling, and participation tracking.",
      techStack: ["PHP", "Vanilla HTML/CSS", "MySQL", "phpMyAdmin"],
      devops: "LAMP Stack Architecture (2025)",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "VUV Connect",
      problem: "Scattered university systems confusing students and faculties.",
      solution: "A centralized platform unifying notices, clubs, and student services securely.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      devops: "RESTful API, Secure Auth (2026)",
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-4 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">&gt;</span> Featured Projects
          </h2>
          <p className="text-gray-400 font-mono">Select scalable projects built on modern stacks.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass p-6 rounded-2xl border border-gray-800 hover:border-neonBlue/50 transition-colors duration-300 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
              <div className="mb-4">
                <p className="text-sm font-semibold text-neonPurple mb-1">Problem:</p>
                <p className="text-gray-400 text-sm mb-2">{project.problem}</p>
                <p className="text-sm font-semibold text-neonBlue mb-1">Solution:</p>
                <p className="text-gray-400 text-sm">{project.solution}</p>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-300 font-mono">
                  <Database size={14} className="text-green-400" />
                  <span>Stack: {project.techStack.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 mb-6 text-xs text-gray-300 font-mono">
                  <Play size={14} className="text-yellow-400" />
                  <span>Architecture: {project.devops}</span>
                </div>

                <div className="flex gap-4">
                  <a href={project.demoLink} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-neonBlue/10 hover:bg-neonBlue/20 border border-neonBlue text-neonBlue text-sm font-bold transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href={project.codeLink} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass hover:bg-white/10 text-white text-sm font-bold transition-colors">
                    <Github size={16} /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
