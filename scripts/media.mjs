import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

export async function readImages(publicRoot) {
  const manifest = JSON.parse(await readFile(resolve(publicRoot, 'assets/img/manifest.json'), 'utf8'));
  assert.equal(manifest.version, 1, 'Unsupported image manifest version');
  assert.ok(manifest.images && typeof manifest.images === 'object' && !Array.isArray(manifest.images), 'Missing images map');
  for (const [name, photo] of Object.entries(manifest.images)) {
    assert.match(name, /^[a-z0-9-]+$/);
    assert.ok(Number.isInteger(photo.width) && photo.width > 0 && Number.isInteger(photo.height) && photo.height > 0, `${name}: dimensions`);
    assert.match(photo.dominant, /^#[0-9a-f]{6}$/i);
    assert.match(photo.placeholder, /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/);
    assert.deepEqual(photo.variants.map(variant => variant.width), [480, 960, 1600], `${name}: widths`);
    for (const variant of photo.variants) {
      assert.ok(Number.isInteger(variant.height) && variant.height > 0);
      for (const format of ['avif', 'webp']) {
        assert.match(variant[format], new RegExp(`^/assets/img/generated/[a-z0-9-]+\\.${format}$`));
        await access(resolve(publicRoot, variant[format].slice(1)));
      }
    }
  }
  return manifest.images;
}
