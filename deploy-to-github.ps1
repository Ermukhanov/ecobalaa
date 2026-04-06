#!/usr/bin/env powershell
# ============================================================
#  ECOBALA AUTO-DEPLOY TO GITHUB (PowerShell version)
#  Скрипт для автоматической загрузки на GitHub
# ============================================================

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🚀 EcoBala GitHub Auto-Deploy" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$projectPath = "c:\Users\Acer Nitro\ecobalaa"
$githubUrl = "https://github.com/Ermukhanov/EcoBala-v.1.git"
$githubUser = "Ermukhanov"
$githubEmail = "your-email@example.com"

# Проверь что папка существует
if (-not (Test-Path $projectPath)) {
    Write-Host "❌ ОШИБКА: Папка проекта не найдена: $projectPath" -ForegroundColor Red
    Read-Host "Нажми Enter для выхода"
    exit 1
}

Set-Location $projectPath
Write-Host "✅ Перешли в: $projectPath" -ForegroundColor Green
Write-Host ""

# Проверь git
try {
    git --version | Out-Null
    Write-Host "✅ Git найден" -ForegroundColor Green
} catch {
    Write-Host "❌ ОШИБКА: Git не установлен!" -ForegroundColor Red
    Read-Host "Нажми Enter для выхода"
    exit 1
}
Write-Host ""

# Конфигурация git
Write-Host "📋 Настройка git..." -ForegroundColor Cyan
git config --global user.name $githubUser 2>&1 | Out-Null
git config --global user.email $githubEmail 2>&1 | Out-Null
Write-Host "✅ Git конфигурирован" -ForegroundColor Green
Write-Host ""

# Инициализируй git если нужно
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Инициализирую git репозиторий..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git репозиторий инициализирован" -ForegroundColor Green
} else {
    Write-Host "✅ Git репозиторий уже существует" -ForegroundColor Green
}
Write-Host ""

# Создай .gitignore если нужно
if (-not (Test-Path ".gitignore")) {
    Write-Host "📝 Создаю .gitignore..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
package-lock.json
bun.lock
bun.lockb

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.vite/
.cache/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
.turbo/
"@ | Set-Content -Path ".gitignore" -Encoding UTF8
    Write-Host "✅ .gitignore создан" -ForegroundColor Green
} else {
    Write-Host "✅ .gitignore уже существует" -ForegroundColor Green
}
Write-Host ""

# Добавь файлы
Write-Host "📦 Добавляю файлы в git..." -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ОШИБКА при добавлении файлов" -ForegroundColor Red
    Read-Host "Нажми Enter для выхода"
    exit 1
}
Write-Host "✅ Файлы добавлены" -ForegroundColor Green
Write-Host ""

# Проверь что есть, что коммитить
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "📝 Создаю коммит..." -ForegroundColor Yellow
    git commit -m "Initial commit: EcoBala EcoGame Platform

- Complete EcoGame quiz system integrated
- Teacher login/registration with Supabase
- AI hamster assistant with llm.alem.ai API
- Replaced Kahoot with EcoGame
- SQL schema for games, teachers, and leaderboards
- Comprehensive documentation and setup guides"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Коммит создан" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Ошибка коммита - может быть все уже закоммичено" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Нет изменений для коммита" -ForegroundColor Yellow
}
Write-Host ""

# Проверь remote
try {
    $remoteUrl = git config --get remote.origin.url
    Write-Host "⚠️ Remote уже существует" -ForegroundColor Yellow
    Write-Host "📝 Обновляю URL..." -ForegroundColor Yellow
    git remote set-url origin $githubUrl
    Write-Host "✅ URL обновлен" -ForegroundColor Green
} catch {
    Write-Host "🔗 Добавляю remote репозиторий..." -ForegroundColor Yellow
    git remote add origin $githubUrl
    Write-Host "✅ Remote добавлен: $githubUrl" -ForegroundColor Green
}
Write-Host ""

# Переименуй main ветку
Write-Host "🔀 Настраиваю main ветку..." -ForegroundColor Cyan
git branch -M main 2>&1 | Out-Null
Write-Host "✅ Branch main готов" -ForegroundColor Green
Write-Host ""

# Загрузи на GitHub
Write-Host "🚀 Загружаю на GitHub..." -ForegroundColor Cyan
Write-Host ""
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ОШИБКА при загрузке!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Это может быть потому что:" -ForegroundColor Yellow
    Write-Host "1. Ты не авторизован в GitHub"
    Write-Host "2. Неправильный URL репозиторий"
    Write-Host "3. Проблемы с сетью"
    Write-Host ""
    Write-Host "Попробуй:" -ForegroundColor Yellow
    Write-Host "- Проверь что репозиторий https://github.com/Ermukhanov/EcoBala-v.1 существует"
    Write-Host "- Авторизуйся: git config --global credential.helper wincred"
    Write-Host "- Или используй SSH ключи вместо HTTPS"
    Write-Host ""
    Read-Host "Нажми Enter для выхода"
    exit 1
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ УСПЕШНО ЗАГРУЖЕНО НА GITHUB!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Репозиторий: $githubUrl" -ForegroundColor Green
    Write-Host "📍 Ветка: main" -ForegroundColor Green
    Write-Host ""
    Write-Host "Посмотри результат:" -ForegroundColor Cyan
    Write-Host "https://github.com/Ermukhanov/EcoBala-v.1" -ForegroundColor Green
    Write-Host ""
}

# Показай статус
Write-Host "📊 Информация репозиторий:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Последние коммиты:" -ForegroundColor Yellow
git log --oneline -5
Write-Host ""
Write-Host "Remotes:" -ForegroundColor Yellow
git remote -v
Write-Host ""

Read-Host "Нажми Enter для выхода"
