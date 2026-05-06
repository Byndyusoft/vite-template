---
name: typescript
description: Конвенции типизации TypeScript: строгий режим, префиксы T/I, брендированные типы, const assertions, env-переменные и запрещённые паттерны. Используй при определении типов, написании интерфейсов или проверке конвенций типизации.
---

# TypeScript

## Строгий TypeScript

Проект использует `strict: true`. Не ослабляй строгие настройки без отдельного решения команды.

Обязательные практики:

- не использовать `any` без крайней необходимости;
- предпочитать `unknown`, дженерики и сужение типов;
- явно типизировать публичные функции, хуки и компоненты;
- не отключать правила TypeScript и ESLint без объяснения причины.

## Префиксы типов

- Любой `type`, включая пропсы компонентов, именуй с префиксом `T`: `TEntityId`, `TButtonProps`.
- Любой `interface`, включая пропсы компонентов, именуй с префиксом `I`: `IEntity`, `IButtonProps`.
- Пропсы не являются исключением: если выбран `type`, используй `T*`; если выбран `interface`, используй `I*`.

## Nullable и callback-типы

- Если в проекте подключены общие типы вроде `Nullable` или `Callback`, используй их по существующему соглашению проекта.
- Если таких типов нет, не добавляй зависимость только ради обёртки над `T | null` или функцией.
- Для публичных контрактов избегай смешения разных форм nullable в одном файле.

## Запрещённые паттерны

- `any` без причины.
- `React.FC` для обычных компонентов: используй явную типизацию пропсов и возвращаемого значения.
- Инлайновые большие типы в параметрах функций: выноси в именованный `type` или `interface`.
- `defaultProps` и `PropTypes` в TypeScript-компонентах.

## Брендированные типы

Для идентификаторов и значений, где путаница опасна, используй брендированные типы:

```ts
type Brand<TValue, TBrand extends string> = TValue & { readonly __brand: TBrand };

type TCustomerId = Brand<number, 'CustomerId'>;
type TOrderId = Brand<number, 'OrderId'>;
```

## Const assertions

```ts
const entityStatus = {
    toDo: 'TO_DO',
    inProgress: 'IN_PROGRESS',
    done: 'DONE'
} as const;

export type TEntityStatus = typeof entityStatus;
export type TEntityStatusKey = keyof TEntityStatus;
export type TEntityStatusValue = TEntityStatus[TEntityStatusKey];
```

## Фиксированные списки значений

```ts
const intervals = ['hour', 'day', 'week', 'month', 'year'] as const;

type TInterval = (typeof intervals)[number];
```

## Типизация компонентов

```tsx
import type { InputHTMLAttributes, ReactElement } from 'react';

interface IEntityInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function EntityInput({ label, ...props }: IEntityInputProps): ReactElement {
    return <input aria-label={label} {...props} />;
}
```

## Переменные окружения

Новые env-переменные обязательно добавляй в типизацию и документацию. Подробнее см. [documentation-update](../documentation-update/SKILL.md).
