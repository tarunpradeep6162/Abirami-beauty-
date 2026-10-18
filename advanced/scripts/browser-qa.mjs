import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined});
const results=[];
await mkdir('qa-results',{recursive:true});
try{
 for(const width of [360,768,1280,1920]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{window.violations=[];document.addEventListener('securitypolicyviolation',event=>window.violations.push(event.violatedDirective));});
  const response=await page.goto('http://localhost:3000');assert.equal(response.status(),200);
  await page.waitForLoadState('networkidle');await page.locator('.hero-photo img').evaluate(image=>image.decode());
  assert.equal(await page.getByRole('heading',{level:1}).count(),1);
  assert.equal(await page.locator('canvas').count(),0,'Reduced motion uses static hero');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`No overflow at ${width}`);
  await page.screenshot({path:`qa-results/next-home-${width}.png`});
  const before=await page.evaluate(()=>window.violations.slice());
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
  assert.deepEqual(before,[],'No production CSP violations');assert.deepEqual(errors,[]);
  await page.getByRole('link',{name:'Reserve your consultation'}).click();
  assert.equal(await page.getByRole('link',{name:'Book on WhatsApp'}).isVisible(),true);
  assert.equal(await page.locator('form').count(),0,'Disabled deposits use WhatsApp');
  await page.route('**/api/portal',route=>route.fulfill({status:401,contentType:'application/json',body:JSON.stringify({error:'Invitation required'})}));
  await page.goto('http://localhost:3000/bridal');await page.getByLabel('Private invitation code').waitFor();
  await page.route('**/api/portal/session',route=>route.fulfill({contentType:'application/json',body:'{"signedIn":true}'}));
  await page.unroute('**/api/portal');
  await page.route('**/api/portal',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({name:'QA Client',notes:'Consultation pending.',timeline:[],images:[]})}));
  await page.getByLabel('Private invitation code').fill('a'.repeat(64));await page.getByRole('button',{name:'Open my journal'}).click();
  await page.getByRole('tab',{name:'Inspiration',exact:true}).waitFor();
  await page.getByRole('tab',{name:'Inspiration',exact:true}).focus();await page.keyboard.press('End');
  assert.equal(await page.getByRole('tab',{name:'Timeline',exact:true}).getAttribute('aria-selected'),'true');
  await page.getByText('Your timings will be agreed with you after the consultation.').waitFor();
  assert.deepEqual(await page.evaluate(()=>window.violations),[],'Portal CSP');
  const portalAudit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.deepEqual(portalAudit.violations.map(v=>v.id),[],'Portal accessibility');
  results.push({width,passed:true});await context.close();
 }
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'no-preference'});
 const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://localhost:3000');await page.waitForTimeout(2300);
 assert.equal(await page.locator('.hero-copy').isVisible(),true);assert.deepEqual(errors,[]);
 await page.screenshot({path:'qa-results/next-home-motion.png'});results.push({motion:'no-preference',passed:true});await context.close();
}finally{await browser.close();await writeFile('qa-results/next-results.json',JSON.stringify(results,null,2));}
console.log(`${results.length} browser checks passed. Portal API responses were mocked for UI testing; no auth/payment integration claim.`);
