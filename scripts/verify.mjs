import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { readImages } from './media.mjs';
import { guides } from './content.mjs';

const business = JSON.parse(await readFile('src/business.json', 'utf8'));
const routes = JSON.parse(await readFile('dist/routes.json', 'utf8'));
const images = await readImages('dist');
const titles = new Set(), descriptions = new Set();
for (const { route } of [...routes, { route: '/404.html' }]) {
  const path = route === '/404.html' ? 'dist/404.html' : `dist${route}index.html`;
  const html = await readFile(path, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && title.length < 60, `${route}: title under 60 (${title?.length})`);
  assert.ok(description && description.length < 155, `${route}: description under 155 (${description?.length})`);
  assert.ok(!titles.has(title)); titles.add(title);
  assert.ok(!descriptions.has(description)); descriptions.add(description);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
  assert.ok(html.includes('<main ') && html.includes('class="skip-link"'));
  assert.ok(html.includes(business.address));
  assert.ok(html.includes(`rel="canonical" href="${business.siteUrl}${route}"`));
  assert.ok(!/<style[\s>]|\sstyle\s*=|\son\w+\s*=/i.test(html), `${route}: no inline CSS or handlers`);
  for (const script of html.matchAll(/<script([^>]*)>(.*?)<\/script>/gs)) { assert.ok(script[1].includes('src=')); assert.equal(script[2].trim(), ''); }
  for (const anchor of html.matchAll(/<a\s[^>]*href="https?:\/\/[^>]+>/g)) assert.ok(anchor[0].includes('rel="noopener noreferrer"'), `${route}: safe external link`);
  assert.ok(!html.includes('fonts.googleapis') && !html.includes('fonts.gstatic'));
  for (const token of ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:image']) assert.ok(html.includes(token));
  const schemaPath = html.match(/data-schema="([^"]+)"/)?.[1];
  const schema = JSON.parse(await readFile(`dist${schemaPath}`, 'utf8'));
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@graph'][0].name, business.name);
  assert.ok(schema['@graph'][0]['@type'].includes('BeautySalon'));
  assert.ok(schema['@graph'].some(item => item['@type'] === 'BreadcrumbList'));
  if (!business.phone) assert.ok(!JSON.stringify(schema).includes('telephone'));
  assert.ok(!html.includes('wa.me/null'));
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    const url = match[1];
    await access(`dist${url}${url.endsWith('/') ? 'index.html' : ''}`);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) for (const candidate of match[1].split(',')) {
    const url = candidate.trim().split(/\s+/)[0]; if (url.startsWith('/')) await access(`dist${url}`);
  }
}
for (const guide of guides) assert.ok(guide.paragraphs.join(' ').split(/\s+/).length >= 200, `${guide.slug}: 200+ original words`);
for (const [name, photo] of Object.entries(images)) {
  const tiny = Buffer.from(photo.placeholder.split(',')[1], 'base64');
  assert.equal(tiny.toString('ascii', 0, 4), 'RIFF'); assert.equal(tiny.toString('ascii', 8, 12), 'WEBP');
  for (const variant of photo.variants) {
    const webp = await readFile(`dist${variant.webp}`), avif = await readFile(`dist${variant.avif}`);
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF'); assert.equal(webp.toString('ascii', 8, 12), 'WEBP');
    assert.equal(avif.toString('ascii', 4, 8), 'ftyp'); assert.ok(avif.subarray(8, 40).includes(Buffer.from('avif')), `${name}: AVIF`);
  }
}
const wasm = JSON.parse(await readFile('dist/assets/wasm/manifest.json', 'utf8'));
assert.equal(wasm.version, 1);
if (wasm.module !== null) {
  assert.equal(wasm.module, '/assets/wasm/noise_wasm.js');
  assert.ok((await readFile(`dist${wasm.module}`, 'utf8')).includes('flow_field'));
  const bytes = await readFile('dist/assets/wasm/noise_wasm_bg.wasm');
  assert.deepEqual([...bytes.subarray(0, 8)], [0, 97, 115, 109, 1, 0, 0, 0]);
}
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const headers = Object.fromEntries(config.headers.find(rule => rule.source === '/(.*)').headers.map(header => [header.key, header.value]));
for (const name of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin-Opener-Policy']) assert.ok(headers[name]);
assert.ok(headers['Content-Security-Policy'].includes("style-src 'self'"));
assert.ok(!headers['Content-Security-Policy'].includes('unsafe-inline'));
assert.ok(headers['Permissions-Policy'].includes('payment=()'));
assert.ok(!(await readdir('dist/assets')).some(name => name.endsWith('.map')));
for (const font of ['display-regular', 'display-italic', 'body-regular', 'body-medium', 'body-semibold']) assert.equal((await readFile(`dist/assets/fonts/${font}.woff2`)).toString('ascii', 0, 4), 'wOF2');
const og = await readFile('dist/assets/img/social-preview.png');
assert.equal(og.readUInt32BE(16), 1200); assert.equal(og.readUInt32BE(20), 630);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<url>/g) ?? []).length, routes.length);
await access('dist/.well-known/security.txt'); await access('dist/site.webmanifest');
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
for (const section of ['dependencies', 'devDependencies']) for (const version of Object.values(pkg[section])) assert.match(version, /^\d+\.\d+\.\d+$/);
console.log(`PASS: ${routes.length + 1} pages; metadata, schema, guide copy, assets, fonts, security config and pinned dependencies.`);
console.log('Runtime CSP, viewport rendering, Lighthouse and field CWV require a browser. Static checks do not establish those results.');
