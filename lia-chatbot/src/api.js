const API_URL = 'https://lia-chatbot-back.onrender.com';

const postMessageToLia = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
    const data = await response.json();
    return {
      response: data.response,
      suggestions: data.suggestions || [],
      isConnected: true,
    };
  } catch (error) {
    console.error("Erro ao comunicar com o backend:", error);
    return {
      response: "Desculpe, não consegui ligar-me ao meu cérebro. Verifique se o backend está a correr.",
      suggestions: ["Tentar Novamente"],
      isConnected: false,
    };
  }
};

export { postMessageToLia };