import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import analyzer from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
            svgr(),
            analyzer({
                analyzerMode: 'static',
                enabled: mode === 'analyze',
                fileName: 'stats',
                openAnalyzer: false
            })
        ]
    };
});
