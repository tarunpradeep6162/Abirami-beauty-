import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      input: Object.fromEntries(['index', 'services/index', 'gallery/index', 'about/index', 'book/index']
        .map(name => [name, resolve(import.meta.dirname, `${name}.html`)]))
    }
  }
});
