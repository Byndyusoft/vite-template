# Альтернатива для [cra-template](https://github.com/Byndyusoft/cra-template)

[Vite](https://vitest.dev/)

1. Install Vite
2. Run `npm i eslint @byndyusoft/eslint-config --save-dev`
3. Сделать файл `.eslintrc` с сетапом
    ```
    {
        "extends": [
            "@byndyusoft/eslint-config/frontend"
        ]
    }
    ```
4. Выполнить `npx --yes storybook init`

