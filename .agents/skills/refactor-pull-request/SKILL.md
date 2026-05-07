---
name: refactor-pull-request
description: >
    Рефакторинг по замечаниям из Pull/Merge Request. Универсальный workflow для GitHub,
    GitLab и других git-hosting платформ через доступные MCP/CLI/API инструменты:
    загружает review threads/comments, определяет актуальные замечания, исправляет их
    строго в рамках ревью и готовит отчёт.
argument: '<URL Pull/Merge Request> [опционально: целевая ветка]'
---

# Рефакторинг Pull/Merge Request

## Термины

- **Request** — общее название для Pull Request, Merge Request и аналогичных сущностей.
- **PR** — термин GitHub.
- **MR** — термин GitLab.
- **Review thread** — обсуждение или комментарий ревью, привязанный к строке diff или к request целиком.

## Когда использовать

Используй этот skill, когда пользователь просит:

- исправить замечания из PR/MR;
- отрефакторить ветку по ревью;
- закрыть unresolved discussions;
- применить замечания из review comments;
- продолжить работу по ссылке на Pull/Merge Request.

Если URL request не передан и пользователь просит обычный рефакторинг текущей ветки, используй [refactoring](../refactoring/SKILL.md).

## Главный принцип

Источник задачи — замечания из request. Не переходи к самостоятельному рефакторингу всей ветки без явного решения пользователя.

Исправляй только:

- актуальные unresolved/open review comments;
- замечания, которые пользователь явно попросил учесть;
- минимально необходимые сопутствующие правки для прохождения проверок.

## Выбор инструмента

Определи provider по URL request или `git remote get-url origin`.

Затем выбери доступный инструмент:

1. MCP/plugin текущей AI-среды для provider, если он умеет читать review threads/comments.
2. CLI provider:
    - GitHub: `gh`
    - GitLab: `glab`
3. REST/GraphQL API provider, если токен уже настроен и безопасен.
4. Fallback: попроси пользователя передать текст замечаний или экспорт review comments.

Если пользователь дал URL request, но загрузить замечания автоматически нельзя, остановись и предложи варианты:

- настроить provider CLI/MCP/API и повторить;
- передать замечания вручную;
- перейти к обычному локальному рефакторингу через [refactoring](../refactoring/SKILL.md).

## Алгоритм

### 1. Подготовка контекста

Прочитай релевантные правила проекта:

- `.agents/skills/code-review/SKILL.md`
- `.agents/skills/architecture/SKILL.md`
- `.agents/skills/typescript/SKILL.md`
- `.agents/skills/naming/SKILL.md`
- `.agents/skills/react-components/SKILL.md`
- `.agents/skills/styling/SKILL.md`
- `.agents/skills/testing/SKILL.md`
- `.agents/skills/storybook/SKILL.md`
- `.agents/skills/performance/SKILL.md`
- `.agents/skills/documentation-update/SKILL.md`

Собери локальный git-контекст:

```bash
git status --short --branch
git branch --show-current
git remote get-url origin
```

Если рабочее дерево грязное, отдели существующие пользовательские изменения от будущих правок. Не перетирай их.

### 2. Получение metadata request

Нужно получить:

- title и description;
- source branch и target branch;
- список изменённых файлов;
- URL/номер request;
- автора и reviewers, если доступно;
- review threads/comments.

Если локальная ветка не совпадает с source branch request, согласуй переключение или fetch.

### 3. Загрузка замечаний

Собери все review comments и discussions:

- inline-комментарии к diff;
- unresolved/open threads;
- обычные комментарии request, если они содержат задачи на исправление;
- review summaries с requested changes.

Исключай:

- resolved threads;
- устаревшие комментарии к коду, которого уже нет;
- служебные сообщения bot/CI без action item;
- повторяющиеся комментарии с тем же смыслом.

Если provider не отдаёт статус resolved/unresolved, собери все комментарии и пометь их как `needs-triage`.

### 4. Проверка актуальности

Для каждого замечания определи статус:

| Статус              | Значение                                                           |
| ------------------- | ------------------------------------------------------------------ |
| `actual`            | Замечание применимо к текущему коду и требует исправления          |
| `already-fixed`     | Код уже исправлен                                                  |
| `outdated`          | Комментарий относится к старому diff и больше неприменим           |
| `needs-clarify`     | Нужен выбор человека или неясно, что именно изменить               |
| `wont-fix-for-task` | Замечание выходит за рамки текущего request, нужен отдельный scope |

Для inline-комментариев прочитай текущий файл и ближайший контекст. Не доверяй только номеру строки: код мог сдвинуться.

Перед правками покажи пользователю краткую классификацию, если:

- есть `needs-clarify`;
- есть крупные архитектурные варианты;
- часть замечаний выглядит устаревшей;
- исправления заметно расширяют scope.

### 5. Исправление

Исправляй `actual` замечания минимально достаточными правками.

Правила:

- не добавляй улучшения сверх замечаний;
- не меняй поведение, если замечание было про стиль или структуру;
- если замечание требует тест, добавь или обнови тест;
- если замечание меняет публичное соглашение, обнови документацию по [documentation-update](../documentation-update/SKILL.md);
- если несколько замечаний про один участок, исправь их одним согласованным изменением.

### 6. Верификация

Запусти релевантные проверки из `package.json`. Для типичного проекта:

```bash
npm run eslint:check
npm run typescript:check
npm run test:check
npm run stylelint:check
npm run prettier:check
```

Если изменения затрагивают runtime-код или сборочную конфигурацию, запусти:

```bash
npm run build
```

Если часть проверок не запускалась, явно объясни почему.

### 7. Отчёт

Сформируй отчёт:

```markdown
## Итоги исправления замечаний

Request: <url>

### Исправлено

- <замечание> -> <что изменено>

### Уже неактуально

- <замечание> -> <почему>

### Требует уточнения

- <замечание> -> <что нужно решить>

### Проверки

- `npm run ...` — успешно/не запускалось/упало
```

Если provider-инструмент умеет отвечать в threads или resolve discussions, делай это только после успешной верификации и только для реально исправленных/неактуальных замечаний. Не отмечай thread resolved, если исправление не проверено.

## GitHub-адаптер

### Получение request

```bash
gh pr view <url-or-number> --json title,body,headRefName,baseRefName,author,files,reviewDecision,reviews,comments
gh pr diff <url-or-number>
```

### Review comments через API

REST API полезен для списка inline comments, но не всегда даёт удобный статус resolved thread:

```bash
gh api repos/<owner>/<repo>/pulls/<number>/comments
gh api repos/<owner>/<repo>/issues/<number>/comments
gh api repos/<owner>/<repo>/pulls/<number>/reviews
```

Для unresolved/resolved review threads предпочитай GraphQL, если доступен:

```graphql
query ($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
        pullRequest(number: $number) {
            reviewThreads(first: 100) {
                nodes {
                    id
                    isResolved
                    path
                    line
                    comments(first: 50) {
                        nodes {
                            id
                            body
                            author {
                                login
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Если GraphQL недоступен, классифицируй комментарии как `needs-triage` и согласуй с пользователем, какие из них чинить.

## GitLab-адаптер

### Получение request

```bash
glab mr view <url-or-number>
glab mr diff <url-or-number>
```

### Discussions через API

Используй `glab api` или provider MCP/API для получения discussions. Нужны поля:

- body комментария;
- file path и line, если комментарий inline;
- признак `resolvable`;
- признак `resolved`;
- id discussion/thread.

Если есть unresolved resolvable discussions, чини их первыми.

## Generic fallback

Если request comments нельзя получить автоматически:

1. Попроси пользователя вставить текст замечаний или экспорт discussions.
2. Для каждого замечания попроси указать файл/строку, если это не ясно из текста.
3. Работай по тому же алгоритму актуальности и исправления.

## Обработка ошибок

- **Нет доступа к request**: сообщи, что нужна авторизация provider CLI/MCP/API.
- **Provider не распознан**: попроси URL репозитория или текст замечаний.
- **Комментарии не содержат action items**: сообщи, что исправлять нечего, и предложи обычный локальный refactoring.
- **Замечание неоднозначно**: не угадывай, попроси решение человека.
- **Проверки упали не из-за твоих правок**: отдели существующую проблему от новых изменений и сообщи об этом.

## Важно

- Не исправляй resolved/outdated comments без просьбы пользователя.
- Не resolve/reply comments, если текущая среда не подтверждает успешную публикацию.
- Не публикуй секреты из diff или логов.
- Не делай force-push, rebase или squash без явного согласия.
- Не меняй target branch request.
