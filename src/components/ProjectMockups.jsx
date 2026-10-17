import React from 'react';
import { 
  ShoppingBag, Users, CheckCircle2, GitBranch, ExternalLink, 
  Search, Shield, Star, Bell, TrendingUp, Monitor, ArrowRight,
  GraduationCap, FileText, Check, Sparkles, Database
} from 'lucide-react';

// 1. SmartCart E-Commerce Mockup
export const SmartCartMockup = () => (
  <div className="w-full h-full bg-[#0a0c14] text-white p-4 font-sans select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    {/* Ambient Glow */}
    <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

    {/* App Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
          <ShoppingBag size={13} className="text-black font-bold" />
        </div>
        <span className="font-bold text-xs tracking-tight">SmartCart</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-zinc-400">
          <Search size={10} />
          <span>Search products...</span>
        </div>
        <div className="relative p-1 rounded-md bg-cyan-500/10 text-cyan-400">
          <ShoppingBag size={12} />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 text-black text-[8px] font-bold flex items-center justify-center">3</span>
        </div>
      </div>
    </div>

    {/* Promo Banner */}
    <div className="my-2.5 p-2.5 rounded-lg bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/20 flex items-center justify-between">
      <div>
        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">Weekend Deal</span>
        <h5 className="text-xs font-bold text-white">Next-Gen Audio & Tech</h5>
      </div>
      <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-400 text-black rounded-md">25% OFF</span>
    </div>

    {/* Product Cards Grid */}
    <div className="grid grid-cols-2 gap-2">
      {/* Product 1 */}
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors">
        <div className="h-16 rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden mb-1.5">
          <div className="w-9 h-9 rounded-full border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center">
            <span className="text-lg">🎧</span>
          </div>
          <span className="absolute bottom-1 right-1 text-[8px] bg-black/70 px-1 rounded text-cyan-300 font-mono">NEW</span>
        </div>
        <p className="text-[11px] font-bold truncate">Wireless ANC Pro</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-mono font-bold text-cyan-400">$129</span>
          <span className="text-[9px] text-zinc-400 flex items-center gap-0.5">
            <Star size={9} className="text-amber-400 fill-amber-400" /> 4.9
          </span>
        </div>
      </div>

      {/* Product 2 */}
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors">
        <div className="h-16 rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden mb-1.5">
          <div className="w-9 h-9 rounded-full border border-purple-400/40 bg-purple-500/10 flex items-center justify-center">
            <span className="text-lg">⌚</span>
          </div>
          <span className="absolute bottom-1 right-1 text-[8px] bg-black/70 px-1 rounded text-purple-300 font-mono">TOP</span>
        </div>
        <p className="text-[11px] font-bold truncate">Smart Pulse Watch</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-mono font-bold text-purple-400">$199</span>
          <span className="text-[9px] text-zinc-400 flex items-center gap-0.5">
            <Star size={9} className="text-amber-400 fill-amber-400" /> 4.8
          </span>
        </div>
      </div>
    </div>
  </div>
);

// 2. Alumni Management System Mockup
export const AlumniMockup = () => (
  <div className="w-full h-full bg-[#0a0d14] text-white p-4 font-sans select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="absolute -top-10 -left-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

    {/* Portal Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <GraduationCap size={13} className="text-white" />
        </div>
        <div>
          <span className="font-bold text-xs tracking-tight block">AlumniSphere</span>
          <span className="text-[8px] font-mono text-zinc-400 block -mt-0.5">Univ. of Vavuniya Portal</span>
        </div>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Live Network
      </span>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-3 gap-2 my-2.5">
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
        <span className="text-[9px] font-mono text-zinc-400 block">Graduates</span>
        <span className="text-xs font-bold text-cyan-400 font-mono">1,480+</span>
      </div>
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
        <span className="text-[9px] font-mono text-zinc-400 block">Placements</span>
        <span className="text-xs font-bold text-purple-400 font-mono">96.4%</span>
      </div>
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
        <span className="text-[9px] font-mono text-zinc-400 block">Events</span>
        <span className="text-xs font-bold text-emerald-400 font-mono">24 Active</span>
      </div>
    </div>

    {/* Alumni Records Preview Table */}
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[9px]">TR</div>
          <div>
            <p className="font-bold text-[10px] leading-tight">Tharusha Rashmika</p>
            <p className="text-[8px] font-mono text-zinc-400">Class of 2026 • Full-Stack</p>
          </div>
        </div>
        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">Verified</span>
      </div>

      <div className="flex items-center justify-between text-[10px] p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-[9px]">KP</div>
          <div>
            <p className="font-bold text-[10px] leading-tight">Kavindu Perera</p>
            <p className="text-[8px] font-mono text-zinc-400">Class of 2024 • Cloud Arch</p>
          </div>
        </div>
        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">Active</span>
      </div>
    </div>
  </div>
);

// 3. Project Build Track Mockup
export const BuildTrackMockup = () => (
  <div className="w-full h-full bg-[#090b12] text-white p-4 font-sans select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

    {/* Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
          <GitBranch size={13} className="text-black font-bold" />
        </div>
        <div>
          <span className="font-bold text-xs tracking-tight block">BuildTrack CLI</span>
          <span className="text-[8px] font-mono text-zinc-400 block -mt-0.5">Sprint & Release Pipeline</span>
        </div>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        CI/CD PASSED
      </span>
    </div>

    {/* Pipeline Progress */}
    <div className="my-2.5 p-2 rounded-lg bg-white/[0.03] border border-white/5">
      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
        <span className="text-zinc-400">Sprint 14 Deployment</span>
        <span className="text-emerald-400 font-bold">92% Done</span>
      </div>
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
        <div className="w-[92%] h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" />
      </div>
    </div>

    {/* Kanban Cards */}
    <div className="grid grid-cols-2 gap-2 text-[10px]">
      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
        <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">IN PROGRESS</span>
        <p className="font-bold text-[10px] leading-tight">API Auth Middleware</p>
        <p className="text-[8px] font-mono text-zinc-400">PR #42 • 3 commits</p>
      </div>

      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
        <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold">MERGED</span>
        <p className="font-bold text-[10px] leading-tight">Postgres Migration</p>
        <p className="text-[8px] font-mono text-zinc-400">Release v2.1.0</p>
      </div>
    </div>
  </div>
);

// 4. Tharusha 3D Portfolio Mockup
export const Portfolio3DMockup = () => (
  <div className="w-full h-full bg-[#06070a] text-white p-4 font-sans select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none" />

    {/* Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="font-bold text-xs tracking-tight">Tharusha 3D</span>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
        WebGL 60 FPS
      </span>
    </div>

    {/* Visual 3D Hologram Mockup */}
    <div className="my-2 flex items-center justify-center relative z-10 py-3">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400/50 animate-spin-slow flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 blur-[2px]" />
        </div>
        <div className="absolute -inset-2 border border-purple-500/30 rounded-full animate-pulse" />
      </div>
    </div>

    {/* Telemetry Footer */}
    <div className="grid grid-cols-2 gap-2 text-[9px] font-mono relative z-10 pt-2 border-t border-white/10">
      <div className="p-1.5 rounded bg-white/[0.04] text-center">
        <span className="text-zinc-500 block">RENDER ENGINE</span>
        <span className="text-cyan-300 font-bold">Three.js + R3F</span>
      </div>
      <div className="p-1.5 rounded bg-white/[0.04] text-center">
        <span className="text-zinc-500 block">FRAME LATENCY</span>
        <span className="text-emerald-400 font-bold">16.6 ms</span>
      </div>
    </div>
  </div>
);

// 5. Project Devfolio Mockup
export const DevfolioMockup = () => (
  <div className="w-full h-full bg-[#090b14] text-white p-4 font-sans select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

    {/* Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Monitor size={13} className="text-white" />
        </div>
        <span className="font-bold text-xs tracking-tight">Devfolio Studio</span>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
        Template Builder
      </span>
    </div>

    {/* Canvas Layout Preview */}
    <div className="my-2.5 p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-zinc-400 font-mono">Active Theme</span>
        <span className="text-cyan-400 font-mono font-bold">Cyber Obsidian</span>
      </div>
      <div className="flex gap-1.5">
        <div className="flex-grow h-7 rounded bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 flex items-center px-2 text-[9px] text-zinc-300">
          Hero Section Block
        </div>
        <div className="w-14 h-7 rounded bg-white/5 flex items-center justify-center text-[9px] text-zinc-400">
          Navbar
        </div>
      </div>
    </div>

    {/* Bottom Status */}
    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1 border-t border-white/5">
      <span>Auto-Deploy: Vercel</span>
      <span className="text-emerald-400">Ready to Publish</span>
    </div>
  </div>
);

// 6. Operating Systems Practical Engine Mockup
export const SystemsMockup = () => (
  <div className="w-full h-full bg-[#06080d] text-white p-4 font-mono select-none flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="absolute -top-10 -left-10 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

    {/* Header */}
    <div className="flex items-center justify-between pb-3 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold text-xs">
          OS
        </div>
        <div>
          <span className="font-bold text-xs tracking-tight block">Kernel Module (IT2244)</span>
          <span className="text-[8px] text-zinc-500 block">Process & Memory Scheduling</span>
        </div>
      </div>
      <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
        POSIX / C
      </span>
    </div>

    {/* Simulated Linux terminal output */}
    <div className="my-2 p-2 rounded bg-black/60 border border-white/5 text-[9px] text-zinc-300 space-y-1">
      <p className="text-cyan-400">$ ./scheduler --algo=round-robin</p>
      <p className="text-zinc-500">&gt; Allocating 4 PCB structures...</p>
      <p className="text-emerald-400">&gt; CPU burst time: 24ms (Avg wait: 4.2ms)</p>
    </div>

    <div className="flex items-center justify-between text-[9px] text-zinc-500 pt-1 border-t border-white/5">
      <span>Lab: Univ. of Vavuniya</span>
      <span className="text-emerald-400">PASSED 100%</span>
    </div>
  </div>
);
