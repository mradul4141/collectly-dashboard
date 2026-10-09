"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Play, Square, Pause, Plus, MoreVertical, Calendar } from "lucide-react";

export default function TimeTrackingPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isTracking && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, seconds]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const recentLogs = [
    { id: 1, project: "Acme Corp Redesign", task: "UI Mockups", date: "Today", duration: "02:45:00", color: "bg-orange-500" },
    { id: 2, project: "Globex Marketing", task: "Client Meeting", date: "Yesterday", duration: "01:15:30", color: "bg-blue-500" },
    { id: 3, project: "Initech Integration", task: "API Setup", date: "Oct 4, 2026", duration: "04:30:00", color: "bg-green-500" },
    { id: 4, project: "Internal", task: "Admin & Emails", date: "Oct 4, 2026", duration: "00:45:00", color: "bg-gray-500" },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 mt-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white font-bold tracking-tight">Time Tracking</h1>
          <p className="text-gray-400 mt-1">Log your hours and generate timesheets for billing.</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
          <Plus className="w-4 h-4" /> New Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Timer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1 w-full flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="text" 
              placeholder="What are you working on?" 
              className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-white w-full md:w-1/3 outline-none focus:border-orange-500 transition-colors"
            />
            <select className="bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 w-full md:w-1/4 outline-none focus:border-orange-500 transition-colors">
              <option>Select Project</option>
              <option>Acme Corp Redesign</option>
              <option>Globex Marketing</option>
              <option>Internal</option>
            </select>
            <div className="flex items-center gap-2 text-gray-400 px-4">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              Billable
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-[#0a0a0a] px-6 py-3 rounded-xl border border-gray-800">
            <div className={`text-3xl font-mono font-bold tabular-nums ${isTracking ? 'text-orange-500' : 'text-white'}`}>
              {formatTime(seconds)}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsTracking(!isTracking)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isTracking 
                    ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30 hover:bg-rose-500/30' 
                    : 'bg-orange-500/20 text-orange-500 border border-orange-500/30 hover:bg-orange-500/30'
                }`}
              >
                {isTracking ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              {seconds > 0 && !isTracking && (
                <button 
                  onClick={() => setSeconds(0)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Weekly Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-[#111] border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6 text-gray-400 font-bold text-sm uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> This Week
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-white">32</span>
            <span className="text-xl text-gray-500 font-medium">h</span>
            <span className="text-4xl font-bold text-white">45</span>
            <span className="text-xl text-gray-500 font-medium">m</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Billable</span>
              <span className="text-white font-bold">28h 15m</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-800">
              <span className="text-gray-400">Non-billable</span>
              <span className="text-white font-bold">4h 30m</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Logs List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#111] border border-gray-800 rounded-2xl p-0 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Entries</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">View All</button>
          </div>
          
          <div className="divide-y divide-gray-800/50">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-12 rounded-full ${log.color}`}></div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{log.task}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{log.project}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-gray-500 text-sm hidden md:block">{log.date}</span>
                  <span className="text-white font-mono font-bold text-lg">{log.duration}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
