import { readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
process.chdir(root);
const html = await readFile('index.html', 'utf8');
const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
if (!style || scripts.length !== 2) throw new Error('Expected one stylesheet, one JSON-LD block and one application script');
const hash = text => `'sha256-${createHash('sha256').update(text).digest('base64')}'`;
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const policy = ["default-src 'self'", `script-src 'self' ${scripts.map(hash).join(' ')}`, `style-src 'self' https://fonts.googleapis.com ${hash(style)}`, "img-src 'self' data: https://images.unsplash.com", "font-src 'self' https://fonts.gstatic.com", "frame-src https://www.google.com", "connect-src 'self'", "media-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self' https://wa.me", "frame-ancestors 'none'", 'upgrade-insecure-requests'].join('; ');
const security = config.headers.find(rule => rule.source === '/(.*)');
security.headers.find(header => header.key === 'Content-Security-Policy').value = policy;
config.headers = [security];
config.redirects = [
  { source: '/services/:path*', destination: '/#treatments', permanent: true },
  { source: '/gallery/:path*', destination: '/#bridal', permanent: true },
  { source: '/about/:path*', destination: '/#sanctuary', permanent: true },
  { source: '/book/:path*', destination: '/#visit', permanent: true }
];
await writeFile('vercel.json', JSON.stringify(config, null, 2) + '\n');
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets/img', { recursive: true });
await mkdir('dist/.well-known', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await copyFile('public/assets/img/social-preview.png', 'dist/assets/img/social-preview.png');
await copyFile('public/.well-known/security.txt', 'dist/.well-known/security.txt');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://abirami-beauty.vercel.app/sitemap.xml\n');
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://abirami-beauty.vercel.app/</loc></url></urlset>');
await writeFile('dist/404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Abirami</title><style>${style}</style></head><body><main class="section not-found"><p class="eyebrow">Abirami Natural Beauty Parlour</p><h1>A different<br><em>turn.</em></h1><p>This page is not here. Our treatments, directions and WhatsApp booking are on the home page.</p><a class="button" href="/">Return to Abirami ↗</a></main></body></html>`);
console.log('Built standalone index.html, genuine 404, sitemap and hash-authorized CSP.');
