/// <reference types="vitest" />
/// <reference types="Vite/client" />

import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      _domain: resolve(__dirname, './src'), 
      _components: resolve(__dirname, './src/components'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "tests/setup.ts",
  }
})
