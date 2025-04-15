/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test:{
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTest.ts',
    coverage: {
      exclude: [
        '**/*.config.ts',
        '**/*.d.ts',
        '**/*.config.js',
        '**/types',
        '**/dist',
        '**/main.tsx'
      ],
      // thresholds: {
      //   functions: 80
      // }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
