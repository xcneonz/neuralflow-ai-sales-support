import axios from 'axios';

const N8N_CHAT_URL = "http://localhost:5678/webhook-test/intent";

const N8N_BOOKING_URL = " "; 

export interface AIResponse {
  reply: string;
  intent: 'SALES' | 'SUPPORT';
  confidence: number;
}

export const sendMessageToAeonza = async (message: string, userContext: any): Promise<AIResponse> => {
  try {
    const response = await axios.post(N8N_CHAT_URL, {
      message,
      context: userContext,
      timestamp: new Date().toISOString()
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Aeonza Disconnected:", error);
    return {
      reply: "⚠️ SYSTEM ALERT: Aeonza Core is offline. Please check your n8n terminal.",
      intent: 'SUPPORT',
      confidence: 0
    };
  }
};

export const bookAppointment = async (email: string) => {
  try {
    const response = await axios.post(N8N_BOOKING_URL, {
      email,
      date: new Date().toISOString(),
      action: "book_slot"
    });
    return response.data;
  } catch (error) {
    console.error("Booking Failed:", error);
    throw error;
  }
};