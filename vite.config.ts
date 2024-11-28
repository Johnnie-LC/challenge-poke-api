/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      _: resolve(__dirname, './src'), 
      _components: resolve(__dirname, './src/components'),
      _context: resolve(__dirname, './src/context'),
      _service: resolve(__dirname, './src/service'),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "tests/setup.ts",
  }
})
