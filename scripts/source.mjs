import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = [];
const excluded = new Set(['node_modules', 'dist', 'target', '.git', '.vercel', 'photos-original', 'generated', 'qa-results']);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (excluded.has(entry.name) || entry.name === 'COMPLETE-SOURCE.md' || /^\.env(?:\.|$)/.test(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && !/\.(wasm|woff2?|ttf|webp|avif|png|jpe?g|mp4)$/i.test(entry.name)) files.push(path);
  }
}
await walk(root);
const sections = ['# Abirami — stages 1 and 2: complete source', '', 'Static frontend, Rust image CLI, noise WASM and build tooling. Compiled output and private originals are excluded from this source listing.', '', '## File tree', '', '```text', ...files.map(path => relative(root, path).replaceAll('\\', '/')), '```', ''];
for (const path of files) {
  const content = await readFile(path, 'utf8');
  const runs = content.match(/`+/g) ?? [];
  const fence = '`'.repeat(Math.max(4, ...runs.map(run => run.length + 1)));
  sections.push(`## ${relative(root, path).replaceAll('\\', '/')}`, '', `${fence}${extname(path).slice(1)}`, content, fence, '');
}
await writeFile(resolve(root, 'COMPLETE-SOURCE.md'), sections.join('\n'));
console.log(`Complete source: ${files.length} files, no abbreviated code.`);
