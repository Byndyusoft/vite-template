import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import storybookPlugin from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
    {
        ignores: ['dist', '.commitlintrc.cjs', 'vitest.config.ts', 'eslint.config.js']
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir
            }
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    },
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs.flat['recommended-latest'],
    storybookPlugin.configs['flat/recommended'],
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
    }
);
