import { useState, useRef, useEffect } from "react";
import { Send, X, Minimize2 } from "lucide-react";
import { callEcoAI } from "@/lib/ecoAI";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Props {
  userId?: string;
  userName?: string;
  onGameInvite?: (gameType: string) => void;
}

const EcoHamsterAI = ({ userId = "guest", userName = "Friend", onGameInvite }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: `Привет, ${userName}! 🐹 Я твой эко-помощник! Готов помочь с эко-квестами, викторинами и узнать больше о планете. Давай спасать Землю вместе! 🌍`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const conversationHistory = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const systemPrompt = `Ты - Эко-помощник хомяк. Ты помогаешь пользователям узнавать о экологии, окружающей среде и устойчивом развитии. 
    Ты можешь:
    1. Отвечать на вопросы об экологии
    2. Предлагать эко-квесты и игры
    3. Давать советы по сохранению энергии и воды
    4. Рассказывать интересные факты о природе
    5. Мотивировать на участие в экологических проектах
    
    Пользователь: ${userName} (ID: ${userId})
    Будь дружелюбным, позитивным и мотивирующим. Используй эмодзи для наглядности.`;

    const aiResponse = await callEcoAI(input, conversationHistory, systemPrompt);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);

    // Проверяем, предлагает ли AI пользователю игру
    if (
      aiResponse.toLowerCase().includes("игра") ||
      aiResponse.toLowerCase().includes("квест")
    ) {
      if (onGameInvite) {
        onGameInvite("ecorace");
      }
    }
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer flex items-center justify-center z-40 hover:scale-105"
        onClick={() => setIsMinimized(false)}
      >
        <span className="text-3xl">🐹</span>
      </div>
    );
  }
    <div className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 border border-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🐹</span>
          <div>
            <h3 className="text-white font-bold">Эко-помощник</h3>
            <p className="text-green-100 text-sm">Всегда готов помочь</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <Minimize2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setMessages([])}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-green-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-green-100 text-green-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-green-100 text-green-900 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-green-50 border-t border-green-100">
        <button
          onClick={() => {
            const msg = {
              id: Date.now().toString(),
              role: "assistant" as const,
              content: "Отлично! Переходим в EcoRace 🏎️ Покажи свои эко-навыки! 🌍",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, msg]);
            if (onGameInvite) onGameInvite("ecorace");
          }}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition"
        >
          🏎️ EcoRace
        </button>
        <button
          onClick={() => {
            const msg = {
              id: Date.now().toString(),
              role: "assistant" as const,
              content: "Отлично! Начинаем викторину 🎮 Проверим твои эко-знания! 🌱",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, msg]);
            if (onGameInvite) onGameInvite("quiz");
          }}
          className="px-3 py-2 bg-purple-500 text-white rounded-lg text-xs font-bold hover:bg-purple-600 transition"
        >
          🎮 Викторина
        </button>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-green-100 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Спроси меня о природе..."
            className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoHamsterAI;
