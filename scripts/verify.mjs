import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { readImages } from './media.mjs';

const images = await readImages('dist');
for (const [name, photo] of Object.entries(images)) {
  const tiny = Buffer.from(photo.placeholder.split(',')[1], 'base64');
  assert.equal(tiny.toString('ascii', 0, 4), 'RIFF', `${name}: placeholder RIFF header`);
  assert.equal(tiny.toString('ascii', 8, 12), 'WEBP', `${name}: placeholder WebP header`);
  for (const variant of photo.variants) {
    const webp = await readFile(`dist${variant.webp}`);
    const avif = await readFile(`dist${variant.avif}`);
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF');
    assert.equal(webp.toString('ascii', 8, 12), 'WEBP');
    assert.equal(avif.toString('ascii', 4, 8), 'ftyp');
    assert.ok(avif.subarray(8, 40).includes(Buffer.from('avif')), `${name}: AVIF brand`);
  }
}
const wasm = JSON.parse(await readFile('dist/assets/wasm/manifest.json', 'utf8'));
assert.equal(wasm.version, 1);
if (wasm.module !== null) {
  assert.equal(wasm.module, '/assets/wasm/noise_wasm.js');
  const glue = await readFile(`dist${wasm.module}`, 'utf8');
  assert.ok(glue.includes('flow_field'), 'WASM glue exports flow_field');
  const bytes = await readFile('dist/assets/wasm/noise_wasm_bg.wasm');
  assert.deepEqual([...bytes.subarray(0, 8)], [0, 97, 115, 109, 1, 0, 0, 0]);
} else console.log('WASM absent: built site uses automatic JS noise fallback.');

const routes = ['index.html', 'services/index.html', 'gallery/index.html', 'about/index.html', 'book/index.html'];
for (const route of routes) {
  const html = await readFile(`dist/${route}`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
  assert.ok(html.includes('<main '), `${route}: main landmark`);
  assert.ok(html.includes('No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100'), `${route}: exact address`);
  assert.ok(!html.includes('aggregateRating'), `${route}: no invented rating`);
  assert.ok(!html.includes('wa.me/null'), `${route}: no invalid WhatsApp link`);
  const schema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.equal(JSON.parse(schema)['@type'], 'BeautySalon');
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    const path = match[1];
    if (path.startsWith('//')) continue;
    await access(`dist${path}${path.endsWith('/') ? 'index.html' : ''}`);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/')) await access(`dist${url}`);
    }
  }
}
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes('User-agent: *'));
console.log(`PASS: 5 routes, responsive image targets, ${Object.keys(images).length} image manifest entries, WASM descriptor, schema and business-data guards.`);
