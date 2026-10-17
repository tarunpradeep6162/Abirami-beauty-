import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function startMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const finePointer = matchMedia('(pointer: fine)').matches;
  const cleanups: Array<() => void> = [];
  if (finePointer) {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    cleanups.push(() => { gsap.ticker.remove(tick); lenis.destroy(); });
  }
  const filmEase = (x: number) => {
    let lo = 0, hi = 1;
    for (let i = 0; i < 14; i++) { const t = (lo + hi) / 2; const value = 3 * (1 - t) ** 2 * t * .22 + 3 * (1 - t) * t ** 2 * .36 + t ** 3; if (value < x) lo = t; else hi = t; }
    return 1 - (1 - (lo + hi) / 2) ** 3;
  };
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(title => {
    gsap.from(title, { y: 35, opacity: .3, duration: 1.1, clearProps: 'all', scrollTrigger: { trigger: title, start: 'top 94%', once: true } });
  });
  const match = gsap.matchMedia();
  match.add('(min-width: 1024px)', () => {
    const story = document.querySelector<HTMLElement>('[data-story]');
    if (story) {
      ScrollTrigger.create({ trigger: story, start: 'top top', end: '+=260', pin: true, pinSpacing: true });
      gsap.from('[data-story-text]', { opacity: .35, scrollTrigger: { trigger: story, start: 'top 55%', end: 'bottom 45%', scrub: true } });
    }
    const section = document.querySelector<HTMLElement>('.horizontal-section');
    const track = document.querySelector<HTMLElement>('.services-track');
    if (section && track) {
      const distance = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${Math.max(distance(), 1)}`, pin: true, scrub: .8, invalidateOnRefresh: true } });
    }
    gsap.utils.toArray<HTMLElement>('.parallax-photo img').forEach(image => {
      gsap.fromTo(image, { yPercent: -5, scale: 1.12 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  if (finePointer) {
    const cursor = document.querySelector<HTMLElement>('.cursor')!;
    const moveCursor = (event: PointerEvent) => {
      cursor.classList.add('is-visible');
      gsap.to(cursor, { x: event.clientX - 12, y: event.clientY - 12, duration: .22, overwrite: true });
    };
    const hideCursor = () => cursor.classList.remove('is-visible');
    addEventListener('pointermove', moveCursor);
    document.addEventListener('pointerleave', hideCursor);
    cleanups.push(() => { removeEventListener('pointermove', moveCursor); document.removeEventListener('pointerleave', hideCursor); });
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(button => {
      const move = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .14, duration: 1.1 });
      };
      const reset = () => gsap.to(button, { x: 0, y: 0, duration: 1.1, ease: filmEase });
      button.addEventListener('pointermove', move);
      button.addEventListener('pointerleave', reset);
      cleanups.push(() => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', reset); });
    });
  }
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (video && !connection?.saveData) {
    video.querySelectorAll<HTMLSourceElement>('source').forEach(source => { source.src = source.dataset.src!; });
    video.load();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    }));
    observer.observe(video);
    const visibility = () => { if (document.hidden) video.pause(); else if (video.getBoundingClientRect().bottom > 0) void video.play().catch(() => {}); };
    document.addEventListener('visibilitychange', visibility);
    cleanups.push(() => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', visibility); });
  }
  const focusTrack = (event: FocusEvent) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>('.strip-item');
    const track = document.querySelector<HTMLElement>('.services-track');
    const trigger = ScrollTrigger.getAll().find(entry => entry.trigger?.classList.contains('horizontal-section'));
    if (item && track && trigger) { const distance = Math.max(1, track.scrollWidth - innerWidth); window.scrollTo({ top: trigger.start + Math.min(distance, item.offsetLeft) }); }
  };
  document.addEventListener('focusin', focusTrack);
  cleanups.push(() => document.removeEventListener('focusin', focusTrack));
  const refresh = () => ScrollTrigger.refresh();
  void document.fonts.ready.then(refresh);
  document.querySelectorAll('img').forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }); });
  let disposed = false;
  const dispose = () => {
    if (disposed) return; disposed = true;
    match.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    gsap.killTweensOf('*');
    gsap.set('.hero-title span, [data-reveal], [data-story-text], .parallax-photo img, .services-track, [data-magnetic]', { clearProps: 'all' });
    document.querySelector('.cursor')?.classList.remove('is-visible');
    cleanups.forEach(clean => clean());
  };
  addEventListener('pagehide', dispose, { once: true });
  return dispose;
}
