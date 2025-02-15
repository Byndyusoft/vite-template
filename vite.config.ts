import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import analyzer from 'vite-bundle-analyzer';

const analyzerPlugin = () => (process.env.ANALYZE !== 'true' ? analyzer({ analyzerPort: 'auto' }) : null);

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [react(), svgr(), analyzerPlugin()].filter(Boolean)
    };
});
