# Vite React Template

Готовый к работе шаблон фронтенд‑приложения на React + TypeScript + Vite, с преднастроенными линтерами, форматерами, тестами, Storybook и полезными скриптами.

- **Стек**: React 19, TypeScript 5, Vite 7, Vitest 4, Storybook 10, ESLint 9, Stylelint 16, Prettier 3
- **Node.js**: 18 LTS и выше

Сопутствующие документы:

- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — договорённости по разработке и взаимодействию
- [SECURITY.md](./SECURITY.md) — политика безопасности и сообщение об уязвимостях
- [SUPPORT.md](./SUPPORT.md) — как получить помощь
- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура, структура проекта, алиасы
- [AI_GUIDE.md](./AI_GUIDE.md) — инструкции для ИИ‑агентов по работе с репозиторием

## Быстрый старт

Создать новый проект из шаблона через [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit Byndyusoft/vite-template#main new-project
cd new-project
npm install
npm run dev
```

Локально проект стартует на `http://localhost:5173` (порт может отличаться).

## Скрипты

- `npm run dev` — запуск dev-сервера Vite
- `npm run build` — сборка проекта
- `npm run build:analyze` — сборка с анализом бандла (`vite-bundle-analyzer`)
- `npm run storybook` — запуск Storybook
- `npm run build-storybook` — сборка Storybook
- `npm run test` — запуск тестов Vitest в CLI
- `npm run test:ui` — запуск Vitest UI
- `npm run test:coverage` — запуск тестов с покрытием
- `npm run eslint:check` / `npm run eslint:fix` — проверка/исправление ESLint
- `npm run stylelint:check` / `npm run stylelint:fix` — проверка/исправление Stylelint
- `npm run prettier:check` / `npm run prettier:fix` — проверка/форматирование Prettier
- `npm run prepare` — установка Git‑хуков (Husky)

## TODO шаблона

Обновить зависимости:

- [x] @byndyusoft/stylelint-config
- [x] storybook
- [x] @storybook/addon-essentials
- [x] @storybook/addon-interactions
- [x] @storybook/addon-links
- [x] @storybook/addon-onboarding
- [x] @storybook/blocks
- [x] @storybook/react
- [x] @storybook/react-vite
- [x] @storybook/test
- [ ] eslint ?
- [ ] prettier ?
- [ ] typescript ?
- [ ] vite ?

## [Поддержка](./SUPPORT.md)
