import React, { useState, useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ChatMessage } from './components/ChatMessage';
import { useChat, type Message } from './hooks/useChat';
import { bookAppointment } from './services/api';
import { Send, Activity, Zap, Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';

function App() {
  const { messages: chatMessages, setMessages, sendMessage, isTyping, showBookingBtn, leadScore } = useChat();
  const [input, setInput] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping, showBookingBtn, bookingConfirmed]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleBooking = async () => {
    try {
      await bookAppointment("test-user@example.com"); 

      const systemMsg: Message = {
        id: Date.now().toString(),
        role: 'system', 
        content: "Booking Confirmed – A confirmation email has been sent to your inbox."
      };
      setMessages(prev => [...prev, systemMsg]);
      setBookingConfirmed(true);
      
    } catch (error) {
      alert("Booking Failed. Check n8n console.");
      console.error(error);
    }
  };

  return (
    <Layout
      sidebar={
        <div className="space-y-2">
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
          {!bookingConfirmed ? (
            // STATE A: lead scoring
            <div className="p-5 rounded-2xl bg-gradient-to-b from-surface to-background border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <Zap className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Lead Probability</h3>
              <div className={`text-4xl font-bold mb-1 transition-all duration-1000 ${leadScore > 70 ? 'text-green-400' : 'text-white'}`}>
                {leadScore}%
              </div>
              <div className="text-xs text-muted flex items-center gap-1">
                <Activity className="w-3 h-3" /> 
                {leadScore > 50 ? 'High Intent Detected' : 'Analyzing User...'}
              </div>
            </div>
          ) : (
            // STATE B: appointment confirmeation
             <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-900/20 to-background border border-blue-500/30 animate-fade-in-up">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Appointment Confirmed
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted">Client Name</div>
                  <div className="text-sm font-bold text-white">Sarah Chen</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted">Email</div>
                  <div className="text-sm text-white">sarah@company.com</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted">Requirement</div>
                  <div className="text-sm text-white italic">"Enterprise Plan Demo"</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-muted">Time</div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Today, 4:00 PM</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted">Location</div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Google Meet</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-green-400">Confirmation email sent.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-4">
          {chatMessages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role as any} content={msg.content} />
          ))}
          
          {isTyping && <ChatMessage role="assistant" content="" isTyping={true} />}
          {showBookingBtn && !bookingConfirmed && (
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