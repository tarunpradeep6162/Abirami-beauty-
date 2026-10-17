import * as THREE from 'three';
import vertex from './shaders/fullscreen.vert.glsl?raw';
import fabric from './shaders/fabric.frag.glsl?raw';
import liquid from './shaders/liquid.frag.glsl?raw';
import wipe from './shaders/wipe.frag.glsl?raw';
import grain from './shaders/grain.frag.glsl?raw';
import dustVertex from './shaders/dust.vert.glsl?raw';
import dustFragment from './shaders/dust.frag.glsl?raw';
import { makeFlowField } from './noise';

type Mode = 'fabric' | 'liquid' | 'wipe';
type Disposable = { dispose(): void };
const desktop = matchMedia('(pointer: fine) and (min-width: 768px)').matches && navigator.maxTouchPoints === 0;
const loader = new THREE.TextureLoader();

class Surface {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.Camera();
  private postScene = new THREE.Scene();
  private target = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
  private owned: Disposable[] = [];
  private observer: IntersectionObserver;
  private resizeObserver: ResizeObserver;
  private frame = 0;
  private visible = false;
  private dead = false;
  private elapsed = 0;
  private documentTop = 0;
  private last = 0;
  private mixTarget = .5;
  private pointer = new THREE.Vector2(.5, .5);
  private uniforms: Record<string, THREE.IUniform>;
  private post: THREE.ShaderMaterial;
  private onVisibility = () => this.schedule();
  private onPointer = (event: PointerEvent) => {
    const box = this.host.getBoundingClientRect();
    this.pointer.set((event.clientX - box.left) / box.width, 1 - (event.clientY - box.top) / box.height);
  };
  private onEnter = () => { this.mixTarget = 1; };
  private onLeave = () => { this.mixTarget = 0; };
  private onCompare = (event: Event) => { this.mixTarget = (event as CustomEvent<number>).detail; };
  private onContextLost = (event: Event) => { event.preventDefault(); this.dispose(); };

  constructor(private host: HTMLElement, private mode: Mode, noise: THREE.DataTexture) {
    this.mixTarget = mode === 'liquid' ? 0 : .5;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, desktop ? 1.75 : 1.5));
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost);
    this.uniforms = {
      uTime: { value: 0 }, uScroll: { value: 0 }, uPointer: { value: this.pointer },
      uResolution: { value: new THREE.Vector2(1, 1) }, uFrame: { value: new THREE.Vector2(1, 1) },
      uNoise: { value: noise }, uMix: { value: this.mixTarget },
      uFrom: { value: noise }, uTo: { value: noise },
      uFromSize: { value: new THREE.Vector2(1, 1) }, uToSize: { value: new THREE.Vector2(1, 1) }
    };
    const plane = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: mode === 'fabric' ? fabric : mode === 'liquid' ? liquid : wipe, uniforms: this.uniforms, depthTest: false });
    this.owned.push(plane, material);
    this.scene.add(new THREE.Mesh(plane, material));
    this.post = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: grain, uniforms: { uScene: { value: this.target.texture }, uTime: { value: 0 } }, depthTest: false });
    this.postScene.add(new THREE.Mesh(plane, this.post));
    this.owned.push(this.post);
    if (mode === 'fabric') this.addDust(plane, noise);
    this.host.append(this.renderer.domElement);
    this.observer = new IntersectionObserver(entries => {
      this.visible = entries[0].isIntersecting;
      this.schedule();
    }, { rootMargin: '0px' });
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.observer.observe(host);
    this.host.addEventListener('pointermove', this.onPointer);
    this.host.addEventListener('pointerenter', this.onEnter);
    this.host.addEventListener('pointerleave', this.onLeave);
    this.host.addEventListener('focusin', this.onEnter);
    this.host.addEventListener('focusout', this.onLeave);
    this.host.addEventListener('comparisonchange', this.onCompare);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
  }

  private addDust(plane: THREE.PlaneGeometry, noise: THREE.DataTexture) {
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.index = plane.index;
    geometry.attributes.position = plane.attributes.position;
    geometry.attributes.uv = plane.attributes.uv;
    const count = desktop ? 70 : 30;
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < seeds.length; i++) seeds[i] = ((i * 16807 + 137) % 65521) / 65521;
    geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 3));
    geometry.instanceCount = count;
    const material = new THREE.ShaderMaterial({ vertexShader: dustVertex, fragmentShader: dustFragment, uniforms: { uTime: this.uniforms.uTime, uNoise: { value: noise } }, transparent: true, depthTest: false, depthWrite: false });
    const dust = new THREE.Mesh(geometry, material);
    dust.frustumCulled = false;
    dust.renderOrder = 1;
    this.scene.add(dust);
    this.owned.push(geometry, material);
  }

  async loadImages() {
    if (this.mode === 'fabric') return;
    const images = this.host.querySelectorAll<HTMLImageElement>('img');
    const fromElement = async (image: HTMLImageElement) => {
      image.loading = 'eager';
      await image.decode();
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      return texture;
    };
    const results = await Promise.allSettled(this.mode === 'wipe'
      ? [fromElement(images[0]), fromElement(images[1])]
      : [fromElement(images[0]), loader.loadAsync(images[0].dataset.alt!)]);
    const textures = results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
    if (this.dead || textures.length !== 2) { textures.forEach(texture => texture.dispose()); throw new Error('Images unavailable'); }
    this.owned.push(...textures);
    textures.forEach((texture, i) => {
      texture.colorSpace = THREE.NoColorSpace;
      this.uniforms[i ? 'uTo' : 'uFrom'].value = texture;
      this.uniforms[i ? 'uToSize' : 'uFromSize'].value.set(texture.image.width, texture.image.height);
    });
    this.host.classList.add('gl-ready');
  }

  private resize() {
    if (this.dead) return;
    const { width, height, top } = this.host.getBoundingClientRect();
    this.documentTop = top + scrollY;
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(height));
    this.renderer.setSize(w, h, false);
    this.target.setSize(Math.round(w * this.renderer.getPixelRatio()), Math.round(h * this.renderer.getPixelRatio()));
    this.uniforms.uResolution.value.set(w, h);
    this.uniforms.uFrame.value.set(w, h);
  }

  private schedule() {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    if (this.visible && !document.hidden && !this.dead) this.frame = requestAnimationFrame(this.render);
  }

  private render = (now: number) => {
    if (this.dead || document.hidden || !this.visible) return;
    const delta = this.last ? Math.min((now - this.last) / 1000, .05) : 0;
    this.last = now;
    this.elapsed += delta;
    this.uniforms.uTime.value = this.elapsed;
    this.post.uniforms.uTime.value = this.elapsed;
    this.uniforms.uMix.value = this.mode === 'wipe' ? this.mixTarget : THREE.MathUtils.damp(this.uniforms.uMix.value, this.mixTarget, 4, delta);
    this.uniforms.uScroll.value = Math.min(2, Math.max(0, (scrollY - this.documentTop) / innerHeight));
    this.renderer.setRenderTarget(this.target);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.camera);
    this.frame = requestAnimationFrame(this.render);
  };

  dispose() {
    if (this.dead) return;
    this.dead = true;
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.host.removeEventListener('pointermove', this.onPointer);
    this.host.removeEventListener('pointerenter', this.onEnter);
    this.host.removeEventListener('pointerleave', this.onLeave);
    this.host.removeEventListener('focusin', this.onEnter);
    this.host.removeEventListener('focusout', this.onLeave);
    this.host.removeEventListener('comparisonchange', this.onCompare);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.host.classList.remove('gl-ready');
    this.renderer.domElement.remove();
    this.owned.forEach(item => item.dispose());
    this.target.dispose();
    this.renderer.dispose();
  }
}

export async function startExperience() {
  const pixels = await makeFlowField();
  const noise = new THREE.DataTexture(pixels, 128, 128, THREE.RGBAFormat);
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
  noise.minFilter = noise.magFilter = THREE.LinearFilter;
  noise.needsUpdate = true;
  const surfaces: Surface[] = [];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const host = entry.target as HTMLElement;
      observer.unobserve(host);
      try {
        const mode: Mode = host.hasAttribute('data-fabric') ? 'fabric' : host.hasAttribute('data-liquid') ? 'liquid' : 'wipe';
        const surface = new Surface(host, mode, noise);
        surfaces.push(surface);
        void surface.loadImages().catch(() => surface.dispose());
      } catch { /* WebGL can be blocked or unavailable. */ }
    });
  }, { rootMargin: '160px' });
  document.querySelectorAll<HTMLElement>('[data-fabric], [data-liquid], [data-comparison][data-approved="true"]').forEach(host => observer.observe(host));
  let disposed = false;
  const dispose = () => { if (disposed) return; disposed = true; observer.disconnect(); surfaces.forEach(surface => surface.dispose()); noise.dispose(); };
  addEventListener('pagehide', dispose, { once: true });
  return dispose;
}
