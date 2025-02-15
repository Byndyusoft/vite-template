# Шаблон для фронтенд проектов

Требуется node.js версии 18 и больше.

Шаблон можно испльзовать через [degit](https://github.com/Rich-Harris/degit) (Версии зависимостей актуальны на 28.2.2024):

```text
npx degit Byndyusoft/vite-template#main new-project-dir
cd new-project-dir
npm install
npm run dev
```

Для SVG используется [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr), в контексте реакта импорт выглядит так:

```javascript
import Logo from './logo.svg?react';
```

### TODO

Обновить зависимости:

-   [x] @byndyusoft/stylelint-config
-   [ ] storybook
-   [ ] @storybook/addon-essentials
-   [ ] @storybook/addon-interactions
-   [ ] @storybook/addon-links
-   [ ] @storybook/addon-onboarding
-   [ ] @storybook/blocks
-   [ ] @storybook/react
-   [ ] @storybook/react-vite
-   [ ] @storybook/test
-   [ ] eslint ?
-   [ ] prettier ?
-   [ ] typescript ?
-   [ ] vite ?

## Поддержка

-   [@byndyusoft/frontend](https://github.com/orgs/Byndyusoft/teams/frontend) - [frontend@byndyusoft.com](mailto:frontend@byndyusoft.com)
