# Audit before changes — 17 October 2026

Scope: repository at 3d4446314749a503208311b74d999a0884449e4d and its static Vercel configuration. This is a code/HTTP audit, not a completed browser or penetration test.

## Ranked findings

1. **Launch blocker — business content.** phone, hours, Instagram, services, Google rating and reviews are unset. Booking is disabled. No salon photos or approved result pair exist. Fixing code cannot supply these facts.
2. **High — CSP missing.** vercel.json sets nosniff/referrer/three permissions but no CSP, explicit HSTS, COOP or payment permission. Generated background styles and external Google Fonts are incompatible with requested self-only policy.
3. **High — canonical/SEO output absent.** siteUrl is null; every page is noindex and robots disallows crawling. Canonicals, sitemap and OG image output are absent. Keep noindex until approved content, but support the known canonical domain and valid sitemap immediately.
4. **High — no runtime CSP coverage.** Inline JSON-LD exists. GSAP and the CSS comparison use runtime CSSOM styles. Testing must distinguish static inline styles from necessary animation CSSOM writes; do not enable unsafe-inline.
5. **High — unmeasured quality targets.** No browser tests at requested widths, no measured CWV, no Lighthouse run and no real Android timing evidence. Static build success does not establish any of those scores.
6. **Medium — thin SEO copy.** Most page descriptions are repeated. Concatenated titles exceed 60 characters. No service planning pages, FAQ, breadcrumbs, Service schema support, Twitter tags or consistent per-page social titles.
7. **Medium — incomplete metadata.** No custom 404, web manifest, conventional icon sizes or 1200×630 raster social image. Full square logo works poorly as a tiny favicon.
8. **Medium — map resilience.** Click-loaded maps.google.com differs from the requested www.google.com frame-src allowance. No iframe failure treatment, timeout explanation, static location illustration or nearby-landmark field.
9. **Medium — external fonts.** Render-blocking CSS @import contacts Google and lacks local preload; body 500/600 weights may synthesize under some font failures.
10. **Medium — interaction accessibility.** Small nav/link/menu targets, hover-open native details can conflict with click, inherited blockquote margins can overflow, and the horizontal desktop strip does not explicitly handle keyboard focus moving to a translated item.
11. **Medium — performance.** Motion loads after idle even on a page with no animated content. Hero reveal starts only when heavy motion JS arrives. Continuous WebGL surfaces reread layout per frame. GPU performance and context limits are unmeasured. Still image texture requests may duplicate responsive image downloads.
12. **Medium — motion inconsistency.** Several transitions last .22–.6 seconds with unrelated easing. Curtain and late hero reveal can obscure or move already-painted content; header uses fixed heights that can drift from branding layout.
13. **Medium — lifecycle.** pagehide disposes motion/graphics but bfcache restores do not restart them. Reduced-motion changes reload the page and can discard typed form content.
14. **Medium — defensive data validation.** Instagram/phone are validated but siteUrl and service/review records lack central validation. Missing CSP increases the consequence of future unsafe rendering. No security.txt.
15. **Medium — phone exposure.** Once configured, the full phone is repeated in links and bundled config. HTML obfuscation can reduce trivial scraping but cannot keep a public booking number secret, especially with required telephone schema.
16. **Medium — release reproducibility.** Direct npm versions are ranges. Rust is absent, so the Rust encoder and compiled WASM have not been executed. No Rust lockfiles exist; dependency resolution remains a first-native-build task.
17. **Low — design substance.** No promise statement, trust-data slot, FAQ, local Instagram section, share button or contact composition. Before/after has only demonstration imagery. Empty service rows are not a substitute for owner content.
18. **Low — caching.** There is no explicit immutable rule confined to hashed bundles and no HTML revalidation rule. Stable overwritten media must never be treated as immutable.
19. **Low — asset documentation.** Logo is supplied and preserved, but page crops and placeholder alt text need replacement when real photographs arrive. No owner SEO or social publishing checklist.
20. **Low — automated checks.** Verification checks local routes/schema/container headers, but not title lengths, inline markup, safe external links, navigation target size rules, social metadata, canonical consistency or security header configuration.

Baseline positives: no backend/secrets found; static links are escaped; WhatsApp messages are URL-encoded; reduced-motion, keyboard menu, paused off-screen WebGL, mobile DPR cap and image fallbacks already exist. Initial npm audit: zero reported vulnerabilities. No breach or exploitable dependency vulnerability was found by this limited audit.

## Content that must remain unfilled

Verified salon number, hours, coordinates, opening year, service availability, real review text/rating/count, Instagram, Google Business Profile, nearby landmarks and real photos. Public planning guides must not be represented as confirmed services. Service schema is emitted only for confirmed services. FAQ markup does not guarantee Google FAQ rich-result eligibility.
