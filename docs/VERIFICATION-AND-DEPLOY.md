# Verification and redeployment

## Local build and dependency checks

```sh
npm ci
npm run build
npm test
npm run verify
npm audit
```

The build runs optional Rust image conversion, optional WASM, prerender, TypeScript, Vite, SEO output and the full source listing in order. Missing Rust prints a clear skip. This environment cannot establish Rust compilation or compiled-WASM execution; earlier Rust source tests remain available in README.

Static verification checks all 10 pages, unique title/description limits, local asset and srcset targets, canonical and social metadata, original guide word counts, JSON-LD data files, no authored inline CSS/scripts/events, fonts, pinned direct dependencies, CSP configuration and missing-business-data guards.

## Browser QA, CSP and four viewport sizes

```sh
npx playwright install chromium
npm run qa:browser
```

Run this on a machine with browser support after deployment. QA_BASE_URL optionally selects a staging origin. The script checks all routes at 360, 768, 1280 and 1920px, horizontal overflow, visible navigation, reduced motion, keyboard skip link, axe WCAG A/AA issues and top-frame CSP violation events. It writes local QA results and screenshots to qa-results (ignored by Git). It is not a field-performance measurement. Review Google Maps visually: cross-origin frame restrictions prevent reliable detection of every provider error; the manual location-card control and permanent directions link remain available.

The shipped HTML contains no inline scripts, style attributes, style blocks or event handlers. Image preview styling is an external generated stylesheet. JSON-LD is fetched from same-origin JSON and added as a non-executable data block by an external module; Google supports rendered structured data. It is not executable inline JavaScript. GSAP and the comparison control still update CSSOM properties at runtime, as required for motion. Browser verification is needed to catch library-specific CSP interactions; static checks are not a claim of zero runtime violations.

## Lighthouse and public validators

```sh
npx lighthouse https://abirami-beauty.vercel.app --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-report.html
```

Install Chrome/Chromium first. Repeat mobile and desktop, and use a real mid-range Android. Targets are performance 90+, accessibility/best-practices/SEO 100, LCP <2.5s, CLS <0.1 and INP <200ms. These are targets, not measured results. INP needs representative interactions and eventually field data; a synthetic score does not establish it. noindex intentionally prevents full launch SEO eligibility until the owner content gate is opened.

- https://securityheaders.com — enter https://abirami-beauty.vercel.app. Inspect actual headers; do not rely solely on the letter grade.
- https://search.google.com/test/rich-results — use each URL, not pasted source, because JSON-LD is added during rendering. Missing real phone/hours/geo may produce completeness warnings. Do not fill them with fake values.
- https://validator.schema.org — inspect BeautySalon/LocalBusiness, BreadcrumbList, FAQPage and confirmed Service records.
- Google FAQ rich results are restricted to eligible authoritative sites; FAQPage markup is not a promise of a rich result for this salon. Self-serving LocalBusiness review stars are likewise not promised. Ratings remain unpublished until real data is supplied.
- Google Search Console URL Inspection — after owner approval and indexable=true, verify rendered content and indexing status.

## Exact Vercel redeployment commands

The Vercel project already exists in team tarun-2f6a, project abirami-beauty.
Run these from the repository root with the Vercel CLI installed and your own
CLI session authenticated. Do not paste credentials into repository files.

```sh
vercel link --yes --project abirami-beauty --scope tarun-2f6a
vercel pull --yes --environment=production --scope tarun-2f6a
vercel build --prod --scope tarun-2f6a
vercel deploy --prebuilt --prod --scope tarun-2f6a
```

Install the CLI first if necessary with npm install --global vercel, then
vercel login. Pin the installed CLI version in your own CI setup rather than
using an unreviewed floating version. Native connected Vercel deployment can
also deploy the exact committed SHA without exposing any token.

Repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Production: https://abirami-beauty.vercel.app
Static output: dist. No backend has been added. No Vercel access controls need
to be weakened to deploy this update.

## Honest remaining gates

There is no local Playwright Chromium installation in this workspace. A cloud
browser can provide a limited smoke check, but not the automated four-width
matrix or Lighthouse. Do not interpret CSS breakpoints as completed viewport tests. Browser CSP,
axe, screenshots, Lighthouse, public validator scores, real-device performance
and visual map checks remain to run. Owner content gaps are listed in
OWNER-CHECKLIST-AND-SOCIAL.md. A static fallback image and directions link
are provided, but a cross-origin iframe cannot reliably report every failure.
