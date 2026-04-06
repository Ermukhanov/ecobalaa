# 🚀 Загрузка EcoBala на GitHub

Есть два варианта загрузки проекта на GitHub: с помощью .bat скрипта для Windows или PowerShell.

## Вариант 1: Windows BAT скрипт (Самый Простой)

### Шаг 1: Откройте PowerShell или CMD

В папке проекта (c:\Users\Acer Nitro\ecobalaa):
- Нажми **Shift + Right Click** в пустом месте папки
- Выбери "Open PowerShell here" или "Open Command Prompt here"

### Шаг 2: Запустите скрипт

```bash
./deploy-to-github.bat
```

Скрипт **автоматически**:
- ✅ Инициализирует git репозиторий
- ✅ Создаст .gitignore
- ✅ Configures git user
- ✅ Добавит все файлы
- ✅ Создаст коммит
- ✅ Добавит GitHub remote
- ✅ Загрузит на GitHub

### Результат

Увидишь что-то типа:
```
========================================
  🚀 EcoBala GitHub Auto-Deploy
========================================

✅ Перешли в: c:\Users\Acer Nitro\ecobalaa
✅ Git найден
✅ Git конфигурирован
...
🚀 Загружаю на GitHub...
[main 1a2b3c4] Initial commit: EcoBala EcoGame Platform
 50 files changed, 2000+ insertions(+)
========================================
  ✅ УСПЕШНО ЗАГРУЖЕНО НА GITHUB!
========================================
```

---

## Вариант 2: PowerShell скрипт

Если BAT не работает, используй PowerShell версию:

```bash
# Сначала разреши запуск скриптов (если нужно)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Затем запусти
./deploy-to-github.ps1
```

---

## Вариант 3: Ручная загрузка (если скрипты не работают)

Откройте PowerShell и выполните команды:

```bash
# Перейди в папку проекта
cd "c:\Users\Acer Nitro\ecobalaa"

# Инициализируй git
git init

# Конфигурация (замени на свои данные)
git config --global user.name "Ermukhanov"
git config --global user.email "your-email@example.com"

# Добавь все файлы
git add .

# Создай коммит
git commit -m "Initial commit: EcoBala EcoGame Platform"

# Добавь GitHub remote
git remote add origin https://github.com/Ermukhanov/EcoBala-v.1.git

# Переименуй main ветку
git branch -M main

# Загрузи
git push -u origin main
```

---

## 🔧 Когда запрос Credentials

Если Git попросит пароль/токен:

### Вариант A: Personal Access Token (Рекомендуется)

1. Иди на https://github.com/settings/tokens
2. Нажми "Generate new token" → "Generate new token (classic)"
3. Выбери:
   - ✅ repo (полный доступ к репозиториям)
   - ✅ admin:repo_hook (для webhooks)
4. Скопируй токен (он больше не покажется!)
5. Когда Git попросит пароль → вставь токен

### Вариант B: SSH ключ

1. Генерируй SSH ключ:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

2. Добавь на GitHub: https://github.com/settings/ssh
3. Используй SSH URL вместо HTTPS:
```bash
git remote set-url origin git@github.com:Ermukhanov/EcoBala-v.1.git
```

---

## ✅ Проверка результата

После загрузки проверь:

```bash
# Показывает лог коммитов
git log --oneline -5

# Показывает remote репозиторий
git remote -v

# Показывает текущую ветку и статус
git status
```

Или просто иди на:
**https://github.com/Ermukhanov/EcoBala-v.1**

Должны видеть все файлы проекта!

---

## 🐛 Решение проблем

### "fatal: your current branch 'master' does not have any upstream"

```bash
git branch -M main
git push -u origin main
```

### "The repository already exists"

Случайно запустил скрипт дважды? Это OK:
```bash
git status  # Проверь что все нормально
```

### "Permission denied"

Используй Personal Access Token (см выше Вариант A).

### "Could not resolve host"

Проблемы с интернетом или GitHub недоступен. Попробуй позже.

---

## 📞 Важные ссылки

- **Твой репозиторий**: https://github.com/Ermukhanov/EcoBala-v.1
- **GitHub Settings**: https://github.com/settings
- **Personal Tokens**: https://github.com/settings/tokens
- **SSH Keys**: https://github.com/settings/ssh

---

## 🎯 Дальнейшие шаги

После успешной загрузки:

1. **Запусти SQL schema в Supabase**:
   - Иди в Supabase Dashboard
   - Открой SQL Editor
   - Скопируй содержимое `ecogame_complete_setup.sql`
   - Выполни как одну транзакцию

2. **Протестируй приложение**:
   ```bash
   npm run dev  # Или bun run dev
   ```

3. **Проверь что работает**:
   - Заходи в приложение
   - Проверь Hamster AI
   - Тестируй Teacher Login Form
   - Провери что all "Kahoot" replaced с "EcoGame"

---

## 📝 Дополнительно

Хотя бы скрипт (.bat или .ps1) содержит:

✅ Проверка что Git установлен
✅ Создание .gitignore 
✅ Git инициализация
✅ Автоматическая конфигурация
✅ Обработка ошибок
✅ Информативные сообщения
✅ Проверка результата

Это намного проще чем писать команды вручную!

---

**Автор скриптов**: GitHub Copilot  
**Проект**: EcoBala EcoGame Platform  
**Дата создания**: 2024
