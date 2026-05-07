# Промпт первичной настройки AI-агентного окружения

Используй этот промпт после создания нового проекта из шаблона. Его цель — заставить AI-агента проанализировать уже созданный проект, заполнить проектные TODO в документации и адаптировать AI-agent context под реальный стек, git-provider, UI-подход и процессы команды.

Промпт позволит добавить в проект следующие решения через опросник: PR/MR workflow, review/refactor request workflow, матрицу документации, каталог shared UI, MCP/IDE слой, проверки и шаблоны request.

## Как использовать

1. Создай новый проект из шаблона.
2. Добавь в репозиторий первичные исходники, env-примеры, CI/CD, UI-kit или хотя бы краткое описание продукта.
3. Открой проект в AI-IDE.
4. Скопируй промпт ниже целиком и отправь агенту из корня репозитория.
5. Проверь итоговый diff: агент должен обновить документацию и конфиги, но не должен добавлять секреты или чужую доменную специфику.

## Промпт

````text
Ты работаешь в новом проекте, созданном из Vite React Template. Нужно выполнить первичную настройку AI-агентного окружения и проектной документации.

Цель: проанализировать текущий репозиторий, заполнить шаблонные TODO и адаптировать AI-инструкции под реальный проект, не перенося чужую доменную специфику. В шаблоне есть наработки из более зрелого проекта, но их нужно применять как идеи и чек-листы, а не копировать буквально.

Важные ограничения:

- Не добавляй секреты, токены, приватные URL и персональные настройки в репозиторий.
- Не перетирай пользовательские изменения. Сначала проверь `git status --short --branch`.
- Используй только существующие скрипты из `package.json`; не выдумывай команды.
- Если данных не хватает, оставь понятный TODO или задай точечный вопрос.
- Все документы и комментарии в репозитории веди на русском языке.

## 1. Собери контекст проекта

Прочитай:

- `package.json`
- `README.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `CLAUDE.md`
- `.agents/skills/*/SKILL.md`
- `.github/*` и `.gitlab/*`, если есть
- `.codex/config.toml`, `.cursor/mcp.json`, если есть
- `.storybook/*`
- `vite.config.*`, `vitest.config.*`, `eslint.config.*`, `stylelint*`, `tsconfig*`
- `.env.example`, `.env.*`, `src/vite-env.d.ts`, если есть
- CI/CD и deploy-конфиги: `.github/workflows/*`, `.gitlab-ci.yml`, `Dockerfile*`, `ci/*`, если есть
- структуру `src/` на 2-3 уровня глубины

Определи:

- назначение продукта;
- основной git-provider: GitHub, GitLab, Bitbucket или другое;
- основную ветку: `main`, `master`, `dev` или другая;
- frontend stack и версии;
- фактическую архитектуру `src/`;
- есть ли shared UI/Common/Core/App/features;
- есть ли UI-kit компании или внешняя дизайн-система;
- как устроены стили: CSS, CSS Modules, SCSS Modules, tokens, mixins;
- как устроены тесты: Vitest, Testing Library, MSW, setup-файлы;
- как устроен Storybook;
- есть ли env-переменные, SEO, sitemap, robots, Docker, CI/CD;
- какие MCP/CLI/API инструменты реально нужны: Figma, GitHub, GitLab, browser, docs и т.д.

## 2. Проведи короткий вопрос-ответ по подключаемому функционалу

После автодетекта не начинай массово править документы, если важные решения не очевидны. Сначала сформируй короткую анкету: только вопросы, на которые нельзя уверенно ответить по репозиторию.

Правила анкеты:

- Не спрашивай о том, что уже видно из кода и конфигов.
- Группируй вопросы блоками.
- Для каждого вопроса предложи 2-4 варианта и рекомендуемый вариант, если он очевиден.
- Если пользователь не отвечает, оставляй нейтральный TODO, а не придумывай решение.
- Если ответ влияет на зависимости или архитектуру, не устанавливай пакеты без отдельного подтверждения.
- После ответов пользователя зафиксируй решения в `README.md`, `AGENTS.md`, `ARCHITECTURE.md` и релевантных `.agents/skills/*`.

Используй такой набор вопросов как конструктор:

### Продукт и домен

1. Как называется проект и какую задачу он решает?
2. Где хранить требования, бизнес-референсы, макеты и пользовательские сценарии: `references/`, `docs/`, issue tracker, Figma?
3. Есть ли доменные ограничения, которые AI-агент должен знать всегда?

### Архитектура frontend

1. Какой подход к структуре выбрать?
    - минимальная Vite-структура до появления фич;
    - `src/features/*` + `src/shared/*`;
    - фичи верхнего уровня в `src/*`;
    - другой существующий подход.
2. Нужны ли отдельные слои `App`, `Common/Shared`, `Core/Domain`?
3. Нужны ли публичные `index.ts` в папках и запрет deep imports?

### HTTP и API layer

1. Какой механизм HTTP-запросов использовать?
    - `fetch` без дополнительной зависимости;
    - `axios`;
    - `ky`;
    - сгенерированный API-клиент / OpenAPI;
    - уже существующий клиент проекта.
2. Где хранить API-клиенты и DTO?
    - внутри фич;
    - в shared/core слое;
    - отдельный `src/api`;
    - другой вариант.
3. Нужны ли адаптеры DTO -> domain entities?
4. Как обрабатывать ошибки, timeout, retry, auth headers?
5. Используется ли React Query, SWR или другой data-fetching слой?

### UI-библиотека и дизайн-система

1. Используем готовую UI-библиотеку?
    - company UI-kit;
    - Material UI;
    - Ant Design;
    - Radix/shadcn-подход;
    - без UI-библиотеки, свои компоненты.
2. Где вести каталог shared UI компонентов?
3. Какие компоненты уже есть и должны переиспользоваться?
4. Как фиксировать дизайн-токены: CSS variables, SCSS variables, Tailwind config, theme object?
5. Нужны ли правила “сначала проверять UI-kit, потом писать свой компонент”?

### Роутинг

1. Используется ли `react-router`, TanStack Router или другой роутер?
2. Где хранить route config?
3. Нужны ли protected routes, lazy routes, error boundaries на уровне маршрутов?

### State management

1. Чем управлять состоянием?
    - локальный React state/context;
    - Zustand;
    - Redux Toolkit;
    - MobX;
    - TanStack Query для server state;
    - другое.
2. Где хранить store/slices/context?
3. Какие состояния запрещено класть в global store?

### Формы и валидация

1. Используется ли форма/валидация?
    - native controlled inputs;
    - React Hook Form;
    - Formik;
    - Zod/Yup/Valibot;
    - другое.
2. Где хранить схемы валидации?
3. Как отображать ошибки и accessibility для форм?

### Auth и permissions

1. Есть ли авторизация?
2. Где хранить токены/session state?
3. Нужны ли role/permission guards?
4. Как обновлять токены и обрабатывать 401/403?

### i18n и тексты

1. Проект одноязычный или мультиязычный?
2. Где хранить тексты: inline, словари, i18next, lingui, другой инструмент?
3. Как обрабатывать pluralization/date/number formatting?

### Стили и адаптив

1. Основной подход к стилям: CSS, CSS Modules, SCSS Modules, Tailwind, CSS-in-JS?
2. Какие breakpoints и целевые разрешения?
3. Какие браузеры поддерживаются?
4. Есть ли требования по dark theme, reduced motion, accessibility?

### Тестирование и моки

1. Нужны ли Testing Library и `user-event`?
2. Нужен ли MSW для HTTP-моков?
3. Где хранить fixtures/handlers?
4. Нужен ли общий `TestEnvironment` с providers/router/query client?
5. Какие проверки обязательны перед PR?

### Storybook

1. Storybook используется как каталог UI, визуальная проверка или документация?
2. Где хранить stories?
3. Нужны ли decorators/providers?
4. Нужны ли MSW handlers в stories?

### Git-provider и request workflow

1. Provider: GitHub, GitLab, Bitbucket или другое?
2. Основная ветка: `main`, `dev`, `master`, другая?
3. Чем создавать request: MCP/plugin, `gh`, `glab`, API, вручную?
4. Нужен ли split shared/task request?
5. Нужно ли авто-ревью через `review-pull-request` перед открытием request?
6. Нужно ли исправление review comments через `refactor-pull-request`?

### MCP/IDE

1. Какие MCP нужны проекту?
    - Figma;
    - GitHub;
    - GitLab;
    - browser;
    - docs/files;
    - другое.
2. Какие настройки можно хранить в репозитории, а какие должны быть только локальными?
3. Нужны ли инструкции для Codex, Cursor, Claude Code отдельно?

### CI/CD, deploy, env, SEO

1. Есть ли CI/CD и где он живёт?
2. Есть ли Docker/deploy окружения?
3. Какие `.env.*` файлы нужны и какие переменные можно документировать?
4. Есть ли SEO: `robots.txt`, sitemap, canonical host, meta tags?

После ответов составь короткую таблицу решений:

```text
Решение | Выбранный вариант | Где зафиксировано | Что осталось уточнить
```

## 3. Обнови корневую документацию

### `README.md`

Заполни или обнови:

- описание проекта вместо шаблонного текста;
- стек и версии по `package.json`;
- быстрый старт;
- список scripts строго по `package.json`;
- требования совместимости: браузеры, устройства, ширины экранов;
- переменные окружения, если они есть;
- сборку, деплой, Docker/CI, если они есть;
- AI-инструкции и MCP: только актуальные для проекта инструменты;
- ссылки на `AGENTS.md`, `CLAUDE.md`, `.agents/skills/*`;
- provider-neutral PR/MR workflow: `create-pull-request`, `review-pull-request`, `refactor-pull-request`;
- GitHub/GitLab setup, если provider известен и это нужно команде.

Не добавляй разделы про Docker, SEO, sitemap или GitLab MCP, если в проекте нет такой инфраструктуры или решения команды.

### `AGENTS.md`

Заполни:

- цели и контекст продукта;
- доменные ограничения, если они уже понятны;
- где агент должен искать бизнес-референсы, макеты, требования;
- актуальные команды проверок из `package.json`;
- правила использования company packages/UI-kit, если они есть;
- актуальный git-provider и request workflow, если это важно для работы агента.

Убери шаблонные TODO, если информацию удалось определить. Если не удалось — оставь конкретный TODO с вопросом, что нужно уточнить.

### `ARCHITECTURE.md`

Сделай файл фактическим описанием текущей структуры проекта:

- текущая структура `src/`;
- где лежит App/bootstrap;
- где лежит shared/common код;
- где будут фичи;
- как устроены сервисы/API-клиенты;
- как устроены доменные типы/утилиты;
- как устроены стили;
- где лежат tests и stories;
- правила импортов и публичных `index.ts`, если они уже используются.

Не утверждай, что в проекте есть `Common`, `Core`, `App`, `MSW`, `SCSS` или `TestEnvironment`, если их фактически нет.

### `CLAUDE.md`

Оставь thin entrypoint. Не дублируй общие правила из `AGENTS.md`. Обновляй только, если меняется способ подключения `AGENTS.md` или Claude-specific примечания.

## 4. Адаптируй `.agents/skills`

Пройди по каждому skill и приведи его к реальному проекту.

### `architecture`

- Зафиксируй реальную структуру фич/shared/App.
- Если проект пока маленький, оставь эволюционный подход.
- Если появились Common/Core/features — опиши правила зависимостей.
- Добавь правила сервисов/API/DTO только если они есть или уже выбраны.

### `react-components`

- Заполни список shared/common компонентов, если они есть.
- Заполни список общих хуков и утилит.
- Зафиксируй правила UI-kit/design-system.
- Не оставляй донорские или чужие component names.

### `styling`

- Опиши фактический подход: CSS, CSS Modules, SCSS Modules, Tailwind, CSS variables, tokens.
- Укажи реальные breakpoints и поддерживаемые ширины.
- Добавь пути к palette/tokens/mixins только если они существуют.

### `testing`

- Опиши фактическую тестовую инфраструктуру.
- Если есть Testing Library/MSW/setupTests/TestEnvironment — зафиксируй правила.
- Если их нет — не делай их обязательными.

### `storybook`

- Опиши, где хранить stories.
- Зафиксируй decorators, providers, MSW или mocks только если они есть.

### `typescript`, `naming`, `performance`

- Сверь правила с текущими eslint/tsconfig/dependencies.
- Если проект использует `@byndyusoft-ui/types`, `Nullable`, `Callback` или аналоги — зафиксируй.
- Если нет — не требуй их.

### `code-review`

- Синхронизируй чек-лист с реальными skills.
- Убери проверки несуществующей инфраструктуры.
- Добавь проверки для реального provider request workflow.

### `documentation-update`

- Обнови матрицу "изменение -> файлы".
- Добавь env/CI/SEO/Docker/provider-specific строки только если они актуальны.
- Убедись, что `AGENTS.md` остаётся единственным каноническим источником общих AI-инструкций.

### `create-pull-request`, `review-pull-request`, `refactor-pull-request`

- Определи provider по `git remote get-url origin`.
- Если provider GitHub — добавь/уточни команды `gh`, GitHub templates и, если доступно, GitHub MCP/plugin.
- Если provider GitLab — добавь/уточни команды `glab` или GitLab MCP/API без секретов. Публичный GitLab API URL можно хранить только если он не приватный или команда явно так решила.
- Если provider неизвестен — оставь provider-neutral fallback.
- Проверь target branch по фактической основной ветке.

### `refactoring`

- Оставь локальный refactoring отдельно.
- Для замечаний из PR/MR по ссылке направляй в `refactor-pull-request`.

## 5. Настрой MCP/IDE слой

Проверь:

- `.codex/config.toml`
- `.cursor/mcp.json`
- инструкции для Claude Code в README

Правила:

- Figma MCP можно оставить, если команда работает с Figma.
- GitHub/GitLab MCP добавляй только если команда реально собирается им пользоваться.
- Не добавляй токены в файлы. Используй env vars или внешние настройки приложения.
- Не дублируй общие инструкции в MCP-конфигах.

Если provider GitHub:

- опиши setup `gh auth login` или GitHub connector/plugin, если он доступен;
- убедись, что PR template лежит в `.github/PULL_REQUEST_TEMPLATE.md`.

Если provider GitLab:

- опиши setup `glab auth login` или GitLab MCP/API;
- если создаёшь `.gitlab/merge_request_templates/default.md`, адаптируй его из `.github/PULL_REQUEST_TEMPLATE.md`.

## 6. Обнови request/issue templates

Проверь и адаптируй:

- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/*`
- `.gitlab/merge_request_templates/*`, если проект на GitLab
- `.gitlab/issue_templates/*`, если проект на GitLab

Шаблон request должен содержать:

- описание цели и контекста;
- список изменений;
- UI screenshots/video, если применимо;
- чек-лист проверок;
- документацию;
- авто-ревью AI-агентом через `review-pull-request`;
- связанные задачи/issues.

## 7. Учти наработки, которые не были перенесены из зрелого проекта

Проверь, нужны ли текущему проекту эти идеи. Добавляй только при наличии инфраструктуры или решения команды:

- env documentation: `vite-env.d.ts` -> `README.md` -> `.env.*`;
- SEO docs: `robots.txt`, `sitemap`, canonical host;
- Docker/deploy docs;
- CI/CD docs;
- Common UI catalog;
- MSW handlers/fixtures policy;
- Storybook mocks/providers policy;
- request split shared/task;
- request review/refactor workflow;
- provider-specific setup for GitHub/GitLab;

## 8. Очистка шаблонных следов

Проверь и убери/уточни:

- `TODO: заполнить согласно требованиям проекта`;
- `TODO: заменить на актуальные данные вашего проекта`;
- `TODO: убрать из раздела упоминание шаблона после создания проекта`;
- "Vite React Template", если проект уже имеет своё имя;
- ссылки на несуществующие папки;
- неактуальные команды;
- несуществующие UI-kit/components/hooks;
- чужие доменные слова и URL;
- provider-specific инструкции не того provider.

## 9. Проверки

После правок запусти:

```bash
npx prettier --check README.md AGENTS.md CLAUDE.md ARCHITECTURE.md ".agents/**/*.md" ".github/**/*.md"
```

Если менялись JSON/TOML/конфиги, проверь их форматирование доступными средствами проекта.

Если менялся код, дополнительно запусти релевантные проверки из `package.json`, например:

```bash
npm run eslint:check
npm run typescript:check
npm run test:check
npm run stylelint:check
npm run prettier:check
```

Не запускай тяжёлые проверки параллельно, если проект чувствителен к ресурсам.

## 10. Итоговый отчёт

В конце сообщи:

- какие файлы обновлены;
- какие TODO закрыты;
- какие вопросы остались;
- какие разделы намеренно не добавлены и почему;
- какие проверки запускались и их результат;
- что нужно сделать человеку вручную: авторизация MCP/CLI, добавление секретов в CI, подтверждение provider, уточнение совместимости.

````
