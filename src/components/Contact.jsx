import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin } from 'lucide-react';
import { FaGithub as GithubIcon, FaLinkedin as Linkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">&gt;</span> Initialize Connection
          </h2>
          <p className="text-gray-400 font-mono">My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="glass p-8 rounded-2xl border border-gray-800 h-full">
              <h3 className="text-2xl font-bold mb-8 text-white font-display">Contact Node</h3>
              <div className="flex flex-col gap-6">
                <a href="mailto:tharusharashmika2001@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-neonBlue transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-neonBlue/10 flex items-center justify-center group-hover:bg-neonBlue/20">
                    <Mail className="text-neonBlue" />
                  </div>
                  <div>
                     <p className="font-bold text-white">Email</p>
                     <p className="font-mono text-sm leading-tight text-gray-400">tharusharashmika2001<br/>@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-gray-300 hover:text-neonPurple transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-neonPurple/10 flex items-center justify-center group-hover:bg-neonPurple/20">
                    <MapPin className="text-neonPurple" />
                  </div>
                  <div>
                     <p className="font-bold text-white">Location</p>
                     <p className="font-mono text-sm leading-tight text-gray-400">Pahala Ambawa,<br/>Kuliyapitiya, Sri Lanka</p>
                  </div>
                </div>
                <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700">
                    <GithubIcon className="text-white" />
                  </div>
                  <div>
                     <p className="font-bold text-white">GitHub</p>
                     <p className="font-mono text-sm leading-tight text-gray-400">Tharusha Rashmika</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex-1"
          >
             <form className="glass p-8 rounded-2xl border border-gray-800 flex flex-col gap-5 h-full" onSubmit={(e) => e.preventDefault()}>
                <div>
                   <label className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                   <input type="text" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonBlue transition-colors font-mono" placeholder="visitor" />
                </div>
                <div>
                   <label className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                   <input type="email" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonBlue transition-colors font-mono" placeholder="visitor@domain.com" />
                </div>
                <div>
                   <label className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                   <textarea className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonBlue transition-colors font-mono min-h-[120px]" placeholder="Type your payload here..."></textarea>
                </div>
                <button className="w-full py-4 mt-auto rounded-lg bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                   Send Request <Send size={18} />
                </button>
             </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
