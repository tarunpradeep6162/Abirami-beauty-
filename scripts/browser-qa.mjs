import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.QA_BASE_URL ?? 'https://abirami-beauty.vercel.app';
const routes = JSON.parse(await readFile('public/routes.json', 'utf8'));
const widths = [360, 768, 1280, 1920];
await mkdir('qa-results', { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    for (const { route } of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        window.__cspViolations = [];
        document.addEventListener('securitypolicyviolation', event => window.__cspViolations.push({ directive: event.violatedDirective, blocked: event.blockedURI }));
      });
      const response = await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
      await page.locator('h1').waitFor();
      await page.waitForTimeout(1200);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      const h1Count = await page.locator('h1').count();
      await page.locator('.skip-link').focus();
      await page.keyboard.press('Enter');
      const skipWorks = await page.evaluate(() => document.activeElement?.id === 'main');
      if (width < 768) { await page.locator('.menu-toggle').click(); await page.locator('.site-nav').getByRole('link', { name: 'Home', exact: true }).waitFor({ state: 'visible' }); await page.keyboard.press('Escape'); }
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const csp = await page.evaluate(() => window.__cspViolations);
      const slug = route === '/' ? 'home' : route.replaceAll('/', '-');
      await page.screenshot({ path: `qa-results/${width}-${slug}.png`, fullPage: true });
      results.push({ width, route, status: response?.status(), overflow, h1Count, skipWorks, csp, errors, accessibility: axe.violations.map(issue => ({ id: issue.id, impact: issue.impact, targets: issue.nodes.map(node => node.target) })) });
      await page.close();
    }
    await context.close();
  }
  // Exercise motion, pinning and shader code separately from the calm screenshots.
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const motionErrors = [];
  page.on('pageerror', error => motionErrors.push(error.message));
  await page.addInitScript(() => { window.__cspViolations = []; document.addEventListener('securitypolicyviolation', event => window.__cspViolations.push({ directive: event.violatedDirective, blocked: event.blockedURI })); });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  for (const section of await page.locator('main > section').all()) { await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(1200); }
  const csp = await page.evaluate(() => window.__cspViolations);
  results.push({ width: 1280, route: '/', motion: true, csp, errors: motionErrors });
  await context.close();
} finally { await browser.close(); }
await writeFile('qa-results/results.json', JSON.stringify(results, null, 2));
const failed = results.filter(item => item.status && item.status !== 200 || item.overflow || item.h1Count !== undefined && item.h1Count !== 1 || item.skipWorks === false || item.csp.length || item.errors.length || item.accessibility?.length);
console.log(`${results.length} checks; ${failed.length} need review. See qa-results/results.json.`);
if (failed.length) process.exitCode = 1;
