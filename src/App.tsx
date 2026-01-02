import React, { useState, useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ChatMessage } from './components/ChatMessage';
import { useChat } from './hooks/useChat';
import { Send, Activity, Users, Zap, Calendar } from 'lucide-react';
import { bookAppointment } from './services/api';

function App() {
  const { messages, sendMessage, isTyping, showBookingBtn } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showBookingBtn]); 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleBooking = async () => {
    try {
      alert("Contacting Server...");
      await bookAppointment("test-user@gmail.com"); 
      alert("✅ EMAIL SENT!");
    } catch (error) {
      alert("❌ Error: " + error);
    }
  };

  return (
    <Layout
      sidebar={
        <div className="space-y-2">
          {/* Mock User List */}
          {['Sarah Chen', 'Mike Ross', 'Jessica'].map((user, i) => (
            <div key={i} className={`p-3 rounded-xl border cursor-pointer transition-all hover:bg-white/5 flex items-center gap-3 ${i === 0 ? 'bg-primary/10 border-primary/30' : 'bg-transparent border-transparent'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                {user.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{user}</div>
                <div className="text-xs text-muted">Active now</div>
              </div>
            </div>
          ))}
        </div>
      }
      detailsPanel={
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-surface to-background border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Lead Probability</h3>
            <div className="text-4xl font-bold text-white mb-1">85%</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Trending Up
            </div>
          </div>
        </div>
      }
    >
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}
          
          {isTyping && <ChatMessage role="assistant" content="" isTyping={true} />}
          
          {showBookingBtn && (
            <div className="flex justify-center py-4 animate-fade-in-up">
              <button 
                onClick={handleBooking}
                className="group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Now</span>
                
             
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-6 bg-background/50 backdrop-blur-md border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message to Aeonza..."
              className="w-full bg-surface/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all shadow-lg"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-2 p-2 bg-gradient-to-r from-primary to-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-muted uppercase tracking-widest opacity-50">Powered by Aeonza v1.0</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;