
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  }
});

