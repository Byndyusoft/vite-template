---
name: documentation-update
description: Обновление документации проекта при изменениях кода, скриптов, архитектуры, AI-инструкций, skills и MCP-конфигов. Используй при добавлении env-переменных, изменении скриптов, архитектурных правил, документации или настроек AI-инструментов.
---

# Обновление документации проекта

Документация должна оставаться актуальной вместе с кодом. Этот skill описывает, что и когда обновлять.

## Матрица "изменение -> файлы"

| Изменение                                       | Файлы для обновления                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Новая или удалённая env-переменная              | `src/vite-env.d.ts` -> `README.md` -> `.env.*`, если такие файлы есть                    |
| Новый npm-скрипт                                | `package.json` -> `README.md`                                                            |
| Изменение стека или мажорной версии зависимости | `package.json` -> `README.md` -> `ARCHITECTURE.md`, если меняется структура              |
| Новый архитектурный паттерн                     | `.agents/skills/architecture/SKILL.md` -> `ARCHITECTURE.md`                              |
| Новое правило ревью                             | `.agents/skills/code-review/SKILL.md`                                                    |
| Новый стилевой токен, breakpoint или миксин     | `.agents/skills/styling/SKILL.md`                                                        |
| Новый паттерн тестирования                      | `.agents/skills/testing/SKILL.md`                                                        |
| Новое соглашение Storybook                      | `.agents/skills/storybook/SKILL.md`                                                      |
| Новая конвенция типизации                       | `.agents/skills/typescript/SKILL.md`                                                     |
| Новая конвенция именования                      | `.agents/skills/naming/SKILL.md`                                                         |
| Новый workflow создания request                 | `.agents/skills/create-pull-request/SKILL.md` -> `README.md`, если меняется onboarding   |
| Новый workflow ревью request                    | `.agents/skills/review-pull-request/SKILL.md` -> `.agents/skills/code-review/SKILL.md`   |
| Новый workflow исправления замечаний request    | `.agents/skills/refactor-pull-request/SKILL.md` -> `README.md`, если меняется onboarding |
| Изменение общих AI-инструкций                   | `AGENTS.md` -> `CLAUDE.md`, если меняется entrypoint -> `README.md`                      |
| Изменение MCP-настроек Codex                    | `.codex/config.toml` -> `README.md`                                                      |
| Изменение MCP-настроек Cursor                   | `.cursor/mcp.json` -> `README.md`                                                        |
| Изменение MCP-настроек Claude Code              | `README.md`, потому что конфиг Claude Code хранится вне репозитория                      |
| Изменение skills или документации               | `.agents/skills/code-review/SKILL.md`, если чек-лист ревью должен измениться             |

Стрелка `->` означает порядок обновления. Обновляй все файлы в цепочке за одну задачу.

## Канон AI-инструкций

- `AGENTS.md` — единственный канонический источник общих AI-инструкций проекта.
- `CLAUDE.md` — тонкий entrypoint для Claude Code, импортирующий `AGENTS.md`.
- Канонические skills живут только в `.agents/skills/*/SKILL.md`.
- IDE-specific файлы не должны дублировать общие проектные правила.
- Готовые многоагентные процессы не входят в шаблон; не добавляй процессные промпты и папки задач без отдельного решения команды проекта.

## Env-переменные

При добавлении или удалении env-переменной обновляй все места, где она описана:

1. `src/vite-env.d.ts` — типизация `ImportMetaEnv`.
2. `README.md` — раздел с переменными окружения, если он есть или нужен.
3. `.env.*` — значения по умолчанию для окружений, если такие файлы ведутся в проекте.

Feature-флаги типизируй как `'true' | 'false'` или более строгий проектный тип.

```ts
interface ImportMetaEnv {
    readonly VITE_FEATURE_ENABLED?: 'true' | 'false';
    readonly VITE_SERVICE_URL: string;
}
```

## README.md: скрипты

При добавлении нового скрипта в `package.json` добавь строку в раздел "Скрипты" README.md.

Формат: `` `npm run script-name` — описание ``.

## README.md: стек

При обновлении мажорной версии зависимости или добавлении нового инструмента обнови строку "Стек" в шапке README.md.

## Переиспользуемый UI и утилиты

Если продуктовый проект ведёт список общих компонентов, хуков или утилит в `react-components/SKILL.md`, обновляй его при создании, удалении или переименовании таких сущностей.

## MCP и platform-specific config layer

- Для Codex repo-level MCP-конфиг живёт в `.codex/config.toml`.
- Для Cursor MCP-конфиг хранится в `.cursor/mcp.json`.
- Для Claude Code desktop конфиг приложения внешний; в репозитории документируй только шаги настройки.
- Не дублируй AI-инструкции в MCP-конфигах. Эти файлы описывают transport/config layer, а не проектные правила.

## AGENTS.md и CLAUDE.md

- Обновляй `AGENTS.md` при структурных изменениях: новые ограничения, скрипты, общий onboarding, канонические пути.
- Обновляй `CLAUDE.md` только если меняется entrypoint, import `AGENTS.md` или краткие Claude-specific примечания.

## Чеклист верификации

- [ ] Все файлы из матрицы обновлены.
- [ ] Env-переменные синхронизированы.
- [ ] README отражает актуальные скрипты, стек и AI/MCP-настройки.
- [ ] `AGENTS.md` остаётся единственным каноническим источником общих AI-инструкций.
- [ ] `CLAUDE.md` остаётся thin entrypoint без дублирования shared-контента.
- [ ] Описания на русском языке.
- [ ] Форматирование консистентно с остальной документацией.
- [ ] При изменениях MCP обновлены нужные platform-specific конфиги и README.
- [ ] В шаблон случайно не добавлены проектно-специфичные процессы, платформенные workflow или доменные инструкции.
