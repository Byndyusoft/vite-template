# Альтернатива для [cra-template](https://github.com/Byndyusoft/cra-template)

[Официальная документация](https://vitejs.dev/)

Установка из пресетов https://vitejs.dev/guide/

### Eslint 
Дефолтный конфиг:
1. Выполнить `npm i eslint @byndyusoft/eslint-config --save-dev`
2. Сделать файл `.eslintrc` с сетапом
    ```
    {
        "extends": [
            "@byndyusoft/eslint-config/frontend"
        ]
    }
    ```

### Storybook
Поддерживает vite из коробки:

`npx --yes storybook init`

### SVG

CRA поддерижвает импорт svg в модулях из коробки. Для Vite можно добавить плагин https://www.npmjs.com/package/vite-svg-loader, поддерживает SVGO

1. `npm install vite-svg-loader --save-dev`
2. vite.config.js
   ```javascript
   import svgLoader from 'vite-svg-loader'
 
   export default defineConfig({
     plugins: [vue(), svgLoader()]
   })
   ```

### Тесты
**Jest** поддерживается через плагин [vite-jest](https://github.com/sodatea/vite-jest), но с [оганичениями](https://github.com/sodatea/vite-jest/tree/main/packages/vite-jest#limitations-and-differences-with-commonjs-tests). 
Например, плагин не работает на Windows 😹. И моки для ES-модулей хоть и работают, но находятся в экспериментальном режиме.

С Vite лучше использовать **[Vitest](https://vitest.dev/)**. API похоже на Jest, [гайд по миграции](https://vitest.dev/guide/migration.html) выглядит не сложно. Есть [интеграция с популярными IDE](https://vitest.dev/guide/ide.html), веб-шторм поддерживает Vitest из коробки.

Vitest работает с React Testing Library https://www.robinwieruch.de/vitest-react-testing-library/

Есть интересные фичи типа [Vitest UI](https://vitest.dev/guide/ui.html)

[vitest ui](https://user-images.githubusercontent.com/11247099/171992267-5cae2fa0-b927-400a-8eb1-da776974cb61.png)
