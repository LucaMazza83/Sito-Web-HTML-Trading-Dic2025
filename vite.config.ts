import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            waitlist: path.resolve(__dirname, 'waitlist/index.html'),
            'privacy-policy': path.resolve(__dirname, 'privacy-policy/index.html'),
            'cookie-policy': path.resolve(__dirname, 'cookie-policy/index.html'),
            'termini-e-condizioni': path.resolve(__dirname, 'termini-e-condizioni/index.html'),
            'disclaimer-trading': path.resolve(__dirname, 'disclaimer-trading/index.html'),
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
