import { useState } from 'react';
import { sendMessageToAeonza } from '../services/api';

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
      content: 'Hello! I am Aeonza. System Online.' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
    
      const data = await sendMessageToAeonza(text, { userId: 'user_123' });
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: data.reply 
      };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {

      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "⚠️ Connection Lost: Make sure n8n is running and the Webhook is active." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};