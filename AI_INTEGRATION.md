# EcoBala AI Integration Guide

## Обзор

Проект EcoBala теперь имеет интегрированного AI хомяка-ассистента 🐹 который:
- Отвечает на вопросы об экологии
- Приглашает пользователей на игры
- Предлагает эко-советы и квесты
- Говорит в профиле и вызывает пользователей на игру

## Компоненты

### 1. EcoHamsterAI Component
**Path**: `src/components/EcoHamsterAI.tsx`

Компонент чата с хомяком-ассистентом. Автоматически добавляется в приложение на всех страницах кроме главной.

```tsx
import EcoHamsterAI from "@/components/EcoHamsterAI";

// Использование с параметрами
<EcoHamsterAI 
  userName="Alex" 
  userId="user123"
  onGameInvite={(gameType) => handleGame(gameType)}
/>
```

**Props**:
- `userName` (string): Имя пользователя для приветствия
- `userId` (string): ID пользователя для отслеживания
- `onGameInvite` (function): Callback при приглашении на игру

**Features**:
- 💬 Чат с сохранением истории
- 🎮 Кнопки быстрого доступа к играм (EcoRace, Викторина)
- 🐹 Минимизация/развёртывание
- ⚡ Живописные анимации
- 📱 Мобильная адаптация

### 2. EcoAI API Module
**Path**: `src/lib/ecoAI.ts`

Модуль для работы с AI API. Можно использовать в любом месте проекта.

#### Основная функция
```typescript
import { callEcoAI } from "@/lib/ecoAI";

const response = await callEcoAI(
  "Что такое парниковый эффект?",
  [], // историяпереписки (опционально)
  "Ты - эко-ассистент" // системный промпт (опционально)
);
```

#### Дополнительные функции
```typescript
// Приглашение на игру
const gameInvite = await inviteToGame("Alex", "ecorace");

// Получить эко-совет
const tip = await getEcoTip();

// Приветствие пользователя
const greeting = await greetUser("Alex", "kids");
```

## Конфигурация API

```javascript
API_BASE_URL: "https://llm.alem.ai/v1/chat/completions"
API_KEY: "sk-I3ehqk94TiQHwW3V5SS0RQ"
MODEL: "gpt-3.5-turbo"
TEMPERATURE: 0.7  // Креативность ответов
MAX_TOKENS: 500   // Максимальная длина ответа
```

## Обновленные файлы

### ✅ src/components/Onboarding.tsx
**Изменение**: Кнопга "Кіру / Тіркелу" теперь ведет на правильные формы входа/регистрации

```typescript
const getAuthUrl = () => {
  if (role === "kids") return "/register-kids.html";
  if (role === "teen") return "/register-teen.html";
  return "/register.html";
};

const next = () => {
  if (step < 2) {
    setStep(step + 1);
  } else {
    window.location.href = getAuthUrl(); // Переход на форму
  }
};
```

### ✅ src/App.tsx
**Изменение**: Автоматическое добавление компонента EcoHamsterAI по всему приложению

```typescript
const AppContent = () => {
  const location = useLocation();
  const showHamster = !location.pathname.match(/^\/$/) || location.search.includes("chat");
  
  return (
    <>
      <Routes>{/* ... */}</Routes>
      {showHamster && <EcoHamsterAI />}
    </>
  );
};
```

## Примеры использования

### В React компонентах
```tsx
import { callEcoAI } from "@/lib/ecoAI";

function ProfilePage() {
  const [advice, setAdvice] = useState("");
  
  const getAdvice = async () => {
    const result = await callEcoAI(
      "Дай мне совет по энергосбережению для подростков"
    );
    setAdvice(result);
  };
  
  return (
    <div>
      <button onClick={getAdvice}>Получить совет</button>
      <p>{advice}</p>
    </div>
  );
}
```

### Вызов игры
```tsx
function GameButton() {
  const handlePlayEcoRace = async () => {
    const invitation = await inviteToGame("Player", "ecorace");
    console.log(invitation);
    // Запустить игру
    startGame("ecorace");
  };
  
  return <button onClick={handlePlayEcoRace}>🏎️ Play EcoRace</button>;
}
```

## Тестирование

Хомяк по умолчанию появляется задержкой:
1. Перейди на любую страницу кроме главной
2. Должен появиться чат в правом нижнем углу 🐹
3. Напиши сообщение и нажми Send
4. Хомяк ответит через несколько секунд

## Возможные проблемы

### 🔴 "API error: 401" 
**Решение**: Проверь что API ключ правильный в `ecoAI.ts`

### 🔴 "Хомяк не появляется"
**Решение**: 
- Убедись что ты не на главной странице (`/`)
- Проверь консоль браузера на ошибки
- Очисти кэш браузера

### 🔴 "Медленные ответы"
**Решение**: Это нормально - зависит от скорости API сервера. Попробуй позже.

## Будущие улучшения

- [ ] Аватар хомяка с разными выражениями
- [ ] Сохранение истории чата в БД
- [ ] Поддержка голосовых сообщений
- [ ] Интеграция с системой достижений
- [ ] Мультиязычная поддержка
- [ ] Аналитика взаимодействия

## Контакты

При вопросах по AI интеграции - обратись к разработчикам команды.
