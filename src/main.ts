import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/editorial.css';
import { connectBooking } from './booking';
import { loadStructuredData } from './structured-data';
connectBooking();
void loadStructuredData();

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = document.querySelector<HTMLElement>('.site-nav')!;
const header = document.querySelector<HTMLElement>('.site-header')!;
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  document.querySelector<HTMLElement>('main')!.inert = false;
  document.querySelector<HTMLElement>('footer')!.inert = false;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  document.querySelector<HTMLElement>('main')!.inert = open;
  document.querySelector<HTMLElement>('footer')!.inert = open;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
  if (event.key !== 'Tab' || !nav.classList.contains('is-open')) return;
  const lastLink = nav.querySelector<HTMLAnchorElement>('a:last-child')!;
  if (event.shiftKey && document.activeElement === menuButton) { event.preventDefault(); lastLink.focus(); }
  else if (!event.shiftKey && document.activeElement === lastLink) { event.preventDefault(); menuButton.focus(); }
});
matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll<HTMLDetailsElement>('.service-row details').forEach(details => {
    let openedByHover = false;
    details.addEventListener('pointerenter', () => {
      if (!details.open) { details.open = true; openedByHover = true; }
    });
    details.addEventListener('pointerleave', () => {
      if (openedByHover && !details.contains(document.activeElement)) details.open = false;
      openedByHover = false;
    });
    details.querySelector('summary')?.addEventListener('click', event => { if (openedByHover) event.preventDefault(); openedByHover = false; });
  });
}
header.addEventListener('focusin', () => header.classList.remove('is-away'));
let previousScroll = scrollY;
addEventListener('scroll', () => {
  const current = scrollY;
  if (Math.abs(current - previousScroll) < 8) return;
  header.classList.toggle('is-away', current > previousScroll && current > 170 && !header.contains(document.activeElement) && !nav.classList.contains('is-open'));
  previousScroll = current;
}, { passive: true });

const curtain = document.querySelector('.curtain');
try {
  if (!reducedMotion.matches && !sessionStorage.getItem('abirami-visited')) {
    curtain?.classList.add('is-active');
    sessionStorage.setItem('abirami-visited', 'yes');
  }
} catch { /* Private browsing can block storage. */ }

document.querySelectorAll<HTMLElement>('[data-map]').forEach(shell => {
  const frame = shell.querySelector<HTMLIFrameElement>('iframe')!;
  const button = shell.querySelector<HTMLButtonElement>('[data-map-toggle]')!;
  const status = shell.querySelector<HTMLElement>('.map-status')!;
  const fallback = () => { shell.classList.add('map-unavailable'); button.textContent = 'Try the map again'; status.textContent = 'Use Get Directions for a live map and route.'; };
  frame.addEventListener('error', fallback);
  frame.addEventListener('load', () => { status.textContent = 'If the map does not display, use Get Directions below.'; });
  button.addEventListener('click', () => {
    if (!shell.classList.contains('map-unavailable')) fallback();
    else { shell.classList.remove('map-unavailable'); button.textContent = 'Show location card'; frame.src = frame.src; }
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-share]').forEach(button => button.addEventListener('click', () => {
  const url = document.querySelector<HTMLLinkElement>('link[rel=canonical]')?.href;
  if (!url || new URL(url).origin !== location.origin) return;
  window.open('https://wa.me/?text=' + encodeURIComponent(document.title + '\n' + url), '_blank', 'noopener,noreferrer');
}));

document.querySelectorAll<HTMLElement>('[data-comparison]').forEach(box => {
  const input = box.parentElement!.querySelector<HTMLInputElement>('input[type=range]')!;
  input.addEventListener('input', () => {
    box.querySelector<HTMLElement>('.after-photo')!.style.clipPath = `inset(0 ${100 - Number(input.value)}% 0 0)`;
    box.querySelector<HTMLElement>('.comparison-line')!.style.left = `${input.value}%`;
    input.setAttribute('aria-valuetext', `${input.value} percent after photo`);
    box.dispatchEvent(new CustomEvent('comparisonchange', { detail: Number(input.value) / 100 }));
  });
});

const reviews = Array.from(document.querySelectorAll<HTMLElement>('[data-review]'));
if (reviews.length) {
  let index = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  const region = document.querySelector<HTMLElement>('[data-reviews]')!;
  const pause = region.querySelector<HTMLButtonElement>('[data-review-pause]')!;
  const show = (next: number, announce = false) => {
    reviews[index].hidden = true;
    index = (next + reviews.length) % reviews.length;
    reviews[index].hidden = false;
    region.querySelector('[data-review-count]')!.textContent = `${index + 1} / ${reviews.length}`;
    if (announce) region.querySelector('[data-review-announcement]')!.textContent = `Review ${index + 1} of ${reviews.length}`;
  };
  const setPause = () => { pause.textContent = paused ? 'Play' : 'Pause'; pause.setAttribute('aria-pressed', String(paused)); };
  setPause();
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { paused = true; setPause(); } });
  region.querySelector('[data-review-prev]')!.addEventListener('click', () => show(index - 1, true));
  region.querySelector('[data-review-next]')!.addEventListener('click', () => show(index + 1, true));
  pause.addEventListener('click', () => { paused = !paused; setPause(); });
  region.addEventListener('mouseenter', () => { hovered = true; });
  region.addEventListener('mouseleave', () => { hovered = false; });
  region.addEventListener('focusin', () => { focused = true; });
  region.addEventListener('focusout', () => { focused = false; });
  const timer = window.setInterval(() => { if (!paused && !hovered && !focused && !document.hidden && reviews.length > 1) show(index + 1); }, 7000);
  addEventListener('pagehide', () => clearInterval(timer), { once: true });
}

let generation = 0;
let stopMotion: (() => void) | undefined;
let stopGraphics: (() => void) | undefined;
const startEnhancements = () => {
  const token = ++generation;
  if (reducedMotion.matches) return;
  import('./motion').then(module => { if (!reducedMotion.matches && token === generation) stopMotion = module.startMotion(); }).catch(() => { /* Static pages stay usable. */ });
  const navInfo = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowPower = (navInfo.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency || 8) <= 4 || navInfo.connection?.saveData;
  if (!lowPower && document.querySelector('[data-fabric], [data-liquid], [data-comparison][data-approved="true"]')) import('./gl/experience').then(async module => { if (!reducedMotion.matches && token === generation) { const dispose = await module.startExperience(); if (token === generation && !reducedMotion.matches) stopGraphics = dispose; else dispose(); } }).catch(() => { /* Keep image fallbacks. */ });
};
requestAnimationFrame(() => requestAnimationFrame(() => {
  if ('requestIdleCallback' in window) window.requestIdleCallback(startEnhancements, { timeout: 1800 });
  else setTimeout(startEnhancements, 400);
}));

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) { generation++; stopMotion?.(); stopGraphics?.(); curtain?.classList.remove('is-active'); }
  else startEnhancements();
});
addEventListener('pageshow', event => { if (event.persisted) startEnhancements(); });

addEventListener('pagehide', () => { generation++; stopMotion?.(); stopGraphics?.(); });
