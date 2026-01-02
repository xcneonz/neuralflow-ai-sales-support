import axios from 'axios';

const N8N_CHAT_URL = "http://localhost:5678/webhook-test/intent";
const N8N_BOOKING_URL = "http://localhost:5678/webhook-test/send-appointment"; 
const N8N_SCORING_URL = "http://localhost:5678/webhook-test/score-lead";
const N8N_SENTIMENT_URL = "http://localhost:5678/webhook-test/analyze-sentiment";
const N8N_ETL_URL = "http://localhost:5678/webhook-test/clean-data";

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
      reply: "SYSTEM ALERT: Aeonza Core is offline. Please check your n8n terminal.",
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


export const scoreLead = async (name: string, jobTitle: string, company: string, message: string) => {
  try {
    const response = await axios.post(N8N_SCORING_URL, {
      name, jobTitle, company, message
    });
    return response.data; 
  } catch (error) {
    console.error("Lead Scoring Failed:", error);
    return null;
  }
};


export const analyzeSentiment = async (message: string) => {
  try {
    const response = await axios.post(N8N_SENTIMENT_URL, { message });
    return response.data; 
  } catch (error) {
    console.error("Sentiment Check Failed:", error);
    return { sentiment: "NEUTRAL" }; 
  }
};

export const cleanData = async (name: string, email: string) => {
  try {
    const response = await axios.post(N8N_ETL_URL, { name, email });
    return response.data; 
  } catch (error) {
    console.error("ETL Cleaning Failed:", error);
    return { clean_name: name, status: "UNKNOWN" };
  }
};