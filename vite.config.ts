import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
const routes: Array<{route: string}> = JSON.parse(readFileSync(resolve(import.meta.dirname, 'public/routes.json'), 'utf8'));

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries([...routes.map(item => item.route === '/' ? 'index' : item.route.slice(1) + 'index'), '404']
        .map(name => [name, resolve(import.meta.dirname, `${name}.html`)]))
    }
  }
});
