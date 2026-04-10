import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import DevOpsSection from './components/DevOpsSection';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-neonBlue selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DevOpsSection />
        <Contact />
      </main>
      <footer className="py-8 text-center border-t border-gray-800 text-gray-500 font-mono text-sm relative z-10 bg-black/50 backdrop-blur-sm">
         <p>&copy; {new Date().getFullYear()} Tharusha Rashmika. System fully operational.</p>
      </footer>
    </div>
  );
}

export default App;
