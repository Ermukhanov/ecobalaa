/**
 * EcoBala AI API Module
 * Используется для интеграции с LLM API (llm.alem.ai)
 */

const AI_CONFIG = {
  API_BASE_URL: "https://llm.alem.ai/v1/chat/completions",
  API_KEY: "sk-I3ehqk94TiQHwW3V5SS0RQ",
  MODEL: "gpt-3.5-turbo",
  TEMPERATURE: 0.7,
  MAX_TOKENS: 500,
};

/**
 * Отправляет сообщение в AI и получает ответ
 * @param {string} userMessage - Сообщение пользователя
 * @param {Array} conversationHistory - История переписки (опционально)
 * @param {string} systemPrompt - Системный промпт (опционально)
 * @returns {Promise<string>} Ответ от AI
 */
export async function callEcoAI(
  userMessage,
  conversationHistory = [],
  systemPrompt = "Ты - Эко-помощник хомяк по имени Эко. Ты помогаешь пользователям узнавать об экологии и устойчивом развитии. Будь дружелюбным, позитивным и мотивирующим."
) {
  try {
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...conversationHistory,
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await fetch(AI_CONFIG.API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_CONFIG.API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.MODEL,
        messages: messages,
        temperature: AI_CONFIG.TEMPERATURE,
        max_tokens: AI_CONFIG.MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return "Извини, ассистент временно недоступен 🐹";
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      console.error("Invalid API response", data);
      return "Ошибка обработки ответа 🐹";
    }

    return aiMessage;
  } catch (error) {
    console.error("AI API Error:", error);
    return "Произошла ошибка соединения с AI 🐹. Попробуй позже!";
  }
}

/**
 * Предлагает игру через хомяка
 * @param {string} userName - Имя пользователя
 * @param {string} gameType - Тип игры ('ecorace' или 'quiz')
 * @returns {Promise<string>} Приглашение на игру
 */
export async function inviteToGame(userName = "Friend", gameType = "ecorace") {
  const gameNames = {
    ecorace: "EcoRace 🏎️",
    quiz: "Эко-викторину 🎮",
    quest: "Эко-квест 🎯",
  };

  const gameName = gameNames[gameType] || "игру";
  const invitation = `${userName}, хочешь поиграть в ${gameName}? Это поможет тебе узнать больше об экологии и заработать Eco Points! 🎮✨`;

  // Отправляем в AI для интересного ответа
  const systemPrompt =
    "Ты - Эко-помощник. Предложи интересную и мотивирующую игру в стиле дружелюбного хомяка.";
  return await callEcoAI(invitation, [], systemPrompt);
}

/**
 * Даёт случайный эко-совет
 * @returns {Promise<string>} Эко-совет от хомяка
 */
export async function getEcoTip() {
  const tips = [
    "Как я могу сэкономить воду в быту?",
    "Какие причины глобального потепления?",
    "Как начать раздельный сбор мусора?",
    "Почему важна переработка пластика?",
    "Как помочь планете своими действиями?",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const systemPrompt =
    "Ты - дружелюбный эко-помощник хомяк. Дай полезный, интересный и мотивирующий совет на казахском и русском.";

  return await callEcoAI(randomTip, [], systemPrompt);
}

/**
 * Начинает разговор с хомяком при входе на сайт
 * @param {string} userName - Имя пользователя
 * @param {string} userRole - Роль пользователя ('kids', 'teen', 'teacher')
 * @returns {Promise<string>} Приветствие от хомяка
 */
export async function greetUser(userName = "Friend", userRole = "kids") {
  const greeting = `Привет, ${userName}! Я твой личный эко-помощник 🐹`;

  const systemPrompt = `Ты - Эко-помощник по имени Эко. Ты говоришь с ${
    userRole === "kids"
      ? "ребёнком"
      : userRole === "teen"
        ? "подростком"
        : "учителем"
  }. Дай дружелюбное и мотивирующее приветствие. Упомяни что помогаешь с эко-квестами, викторинами и советами.`;

  return await callEcoAI(greeting, [], systemPrompt);
}

// Для использования в HTML файлах через скрипты
if (typeof window !== "undefined") {
  window.EcoAI = {
    callEcoAI,
    inviteToGame,
    getEcoTip,
    greetUser,
  };
}

export default {
  callEcoAI,
  inviteToGame,
  getEcoTip,
  greetUser,
};
