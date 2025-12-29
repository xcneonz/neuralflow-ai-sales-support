import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  detailsPanel: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar, detailsPanel }) => {
  return (
    <div className="flex h-screen w-full bg-background text-text overflow-hidden">
      
      {/* Left Sidebar - Navigation */}
      <aside className="w-80 h-full border-r border-surface bg-surface/30 backdrop-blur-md flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NeuralFlow
          </h1>
          <p className="text-xs text-muted uppercase tracking-wider mt-1">AI Orchestrator</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {sidebar}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 h-full relative flex flex-col bg-gradient-to-br from-background via-background to-surface/20">
        {children}
      </main>

      {/* Right Sidebar - Analytics */}
      <aside className="w-80 h-full border-l border-surface bg-surface/30 backdrop-blur-md flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">Live Context</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {detailsPanel}
        </div>
      </aside>

    </div>
  );
};