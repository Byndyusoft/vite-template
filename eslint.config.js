import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import storybookPlugin from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
    {
        ignores: [
            'dist',
            '.commitlintrc.cjs',
            'vitest.config.ts',
            'eslint.config.js',
            'public/mockServiceWorker.js',
            'storybook-static'
        ]
    },
    js.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs.flat['recommended-latest'],
    storybookPlugin.configs['flat/recommended'],
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    ...tseslint.configs.recommendedTypeChecked.map(config => ({
        ...config,
        files: ['**/*.{ts,tsx}']
    })),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir
            }
        }
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            'react-refresh': reactRefreshPlugin
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
        }
    },
    prettierConfig
);
