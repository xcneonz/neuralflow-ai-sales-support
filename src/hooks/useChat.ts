import { useState } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello! I am NeuralFlow. How can I help you today?'  //change this initial message later
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'm analyzing that request... (This will connect to n8n soon!)" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return { messages, sendMessage, isTyping };
};