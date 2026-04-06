@echo off
REM ============================================================
REM  ECOBALA AUTO-DEPLOY TO GITHUB
REM  Скрипт для автоматической загрузки проекта на GitHub
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   🚀 EcoBala GitHub Auto-Deploy
echo ========================================
echo.

set PROJECT_PATH=c:\Users\Acer Nitro\ecobalaa
set GITHUB_URL=https://github.com/Ermukhanov/EcoBala-v.1.git
set GITHUB_USER=Ermukhanov
set GITHUB_EMAIL=your-email@example.com

REM Проверь что проект папка существует
if not exist "%PROJECT_PATH%" (
    echo ❌ ОШИБКА: Папка проекта не найдена: %PROJECT_PATH%
    pause
    exit /b 1
)

cd /d "%PROJECT_PATH%"
echo ✅ Перешли в: %PROJECT_PATH%
echo.

REM Проверь есть ли git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ОШИБКА: Git не установлен! Установи Git и повтори.
    pause
    exit /b 1
)
echo ✅ Git найден
echo.

REM Конфигурация git (если первый раз)
echo 📋 Настройка git...
git config --global user.name "%GITHUB_USER%" 2>nul
git config --global user.email "%GITHUB_EMAIL%" 2>nul
echo ✅ Git конфигурирован
echo.

REM Инициализируй git если нужно
if not exist ".git" (
    echo 🔧 Инициализирую git репозиторий...
    git init
    echo ✅ Git репозиторий инициализирован
) else (
    echo ✅ Git репозиторий уже существует
)
echo.

REM Проверь .gitignore
if not exist ".gitignore" (
    echo 📝 Создаю .gitignore...
    (
        echo # Dependencies
        echo node_modules/
        echo package-lock.json
        echo bun.lock
        echo bun.lockb
        echo.
        echo # Environment variables
        echo .env
        echo .env.local
        echo .env.*.local
        echo.
        echo # Build outputs
        echo dist/
        echo build/
        echo .vite/
        echo .cache/
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo *~
        echo.
        echo # OS
        echo .DS_Store
        echo Thumbs.db
        echo.
        echo # Logs
        echo *.log
        echo npm-debug.log*
        echo.
        echo # Testing
        echo coverage/
        echo .nyc_output/
        echo.
        echo # Misc
        echo .turbo/
    ) > .gitignore
    echo ✅ .gitignore создан
) else (
    echo ✅ .gitignore уже существует
)
echo.

REM Добавь все файлы
echo 📦 Добавляю файлы в git...
git add .
if errorlevel 1 (
    echo ❌ ОШИБКА при добавлении файлов
    pause
    exit /b 1
)
echo ✅ Файлы добавлены
echo.

REM Проверь что есть, что коммитить
git status --short | find "." >nul
if errorlevel 1 (
    echo ⚠️ Нет изменений для коммита
) else (
    echo 📝 Создаю коммит...
    git commit -m "Initial commit: EcoBala EcoGame Platform

- Complete EcoGame quiz system integrated
- Teacher login/registration with Supabase
- AI hamster assistant with llm.alem.ai API
- Replaced Kahoot with EcoGame
- SQL schema for games, teachers, and leaderboards
- Comprehensive documentation and setup guides"

    if errorlevel 1 (
        echo ⚠️ Ошибка коммита - может быть все уже закоммичено
    ) else (
        echo ✅ Коммит создан
    )
)
echo.

REM Проверь есть ли уже remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Добавляю remote репозиторий...
    git remote add origin %GITHUB_URL%
    echo ✅ Remote добавлен: %GITHUB_URL%
) else (
    echo ⚠️ Remote уже существует
    echo 📝 Обновляю URL...
    git remote set-url origin %GITHUB_URL%
    echo ✅ URL обновлен
)
echo.

REM Переименуй main ветку если нужно
echo 🔀 Настраиваю main ветку...
git branch -M main 2>nul
echo ✅ Branch main готов
echo.

REM Загружай на GitHub
echo 🚀 Загружаю на GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ ОШИБКА при загрузке!
    echo.
    echo Это может быть потому что:
    echo 1. Ты не авторизован в GitHub
    echo 2. Неправильный URL репозиторий
    echo 3. Проблемы с сетью
    echo.
    echo Попробуй:
    echo - Проверь что репозиторий https://github.com/Ermukhanov/EcoBala-v.1 существует
    echo - Авторизуйся: git config --global credential.helper wincred
    echo - Или используй SSH ключи вместо HTTPS
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo   ✅ УСПЕШНО ЗАГРУЖЕНО НА GITHUB!
    echo ========================================
    echo.
    echo 📍 Репозиторий: %GITHUB_URL%
    echo 📍 Ветка: main
    echo.
    echo Посмотри результат:
    echo https://github.com/Ermukhanov/EcoBala-v.1
    echo.
)

REM Показай статус
echo 📊 Информация репозиторий:
echo.
git log --oneline -5
echo.
git remote -v
echo.

pause
