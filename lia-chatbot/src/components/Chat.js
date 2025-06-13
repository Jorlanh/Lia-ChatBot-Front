import React, { useState, useEffect } from 'react';
import { postMessageToLia } from '../api';

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Olá! 😊 Sou a LIA (Liga de Inclusão e Acessibilidade), sua assistente virtual. Como posso te ajudar hoje?",
      sender: "LIA",
      suggestions: ["Sobre o Projeto", "Tecnologia Assistiva", "Direitos e Leis", "Ajuda na Escola"],
      isConnected: true,
    },
  ]);

  const icons = {
    "Sobre o Projeto": "📝", "Tecnologia Assistiva": "💡", "Direitos e Leis": "⚖️", "Ajuda na Escola": "🤝",
    "Objetivos": "🎯", "Justificativa": "❓", "Metodologia": "🔬", "Impacto Esperado": "🚀", "Voltar ao Início": "↩️",
    "Exemplos de Software": "👨‍💻", "Exemplos de Hardware": "⚙️", "Recursos do Projeto": "💻", "O que é TA?": "❓",
    "Deficiência Visual": "👁️", "Dificuldade de Fala": "💬", "Deficiência Auditiva": "👂",
    "Contato da Coordenação": "☎️", "Eventos Acessíveis": "🎉", "Parcerias do Projeto": "👥", "Reportar um Problema": "🛠️",
  };

  const getIcon = (suggestion) => {
    return icons[suggestion] || '';
  };

  // Função para formatar texto com negrito em termos específicos
  const formatText = (text) => {
    if (!text) return text;
    let formattedText = text;
    const termsToBold = [
      "LIA", "Colégio Estadual Governador Roberto Santos", "TA", "inclusão", "acessibilidade",
      /\b\d+\b/g, // Números (ex.: 100, 250, 15)
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // E-mails (ex.: escola@example.com)
      "Lei Brasileira de Inclusão", "nº 13.146/2015", "NVDA", "Libras", "Disque 100",
      /\+\d+\s\d+/g, // Números de telefone (ex.: +55 71 3333-3333)
    ];
    termsToBold.forEach((term) => {
      if (term instanceof RegExp) {
        formattedText = formattedText.replace(term, (match) => `<strong>${match}</strong>`);
      } else {
        formattedText = formattedText.replace(new RegExp(`\\b${term}\\b`, 'g'), `<strong>${term}</strong>`);
      }
    });
    return formattedText;
  };

  const handleSubmit = async (e, suggestion = null) => {
    e?.preventDefault();
    const message = suggestion || input.trim();
    if (!message) return;

    if (suggestion) {
      // Adiciona a sugestão como mensagem do usuário e limpa o input
      const userMessage = { text: message, sender: "Usuário" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
    } else {
      // Adiciona a mensagem digitada como mensagem do usuário
      const userMessage = { text: message, sender: "Usuário" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
    }

    // Chama a API e adiciona a resposta da LIA
    const response = await postMessageToLia(message);
    const liaResponse = {
      text: formatText(typeof response.response === 'string' ? response.response : response.response),
      sender: "LIA",
      suggestions: response.suggestions || [],
      isConnected: response.isConnected !== undefined ? response.isConnected : true,
    };
    setMessages((prevMessages) => [...prevMessages, liaResponse]);
  };

  useEffect(() => {
    const chatScroll = document.getElementById('chat-scroll');
    if (chatScroll) {
      chatScroll.scrollTop = chatScroll.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 600 }}>
      {/* Header */}
      <header className="bg-blue-600 rounded-t-xl px-5 py-4 flex items-center gap-3">
        <img
          src="Lia-ChatBot.jpeg"
          alt="Avatar da LIA"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <div className="text-white leading-tight">
          <h1 className="font-extrabold text-lg -mb-0.5">LIA</h1>
          <p className="text-sm font-semibold">Sua Assistente Inclusiva</p>
        </div>
      </header>

      {/* Chat area */}
      <section
        id="chat-scroll"
        className="flex-1 overflow-y-auto p-5 space-y-4 bg-white"
        style={{ wordBreak: "break-word" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col gap-2 ${msg.sender === "Usuário" ? "items-end" : "items-start"}`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${msg.sender === "Usuário" ? "ml-auto" : ""}`}>
              {msg.sender === "LIA" && (
                <img
                  src="Lia-ChatBot.jpeg"
                  alt="Ícone LIA"
                  className="w-8 h-8 flex-shrink-0 rounded"
                  width={32}
                  height={32}
                />
              )}
              <div
                className={`p-3 text-sm leading-relaxed ${msg.sender === "Usuário" ? "bg-blue-100 text-blue-800 rounded-xl rounded-bl-none" : "bg-gray-300 text-gray-800 rounded-xl rounded-tl-none"}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 px-5 py-3 flex flex-col gap-3 rounded-b-xl">
        {!messages[messages.length - 1]?.isConnected && (
          <button
            type="button"
            className="self-start bg-blue-200 text-blue-800 text-sm font-semibold rounded-full px-3 py-1"
            onClick={handleSubmit}
          >
            Tentar Novamente
          </button>
        )}
        <div id="suggestions" className="flex flex-wrap gap-2 mb-3">
          {messages[messages.length - 1]?.suggestions && messages[messages.length - 1].isConnected && messages[messages.length - 1].suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-blue-200 transition-all duration-200 ease-in-out flex items-center"
              onClick={() => handleSubmit({ preventDefault: () => {} }, suggestion)}
            >
              <span className="mr-2">{getIcon(suggestion)}</span>
              {suggestion}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite a sua pergunta..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && input.trim() && handleSubmit(e)}
          />
          <button
            type="submit"
            aria-label="Enviar pergunta"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 flex items-center justify-center"
            disabled={!input.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </footer>
    </main>
  );
}

export default Chat;