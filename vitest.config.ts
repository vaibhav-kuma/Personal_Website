import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'out'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**', 'src/data/**', 'components/**'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.d.ts'],
    },
    css: false,
  },
  esbuild: {
    jsx: 'automatic',
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
});