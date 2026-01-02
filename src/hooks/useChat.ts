import { useState } from 'react';
import { sendMessageToAeonza } from '../services/api';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system'; 
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am Aeonza. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingBtn, setShowBookingBtn] = useState(false);
  
  const [leadScore, setLeadScore] = useState(15); 

  const sendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const data = await sendMessageToAeonza(text, { userId: '1' });
      if (data.confidence) {
        setLeadScore(Math.round(data.confidence * 100));
      }

      if (data.intent === 'SALES') {
        setShowBookingBtn(true);
      } else {
        setShowBookingBtn(false);
      }
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: data.reply 
      };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "⚠️ Error: Could not connect to Aeonza Brain." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, setMessages, sendMessage, isTyping, showBookingBtn, leadScore };
};