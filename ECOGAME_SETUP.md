# EcoBala — Интеграция EcoGame и Teacher Panel

## 📋 Что было сделано

### 1. ✅ Форма входа/регистрации учителей
**File**: `teacher-login.html`
- Полная интеграция с Supabase Auth
- Поддержка двух языков (РУ/КЗ)
- Регистрация по ФИ, почте, паролю, школе
- Выбор школы из БД или добавление своей
- Валидация (минимум 8 символов пароль, проверка почты)
- Стильный интерфейс с анимациями

**Функции**:
- `handleLogin()` - вход по почте и паролю
- `handleRegister()` - регистрация нового учителя
- `loadSchools()` - загрузка списка школ
- `selectSchool()` - выбор школы или добавление своей

### 2. ✅ SQL схема для Supabase
**Files**: 
- `ecogame_schema.sql` - основные таблицы игры
- `teacher_schema.sql` - таблицы учителей и школ

**Таблицы**:
```
schools           - список школ
teachers          - профили учителей
teacher_games     - созданные игры
teacher_stats     - статистика учителя
ecogame_rooms     - игровые комнаты
ecogame_questions - вопросы
ecogame_options   - варианты ответов
ecogame_participants - игроки
ecogame_answers   - ответы игроков
ecogame_leaderboard - итоговый рейтинг
```

### 3. ✅ Замена Kahoot! на EcoGame
**Files**: `kids.html`, `teacher.html`

**Все замены**:
- `openKahoot()` → `openEcoGame()`
- `#kahootScreen` → `#ecogameScreen`
- `.ks-` (classes) → `.egs-` (classes)
- "Kahoot!" → "EcoGame"
- Все ссылки в чат-ботах обновлены

### 4. ✅ Новые файлы интеграции
**Files**:
- `ecogame-teacher.html` - учительская панель для создания игр
- `ecogame-join.html` - экран присоединения к комнате
- `ecogame-play.html` - игровой процесс
- `ecogame-reviews.html` - рецензии на вопросы

---

## 🚀 Инструкции по развертыванию

### Шаг 1: Создание таблиц в Supabase

1. Откройте Supabase Dashboard → SQL Editor
2. Выполните SQL из `teacher_schema.sql`:
   ```sql
   -- Скопируйте содержимое teacher_schema.sql и выполните
   ```
3. Выполните SQL из `ecogame_schema.sql`:
   ```sql
   -- Скопируйте содержимое ecogame_schema.sql и выполните
   ```

### Шаг 2: Включение RLS политик

1. Для каждой таблицы включите RLS (Row Level Security)
2. Политики уже определены в SQL файлах
3. Проверьте что все политики активны в безопасности

### Шаг 3: Обновление supabase2.js

Убедитесь что в `supabase2.js` указаны правильные ключи:
```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR-ANON-KEY';
```

### Шаг 4: Интеграция в навигацию

**Для ролей**:
- **Дети**: kids.html → откроет EcoGame
- **Подростки**: teen.html → откроет EcoGame
- **Учители**: teacher-login.html → форма входа → ecogame-teacher.html

---

## 🔗 Маршруты и навигация

```
/ (Index)
├── role-selection
│   ├── kids → kids.html
│   ├── teen → teen.html
│   └── teacher → teacher-login.html
│
├── kids.html / teen.html
│   └── openEcoGame() → ecogame-join.html
│       └── joinRoom() → ecogame-play.html
│
└── teacher-login.html
    ├── login → /teacher-login.html
    ├── register → /teacher-login.html
    └── success → ecogame-teacher.html
        ├── createRoom() → generates code
        ├── showTab('ecogame') → create game
        ├── showTab('board') → board view
        └── showTab('history') → game history
```

---

## ⚙️ Генерация кодов комнат

### Как работает:
1. Учитель нажимает "Создать комнату" в `ecogame-teacher.html`
2. Функция `createRoom()` генерирует 6-символьный код (A-Z, 0-9)
3. Код сохраняется в таблицу `ecogame_rooms`
4. Дети вводят код в `ecogame-join.html`
5. Система проверяет код в реальном времени через Supabase

### SQL для проверки кодов:
```sql
-- Получить комнату по коду
SELECT * FROM ecogame_rooms WHERE code = '{{ roomCode }}' AND status != 'finished';

-- Добавить участника
INSERT INTO ecogame_participants (room_id, nickname, avatar_emoji)
VALUES ('{{ roomId }}', '{{ nickname }}', '{{ emoji }}');

-- Начать игру
UPDATE ecogame_rooms SET status = 'active', started_at = NOW()
WHERE id = '{{ roomId }}';
```

---

## 💾 Структура данных для игры

### Создание игры (учитель):
```javascript
{
  room_id: "uuid",
  code: "AX7B2Q",        // 6-символьный код
  title: "Викторина по воде",
  teacher_id: "uuid",
  teacher_name: "Иван Петров",
  status: "lobby|active|finished",
  current_q: 0,          // индекс вопроса (0-based)
  q_started_at: timestamp,
  created_at: timestamp,
  started_at: timestamp,
  finished_at: timestamp
}
```

### Присоединение игрока (дети):
```javascript
{
  room_id: "uuid",
  user_id: "uuid",       // null для анонимных
  nickname: "Арсения",
  avatar_emoji: "🌱",
  role: "player|teacher",
  score: 0,
  is_online: true,
  joined_at: timestamp
}
```

### Ответы:
```javascript
{
  room_id: "uuid",
  question_id: "uuid",
  participant_id: "uuid",
  option_id: "uuid",
  is_correct: true/false,
  answered_in_ms: 5000,  // время ответа в мс
  points_earned: 1000,
  answered_at: timestamp
}
```

---

## 🔐 Безопасность и RLS

### Политики доступа:
- ✅ Учителя видят только свои игры
- ✅ Дети видят только присоединенные комнаты
- ✅ Результаты защищены от tampering
- ✅ Учитель может модерировать участников

### Проверка RLS:
```sql
-- Включить RLS для таблицы
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Создать политику
CREATE POLICY "teachers_own_profile" ON teachers
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 🎮 Игровой процесс

### Шаги:
1. **Учитель создает комнату** → код генерируется
2. **Дети присоединяются** → вводят код
3. **Учитель начинает игру** → вопрос 1 показывается
4. **Дети отвечают** → в течение времени вопроса
5. **Тайм-аут вопроса истекает** → показываются результаты
6. **Переход к следующему вопросу** → шаги 3-5 повторяются
7. **Конец игры** → показываемый рейтинг и результаты

### Время вопроса: 5-120 секунд (регулируется)

---

## 🧪 Тестирование

### Проверка кодов:
```bash
# Генерировать код
6-символьный код: [A-Z0-9]{6}
Примеры: AX7B2Q, K9M3PL, Z5X8WR

# Формат все в верхнем регистре
```

### Тестовые учетные данные:
```
Email: test@school.kz
Password: TestPassword123
School: СШ №1 г. Астана
```

### Проверка комнат:
1. Войти в ecogame-teacher.html
2. Создать комнату
3. Получить код
4. Открыть ecogame-join.html в другой вкладке
5. Ввести код
6. Присоединиться
7. Проверить что participant добавлен в БД

---

## 📊 Аналитика и рейтинги

### Автоматически вычисляется:
- Общий счет по вопросам
- Скорость ответа (влияет на бонусные очки)
- Рейтинг среди игроков
- Медали: 🥇🥈🥉 (top 3)
- Eco Points зачисляются после игры

### SQL для рейтинга:
```sql
SELECT 
  p.nickname,
  p.avatar_emoji,
  COUNT(CASE WHEN a.is_correct THEN 1 END) as correct_answers,
  SUM(a.points_earned) as total_points,
  AVG(a.answered_in_ms) as avg_response_time,
  ROW_NUMBER() OVER (ORDER BY SUM(a.points_earned) DESC) as rank
FROM ecogame_participants p
LEFT JOIN ecogame_answers a ON p.id = a.participant_id
WHERE p.room_id = $1
GROUP BY p.id
ORDER BY rank;
```

---

## 🆘 Решение проблем

### Проблема: Коды не генерируются
- Проверьте что учитель залогинен в Supabase
- Проверьте RLS политики для таблицы ecogame_rooms
- Проверьте что кнопка "Создать комнату" работает

### Проблема: Дети не могут присоединиться
- Проверьте что код введен правильно (ВВЕРХ)
- Проверьте что комната еще не finish ed
- Проверьте консоль браузера на ошибки

### Проблема: Ответы не сохраняются
- Проверьте что таблица ecogame_answers создана
- Проверьте RLS политики
- Проверьте что participant_id вернах

### Проблема: Учитель не может войти
- Проверьте что таблица teachers создана
- Проверьте что email верный
- Проверьте что пароль >= 8 символов

---

## 📱 Поддерживаемые платформы

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Планшет (iPad, Android)
- ✅ Мобильный (iOS, Android)
- ✅ Проектор (SmartTV)

---

## 👥 Контакты и поддержка

При вопросах по интеграции EcoGame обратитесь к:
- **Backend**: Проверьте Supabase Dashboard
- **Frontend**: Посмотрите консоль браузера (F12)
- **DB**: Используйте SQL Editor в Supabase

---

## 📝 Дополнительные файлы

Все файлы связанные с EcoGame:
```
✅ teacher-login.html       - вход учителей
✅ ecogame-teacher.html      - панель учителя
✅ ecogame-join.html         - присоединение к игре
✅ ecogame-play.html         - игровой процесс
✅ ecogame-reviews.html      - рецензии
✅ ecogame_schema.sql        - схема игры
✅ teacher_schema.sql        - схема учителей
✅ kids.html (updated)        - обновлено на EcoGame
✅ teacher.html (updated)     - обновлено на EcoGame
```

---

**Дата**: 6 апреля 2026\
**Статус**: Готово к развертыванию\
**Версия**: EcoBala 2.0 с EcoGame
