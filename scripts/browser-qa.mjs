import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.QA_BASE_URL ?? 'http://localhost:4173';
const cache = process.env.QA_ASSET_CACHE ? JSON.parse(await readFile(process.env.QA_ASSET_CACHE, 'utf8')) : null;
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
const results = [];
await mkdir('qa-results', { recursive: true });
async function watchResources(context) {
  if (!cache) return;
  // Optional exact-response cache for restricted-network test runners.
  await context.route(/https:\/\/(?:images\.unsplash\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, async route => {
    const file = cache[route.request().url()];
    if (!file) return route.continue();
    const url = new URL(route.request().url());
    const contentType = url.hostname === 'images.unsplash.com' ? 'image/jpeg' : url.hostname === 'fonts.googleapis.com' ? 'text/css' : 'font/ttf';
    await route.fulfill({ body: await readFile(file), contentType });
  });
}
try {
  for (const width of [360, 768, 1280, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', hasTouch: width === 360 });
    await watchResources(context);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.cspViolations = [];
      document.addEventListener('securitypolicyviolation', event => window.cspViolations.push({ directive: event.violatedDirective, blocked: event.blockedURI }));
    });
    const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 60000 });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('#silk-veil').isVisible(), false, 'Reduced motion uses the static hero');
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}px overflow`);
    await page.screenshot({ path: `qa-results/hero-${width}.png` });
    await page.locator('.skip-link').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    if (width === 360) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Treatments', exact: true }).click();
      assert.equal(await page.locator('.site-nav').isVisible(), false);
    }
    await page.getByRole('tab', { name: '02 Botanical facials' }).click();
    await page.getByRole('tab', { name: '02 Botanical facials' }).press('End');
    assert.equal(await page.locator('#panel-grooming').isVisible(), true);
    await page.getByRole('tab', { name: '02 Botanical facials' }).click();
    await page.getByRole('link', { name: 'Reserve your facial', exact: true }).click();
    assert.equal(await page.locator('#client-service').inputValue(), 'Botanical & Gold Radiance Facials');
    await page.screenshot({ path: `qa-results/booking-${width}.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#booking-dialog').isVisible(), false);
    await page.getByRole('slider').press('ArrowRight');
    assert.equal(await page.getByRole('slider').inputValue(), '51');
    await page.getByRole('button', { name: 'Next review', exact: true }).click();
    assert.equal(await page.locator('.review-slide:not([hidden]) .review-author').textContent(), 'Al Thenmozhi');
    await page.getByRole('button', { name: 'View Silk and jewellery photograph', exact: true }).click();
    assert.equal(await page.locator('#gallery-dialog').isVisible(), true);
    await page.locator('#viewer-image').evaluate(image => image.decode());
    await page.getByRole('button', { name: 'Next photograph', exact: true }).click();
    assert.equal(await page.locator('#photo-counter').textContent(), '2 / 3');
    await page.locator('#gallery-dialog').press('ArrowLeft');
    assert.equal(await page.locator('#photo-counter').textContent(), '1 / 3');
    await page.screenshot({ path: `qa-results/gallery-${width}.png` });
    if (width === 360) {
      const bounds = await page.locator('#viewer-image').boundingBox();
      const x = bounds.x + bounds.width / 2;
      const y = bounds.y + bounds.height / 2;
      const touch = await context.newCDPSession(page);
      await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x + 45, y }] });
      await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 45, y }] });
      await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForFunction(() => document.querySelector('#photo-counter').textContent === '2 / 3');
      await page.getByRole('button', { name: 'Previous photograph', exact: true }).click();
      await touch.detach();
    }
    const beforeGalleryAxe = await page.evaluate(() => window.cspViolations.slice());
    const galleryAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(galleryAxe.violations.map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), [], 'Gallery accessibility');
    await page.evaluate(prior => { window.cspViolations = prior; }, beforeGalleryAxe);
    await page.getByRole('link', { name: 'Discuss this reference', exact: true }).click();
    assert.equal(await page.locator('#gallery-dialog').isVisible(), false);
    assert.equal(await page.locator('#booking-dialog').isVisible(), true);
    assert.match(await page.locator('#booking-reference-text').textContent(), /Silk & jewellery/);
    assert.equal(await page.evaluate(() => document.body.classList.contains('modal-open')), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#booking-dialog').isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.gallery), '0');
    await page.locator('summary').first().click();
    assert.notEqual(await page.locator('details').first().getAttribute('open'), null);
    for (const image of await page.locator('main img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
    }
    const brokenImages = await page.evaluate(() => [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.src));
    const csp = await page.evaluate(() => window.cspViolations);
    // Axe may fetch cross-origin stylesheets itself; record site CSP before injecting it.
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.push({ width, errors, csp, brokenImages, accessibility: axe.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) })) });
    await context.close();
  }
  const motionContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
  await watchResources(motionContext);
  const motionPage = await motionContext.newPage();
  const motionErrors = [];
  motionPage.on('pageerror', error => motionErrors.push(error.message));
  await motionPage.goto(base, { waitUntil: 'networkidle' });
  await motionPage.waitForFunction(() => document.querySelector('.curtain').getBoundingClientRect().bottom <= 0);
  const film = await motionPage.locator('#silk-veil').evaluate(canvas => {
    const gl = canvas.getContext('webgl');
    return { available: Boolean(gl), compiled: gl ? Boolean(gl.getParameter(gl.CURRENT_PROGRAM)) : false, visible: !canvas.hidden };
  });
  const reveals = await motionPage.locator('.reveal').all();
  for (const [index, element] of reveals.entries()) {
    await element.scrollIntoViewIfNeeded();
    await motionPage.waitForFunction(i => !document.querySelectorAll('.reveal')[i].classList.contains('waiting'), index);
  }
  assert.equal(await motionPage.locator('#silk-veil').isVisible(), false, 'Film stops off-screen');
  await motionPage.locator('#bridal-planning').evaluate(section => section.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await motionPage.screenshot({ path: 'qa-results/bridal-planning.png' });
  await motionPage.locator('.closing-invitation').screenshot({ path: 'qa-results/closing-invitation.png' });
  results.push({ motion: 'Curtain and scroll reveals completed', film, errors: motionErrors });
  await motionContext.close();
  const fallbackContext = await browser.newContext({ viewport: { width: 360, height: 900 }, reducedMotion: 'no-preference' });
  await watchResources(fallbackContext);
  const fallbackPage = await fallbackContext.newPage();
  const fallbackErrors = [];
  fallbackPage.on('pageerror', error => fallbackErrors.push(error.message));
  await fallbackPage.addInitScript(() => {
    Object.defineProperty(navigator, 'deviceMemory', { value: 8 });
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 8 });
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind === 'webgl') { window.filmAttempted = true; return null; }
      return original.call(this, kind, ...args);
    };
  });
  await fallbackPage.goto(base, { waitUntil: 'networkidle' });
  await fallbackPage.waitForFunction(() => window.filmAttempted === true);
  assert.equal(await fallbackPage.locator('#silk-veil').isVisible(), false);
  await fallbackPage.locator('.hero [data-book]').click();
  assert.equal(await fallbackPage.locator('#booking-dialog').isVisible(), true);
  results.push({ fallback: 'Forced unavailable WebGL: static hero and booking passed', errors: fallbackErrors });
  await fallbackContext.close();
  const context = await browser.newContext({ viewport: { width: 360, height: 900 }, reducedMotion: 'reduce' });
  await watchResources(context);
  const page = await context.newPage();
  await page.clock.install({ time: new Date('2026-10-19T04:00:00Z') });
  const outgoing = [];
  await page.route('https://wa.me/**', async route => {
    outgoing.push(route.request().url());
    await route.fulfill({ contentType: 'text/html', body: '<title>Intercepted locally</title>' });
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.hero [data-book]').click();
  await page.locator('#client-name').fill('Test Client & Family');
  await page.locator('#client-phone').fill('+91 90000 00000');
  await page.locator('#client-date').fill('2026-10-19');
  await page.locator('#client-time').fill('09:30');
  await page.getByRole('button', { name: 'Continue to WhatsApp' }).click();
  assert.match(await page.locator('#form-status').textContent(), /already passed/);
  await page.locator('#client-date').fill('2026-10-25');
  await page.locator('#client-service').selectOption('Botanical & Gold Radiance Facials');
  await page.locator('#client-time').fill('10:30');
  await page.getByRole('button', { name: 'Continue to WhatsApp' }).click();
  assert.match(await page.locator('#form-status').textContent(), /Sunday is for bridal/);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'View Silk and jewellery photograph', exact: true }).click();
  await page.getByRole('link', { name: 'Discuss this reference', exact: true }).click();
  await page.locator('#client-notes').fill('Muhurtham at 11 AM & a soft finish <please>');
  await page.getByRole('button', { name: 'Continue to WhatsApp' }).click();
  await page.waitForURL('https://wa.me/**');
  assert.equal(outgoing.length, 1);
  const url = new URL(outgoing[0]);
  assert.equal(url.pathname, '/919840638981');
  assert.match(url.searchParams.get('text'), /Test Client & Family/);
  assert.match(url.searchParams.get('text'), /25 October 2026 at 10:30 AM/);
  assert.match(url.searchParams.get('text'), /Muhurtham at 11 AM & a soft finish <please>/);
  assert.match(url.searchParams.get('text'), /Styling reference \(editorial inspiration\): Silk & jewellery/);
  assert.match(url.searchParams.get('text'), /https:\/\/images.unsplash.com\/photo-1610030469983/);
  results.push({ booking: 'Past-time and Sunday rules passed. WhatsApp intercepted locally; no message sent.' });
  await context.close();
} finally {
  await browser.close();
  await writeFile('qa-results/results.json', JSON.stringify(results, null, 2));
}
const failures = results.filter(item => item.errors?.length || item.csp?.length || item.brokenImages?.length || item.accessibility?.length);
console.log(`${results.length} checks; ${failures.length} need review. See qa-results/results.json.`);
if (failures.length) process.exitCode = 1;
