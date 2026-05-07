---
name: naming
description: Правила именования переменных, функций, типов, файлов и обработчиков. Используй при именовании сущностей или проверке конвенций именования.
---

# Именование

## Переменные и функции

- Переменные и функции: `camelCase`.
- Константы верхнего уровня: `UPPER_SNAKE_CASE`.
- Классы и компоненты: `PascalCase`.
- Хуки: префикс `use` (`usePagination`, `useOrders`).
- Избегай сокращений. В итераторах используй `index`, а не `i`, если это улучшает читаемость.

## Типы и интерфейсы

- Любой `type` именуй с префиксом `T`, включая пропсы компонентов: `TEntityId`, `TButtonProps`.
- Любой `interface` именуй с префиксом `I`, включая пропсы компонентов: `IEntity`, `IButtonProps`.

## Предикаты

Префиксы: `is`, `has`, `can`, `should`.

Примеры: `isActive`, `hasOrders`, `canUpload`, `shouldRender`.

## Списки

- Коллекции называй во множественном числе: `users`, `orders`.
- Количество называй через `Count`: `usersCount`, `ordersCount`.

## Внутренние методы компонентов

- Колбеки в пропсах: `on*` (`onClick`, `onUpdate`).
- Обработчики внутри: `handle*` (`handleClick`, `handleUpdate`).
- Рендер-функции: `render*` (`renderIcon`, `renderHelpText`).

## Метод P/A/HC/LC

Используй схему: префикс + действие + высокий контекст + низкий контекст.

| Имя                | Префикс | Действие | Высокий контекст | Низкий контекст |
| ------------------ | ------- | -------- | ---------------- | --------------- |
| getUser            |         | get      | User             |                 |
| getUserMessages    |         | get      | User             | Messages        |
| handleClickOutside |         | handle   | Click            | Outside         |
| isLoadingOrders    | is      | Loading  | Orders           |                 |
| shouldRenderOrders | should  | Render   | Orders           |                 |
| canUploadOrders    | can     | Upload   | Orders           |                 |

## Именование файлов

| Тип             | Паттерн                     |
| --------------- | --------------------------- |
| Доменная модель | `*.entity.ts`               |
| API-сервис      | `*.apiClient.ts`            |
| Контракт DTO    | `*.dto.ts`                  |
| Адаптер         | `*.adapter.ts`              |
| Утилиты         | `*.utilities.ts`            |
| Компонент       | `ComponentName.tsx`         |
| CSS Module      | `ComponentName.module.css`  |
| SCSS Module     | `ComponentName.module.scss` |
| Типы            | `ComponentName.types.ts`    |
| Тесты           | `*.test.ts`, `*.tests.tsx`  |
| Истории         | `*.stories.tsx`             |
| Фикстуры        | `*.fixtures.ts`             |
| Хэндлеры        | `*.handlers.ts`             |
