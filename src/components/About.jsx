import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, GitBranch } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-neonBlue" />,
      title: 'Full-Stack Development',
      description: 'Specializing in MERN stack. Building functional, modern web and mobile prototypes.'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-neonPurple" />,
      title: 'IT Undergraduate',
      description: 'Currently pursuing a BSc at the University of Vavuniya, focusing on Data Structures and Software Engineering.'
    },
    {
      icon: <GitBranch className="w-8 h-8 text-green-400" />,
      title: 'DevOps & Tooling',
      description: 'Experienced in collaborative environments utilizing Git, Docker, and agile tools for clean and efficient delivery.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">&gt;</span> Summary
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I am a motivated BSc IT undergraduate at the University of Vavuniya (Expected 2026). I have a strong foundation in MERN stack development and object-oriented languages like Java, C#, and C++. I thrive on building efficient web platforms, solving complex logic problems, and fostering excellent teamwork to contribute to innovative real-world projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-6 bg-black/50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 font-display">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
