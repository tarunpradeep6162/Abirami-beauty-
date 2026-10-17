import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

test('noise uses async WASM and falls back on failed, invalid or cross-origin modules', async () => {
  const originalLocation = globalThis.location;
  globalThis.location = { origin: 'https://abirami.test' };
  globalThis.__noiseConfig = { wasmUrl: null };
  globalThis.__noiseGenerated = { module: null };
  let source = await readFile(new URL('../src/gl/noise.ts', import.meta.url), 'utf8');
  source = source.replace("import business from '../business.json';", 'const business = globalThis.__noiseConfig;')
    .replace("import generated from '../../public/assets/wasm/manifest.json';", 'const generated = globalThis.__noiseGenerated;')
    .replace('await import(/* @vite-ignore */ url.href)', 'await globalThis.__noiseModule()');
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  try {
    const { makeFlowField } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
    const fallback = await makeFlowField(8);
    assert.equal(fallback.length, 8 * 8 * 4);
    assert.deepEqual(fallback, await makeFlowField(8));
    globalThis.__noiseGenerated.module = '/assets/wasm/noise_wasm.js';
    globalThis.__noiseModule = async () => ({ default: async () => {}, flow_field: size => new Uint8Array(size * size * 4).fill(91) });
    assert.ok((await makeFlowField(8)).every(value => value === 91));
    globalThis.__noiseModule = async () => { throw new Error('Network unavailable'); };
    assert.deepEqual(await makeFlowField(8), fallback);
    globalThis.__noiseModule = async () => ({ default: async () => {}, flow_field: () => new Uint8Array(2) });
    assert.deepEqual(await makeFlowField(8), fallback);
    globalThis.__noiseConfig.wasmUrl = 'https://other.test/noise.js';
    globalThis.__noiseModule = async () => { assert.fail('Cross-origin module must never load'); };
    assert.deepEqual(await makeFlowField(8), fallback);
    await assert.rejects(() => makeFlowField(0), RangeError);
  } finally {
    if (originalLocation === undefined) delete globalThis.location;
    else globalThis.location = originalLocation;
    delete globalThis.__noiseConfig;
    delete globalThis.__noiseGenerated;
    delete globalThis.__noiseModule;
  }
});
