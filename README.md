# Альтернатива для [cra-template](https://github.com/Byndyusoft/cra-template)

[Официальная документация](https://vitest.dev/)

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


