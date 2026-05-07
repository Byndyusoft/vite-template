# Vite React Template

// TODO: заполнить согласно требованиям проекта
Описание проекта: готовый к работе шаблон фронтенд-приложения на React, TypeScript и Vite с преднастроенными линтерами, форматерами, тестами, Storybook и контекстом для AI-агентов.

- **Стек**: React 19, TypeScript 5, Vite 7, Vitest 4, Storybook 10, ESLint 9, Stylelint 16, Prettier 3
- **Node.js**: 20.19+ или 22.12+ и выше

Сопутствующие документы:

- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — договорённости по разработке и взаимодействию
- [SECURITY.md](./SECURITY.md) — политика безопасности и сообщение об уязвимостях
- [SUPPORT.md](./SUPPORT.md) — как получить помощь
- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура и структура проекта
- [AGENTS.md](./AGENTS.md) — единый канон AI-инструкций для Cursor, Claude Code и Codex
- [CLAUDE.md](./CLAUDE.md) — точка входа для Claude Code, импортирующая `AGENTS.md`

// TODO: убрать из раздела упоминание шаблона после создания проекта

## Быстрый старт проекта

Создать новый проект из шаблона через [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit Byndyusoft/vite-template#main new-project-dir
cd new-project-dir
npm install
npm run dev
```

Локально проект стартует на `http://localhost:5173` (порт может отличаться).

## Первичная настройка из шаблона

После создания нового проекта из шаблона запусти AI-агента с промптом из [AI_AGENT_PROJECT_SETUP_PROMPT.md](./AI_AGENT_PROJECT_SETUP_PROMPT.md). Он поможет проанализировать реальный проект, провести анализ в формате "вопрос-ответ" по подключаемым модулям (HTTP layer, UI-библиотека, роутинг, state, формы, auth, i18n, тесты, Storybook, MCP), заполнить TODO в документации, адаптировать `.agents/skills/*`, MCP/IDE-конфиги и request-шаблоны под выбранный git-provider и процессы команды.

## Скрипты

- `npm run dev` — запуск dev-сервера Vite
- `npm run build` — сборка проекта
- `npm run build:analyze` — сборка с анализом бандла в `dist/stats.html` (`vite-bundle-analyzer`)
- `npm run storybook` — запуск Storybook
- `npm run build-storybook` — сборка Storybook
- `npm run test:check` — запуск тестов Vitest в CLI
- `npm run test:watch` — запуск тестов Vitest в CLI с режимом слежения за изменениями
- `npm run test:ui` — запуск Vitest UI
- `npm run test:coverage` — запуск тестов с покрытием
- `npm run eslint:check` / `npm run eslint:fix` — проверка/исправление ESLint
- `npm run stylelint:check` / `npm run stylelint:fix` — проверка/исправление Stylelint
- `npm run prettier:check` / `npm run prettier:fix` — проверка/форматирование Prettier
- `npm run typescript:check` — проверка типизации TypeScript
- `npm run prepare` — установка Git‑хуков (Husky)

## Требования к совместимости проекта

// TODO: заполнить согласно требованиям проекта

1. Совместимость с браузерами
    - Google chrome
    - Firefox
    - Safari

2. Совместимость с устройствами
    - PC
    - Tablet
    - Mobile

3. Разрешение дисплея
    - 1440px
    - 640px
    - 360px

## AI-инструкции и MCP

Проект разделяет:

- единый канон AI-инструкций — `AGENTS.md` и `.agents/skills/*`
- platform-specific config layer для MCP — `.codex/config.toml`, `.cursor/mcp.json`, внешний конфиг Claude Code

Общие правила не дублируются в IDE-конфигах: MCP-файлы описывают только подключение инструментов.

### Figma MCP

#### Настройка для Codex

1. Пометить проект как trusted в Codex, чтобы клиент прочитал repo-level `.codex/config.toml`.
2. Убедиться, что в репозитории есть секция `Figma` в `.codex/config.toml`.
3. Если клиент Codex запросит авторизацию Figma, завершить её в интерфейсе Codex.

#### Настройка для Cursor

1. Зайти в **Settings** > **MCP**.
2. Включить MCP.
3. Авторизоваться через сайт Figma.

#### Настройка для Claude Code

Для Claude Code desktop используй внешний конфиг приложения или встроенные Connectors, если они доступны в установленной версии клиента.

### AI-IDE contract

- `AGENTS.md` — единый источник истины для общих AI-инструкций проекта.
- `CLAUDE.md` — обёртка для Claude Code, импортирующий `AGENTS.md`.
- `.agents/skills/*/SKILL.md` — канонические skills проекта.
- `.agents/skills/create-pull-request/SKILL.md`, `.agents/skills/review-pull-request/SKILL.md` и `.agents/skills/refactor-pull-request/SKILL.md` — provider-neutral workflow для Pull/Merge Request через доступные MCP/CLI/API инструменты.
- `.codex/config.toml` — repo-level MCP-конфиг для Codex.
- `.cursor/mcp.json` — MCP-конфиг для Cursor.

## [Поддержка](./SUPPORT.md)
