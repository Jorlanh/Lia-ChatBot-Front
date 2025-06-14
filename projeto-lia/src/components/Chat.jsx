import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const API_URL = 'https://lia-chatbot-back.onrender.com/api/chat';

async function postMessageToLia(message) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
    const data = await response.json();
    return {
      response: data.response || '',
      suggestions: data.suggestions || [],
      isConnected: true,
    };
  } catch (error) {
    console.error('Erro ao comunicar com o backend:', error);
    return {
      response: 'Desculpe, não consegui ligar-me ao meu cérebro. Verifique se o backend está a correr.',
      suggestions: ['Tentar Novamente'],
      isConnected: false,
    };
  }
}

const icons = {
  'Sobre o Projeto': '📝',
  'Tecnologia Assistiva': '💡',
  'Direitos e Leis': '⚖️',
  'Ajuda na Escola': '🤝',
  'Objetivos': '🎯',
  'Justificativa': '❓',
  'Metodologia': '🔬',
  'Impacto Esperado': '🚀',
  'Voltar ao Início': '↩️',
  'Exemplos de Software': '👨‍💻',
  'Exemplos de Hardware': '⚙️',
  'Recursos do Projeto': '💻',
  'O que é TA?': '❓',
  'Deficiência Visual': '👁️',
  'Dificuldade de Fala': '💬',
  'Deficiência Auditiva': '👂',
  'Contato da Coordenação': '☎️',
  'Eventos Acessíveis': '🎉',
  'Parcerias do Projeto': '👥',
  'Reportar um Problema': '🛠️',
  'Tentar Novamente': '🔄',
};

function getIcon(suggestion) {
  return icons[suggestion] || '';
}

function formatText(text) {
  if (!text) return text;
  let formattedText = text;
  const termsToBold = [
    'LIA',
    'Colégio Estadual Governador Roberto Santos',
    'TA',
    'inclusão',
    'acessibilidade',
    /\b\d+\b/g,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    'Lei Brasileira de Inclusão',
    'nº 13.146/2015',
    'NVDA',
    'Libras',
    'Disque 100',
    /\+\d+\s\d+/g,
  ];
  termsToBold.forEach((term) => {
    if (term instanceof RegExp) {
      formattedText = formattedText.replace(term, (match) => `<strong>${match}</strong>`);
    } else {
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      formattedText = formattedText.replace(new RegExp(`\\b${escapedTerm}\\b`, 'g'), `<strong>${term}</strong>`);
    }
  });
  return formattedText;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Olá! 😊 Sou a LIA (Liga de Inclusão e Acessibilidade), sua assistente virtual. Como posso te ajudar hoje?',
      sender: 'LIA',
      suggestions: ['Sobre o Projeto', 'Tecnologia Assistiva', 'Direitos e Leis', 'Ajuda na Escola'],
      isConnected: true,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e, suggestion = null) => {
    e?.preventDefault();
    const message = suggestion || input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { text: message, sender: 'Usuário' }]);
    setInput('');

    const response = await postMessageToLia(message);
    const liaResponse = {
      text: formatText(response.response || ''),
      sender: 'LIA',
      suggestions: response.suggestions || [],
      isConnected: response.isConnected !== undefined ? response.isConnected : true,
    };
    setMessages((prev) => [...prev, liaResponse]);
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <button
        aria-label={isOpen ? 'Fechar assistente LIA' : 'Abrir assistente LIA'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((v) => !v)}
        id="lia-assistant-button"
        type="button"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-1 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-amber-500 z-[1000] hover:shadow-xl"
      >
        <img
          src="/assets/Lia-ChatBot.jpeg"
          alt="Ícone da assistente virtual LIA"
          width={40}
          height={40}
          className="rounded-full flex-shrink-0"
          loading="lazy"
          onError={(e) => {
            console.error('Erro ao carregar Lia-ChatBot.jpeg:', e.target.src);
            e.target.src = '/Lia-ChatBot.jpeg'; // Tente a raiz do public/
            e.target.onerror = null; // Evita loop infinito
          }}
        />
        <span className="bg-amber-500 text-white font-semibold text-sm rounded-md px-3 py-1 select-none">
          assistente LIA
        </span>
      </button>

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="lia-chat-title"
        aria-hidden={!isOpen}
        className={`fixed bottom-20 right-6 w-[360px] max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[1100] ${isOpen ? 'flex' : 'hidden'}`}
      >
        <header
          id="lia-chat-header"
          className="bg-amber-500 text-white px-5 py-4 flex items-center gap-3 rounded-t-2xl select-none"
        >
          <img
            src="/assets/Lia-ChatBot.jpeg"
            alt="Avatar da assistente virtual LIA"
            width={36}
            height={36}
            loading="lazy"
            className="rounded-full flex-shrink-0"
            onError={(e) => {
              console.error('Erro ao carregar Lia-ChatBot.jpeg no cabeçalho:', e.target.src);
              e.target.src = '/Lia-ChatBot.jpeg'; // Tente a raiz do public/
              e.target.onerror = null; // Evita loop infinito
            }}
          />
          <div>
            <h1 id="lia-chat-title" className="font-extrabold text-lg -mb-0.5">
              LIA
            </h1>
            <p className="text-sm font-semibold opacity-90">Sua Assistente Inclusiva</p>
          </div>
          <button
            aria-label="Fechar assistente LIA"
            onClick={() => setIsOpen(false)}
            className="ml-auto bg-transparent border-none text-white text-2xl cursor-pointer p-0 leading-none focus:outline-none focus:ring-2 focus:ring-white rounded"
            type="button"
          >
            ×
          </button>
        </header>

        <section
          id="lia-chat-messages"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
          className="flex-1 overflow-y-auto p-5 space-y-4 bg-white"
          style={{ wordBreak: 'break-word' }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'Usuário' ? 'items-end ml-auto' : 'items-start'}`}
              tabIndex={0}
            >
              {msg.sender === 'LIA' ? (
                <div className="flex items-start gap-2">
                  <img
                    src="/assets/Lia-ChatBot.jpeg"
                    alt="Ícone LIA"
                    width={32}
                    height={32}
                    loading="lazy"
                    className="rounded-full"
                    onError={(e) => {
                      console.error('Erro ao carregar Lia-ChatBot.jpeg nas mensagens:', e.target.src);
                      e.target.src = '/Lia-ChatBot.jpeg'; // Tente a raiz do public/
                      e.target.onerror = null; // Evita loop infinito
                    }}
                  />
                  <div
                    className="p-3 text-sm leading-relaxed bg-gray-200 text-gray-800 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ) : (
                <div className="p-3 text-sm leading-relaxed bg-blue-100 text-blue-800 rounded-lg">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <div
          id="lia-chat-suggestions"
          className="px-5 pb-3 flex flex-wrap gap-2 bg-white rounded-b-2xl"
          aria-label="Sugestões de perguntas"
        >
          {lastMessage && lastMessage.suggestions && (
            <>
              {lastMessage.isConnected
                ? lastMessage.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-blue-200 transition-all duration-200 ease-in-out flex items-center gap-1 select-none"
                      onClick={() => handleSubmit(null, suggestion)}
                    >
                      <span>{getIcon(suggestion)}</span>
                      {suggestion}
                    </button>
                  ))
                : !lastMessage.isConnected &&
                  lastMessage.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-blue-200 transition-all duration-200 ease-in-out flex items-center gap-1 select-none"
                      onClick={() => handleSubmit(null, suggestion)}
                    >
                      <span>{getIcon(suggestion)}</span>
                      {suggestion}
                    </button>
                  ))}
            </>
          )}
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-gray-50 px-5 py-3 flex gap-2 rounded-b-2xl"
          aria-label="Enviar mensagem para LIA"
        >
          <input
            type="text"
            placeholder="Digite a sua pergunta..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                handleSubmit(e);
              }
            }}
            aria-autocomplete="list"
            aria-controls="lia-chat-suggestions"
            aria-describedby="lia-chat-input-desc"
            autoComplete="off"
            id="lia-chat-input"
          />
          <span id="lia-chat-input-desc" className="sr-only">
            Digite sua pergunta e pressione Enter para enviar
          </span>
          <button
            type="submit"
            aria-label="Enviar pergunta"
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-md p-2 flex items-center justify-center disabled:bg-amber-300 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </section>
    </>
  );
}