import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Copy, Check, Send, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { sound } from '../utils/sound';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const emailAddress = 'tharusharashmika2001@gmail.com';

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sound.playSuccess();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`Hi Tharusha,\n\n${formState.message}\n\nBest regards,\n${formState.name}\n${formState.email}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Outreach */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Available for Opportunities
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Let's build <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                the next big thing.
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-lg">
              Whether you are looking for an ambitious full-stack engineer for internships, contract builds, or collaborative research, my inbox is always open.
            </p>

            {/* Direct Email Card with One-Click Copy */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Direct Inbox</span>
                  <a href={`mailto:${emailAddress}`} className="text-xs sm:text-sm font-mono font-semibold text-white hover:text-cyan-300 transition-colors">
                    {emailAddress}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono border border-white/10 transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/tharusha-rashmika-4b0204345/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-xl glass-card hover:border-cyan-400/40 text-zinc-400 hover:text-white hover:scale-105 transition-all"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/RashmikaTR"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-xl glass-card hover:border-cyan-400/40 text-zinc-400 hover:text-white hover:scale-105 transition-all"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/tharusha_rashmika"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-xl glass-card hover:border-cyan-400/40 text-zinc-400 hover:text-white hover:scale-105 transition-all"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>

              <span className="text-xs font-mono text-zinc-500 ml-2 flex items-center gap-1">
                <MapPin size={12} className="text-cyan-400" /> Kuliyapitiya, Sri Lanka
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Messenger Form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSendMessage} className="p-6 sm:p-8 rounded-2xl bg-[#090b12] border border-white/10 shadow-inner space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5 text-zinc-400">
                <MessageSquare size={14} className="text-cyan-400" />
                <span className="font-bold text-white text-xs uppercase tracking-wider">Quick Dispatch</span>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[10px]">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Tharusha, I came across your portfolio and would love to discuss a project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Send size={14} />
                <span>Launch Message Dispatch</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
