"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  User, Mail, Clock, AlertCircle, Star, TrendingUp, ArrowRight, 
  Sparkles, ShieldCheck, Check, Send, FileText, Zap, Compass
} from "lucide-react";
import { 
  AstronautIllustration, 
  UfoIllustration, 
  PlanetIllustration, 
  TelescopeIllustration, 
  StarryBlob, 
  SpiralLogo 
} from "@/components/illustrations/retro-space";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Mission Control");
  const [activeNav, setActiveNav] = useState("Home");

  const floatingVariants = {
    animate1: {
      y: ["-15px", "15px", "-15px"],
      x: ["-8px", "8px", "-8px"],
      rotate: [-3, 3, -3],
      transition: { repeat: Infinity, duration: 7, ease: "easeInOut" }
    },
    animate2: {
      y: ["18px", "-18px", "18px"],
      x: ["10px", "-10px", "10px"],
      rotate: [2, -2, 2],
      transition: { repeat: Infinity, duration: 8.5, ease: "easeInOut" }
    },
    animate3: {
      y: ["-10px", "10px", "-10px"],
      transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
    }
  } as any;

  const navItems = ["Home", "Features", "Automations", "Telemetry", "Dispatch"];
  const subTabs = ["Mission Control", "AI Capture", "Autonomous Cadence"];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(`section-${item.toLowerCase()}`));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveNav(navItems[i]);
          break;
        } else if (window.scrollY < 400) {
          setActiveNav("Home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (item: string) => {
    setActiveNav(item);
    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(`section-${item.toLowerCase()}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#DEDEC8] font-sans selection:bg-[#0A0A0A] selection:text-white overflow-hidden flex flex-col relative text-[#0A0A0A]">
      
      {/* Background halftone dot pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#0a0a0a_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0"></div>

      {/* FLOATING VINTAGE SPACE ILLUSTRATIONS */}
      <motion.div 
        variants={floatingVariants}
        animate="animate1"
        className="fixed left-[4%] top-[25%] pointer-events-none z-10 hidden lg:block opacity-85"
      >
        <AstronautIllustration className="w-48 h-48 drop-shadow-[6px_6px_0px_#0A0A0A]" />
      </motion.div>

      <motion.div 
        variants={floatingVariants}
        animate="animate2"
        className="fixed right-[5%] top-[18%] pointer-events-none z-10 hidden lg:block opacity-85"
      >
        <UfoIllustration className="w-52 h-44 drop-shadow-[6px_6px_0px_#0A0A0A]" />
      </motion.div>

      <motion.div 
        variants={floatingVariants}
        animate="animate3"
        className="fixed right-[8%] bottom-[20%] pointer-events-none z-10 hidden xl:block opacity-75"
      >
        <PlanetIllustration className="w-40 h-40 drop-shadow-[5px_5px_0px_#0A0A0A]" />
      </motion.div>

      {/* FIXED TOP RETRO NAVBAR */}
      <header className="fixed top-5 left-0 right-0 w-full flex items-center justify-between px-6 md:px-12 z-50 pointer-events-none">
        
        {/* LOGO BADGE */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-white border-2 border-[#0A0A0A] px-4 py-2 rounded-full shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all">
          <SpiralLogo className="w-6 h-6 text-[#0A0A0A]" />
          <span className="font-display text-sm tracking-tight uppercase text-[#0A0A0A]">
            COLLECTLY <span className="font-label text-xs tracking-widest text-[#0A0A0A]/60 font-bold ml-1">2.0</span>
          </span>
        </div>

        {/* NAVIGATION PILLS */}
        <nav className="hidden md:flex bg-white border-2 border-[#0A0A0A] rounded-full p-1 gap-1.5 shadow-[4px_4px_0px_#0A0A0A] pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`relative px-4 py-1.5 font-label text-xs uppercase tracking-wider font-bold transition-all rounded-full ${
                activeNav === item 
                  ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]" 
                  : "text-[#0A0A0A] hover:bg-[#DEDEC8]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="pointer-events-auto">
          <Link href="/dashboard/capture">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white rounded-full font-label text-xs uppercase tracking-wider font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] transition-all">
              <span>ENTER WORKSPACE</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
            </button>
          </Link>
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <main className="flex-1 w-full flex flex-col items-center pt-32 sm:pt-36 z-20 relative">
        
        {/* HERO SECTION */}
        <section id="section-home" className="w-full flex flex-col items-center min-h-[85vh] px-6 text-center max-w-6xl relative">
          
          {/* VINTAGE TELEMETRY BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] mb-8 font-label text-xs uppercase tracking-widest font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-[#0A0A0A] inline-block"></span>
            <span>AUTONOMOUS WORKSPACE & INK INTELLIGENCE</span>
          </motion.div>

          {/* RETRO 3D STACKED HEADLINE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6 select-none"
          >
            {/* Background 3D Stack Offset Shadow */}
            <h1 className="text-[44px] sm:text-[72px] md:text-[96px] font-display text-[#0A0A0A]/20 leading-[0.95] tracking-tight uppercase absolute top-2 left-2 pointer-events-none select-none">
              CAPTURE. PLAN.<br />
              EXECUTE.
            </h1>
            <h1 className="text-[44px] sm:text-[72px] md:text-[96px] font-display text-[#0A0A0A] leading-[0.95] tracking-tight uppercase relative z-10">
              CAPTURE. PLAN.<br />
              EXECUTE.
            </h1>
          </motion.div>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-[#0A0A0A]/80 max-w-2xl font-sans leading-relaxed mb-10"
          >
            Collectly 2.0 transforms scattered thoughts, meeting transcripts, and unpaid receivables into verified missions, automated follow-ups, and structured deliverables.
          </motion.p>

          {/* HERO ACTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <Link href="/dashboard/capture">
              <button className="flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-label text-sm uppercase tracking-wider font-black border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] transition-all">
                <span>LAUNCH TRANSMISSION 2.0</span>
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </Link>

            <Link href="/dashboard/tasks">
              <button className="flex items-center gap-2 px-7 py-4 bg-white text-[#0A0A0A] rounded-full font-label text-sm uppercase tracking-wider font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] transition-all">
                <Compass className="w-4 h-4" />
                <span>EXPLORE MISSIONS</span>
              </button>
            </Link>
          </motion.div>

          {/* VINTAGE DIVIDER BAND */}
          <div className="w-full max-w-4xl flex items-center gap-4 my-8 opacity-70">
            <div className="h-0.5 bg-[#0A0A0A] flex-1"></div>
            <span className="font-label text-xs uppercase tracking-widest font-bold text-[#0A0A0A]">
              TELEMETRY LOG // VERIFIED BY 1,200+ ORBITAL CREWS
            </span>
            <div className="h-0.5 bg-[#0A0A0A] flex-1"></div>
          </div>

          {/* SUB-TABS SELECTOR */}
          <div className="flex items-center gap-3 mb-8 bg-white border-2 border-[#0A0A0A] rounded-full p-1.5 shadow-[4px_4px_0px_#0A0A0A]">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full font-label text-xs uppercase tracking-wider font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]"
                    : "text-[#0A0A0A] hover:bg-[#DEDEC8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* RETRO DEVICE CONTAINER SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-5xl rounded-[24px] border-3 border-[#0A0A0A] bg-white shadow-[10px_10px_0px_#0A0A0A] overflow-hidden flex flex-col mb-24 relative text-left"
          >
            {/* Terminal Top Bar */}
            <div className="bg-[#DEDEC8] border-b-2 border-[#0A0A0A] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0A0A0A]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0A0A0A]"></div>
              </div>

              <div className="bg-white border-2 border-[#0A0A0A] rounded-full px-4 py-0.5 font-label text-[11px] font-bold tracking-widest uppercase text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
                TERMINAL // SECTOR_04 // COLLECTLY_OS_v2.0
              </div>

              <div className="font-label text-[11px] font-bold tracking-widest uppercase text-[#0A0A0A]">
                ONLINE
              </div>
            </div>

            {/* Terminal Body Content */}
            <div className="p-6 sm:p-8 bg-white min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeTab === "Mission Control" && (
                  <motion.div
                    key="mc"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-[18px] p-5 shadow-[4px_4px_0px_#0A0A0A]">
                      <div className="font-label text-xs uppercase tracking-wider font-bold mb-2">01 // INTAKE</div>
                      <div className="font-display text-2xl text-[#0A0A0A] mb-1">12 PAYLOADS</div>
                      <p className="text-xs text-[#0A0A0A]/70 font-sans">Raw voice memos & messages awaiting operator sign-off.</p>
                    </div>

                    <div className="bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-[18px] p-5 shadow-[4px_4px_0px_#0A0A0A]">
                      <div className="font-label text-xs uppercase tracking-wider font-bold mb-2">02 // ACTIVE ORBITS</div>
                      <div className="font-display text-2xl text-[#0A0A0A] mb-1">4 PROJECTS</div>
                      <p className="text-xs text-[#0A0A0A]/70 font-sans">Milestone deliverables in staging & quality assurance.</p>
                    </div>

                    <div className="bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] rounded-[18px] p-5 shadow-[4px_4px_0px_#0A0A0A]">
                      <div className="font-label text-xs uppercase tracking-wider font-bold text-white/70 mb-2">03 // RECOVERED</div>
                      <div className="font-display text-2xl text-white mb-1">$24,800.00</div>
                      <p className="text-xs text-white/70 font-sans">Auto-chased outstanding payments settled in full.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "AI Capture" && (
                  <motion.div
                    key="aic"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-[18px] p-6 shadow-[5px_5px_0px_#0A0A0A] space-y-4"
                  >
                    <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
                      <span className="font-label text-xs uppercase font-bold tracking-widest">
                        INTELLIGENCE INGESTION // TYPEWRITER TRANSMISSION
                      </span>
                      <span className="font-label text-[10px] uppercase font-bold px-2 py-0.5 bg-white border border-[#0A0A0A] rounded-full">
                        HUMAN IN THE LOOP
                      </span>
                    </div>
                    <p className="font-mono text-xs sm:text-sm text-[#0A0A0A] bg-white border-2 border-[#0A0A0A] p-4 rounded-[12px] shadow-[2px_2px_0px_#0A0A0A]">
                      &quot;Finalize mobile responsive navigation by Tuesday, bill Acme Corp $4,500 milestone payment, and schedule flight check with engineering team.&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="font-label text-xs uppercase tracking-wider font-bold">DETECTED ASSETS:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white font-label text-[10px] uppercase font-bold">2 TASKS</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white font-label text-[10px] uppercase font-bold">1 INVOICE DUE</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#0A0A0A] font-label text-[10px] uppercase font-bold">REVIEW STAGED</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "Autonomous Cadence" && (
                  <motion.div
                    key="ac"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="bg-white border-2 border-[#0A0A0A] rounded-[18px] p-5 shadow-[4px_4px_0px_#0A0A0A]">
                      <div className="font-label text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> RELAY #1: MSME 43B(H) ALERT
                      </div>
                      <p className="text-xs text-[#0A0A0A]/80 font-sans">
                        Auto-calculates the 45-day statutory limit on tax deductions and alerts your team at Day 40.
                      </p>
                    </div>

                    <div className="bg-white border-2 border-[#0A0A0A] rounded-[18px] p-5 shadow-[4px_4px_0px_#0A0A0A]">
                      <div className="font-label text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> RELAY #2: POLITE RECEIVABLES NUDGE
                      </div>
                      <p className="text-xs text-[#0A0A0A]/80 font-sans">
                        Automated, courteous reminder sent 3 days prior to milestone payment due dates with direct pay links.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Console Status */}
              <div className="pt-6 border-t-2 border-[#0A0A0A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-label uppercase tracking-wider">
                <span className="text-[#0A0A0A]/70">ALL SYSTEMS NOMINAL // ZERO TELEMETRY DRIFT</span>
                <Link href="/dashboard/capture" className="font-bold text-[#0A0A0A] hover:underline flex items-center gap-1">
                  ENTER LIVE RUNTIME <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 1: INK CARTRIDGE FEATURES */}
        <section id="section-features" className="w-full max-w-5xl px-6 py-20 border-t-2 border-[#0A0A0A]">
          <div className="text-center mb-16">
            <span className="font-label text-xs uppercase tracking-widest font-bold px-3 py-1 bg-white border-2 border-[#0A0A0A] rounded-full shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
              CAPABILITIES & SPECS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0A0A0A]">
              PRECISION WORKSPACE MODULES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border-2 border-[#0A0A0A] rounded-[22px] p-6 shadow-[5px_5px_0px_#0A0A0A] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold mb-4 border border-[#0A0A0A]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg uppercase text-[#0A0A0A] mb-2">AI CAPTURE INBOX</h3>
                <p className="text-xs text-[#0A0A0A]/75 font-sans leading-relaxed">
                  Dump raw voice notes, thoughts, and meeting summaries into an omni-channel terminal. Human confirmation gates prevent phantom entries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 font-label text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                SPEC // STAGED REVIEW MODAL
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-[#0A0A0A] rounded-[22px] p-6 shadow-[5px_5px_0px_#0A0A0A] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold mb-4 border border-[#0A0A0A]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg uppercase text-[#0A0A0A] mb-2">ORBITAL KANBAN</h3>
                <p className="text-xs text-[#0A0A0A]/75 font-sans leading-relaxed">
                  4-column project telemetry board with real-time status shifts, priority stamps, and parent project linkages.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 font-label text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                SPEC // DRAG-FREE DIRECT DISPATCH
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-[#0A0A0A] rounded-[22px] p-6 shadow-[5px_5px_0px_#0A0A0A] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold mb-4 border border-[#0A0A0A]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg uppercase text-[#0A0A0A] mb-2">SMART RECEIVABLES</h3>
                <p className="text-xs text-[#0A0A0A]/75 font-sans leading-relaxed">
                  Track client invoices, dispute resolutions, and automated payment chasing without burning bridges.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 font-label text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                SPEC // ESCROW & STRIPE READY
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AUTOMATIONS */}
        <section id="section-automations" className="w-full max-w-5xl px-6 py-20 border-t-2 border-[#0A0A0A]">
          <div className="bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-[24px] p-8 sm:p-12 shadow-[8px_8px_0px_#0A0A0A] flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="font-label text-xs uppercase tracking-widest font-bold px-3 py-1 bg-white border border-[#0A0A0A] rounded-full shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
                AUTONOMOUS CADENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-[#0A0A0A] mb-4">
                DETERMINISTIC LOGIC RELAYS
              </h2>
              <p className="text-sm text-[#0A0A0A]/80 font-sans leading-relaxed mb-6">
                Never lose an invoice or miss a project milestone. Configure background triggers that automatically escalate urgent deadlines and dispatch polite reminder schedules.
              </p>
              <Link href="/dashboard/automations">
                <button className="px-6 py-2.5 bg-[#0A0A0A] text-white rounded-full font-label text-xs uppercase tracking-wider font-bold border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                  VIEW ALL WORKFLOW RULES
                </button>
              </Link>
            </div>

            <div className="w-full md:w-80 flex flex-col gap-3 font-mono text-xs">
              <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-[16px] shadow-[3px_3px_0px_#0A0A0A]">
                <div className="font-label font-bold text-[10px] uppercase text-[#0A0A0A]/60">CADENCE // DAY 0</div>
                <div className="font-bold text-[#0A0A0A] mt-1">Invoice Dispatched</div>
                <div className="text-[11px] text-[#0A0A0A]/70">Initial telemetry & payment link sent.</div>
              </div>

              <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-[16px] shadow-[3px_3px_0px_#0A0A0A]">
                <div className="font-label font-bold text-[10px] uppercase text-[#0A0A0A]/60">CADENCE // DAY 3</div>
                <div className="font-bold text-[#0A0A0A] mt-1">Friendly Milestone Nudge</div>
                <div className="text-[11px] text-[#0A0A0A]/70">Polite automated notification.</div>
              </div>

              <div className="bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] p-4 rounded-[16px] shadow-[3px_3px_0px_#0A0A0A]">
                <div className="font-label font-bold text-[10px] uppercase text-white/60">CADENCE // DAY 7</div>
                <div className="font-bold text-white mt-1">Direct Priority Follow-up</div>
                <div className="text-[11px] text-white/70">Escalated wording requiring action.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TELEMETRY & RECOVERY */}
        <section id="section-telemetry" className="w-full max-w-5xl px-6 py-20 border-t-2 border-[#0A0A0A]">
          <div className="text-center mb-16">
            <span className="font-label text-xs uppercase tracking-widest font-bold px-3 py-1 bg-white border-2 border-[#0A0A0A] rounded-full shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
              REVENUE RECOVERY
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0A0A0A]">
              TELEMETRY THAT PAYS FOR ITSELF
            </h2>
          </div>

          <div className="bg-white border-2 border-[#0A0A0A] rounded-[24px] p-8 sm:p-12 shadow-[8px_8px_0px_#0A0A0A] flex flex-col items-center text-center">
            <div className="font-label text-xs uppercase tracking-widest font-bold text-[#0A0A0A] mb-2">
              HISTORICAL SETTLEMENT INDEX
            </div>
            <div className="font-display text-5xl sm:text-7xl text-[#0A0A0A] mb-8">
              $1,420,000+
            </div>

            {/* Vintage Monochrome Chart */}
            <div className="w-full max-w-xl h-36 flex items-end justify-between gap-3 border-b-2 border-[#0A0A0A] pb-2 mb-6">
              {[35, 50, 42, 70, 60, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full group">
                  <div 
                    style={{ height: `${h}%` }}
                    className="w-full bg-[#0A0A0A] border-2 border-[#0A0A0A] rounded-t-sm group-hover:bg-[#333] transition-colors"
                  ></div>
                  <span className="font-label text-[10px] font-bold text-[#0A0A0A] mt-2 text-center">
                    WK 0{i + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 max-w-md font-sans">
              Recovered from overdue retainers and delayed deliverables using automated behavioral follow-ups.
            </p>
          </div>
        </section>

        {/* SECTION 4: FINAL DISPATCH CTA */}
        <section id="section-dispatch" className="w-full max-w-5xl px-6 py-20 border-t-2 border-[#0A0A0A]">
          <div className="w-full bg-[#0A0A0A] text-white border-3 border-[#0A0A0A] rounded-[28px] p-10 sm:p-16 text-center relative overflow-hidden shadow-[10px_10px_0px_#0A0A0A]">
            
            {/* Tiny white star dots inside black blob */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <SpiralLogo className="w-12 h-12 text-white mb-6 animate-spin transition-transform duration-10000" />
              
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white mb-4 leading-tight">
                STOP LEAVING MONEY<br />IN DEEP SPACE
              </h2>
              
              <p className="text-sm sm:text-base text-white/80 font-sans mb-8 leading-relaxed">
                Join forward-thinking agencies and creators running autonomous operations with Collectly 2.0.
              </p>

              <Link href="/dashboard/capture">
                <button className="px-8 py-4 bg-white text-[#0A0A0A] rounded-full font-label text-sm uppercase tracking-wider font-black border-2 border-white shadow-[4px_4px_0px_rgba(255,255,255,0.4)] hover:bg-[#DEDEC8] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  ENTER WORKSPACE NOW
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#DEDEC8] border-t-2 border-[#0A0A0A] py-12 px-6 z-20 relative text-[#0A0A0A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <SpiralLogo className="w-7 h-7 text-[#0A0A0A]" />
            <span className="font-display text-sm tracking-tight uppercase text-[#0A0A0A]">COLLECTLY 2.0</span>
            <span className="font-label text-xs uppercase tracking-wider text-[#0A0A0A]/60">RETRO SPACE ZINE EDITION</span>
          </div>

          <div className="flex gap-6 font-label text-xs uppercase tracking-wider font-bold text-[#0A0A0A]/70">
            <Link href="/dashboard/capture" className="hover:text-[#0A0A0A] transition-colors">Workspace</Link>
            <Link href="/dashboard/invoices" className="hover:text-[#0A0A0A] transition-colors">Invoices</Link>
            <Link href="/dashboard/tasks" className="hover:text-[#0A0A0A] transition-colors">Tasks</Link>
            <a href="mailto:support@collectly.app" className="hover:text-[#0A0A0A] transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
