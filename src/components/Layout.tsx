import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  detailsPanel: React.ReactNode;
}

export function Layout({ children, sidebar, detailsPanel }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden font-sans">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Left Sidebar (User List) */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} h-full transition-all duration-500 border-r border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl flex flex-col relative z-20 hover:border-white/20`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10 group">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                <div className="relative bg-slate-900 rounded-xl p-2">
                  <Sparkles className="w-5 h-5 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text" />
                </div>
              </div>
              {sidebarOpen && (
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AEONZA</h1>
                  <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase mt-0.5">AI Orchestrator</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Navigation (Your User List) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
           {sidebar}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 flex justify-center items-center"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area (Chat) */}
      <main className="flex-1 h-full relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-8 relative z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
             NeuralFlow Command Center
          </h2>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Status: Live
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden relative z-0 flex flex-col">
           {children}
        </div>
      </main>

      {/* Right Sidebar (Lead Score / Context) */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} h-full transition-all duration-500 border-l border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl flex flex-col relative z-20 hover:border-white/20`}>
        <div className="p-6 border-b border-white/10">
          <h2 className={`${sidebarOpen ? 'text-sm' : 'text-xs'} font-bold text-gray-300 uppercase tracking-widest`}>
            {sidebarOpen ? 'Live Context' : 'Context'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
           {detailsPanel}
        </div>

        <div className="p-4 border-t border-white/10">
          <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            {sidebarOpen ? 'Export Data' : 'DL'}
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}