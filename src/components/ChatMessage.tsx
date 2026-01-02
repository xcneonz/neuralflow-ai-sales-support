import React from 'react';
import { Bot, User, ShieldAlert } from 'lucide-react'; 

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'; 
  content: string;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isTyping }) => {
  if (role === 'system') {
    return (
      <div className="flex justify-center my-4 animate-fade-in-up">
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>{content}</span>
        </div>
      </div>
    );
  }

  const isAi = role === 'assistant';
  
  return (
    <div className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'} animate-fade-in-up`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isAi ? 'bg-gradient-to-tr from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20' 
             : 'border border-white/10 bg-surface'
      }`}>
        {isAi ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-muted" />}
      </div>
      
      <div className={`relative max-w-[80%] p-4 rounded-2xl ${
        isAi 
          ? 'bg-surface border border-white/5 text-gray-100 rounded-tl-none' 
          : 'bg-blue-600 text-white shadow-lg shadow-blue-500/10 rounded-tr-none'
      }`}>
        {isTyping ? (
          <div className="flex gap-1 h-6 items-center px-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
};