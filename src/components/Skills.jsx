import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Full-Stack',
      skills: ['MERN Stack', 'React.js (v19) & Node.js', 'Express.js & MongoDB', 'Vanilla HTML, CSS, JS']
    },
    {
      title: 'Languages',
      skills: ['Java', 'C#', 'C++', 'JavaScript / PHP']
    },
    {
      title: 'Tools & DevOps',
      skills: ['Git Version Control', 'Docker', 'JWT Authentication', 'phpMyAdmin']
    },
    {
      title: 'Professional',
      skills: ['Problem-solving', 'Teamwork', 'Time management', 'Adaptability']
    }
  ];

  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">&gt;</span> Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-neonBlue/50 transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neonBlue/10 to-transparent rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              <h3 className="text-xl font-bold mb-6 font-mono border-b border-gray-700 pb-2 text-white">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-neonPurple shadow-[0_0_8px_#bf00ff]"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
