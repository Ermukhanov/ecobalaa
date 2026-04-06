# ✅ Checklist перед загрузкой на GitHub

Перед тем как запушить на GitHub, проверь что все готово:

## 📋 Файлы проекта

- [ ] **src/ папка** содержит:
  - [ ] `App.tsx` - обновлена с EcoHamsterAI
  - [ ] `components/Onboarding.tsx` - обновлена с routing на формы
  - [ ] `components/EcoHamsterAI.tsx` - новый файл с AI assistant
  - [ ] `lib/ecoAI.ts` - новый файл с API функциями

- [ ] **HTML файлы в корне** обновлены:
  - [ ] `teacher-login.html` - новый файл с Supabase auth
  - [ ] `kids.html` - "Kahoot" → "EcoGame" везде
  - [ ] `teacher.html` - "Kahoot" → "EcoGame" везде
  - [ ] `register-kids.html`, `register-teen.html`, `register.html` - существуют и доступны

- [ ] **Документация создана**:
  - [ ] `ECOGAME_SETUP.md` - полная инструкция по Setup
  - [ ] `AI_INTEGRATION.md` - информация по AI hamster
  - [ ] `READY_TO_DEPLOY.md` - deployment checklist
  - [ ] `GITHUB_DEPLOY_README.md` - инструкция по GitHub загрузке

- [ ] **SQL scripts готовы**:
  - [ ] `ecogame_complete_setup.sql` - полная SQL schema
  - [ ] `teacher_schema.sql` - опционально, для teacher данных

- [ ] **Deploy scripts**:
  - [ ] `deploy-to-github.bat` - Windows автоматическая загрузка
  - [ ] `deploy-to-github.ps1` - PowerShell версия

## 🔐 Security & Credentials

- [ ] **API Keys БЕЗОПАСНЫ**:
  - [ ] AI API Key (sk-I3ehqk94TiQHwW3V5SS0RQ) НЕ hardcoded в git
  - [ ] Supabase keys НЕ находятся в репозитории
  - [ ] `.env` файл добавлен в `.gitignore`
  - [ ] `.gitignore` содержит node_modules, dist, build, .env

- [ ] **GitHub Access**:
  - [ ] Репозиторий создан: https://github.com/Ermukhanov/EcoBala-v.1
  - [ ] У тебя есть доступ к репозиторию
  - [ ] Personal Access Token или SSH KEY готов (если HTTPS требует)

## 💾 Данные & Конфигурация

- [ ] **package.json не требует изменений**:
  - [ ] Dependencies установлены (npm install или bun install)
  - [ ] Scripts работают (npm run dev, npm run build)

- [ ] **Tailwind & CSS**:
  - [ ] `tailwind.config.ts`, `postcss.config.js` существуют
  - [ ] Все компоненты используют Tailwind классы

- [ ] **TypeScript**:
  - [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` хорошо сконфигурены
  - [ ] Нет серьезных TS errors

## 🎮 Функциональность

- [ ] **Hamster AI integrация**:
  - [ ] `window.EcoAI` глобальный объект работает
  - [ ] llm.alem.ai API endpoint правильный
  - [ ] Hamster видно в приложении (except onboarding)

- [ ] **Бренд "EcoGame"**:
  - [ ] "Kahoot" полностью заменен на "EcoGame" везде
  - [ ] Классы CSS обновлены: `.kahoot-*` → `.ecogame-*`
  - [ ] Функции переименованы: `openKahoot()` → `openEcoGame()`

- [ ] **Onboarding Routing**:
  - [ ] Kids → `/register-kids.html`
  - [ ] Teen → `/register-teen.html`
  - [ ] Teacher → `/register.html` (или `/teacher-login.html`)

- [ ] **Teacher Login Form**:
  - [ ] Форма доступна по адресу `/teacher-login.html`
  - [ ] Supabase auth интегрирована
  - [ ] School selection dropdown работает
  - [ ] Bilingual (RU/KZ) переключение работает

## 📊 База Данных (Для выполнения ПОСЛЕ загрузки на GitHub)

- [ ] **SQL Schema готов (НО ЕЩЕ НЕ ВЫПОЛНЕН)**:
  - [ ] `ecogame_complete_setup.sql` содержит все 6 tables
  - [ ] Indexes созданы для performance
  - [ ] RLS policies настроены для security
  - [ ] ⚠️ **Нужно выполнить в Supabase after GitHub push!**

## 🚀 Git & GitHub

- [ ] **Git конфигурация**:
  - [ ] `git config --global user.name` установлен
  - [ ] `git config --global user.email` установлен

- [ ] **Файлы готовы к загрузке**:
  - [ ] Нет node_modules в git (должен быть в .gitignore)
  - [ ] Нет .env файлов (должны быть в .gitignore)
  - [ ] Нет build/ dist/ файлов (должны быть в .gitignore)

## ⚠️ Потенциальные Проблемы

- [ ] **Большие файлы?**
  - [ ] bun.lockb меньше 100MB (иначе используй Git LFS)
  - [ ] Нет видео/аудио файлов большого размера

- [ ] **Sensitive информация?**
  - [ ] Нет паролей в коде
  - [ ] Нет API ключей в коде
  - [ ] Нет personal данных

- [ ] **Пути правильные?**
  - [ ] Все импорты используют правильные пути
  - [ ] Нет hardcoded путей типа "C:\Users\..."

## 📝 Документация

- [ ] **README.md** основная информация о проекте:
  - [ ] Описание проекта
  - [ ] Как установить
  - [ ] Как запустить
  - [ ] Структура проекта

- [ ] **Документация готова**:
  - [ ] ECOGAME_SETUP.md описывает всю систему
  - [ ] AI_INTEGRATION.md описывает hamster
  - [ ] GITHUB_DEPLOY_README.md описывает deployment

## 📱 Финальная Проверка

### Перед запуском скрипта:

```bash
# Проверь что в проекте
ls -la

# Проверь git статус (должен быть чистым или с неследимыми файлами)
git status

# (Optional) Запусти dev сервер для проверки
npm run dev  # или bun run dev
# Проверь что все работает в браузере
```

---

## ✅ Готов к Загрузке?

Если все checked:

### Windows пользователей:

```bash
# Вариант 1: BAT скрипт
./deploy-to-github.bat

# или Вариант 2: PowerShell
./deploy-to-github.ps1
```

### Все остальное:

```bash
# Ручная загрузка
git init
git add .
git commit -m "Initial commit: EcoBala EcoGame Platform"
git remote add origin https://github.com/Ermukhanov/EcoBala-v.1.git
git branch -M main
git push -u origin main
```

---

## 🎯 ПОСЛЕ Загрузки на GitHub

✅ Загрузил на GitHub
👇 Дальше что делать:

1. **Verify on GitHub**
   - Открой https://github.com/Ermukhanov/EcoBala-v.1
   - Проверь что все файлы там

2. **Выполни SQL Schema в Supabase**
   - Откройте Supabase Dashboard
   - SQL Editor → New Query
   - Скопируй весь `ecogame_complete_setup.sql`
   - Выполни как одну транзакцию

3. **Протестируй систему**
   - Run: `npm run dev` или `bun run dev`
   - Проверь Teacher Login
   - Проверь Hamster AI
   - Проверь EcoGame buttons

---

**Дата создания**: 2024  
**Версия**: 1.0  
**Статус**: 🟢 Ready for Deployment
