import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/anime-library-web/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});