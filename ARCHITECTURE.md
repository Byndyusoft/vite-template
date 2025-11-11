# Архитектура и структура проекта

Этот документ описывает общую структуру и принципы организации кода проекта.

## Стек и инструменты

- React, TypeScript
- Vite (+ `@vitejs/plugin-react`, `vite-plugin-svgr`)
- Vitest (+ `@vitest/ui`, покрытие `@vitest/coverage-v8`)
- Storybook
- ESLint, Stylelint, Prettier

## Структура [WIP]

```
.
├─ public/           # статические ресурсы
├─ src/
│  ├─ assets/        # изображения, иконки, шрифты (если не public)
│  ├─ components/    # переиспользуемые UI‑компоненты
│  ├─ hooks/         # переиспользуемые React‑хуки
│  ├─ App.tsx        # корневой компонент приложения
│  ├─ main.tsx       # входная точка
│  └─ index.css      # глобальные стили (минимум)
├─ vite.config.ts    # конфигурация Vite
├─ vitest.config.ts  # конфигурация Vitest
├─ tsconfig.json     # базовая конфигурация TypeScript
└─ package.json
```

## Именование и импорт

- TypeScript: строгая типизация, избегаем `any` без необходимости.
- Компоненты: PascalCase, файлы компонентов `ComponentName.tsx`.
- SVG: импорт как React‑компонентов через `?react` (см. ниже).

### SVG

Для SVG используется [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr). Импорт в React‑коде:

```ts
import Logo from './logo.svg?react';
```

## Storybook

- Истории располагайте рядом с компонентами.
- Для наглядных UI‑изменений добавляйте скриншоты/видео в PR.

## Тестирование

- Юнит‑тесты Vitest: для утилит, хуков и компонентов с логикой.
- Цель по покрытию может регулироваться; рекомендуем ориентир 70%+.

## Стиль и форматирование

- ESLint и Stylelint проверяют код и стили.
- Prettier форматирует код единообразно.

## Производительность

- Используйте мемоизацию (`React.memo`, `useMemo`, `useCallback`) осмысленно.
- Следите за размерами бандла: `npm run build:analyze` поможет найти тяжёлые зависимости.
