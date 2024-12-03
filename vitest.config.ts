import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['**/*.{test,tests}.{ts,tsx,js,jsx}'],
        passWithNoTests: true
    }
});
