import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readImages } from './media.mjs';

test('responsive manifest reaches hero, editorial images, comparison and shader texture URLs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'abirami-media-'));
  try {
    for (const dir of ['scripts', 'src', 'public/assets/img/generated']) await mkdir(join(root, dir), { recursive: true });
    for (const name of ['prerender.mjs', 'media.mjs']) await copyFile(new URL(name, import.meta.url), join(root, 'scripts', name));
    const business = JSON.parse(await readFile(new URL('../src/business.json', import.meta.url), 'utf8'));
    business.comparisonApproved = true;
    await writeFile(join(root, 'src/business.json'), JSON.stringify(business));
    const images = {};
    for (const name of ['hero', 'services', 'service-alt', 'before', 'after']) {
      const variants = [];
      for (const width of [480, 960, 1600]) {
        const variant = { width, height: width, avif: `/assets/img/generated/${name}-${width}.avif`, webp: `/assets/img/generated/${name}-${width}.webp` };
        for (const format of ['avif', 'webp']) await writeFile(join(root, 'public', variant[format]), 'fixture, not a client image');
        variants.push(variant);
      }
      images[name] = { width: 1600, height: 1600, dominant: '#253e34', placeholder: 'data:image/webp;base64,UklGRg==', variants };
    }
    const manifestPath = join(root, 'public/assets/img/manifest.json');
    await writeFile(manifestPath, JSON.stringify({ version: 1, images }));
    assert.equal(Object.keys(await readImages(join(root, 'public'))).length, 5);
    const result = spawnSync(process.execPath, [join(root, 'scripts/prerender.mjs')], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(join(root, 'index.html'), 'utf8');
    assert.match(html, /hero-480\.avif 480w/);
    assert.match(html, /hero-1600\.webp 1600w/);
    assert.match(html, /fetchpriority="high"/);
    assert.match(html, /background-color:#253e34/);
    assert.match(html, /data:image\/webp;base64,UklGRg==/);
    assert.match(html, /data-alt="\/assets\/img\/generated\/service-alt-960.webp"/);
    assert.match(html, /data-approved="true"/);
    assert.match(html, /before-480\.avif/);
    images.hero.variants[0].webp = '/assets/img/generated/../../private.webp';
    await writeFile(manifestPath, JSON.stringify({ version: 1, images }));
    await assert.rejects(() => readImages(join(root, 'public')), /generated/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
