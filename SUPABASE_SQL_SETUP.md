# 🚨 КРИТИЧНО: Инструкция по SQL Setup в Supabase

## ⚠️ ПРОБЛЕМА
Когда пытаешься войти/зарегистрироваться, видишь **404 NOT_FOUND** ошибку.

**Причина**: В Supabase **нет таблиц**, которые нужны EcoBala для хранения профилей и игр.

---

## ✅ РЕШЕНИЕ: Выполнить SQL Script

### Шаг 1️⃣: Открой Supabase Dashboard
1. Иди на https://supabase.com/dashboard
2. Выбери свой проект EcoBala
3. В левой боковой панели найди **SQL Editor**

### Шаг 2️⃣: Создай New Query
- Клик на кнопку **"New Query"** или **"+"**
- Откроется пустой SQL редактор

### Шаг 3️⃣: Копируй SQL Script
**Есть два варианта:**

#### **Вариант A: ПОЛНЫЙ Setup (Рекомендуется)**
```
Файл: ecobala_full_setup.sql (в проекте)
Содержит:
- Таблица users (профили учеников)
- Таблица teachers (профили учителей)
- Таблицы для игр (room, questions, options, participants, answers, leaderboard)
- Indexes для скорости
- RLS Security Policies
```

Скопируй ВСЕ содержимое файла `ecobala_full_setup.sql`

#### **Вариант B: Только Игры (если уже есть auth)**
```
Файл: ecogame_complete_setup.sql
Содержит: Только таблицы для EcoGame
```

### Шаг 4️⃣: Вставь в SQL Editor
1. Открыл новый Query в Supabase
2. Нажми **Ctrl+A** чтобы выбрать все
3. Нажми **Ctrl+V** (или **Cmd+V** если Mac)
4. Вставь содержимое файла

### Шаг 5️⃣: Выполни Скрипт
- Нажми большую зелоную кнопку **"Run"** (внизу справа)
- ИЛИ Нажми **Ctrl+Enter**

### Шаг 6️⃣: Жди Результата
```
✓ (14 rows affect, 2.5s)
```

Должны видеть зелёный чекмарк и "rows affected".

**Если вместо этого видишь красный крест или ERROR** → Проверь точку 8️⃣ ниже

---

## 🔧 Проверка что создалось

После успешного выполнения, проверь в **Table Editor**:

1. Открой **Table Editor** (слева в боковой панели)
2. Должны видеть таблицы:
   - ✅ `users` (профили)
   - ✅ `teachers` (учителя)
   - ✅ `ecogame_rooms` (комнаты)
   - ✅ `ecogame_questions` (вопросы)
   - ✅ `ecogame_options` (варианты)
   - ✅ `ecogame_participants` (игроки)
   - ✅ `ecogame_answers` (ответы)
   - ✅ `ecogame_leaderboard` (рейтинг)

---

## ⚠️ Частые Ошибки и Решения

### Ошибка 1: "Relation ... already exists"
```
ERROR: relation "public.users" already exists
```
**Решение**: Это OK! Таблицы уже существуют. Нужно только обновить их.

Удали `CREATE TABLE IF NOT EXISTS` и загрузи `ALTER TABLE` скрипт вместо него.

### Ошибка 2: "Permission denied"
```
ERROR: permission denied for schema public
```
**Решение**: У твоего Supabase ключа нет прав. 
1. Иди в **Project Settings** (слева внизу)
2. Посмотри **Database** → **Supabase Config**
3. Убедись что используешь `CORRECT` Project URL и `SERVICE_ROLE_KEY` (не ANON KEY)

### Ошибка 3: "Foreign key violation"
```
ERROR: insert or update on table "ecogame_rooms" violates foreign key
```
**Решение**: Таблицы должны создаваться в правильном порядке.
- Сначала `users` и `teachers`
- Потом `ecogame_rooms` (использует teachers_id)
- Потом остальные

**Скрипт aвтоматически соблюдает порядок, так что эта ошибка не должна быть.**

---

## 🚀 Дальше

После того как SQL выполнен успешно:

### 1️⃣ Свежий Browser
Закрой старые табы с приложением и открой заново:
```
http://localhost:8080
```

### 2️⃣ Попробуй Регистрацию
1. Заходишь на http://localhost:8080 → Регистрация Kids
2. Заполняешь форму
3. Нажимаешь "Зарегистрироваться"
4. **Должно работать!** ✅

### 3️⃣ Если всё равно 404
1. Открой **Browser DevTools** (F12 → Console)
2. Посмотри логи что написано
3. Проверь что `supabase2.js` загружается без ошибок

---

## 📞 Debug: Как Проверить что Работает

### В Browser Console (F12 → Console)
```javascript
// Проверь что Supabase инициализирован
window.supabase
// Должен показать объект с методами

// Проверь URL
window.SUPABASE_URL
// Должен показать: "https://zngfwsuaaygryzpmynuv.supabase.co"

// Проверь что таблица существует
const { data } = await window.supabase.from('users').select('*').limit(1)
// Должен вернуть массив (может быть пустым [], но не ERROR)
```

### На самом Supabase
1. Открой **SQL Editor**
2. Напиши:
```sql
SELECT * FROM users LIMIT 1;
SELECT * FROM teachers LIMIT 1;
SELECT COUNT(*) FROM users;
```
3. Клик Run
4. Должны видеть результаты (может быть 0 rows, это нормально)

---

## 📋 Чеклист

- [ ] Файл `ecobala_full_setup.sql` скопирован из проекта
- [ ] Открыл SQL Editor в Supabase
- [ ] Вставил ВЕСЬ скрипт (не по частям!)
- [ ] Нажал Run
- [ ] Видно "✓ rows affected" без ошибок
- [ ] В Table Editor вижу таблицы created
- [ ] Закрыл и открыл заново браузер
- [ ] Пробую регистрацию → работает! ✅

---

## 🎯 Итого

**После выполнения SQL:**
- ✅ 404 ошибка исчезнет
- ✅ Регистрация будет работать
- ✅ EcoGame будет сохранять данные
- ✅ Профили будут работать

**Примерное время**: 5-10 минут

Если всё равно не работает после SQL → пиши в консоль что видишь (Error message)!
