import business from '../business.json';
import generated from '../../public/assets/wasm/manifest.json';

export async function makeFlowField(size = 128): Promise<Uint8Array> {
  if (!Number.isInteger(size) || size < 2 || size > 1024) throw new RangeError('Flow field size must be 2–1024');
  const wasmUrl = (business.wasmUrl || generated.module) as string | null;
  if (wasmUrl) {
    try {
      const url = new URL(wasmUrl, location.origin);
      if (url.origin !== location.origin) throw new Error('WASM must be hosted on this origin');
      const load = async () => {
        const module = await import(/* @vite-ignore */ url.href);
        await module.default();
        return module.flow_field(size, 47);
      };
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const pixels: Uint8Array = await Promise.race([
        load(), new Promise<never>((_, reject) => { timeout = setTimeout(() => reject(new Error('WASM initialization timed out')), 2000); })
      ]).finally(() => clearTimeout(timeout));
      if (!(pixels instanceof Uint8Array) || pixels.length !== size * size * 4) throw new Error('Unexpected flow field data');
      return pixels;
    } catch { /* Offline and unsupported browsers keep the JS field. */ }
  }
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = Math.round(127.5 + 63 * Math.sin(x * .08 + Math.sin(y * .06)) + 40 * Math.cos(y * .13 - x * .035));
      const offset = (y * size + x) * 4;
      pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = Math.max(0, Math.min(255, value));
      pixels[offset + 3] = 255;
    }
  }
  return pixels;
}
