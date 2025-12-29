import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isTyping }) => {
  const isAi = role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={clsx(
        "flex w-full mb-6 gap-4",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      {/* AI Avatar (Only shows for AI) */}
      {isAi && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}

      {/* The Bubble */}
      <div className={clsx(
        "max-w-[70%] p-4 rounded-2xl shadow-md relative overflow-hidden backdrop-blur-sm",
        isAi 
          ? "bg-surface/80 border border-white/10 text-gray-100 rounded-tl-none" 
          : "bg-gradient-to-r from-primary to-blue-600 text-white rounded-tr-none shadow-blue-500/20"
      )}>
        
        {/* Decorative "Sparkle" for AI messages */}
        {isAi && <Sparkles className="absolute top-2 right-2 w-3 h-3 text-accent/50 animate-pulse" />}

        {isTyping ? (
          <div className="flex gap-2 h-6 items-center px-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-light tracking-wide">
            {content}
          </p>
        )}
      </div>

      {/* User Avatar (Only shows for User) */}
      {!isAi && (
        <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
          <User className="w-5 h-5 text-muted" />
        </div>
      )}
    </motion.div>
  );
};