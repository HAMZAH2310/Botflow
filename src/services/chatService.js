/**
 * Service to handle communication with n8n chatbot webhooks.
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export const sendMessageToN8n = async (message, sessionId = 'default-user') => {
  if (!N8N_WEBHOOK_URL) {
    console.warn('n8n Webhook URL is not configured. Returning simulated response.');
    return {
      output: `Service not configured. You sent: "${message}". Please set VITE_N8N_WEBHOOK_URL in your .env file.`
    };
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n error (${response.status}):`, errorText);
      throw new Error(`n8n returned ${response.status}: ${errorText || response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      return { output: text };
    }
  } catch (error) {
    console.error('Network or Parse Error during n8n call:', error);
    throw error;
  }
};
