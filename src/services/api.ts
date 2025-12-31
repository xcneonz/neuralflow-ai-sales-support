import axios from 'axios';

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/intent";

export interface AIResponse {
  reply: string;
  intent: 'SALES' | 'SUPPORT';
  confidence: number;
}

export const sendMessageToAeonza = async (message: string, userContext: any): Promise<AIResponse> => {
  try {
  
    const response = await axios.post(N8N_WEBHOOK_URL, 
    {                                                     // Send the signal to the Brain
      message,
      context: userContext,
      timestamp: new Date().toISOString()
    }, {
      // allowing the browser to talk to the local server
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data;

  } catch (error) {
    console.error("Aeonza Disconnected:", error);
    // hmm acts as a fallback if n8n is offline
    return {
      reply: "⚠️ SYSTEM ALERT: Aeonza Core is offline. Please check your n8n terminal.",
      intent: 'SUPPORT',
      confidence: 0
    };
  }
};