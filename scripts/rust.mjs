import { spawnSync } from 'node:child_process';
import { mkdir, writeFile, access, readdir, readFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
process.chdir(root);
const task = process.argv[2];
if (!['images', 'wasm'].includes(task)) throw new Error('Expected images or wasm');
const exists = path => access(path).then(() => true).catch(() => false);
const available = command => {
  const result = spawnSync(command, ['--version'], { encoding: 'utf8', shell: false });
  return !result.error && result.status === 0;
};
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? result.signal}). Existing media has not been silently substituted.`);
};
const ensureManifest = async (path, value) => {
  await mkdir(resolve(path, '..'), { recursive: true });
  if (!await exists(path)) await writeFile(path, JSON.stringify(value, null, 2) + '\n');
};
await ensureManifest('public/assets/img/manifest.json', { version: 1, images: {} });
await ensureManifest('public/assets/wasm/manifest.json', { version: 1, module: null });

if (!available('cargo') || !available('rustc')) {
  console.log(`[${task}] Skipped: Rust is not installed or not on PATH. Existing generated assets are kept; image placeholders and JS noise remain available. See README for installation.`);
} else if (task === 'images') {
  await mkdir('photos-original', { recursive: true });
  const originals = (await readdir('photos-original')).filter(name => /\.(jpe?g|png|webp)$/i.test(name));
  if (!originals.length) console.log('[images] Skipped: photos-original has no supported photos. Existing image manifest kept.');
  else run('cargo', ['run', '--release', '--manifest-path', 'rust/imgtool/Cargo.toml', '--', 'photos-original', 'public/assets/img']);
} else if (!available('wasm-pack')) {
  console.log('[wasm] Skipped: wasm-pack is not installed or not on PATH. Existing WASM assets are kept; JS noise is the automatic fallback. Install with cargo install wasm-pack --locked.');
} else {
  run('wasm-pack', ['build', 'rust/noise-wasm', '--target', 'web', '--release', '--out-dir', resolve('public/assets/wasm'), '--out-name', 'noise_wasm']);
  await access('public/assets/wasm/noise_wasm.js');
  await access('public/assets/wasm/noise_wasm_bg.wasm');
  const ignore = 'public/assets/wasm/.gitignore';
  if (await exists(ignore) && (await readFile(ignore, 'utf8')).trim() === '*') await unlink(ignore);
  await writeFile('public/assets/wasm/manifest.json', JSON.stringify({ version: 1, module: '/assets/wasm/noise_wasm.js' }, null, 2) + '\n');
  console.log('[wasm] Built browser module and published its manifest.');
}
