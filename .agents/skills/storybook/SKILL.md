---
name: storybook
description: Истории Storybook, структура stories, autodocs, args/controls и визуальная проверка состояний компонентов. Используй при создании историй, настройке Storybook или документировании UI-компонентов.
---

# Storybook

## Назначение

1. Каталог компонентов и фич.
2. Независимая frontend-разработка.
3. Демонстрация UI-состояний.
4. Визуальная проверка edge cases.
5. Документация публичных пропсов компонентов.

## Где хранить истории

- Для root/demo-компонентов шаблона допустима папка `src/__stories__/`.
- Для продуктовых компонентов предпочитай colocated stories рядом с компонентом: `ComponentName.stories.tsx`.
- Если фича демонстрирует несколько компонентов вместе, можно использовать `__stories__/` внутри фичи.

## Структура истории

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import Component from './Component';

const meta = {
    title: 'FeatureName/Component',
    component: Component,
    tags: ['autodocs']
} satisfies Meta<typeof Component>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
    args: {}
};
```

## Именование

- Файл истории: `ComponentName.stories.tsx`.
- `title` должен повторять структуру фичи или компонента.
- Названия stories должны описывать состояние: `Default`, `Loading`, `Empty`, `WithError`, `Disabled`.

## Args и controls

- Используй `args` для изменяемых пропсов.
- Не хардкодь состояния в story, если их можно выразить через `args`.
- Для callback-пропсов используй actions Storybook.

## Моки данных

Если проект подключил MSW или другой mock-layer, переиспользуй те же фикстуры и хэндлеры, что и в тестах. Не добавляй MSW только ради одной истории без необходимости.

## Обновление документации

При изменении Storybook-соглашений обнови этот файл. Подробнее см. [documentation-update](../documentation-update/SKILL.md).
