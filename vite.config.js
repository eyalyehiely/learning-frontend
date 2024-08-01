import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '^~(.+)': path.resolve(__dirname, '$1')
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: 'esbuild', // Enable minification
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  }
});