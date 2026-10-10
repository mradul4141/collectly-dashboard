"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Clock, AlertCircle, Star, TrendingUp, ArrowRight } from "lucide-react";
import WaveGridBackground from "@/components/wave-grid-background";
import RadialGlowButton from "@/components/radial-glow-button";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Desktop");
  const [activeNav, setActiveNav] = useState("Home");

  const floatingVariants = {
    animate1: {
      y: ["-20px", "20px", "-20px"],
      x: ["-10px", "10px", "-10px"],
      transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
    },
    animate2: {
      y: ["20px", "-20px", "20px"],
      x: ["10px", "-10px", "10px"],
      transition: { repeat: Infinity, duration: 7, ease: "easeInOut" }
    }
  } as any;

  const navItems = ["Home", "Invoices", "Automations", "Clients", "Payments", "Reports"];
  const subTabs = ["Desktop", "Lite", "Pro"];

  // Simple scroll spy to update activeNav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(`section-${item.toLowerCase()}`));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveNav(navItems[i]);
          break;
        } else if (window.scrollY < 500) {
          // If at the very top, keep the first item active or reset
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
    <div className="min-h-screen bg-[#060606] font-sans selection:bg-orange-500 selection:text-white overflow-hidden flex flex-col relative text-white">
      
      {/* Background ambient glows */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Floating Elements */}
      <motion.div 
        variants={floatingVariants}
        animate="animate1"
        className="fixed left-[10%] top-[40%] w-16 h-16 rounded-full bg-orange-500/5 shadow-[0_0_40px_rgba(249,115,22,0.4)] border border-orange-500/20 flex items-center justify-center z-10 backdrop-blur-md pointer-events-none"
      >
        <div className="w-6 h-6 rounded-full bg-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
      </motion.div>

      <motion.div 
        variants={floatingVariants}
        animate="animate2"
        className="fixed right-[15%] top-[30%] w-20 h-20 rounded-full bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/20 flex items-center justify-center z-10 backdrop-blur-md pointer-events-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full blur-[1px]"></div>
        </div>
      </motion.div>

      {/* FIXED Top Navbar */}
      <div className="fixed top-6 left-0 right-0 w-full flex items-center justify-between px-6 md:px-12 z-50 pointer-events-none">
        
        {/* LOGO */}
        <div className="pointer-events-auto flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold">c</div>
           <span className="font-bold text-white text-lg tracking-tight">collectly.</span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex bg-[#0a0a0a]/90 backdrop-blur-md border border-gray-800 rounded-full p-1 gap-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`relative px-5 py-2 text-[13px] font-medium transition-colors ${
                activeNav === item ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {activeNav === item && (
                <motion.div
                  layoutId="navGlow"
                  className="absolute inset-0 bg-white/10 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="pointer-events-auto">
           <Link href="/login">
              <RadialGlowButton className="min-w-[140px] min-h-[44px] py-2 px-5 text-[13px] rounded-full">
                Let's Collaborate
                <div className="bg-white/20 text-white rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  <ArrowRight className="w-3 h-3 -rotate-45"/>
                </div>
              </RadialGlowButton>
           </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center pt-32 z-20 relative">
        
        {/* HERO SECTION */}
        <section className="w-full flex flex-col items-center min-h-[90vh] relative">
          
          {/* Interactive 3D Wave Grid Theme Background */}
          <div className="absolute inset-0 -top-32 w-full h-[120%] pointer-events-auto z-0 overflow-hidden opacity-90">
            <WaveGridBackground 
              colorBase="#0a0a0a" 
              colorHigh="#f97316" 
              gridSize={40}
              waveAmplitude={0.7}
              waveSpeed={7.5}
              waveFrequency={1.4}
              waveWidth={3.5}
            />
            {/* Soft radial/gradient blending so text stays crisp */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/60 via-transparent to-[#060606] pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(0,0,0,0.3)] pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full pointer-events-auto">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[60px] md:text-[88px] font-bold text-center leading-[1.1] tracking-tight max-w-5xl mb-6 text-white"
          >
            Automate cash flow<br />
            <span className="font-serif italic font-normal text-gray-300 tracking-normal">with thoughtful design</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-gray-400 text-center max-w-2xl text-[15px] mb-10 leading-relaxed"
          >
            At Collectly space, we help modern agencies tackle their biggest cash flow challenges with tailored solutions, guiding you from unpaid invoices to money in the bank.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-6 mb-16"
          >
             <Link href="/login" className="hover:scale-105 active:scale-95 transition-transform duration-200">
                <RadialGlowButton className="min-w-[190px] min-h-[56px] py-3.5 px-7 text-[16px] font-bold shadow-[0_0_35px_rgba(70,147,150,0.35)]">
                  Get Started
                  <div className="bg-white/20 text-white rounded-full w-7 h-7 flex items-center justify-center ml-2">
                    <ArrowRight className="w-4 h-4 -rotate-45"/>
                  </div>
                </RadialGlowButton>
             </Link>
             
             <div className="flex items-center gap-4 md:border-l border-gray-800 md:pl-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">AJ</div>
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">MR</div>
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">CK</div>
                </div>
                <div>
                  <div className="flex text-orange-500 mb-1">
                     <div className="text-xs font-bold">AGENCY TOOLKIT</div>
                  </div>
                  <div className="text-[11px] text-gray-500">
                     Built for modern agencies
                  </div>
                </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-6 w-full max-w-4xl mb-16 opacity-50"
          >
             <div className="h-[1px] bg-gradient-to-r from-transparent to-gray-700 flex-1"></div>
             <span className="text-[11px] text-gray-400 font-medium tracking-wide">Loved by big and small brands around the worlds</span>
             <div className="h-[1px] bg-gradient-to-l from-transparent to-gray-700 flex-1"></div>
          </motion.div>

          {/* Sub Tabs */}
          <div className="flex items-center gap-24 mb-16 border-b border-gray-800/50 w-full max-w-2xl justify-center relative">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[15px] font-medium transition-colors relative ${
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* App Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -10 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-5xl px-6 mb-24 cursor-pointer"
            style={{ perspective: 2000 }}
          >
            <motion.div 
              whileHover={{ rotateX: 2, rotateY: -1, boxShadow: "0 40px 100px -20px rgba(249,115,22,0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full aspect-[16/10] bg-[#0c0c0c] border border-gray-800 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col relative"
            >
              
              {/* Fake Browser Header */}
              <div className="h-12 w-full bg-[#111] border-b border-gray-800/80 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-64 h-6 bg-[#050505] border border-gray-800 rounded-md">
                  <span className="text-[10px] text-gray-500">dashboard.app</span>
                </div>
                <div></div>
              </div>

              {/* Mockup Body Content */}
              <div className="flex-1 relative bg-black">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src="/dashboard.jpg" 
                      alt="Dashboard UI" 
                      fill 
                      className="object-cover object-top opacity-90"
                      priority
                    />
                    
                    {/* Overlays */}
                    {activeTab === "Lite" && (
                       <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                          <div className="w-[300px] h-[500px] bg-[#0a0a0a] border border-gray-800 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
                             <div className="p-6 border-b border-gray-800 bg-[#111]">
                                <div className="w-full h-4 bg-gray-800 rounded mb-4"></div>
                                <div className="flex gap-2">
                                  <div className="w-1/2 h-8 bg-orange-500/20 rounded"></div>
                                  <div className="w-1/2 h-8 bg-gray-800 rounded"></div>
                                </div>
                             </div>
                             <div className="flex-1 p-6 flex flex-col gap-4">
                                <div className="w-full h-16 bg-gray-900 rounded-xl"></div>
                                <div className="w-full h-16 bg-gray-900 rounded-xl"></div>
                                <div className="w-full h-16 bg-gray-900 rounded-xl"></div>
                             </div>
                          </div>
                       </div>
                    )}
                    {activeTab === "Pro" && (
                      <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay"></div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* Integrations Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-24 relative border-y border-gray-900 py-10 bg-[#050505]">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex items-center gap-16 px-8"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                 {["Stripe", "QuickBooks", "Xero", "PayPal", "Plaid", "Square", "Shopify", "Zapier"].map((integration, idx) => (
                    <div key={idx} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                      <div className="w-8 h-8 rounded bg-white/10 border border-white/5 flex items-center justify-center font-bold text-white text-xs">{integration[0]}</div>
                      <span className="text-xl font-bold text-white tracking-tight">{integration}</span>
                    </div>
                 ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* FEATURE SECTIONS (SCROLL DEMOS) */}
        <div className="w-full max-w-5xl px-6 flex flex-col gap-32 pb-32">
          
          {/* 1. Smart Invoices */}
          <section id="section-invoices" className="w-full min-h-[60vh] flex flex-col justify-center border-t border-gray-800 pt-16">
            <h2 className="text-4xl font-bold mb-4">Smart Invoices</h2>
            <p className="text-gray-400 mb-12 max-w-xl">Create, send, and track professional invoices in seconds. Stop guessing if they’ve been seen.</p>
            
            <div className="w-full relative h-[450px] flex items-center justify-center perspective-[1000px]">
               {/* Stack of Invoices */}
               {[
                 { amount: "$4,500.00", status: "PAID", client: "Acme Corp", date: "Oct 12", delay: 0 },
                 { amount: "$12,250.00", status: "VIEWED", client: "Stark Industries", date: "Oct 15", delay: 0.2 },
                 { amount: "$890.00", status: "OVERDUE", client: "Globex", date: "Oct 01", delay: 0.4 }
               ].map((inv, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 100, rotateX: 20 }}
                   whileInView={{ opacity: 1, y: idx * 50 - 50, rotateX: 0, zIndex: 10 - idx }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, delay: inv.delay, type: "spring" }}
                   className="absolute w-[90%] md:w-[500px] bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-[0_30px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4"
                   style={{ transformOrigin: "bottom center" }}
                 >
                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-500" /></div>
                         <div>
                           <div className="text-sm font-bold text-white">{inv.client}</div>
                           <div className="text-xs text-gray-500">Due {inv.date}</div>
                         </div>
                       </div>
                       <div className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wider ${
                         inv.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400' :
                         inv.status === 'VIEWED' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                       }`}>
                         {inv.status}
                       </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500 text-sm">Total Amount</span>
                      <span className="text-3xl font-serif text-white">{inv.amount}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* 2. Automations */}
          <section id="section-automations" className="w-full min-h-[60vh] flex flex-col justify-center border-t border-gray-800 pt-16">
            <h2 className="text-4xl font-bold mb-4">Behavioral Automations</h2>
            <p className="text-gray-400 mb-12 max-w-xl">Set up cadences that automatically follow up on unpaid invoices politely and firmly.</p>
            
            <div className="w-full bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 relative overflow-hidden flex flex-col gap-6 shadow-[0_0_40px_rgba(249,115,22,0.05)]">
               {/* Workflow nodes */}
               {[
                 { icon: <Mail className="w-5 h-5"/>, color: "text-blue-500", bg: "bg-blue-500/20", title: "Day 0: Invoice Sent", desc: "Initial professional email with payment link." },
                 { icon: <Clock className="w-5 h-5"/>, color: "text-orange-500", bg: "bg-orange-500/20", title: "Day 3: Friendly Reminder", desc: "Automated nudge before the due date." },
                 { icon: <AlertCircle className="w-5 h-5"/>, color: "text-red-500", bg: "bg-red-500/20", title: "Day 7: Firm Follow-up", desc: "Escalated wording requiring immediate action." }
               ].map((node, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.5, delay: i * 0.3 }}
                   className="flex items-start gap-4 relative z-10"
                 >
                   {i !== 2 && <div className="absolute left-6 top-12 w-px h-20 bg-gray-800">
                      <motion.div 
                        initial={{ height: 0 }} 
                        whileInView={{ height: "100%" }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.3 + 0.3 }}
                        className="w-full bg-orange-500" 
                      />
                   </div>}
                   <div className={`w-12 h-12 rounded-full ${node.bg} ${node.color} flex items-center justify-center shrink-0 border border-[#111]`}>
                     {node.icon}
                   </div>
                   <div className="bg-[#111] border border-gray-800 p-5 rounded-2xl flex-1 shadow-lg">
                     <h4 className="text-white font-bold mb-1">{node.title}</h4>
                     <p className="text-sm text-gray-400">{node.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* 3. Client Roster & Feedback */}
          <section id="section-clients" className="w-full min-h-[60vh] flex flex-col justify-center border-t border-gray-800 pt-16">
            <h2 className="text-4xl font-bold mb-4">Client Roster</h2>
            <p className="text-gray-400 mb-12 max-w-xl">Track every client's payment history, and see why top agencies trust Collectly.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 flex flex-col shadow-xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full"></div>
                 <div className="text-orange-500 mb-6 flex gap-1 relative z-10">
                   <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                 </div>
                 <p className="text-lg text-white font-serif italic mb-6 flex-1 relative z-10">
                   "Your client's overdue payments handled automatically, giving you back 10+ hours a week and improving cash flow without burning bridges."
                 </p>
                 <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 bg-orange-500/20 rounded-full overflow-hidden flex items-center justify-center border border-orange-500/50">
                     <AlertCircle className="w-6 h-6 text-orange-500" />
                   </div>
                   <div>
                     <div className="font-bold text-white">Focus on the Work</div>
                     <div className="text-xs text-gray-500">We'll handle the follow-ups</div>
                   </div>
                 </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 flex flex-col gap-4 overflow-hidden shadow-xl"
              >
                 <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">RECENT CLIENTS</div>
                 {[1,2,3].map((i, idx) => (
                   <motion.div 
                     key={i} 
                     initial={{ x: 20, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.3 + (idx * 0.1) }}
                     className="flex items-center justify-between p-3 bg-[#111] rounded-xl border border-gray-800/50"
                   >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><User className="w-4 h-4 text-gray-500"/></div>
                        <div className="w-24 h-3 bg-gray-700 rounded"></div>
                      </div>
                      <div className="w-16 h-4 bg-emerald-500/20 rounded border border-emerald-500/30"></div>
                   </motion.div>
                 ))}
              </motion.div>
            </div>
          </section>

          {/* 4. Payments Recovered */}
          <section id="section-payments" className="w-full min-h-[60vh] flex flex-col justify-center border-t border-gray-800 pt-16">
            <h2 className="text-4xl font-bold mb-4">Maximum Recovery</h2>
            <p className="text-gray-400 mb-12 max-w-xl">We analyze your outstanding details and deploy strategies that get you paid. Watch your recovered revenue grow.</p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
               
               <div className="text-emerald-400 font-bold tracking-widest text-xs mb-6 flex items-center gap-2 relative z-10 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                 <TrendingUp className="w-4 h-4" /> EXAMPLE RECOVERY METRIC
               </div>
               
               <div className="text-5xl md:text-[80px] font-serif font-bold text-white mb-12 relative z-10 tracking-tight">
                 Dashboard <span className="text-emerald-500">Preview</span>
               </div>
               
               <div className="w-full max-w-lg h-40 flex items-end gap-3 justify-center relative z-10 border-b border-gray-800 pb-1">
                  {[40, 60, 45, 80, 55, 90, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                      className="w-12 bg-gradient-to-t from-emerald-900/30 to-emerald-500 rounded-t-md border-t border-emerald-400"
                    ></motion.div>
                  ))}
               </div>
            </motion.div>
          </section>

          {/* 5. Reports & CTA */}
          <section id="section-reports" className="w-full flex flex-col justify-center border-t border-gray-800 pt-16 mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full bg-gradient-to-br from-orange-600 to-orange-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.3)]"
            >
              {/* Fake texture overlay */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 relative z-10 leading-tight">Stop leaving money<br/>on the table.</h2>
              <p className="text-orange-100 mb-10 max-w-xl mx-auto relative z-10 text-lg">Join thousands of agencies recovering their cash flow on autopilot with Collectly.</p>
              
              <Link href="/login" className="relative z-10 inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl hover:scale-105 active:scale-95 transform duration-200">
                Start Your Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#050505] border-t border-gray-900 py-12 text-white z-20 relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <img src="/logo.jpg" alt="Collectly Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight font-serif">Collectly</span>
          </div>
          <div className="flex gap-8 text-[12px] font-medium text-gray-500">
            <a href="mailto:support@collectly.app" className="hover:text-white transition-colors">Support</a>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
