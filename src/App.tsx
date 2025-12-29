import { Layout } from './components/Layout';
import { MessageSquare, Users, Activity } from 'lucide-react';

function App() {
  return (
    <Layout
      sidebar={
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-surface/50 border border-white/5 text-sm text-muted flex items-center gap-3">
            <Users className="w-4 h-4" />
            <span>Active Users Loading...</span>
          </div>
        </div>
      }
      detailsPanel={
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-surface/40 border border-white/5">
            <h3 className="text-sm font-medium text-muted flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-accent" /> Engagement Score
            </h3>
            <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
              <div className="h-full w-[0%] bg-accent transition-all duration-1000"></div>
            </div>
          </div>
        </div>
      }
    >
      {/* Chat Area Placeholder */}
      <div className="flex-1 flex items-center justify-center flex-col gap-4 text-muted">
        <div className="w-16 h-16 rounded-2xl bg-surface/50 flex items-center justify-center animate-pulse-slow">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <p>System Ready. Waiting for connection...</p>
      </div>
    </Layout>
  );
}

export default App;