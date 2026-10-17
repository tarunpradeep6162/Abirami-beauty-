import { readFile, writeFile } from 'node:fs/promises';
const business = JSON.parse(await readFile('src/business.json', 'utf8'));
if (business.siteUrl) {
  const urls = ['/', '/services/', '/gallery/', '/about/', '/book/'].map(path => `<url><loc>${new URL(path, business.siteUrl).href.replace(/&/g, '&amp;')}</loc></url>`).join('');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', business.siteUrl).href}\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
  console.log('Preview stays noindex until siteUrl is set.');
}
