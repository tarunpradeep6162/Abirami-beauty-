# Abirami — complete upgraded source

Static frontend, Rust image CLI, noise WASM and build tooling. Compiled output and private originals are excluded from this source listing.

## File tree

```text
.gitignore
404.html
about/index.html
AGENTS.md
book/index.html
docs/AUDIT.md
docs/npm-audit.json
docs/OWNER-CHECKLIST-AND-SOCIAL.md
docs/VERIFICATION-AND-DEPLOY.md
docs/VERIFICATION-RESULTS.md
gallery/index.html
index.html
package-lock.json
package.json
public/.well-known/security.txt
public/assets/fonts/cormorant-garamond-LICENSE.txt
public/assets/fonts/dm-sans-LICENSE.txt
public/assets/img/grain.svg
public/assets/img/location-card.svg
public/assets/img/manifest.json
public/assets/img/mark.svg
public/assets/img/photo-colours.css
public/assets/img/photo-placeholder.svg
public/assets/wasm/manifest.json
public/data/schema/404.html.json
public/data/schema/about.json
public/data/schema/book.json
public/data/schema/gallery.json
public/data/schema/home.json
public/data/schema/services-bridal-makeup.json
public/data/schema/services-facials.json
public/data/schema/services-hair-spa.json
public/data/schema/services-threading.json
public/data/schema/services.json
public/routes.json
public/site.webmanifest
README.md
rust/imgtool/Cargo.toml
rust/imgtool/src/main.rs
rust/noise-wasm/Cargo.toml
rust/noise-wasm/src/lib.rs
scripts/browser-qa.mjs
scripts/business.mjs
scripts/content.mjs
scripts/finalize.mjs
scripts/media.mjs
scripts/media.test.mjs
scripts/noise.test.mjs
scripts/prerender.mjs
scripts/rust.mjs
scripts/source.mjs
scripts/verify.mjs
services/bridal-makeup/index.html
services/facials/index.html
services/hair-spa/index.html
services/index.html
services/threading/index.html
src/booking.ts
src/business.json
src/css/base.css
src/css/components.css
src/css/editorial.css
src/css/layout.css
src/gl/experience.ts
src/gl/noise.ts
src/gl/shaders/dust.frag.glsl
src/gl/shaders/dust.vert.glsl
src/gl/shaders/fabric.frag.glsl
src/gl/shaders/fullscreen.vert.glsl
src/gl/shaders/grain.frag.glsl
src/gl/shaders/liquid.frag.glsl
src/gl/shaders/wipe.frag.glsl
src/main.ts
src/motion.ts
src/structured-data.ts
tsconfig.json
vercel.json
vite.config.ts
```

## .gitignore

````
node_modules/
dist/
.env*
!.env.example
.DS_Store

rust/**/target/
photos-original/*
!photos-original/README.md

.vercel/

qa-results/
lighthouse-report.html

````

## 404.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Page Not Found | Abirami Natural Beauty</title><meta name="description" content="That page is not here. Return to Abirami Natural Beauty Parlour or find our address and booking information."><link rel="canonical" href="https://abirami-beauty.vercel.app/404.html"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Page Not Found | Abirami Natural Beauty"><meta property="og:description" content="That page is not here. Return to Abirami Natural Beauty Parlour or find our address and booking information."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/404.html"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Page Not Found | Abirami Natural Beauty"><meta name="twitter:description" content="That page is not here. Return to Abirami Natural Beauty Parlour or find our address and booking information."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/404.html.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><section class="page-intro"><p class="eyebrow">Page not found</p><h1 data-reveal>A different<br><em>turn.</em></h1><p>This page is not here. <a href="/">Return home</a> or <a href="/book/">find our address</a>.</p></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## about/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>About Our Jalladiampet Parlour | Abirami Natural Beauty</title><meta name="description" content="Find Abirami Natural Beauty Parlour on Rice Mill Road in Jalladiampet, Medavakkam, Chennai. Natural beauty, close to home."><link rel="canonical" href="https://abirami-beauty.vercel.app/about/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="About Our Jalladiampet Parlour | Abirami Natural Beauty"><meta property="og:description" content="Find Abirami Natural Beauty Parlour on Rice Mill Road in Jalladiampet, Medavakkam, Chennai. Natural beauty, close to home."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/about/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="About Our Jalladiampet Parlour | Abirami Natural Beauty"><meta name="twitter:description" content="Find Abirami Natural Beauty Parlour on Rice Mill Road in Jalladiampet, Medavakkam, Chennai. Natural beauty, close to home."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/about.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" aria-current="page">About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">About</span></nav><section class="page-intro"><p class="eyebrow">Abirami, close to home</p><h1 data-reveal>On Rice<br><em>Mill Road.</em></h1><p>A neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai.</p></section><section class="section story" data-story><div class="story-art"><div class="photo photo-salon parallax-photo" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside the salon on Rice Mill Road" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div class="photo photo-detail story-inset" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A detail from the salon" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div class="story-copy"><p class="eyebrow">Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Find Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet. Tell us what you have in mind for your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section><section class="section promise"><p class="eyebrow">Our Promise</p><h2 data-reveal>Your face.<br>Your comfort.<br><em>Your choice.</em></h2><div class="promise-note"><p>Beauty should leave room for you. The look you like. The questions you want to ask. The things you would rather keep simple.</p><p>Before you book, let’s talk about what you have in mind.</p></div><span class="promise-signature" aria-hidden="true">Abirami.</span></section><section class="section closing"><div class="photo photo-closing " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" href="/book/" data-magnetic>Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## AGENTS.md

````md
# Abirami website

Canonical repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Use this repository for all future work on Abirami Natural Beauty Parlour.

Keep the project static-only: Vite, vanilla TypeScript, CSS, optional WebGL, Rust build tools.
Do not add a server, invented business details, ratings, reviews or client photographs.
Unknown business values stay null in src/business.json.
Keep the preview noindex until business content and final domain are approved.

Before deploying run npm run build, npm test and npm run verify.
Build regenerates COMPLETE-SOURCE.md and the HTML pages; commit those updates.
Do not commit node_modules, dist, Rust target directories, private originals, environment files or .vercel.
Vercel builds from the repository root using npm run build; output is dist.

````

## book/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>WhatsApp Booking &amp; Directions | Abirami Natural Beauty</title><meta name="description" content="Plan a visit to Abirami Natural Beauty Parlour, No.1/11, Rice Mill Road, Jalladiampet, Medavakkam. Find directions and WhatsApp booking information."><link rel="canonical" href="https://abirami-beauty.vercel.app/book/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="WhatsApp Booking &amp; Directions | Abirami Natural Beauty"><meta property="og:description" content="Plan a visit to Abirami Natural Beauty Parlour, No.1/11, Rice Mill Road, Jalladiampet, Medavakkam. Find directions and WhatsApp booking information."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/book/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="WhatsApp Booking &amp; Directions | Abirami Natural Beauty"><meta name="twitter:description" content="Plan a visit to Abirami Natural Beauty Parlour, No.1/11, Rice Mill Road, Jalladiampet, Medavakkam. Find directions and WhatsApp booking information."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/book.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" aria-current="page">Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact &amp; book</span></nav><section class="page-intro"><p class="eyebrow">Come by. Say hello.</p><h1 data-reveal>Let’s make<br><em>some time.</em></h1><p>Ask about a service, a date, or your next visit.</p></section><section class="section book-layout"><div class="book-details"><h2>Say hello.</h2><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Nearby landmark: to be confirmed</p><p class="fine-print">WhatsApp booking will open when the verified salon number is added. Your details are not sent or stored.</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a></div><form class="enquiry-form" action="/book/" method="get"><label for="guest-name">Your name<input id="guest-name" name="name" autocomplete="given-name" maxlength="80" required></label><label for="guest-service">What would you like to ask about?<input id="guest-service" name="service" maxlength="120" required></label><label for="guest-date">Preferred date<input id="guest-date" name="date" type="date"></label><label for="guest-note">Anything else?<textarea id="guest-note" name="note" maxlength="800"></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>I’m happy to share these details with the salon through WhatsApp.</span></label><p class="fine-print">Please leave out medical or other sensitive details.</p><p class="form-status" role="status">The verified WhatsApp number is awaiting confirmation.</p><button class="button" type="submit" disabled data-book-submit>Continue to WhatsApp</button><noscript><p>Please enable JavaScript to prepare your WhatsApp message. This form does not submit to a server.</p></noscript></form></section><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## docs/AUDIT.md

````md
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

````

## docs/npm-audit.json

````json
{
  "auditReportVersion": 2,
  "vulnerabilities": {},
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0,
      "total": 0
    },
    "dependencies": {
      "prod": 4,
      "dev": 82,
      "optional": 53,
      "peer": 0,
      "peerOptional": 0,
      "total": 85
    }
  }
}

````

## docs/OWNER-CHECKLIST-AND-SOCIAL.md

````md
# Owner launch checklist

- Confirm the salon's international-format WhatsApp/call number. Test the actual phone and WhatsApp links on a phone. A public WhatsApp number cannot be kept secret from determined scraping; HTML fragments are only light obfuscation.
- Confirm the exact opening hours, all available services and prices. Add them to src/business.json. Add structured opening hours only after checking days and opening/closing times.
- Confirm the Instagram username and actual Google Business Profile URL. Do not substitute an unrelated listing. Add verified coordinates and a nearby landmark only after checking the correct entrance.
- Confirm the opening year if you want it shown. Do not guess years in business. The service count is derived from the confirmed list. The trust strip stays hidden when no verified figures are supplied.
- Claim and verify the Google Business Profile. Use exactly Abirami Natural Beauty Parlour and No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100; use the same phone as the site.
- Fill the listing's real hours, categories and service descriptions. Add https://abirami-beauty.vercel.app as the website.
- Upload approved exterior, entrance, interior and service photos. Use customer photos only with permission. Add accessible photo descriptions when replacing the placeholder assets.
- Obtain the actual Google review short link from the verified profile. Ask happy clients for honest reviews without incentives or pressure. Do not gate negative reviews or invent quotes. Add genuine review text and rating/count only after verification.
- Review the four public planning guides. They do not establish that bridal makeup, facials, hair spa or threading is offered. Confirm the menu separately before listing any as services or adding Service schema.
- Supply an accurate matched before/after pair and permission before enabling comparisonApproved. Never replace it with simulated results.
- Review all public copy. Then set indexable to true, rebuild and deploy. Until then noindex stays on the pages; the sitemap and canonical URLs are already usable.
- After launch, verify Search Console domain/URL ownership, submit sitemap.xml, run URL Inspection, and check the Google Business Profile website link.
- Review security.txt yearly before its 2027-10-17 expiry. The current contact is the repository issue page. Use a verified monitored security mailbox instead if desired; none has been invented here.

## Ready-to-paste Instagram bio

Abirami Natural Beauty Parlour
Jalladiampet · Medavakkam, Chennai
A little time for you.
WhatsApp for appointments ↓

Set the profile website to https://abirami-beauty.vercel.app/book/ once the real booking number is connected. Do not imply a working WhatsApp link before it exists.

## Google Business description

Abirami Natural Beauty Parlour is on Rice Mill Road in Jalladiampet, Medavakkam, Chennai. Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Please contact the parlour to confirm current services, consultation prices and appointment availability before visiting.

This draft contains only supplied facts. Add confirmed services and real opening details after owner review, without medical promises or unverified superiority claims.

## Ten caption ideas

1. A little time for you, close to home. Find Abirami on Rice Mill Road, Jalladiampet. Ask us about your next visit.
2. Before a big day, start with a small conversation. Tell us the date, the look you like and the questions on your mind. Please confirm service availability before booking.
3. Your face. Your comfort. Your choice. Keep the things you like about yourself in the conversation.
4. Coming from Medavakkam? The website has our address and a directions link. Confirm your appointment before setting out.
5. A photograph can begin a conversation. Bring a reference and tell us which details you like.
6. Not sure what to ask before a facial appointment? Our website has a simple planning guide. Confirm the current options with the parlour.
7. Planning time for your hair? Ask what is included, how long to allow and the full consultation price before you book.
8. Small details matter too. Tell us what you want to keep and what you would like to discuss before your visit.
9. Photographs from the parlour will be shared with permission. Your comfort matters behind the camera as well.
10. A first visit can begin with a hello. Ask about a service, check a date and make a little room for yourself.

Add a booking CTA only after the verified WhatsApp number is connected. Pair each caption with an appropriate real approved photograph, not the current site placeholders. Do not label an image as posted on Instagram unless it actually was.

## Social preview asset spec

public/assets/img/social-preview.png is a real 1200×630 PNG using the supplied logo, ivory/moss/brass palette and the truthful Jalladiampet/Medavakkam location. It is a branded placeholder card, not a salon photograph. It is used by OG and Twitter metadata on all pages; titles and descriptions are page-specific. Replace it with a verified final card if desired, preserving dimensions, name, legibility and safe edges. WhatsApp cache refresh timing is controlled by WhatsApp, not the site.

Icon exports preserve the supplied full artwork; at 32px the full wordmark is necessarily small. For a stronger favicon, supply an approved standalone mark. The original logo is never redrawn or modified on the page.

````

## docs/VERIFICATION-AND-DEPLOY.md

````md
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

````

## docs/VERIFICATION-RESULTS.md

````md
# Verification results — 17 October 2026

## Passed locally

- TypeScript check and production Vite build.
- Manifest/responsive-image integration and WASM/JS fallback tests.
- Static verification across 10 HTML pages: title/description lengths and uniqueness, one H1, canonical/social/schema references, inline-code/style guards, local links/srcsets, fonts, security configuration, image signatures and pinned direct npm versions.
- Four planning guides contain 263, 261, 268 and 263 words respectively. They are explicitly not a confirmed service menu.
- npm audit reports zero vulnerabilities; complete JSON is in npm-audit.json.

## Live browser smoke check

Cloud browser viewport: 1363×936. Main home, services, gallery, about, book and four guide pages rendered one H1 and one rendered JSON-LD block, with no horizontal overflow. The eight non-home routes emitted no page-origin warning/error messages in the sampled navigation interval. The browser loaded self-hosted fonts. No CSP violation messages appeared in this sampled run; this is not an exhaustive runtime CSP guarantee.

The first home check caught a desktop menu visibility override and a clipped logo. CSS was corrected. This cloud browser disables WebGL, so only image/CSS fallback could be inspected. A capability probe was added before renderer construction to avoid repeatedly logging Three.js context errors in unsupported browsers. Hardware WebGL rendering and frame rate remain unverified.

## Live HTTP checks

All nine public routes return 200 and all requested security headers. A missing URL returns an actual 404. These checks inspect HTTP responses; they do not run JavaScript or establish visual correctness.

## Not yet established

- Full viewport matrix at 360, 768, 1280 and 1920px.
- Automated axe results and complete keyboard walkthroughs.
- Full motion, all scroll positions, Google Maps visual/error states, shader rendering on actual hardware and mid-range Android performance.
- Lighthouse scores, field CWV, securityheaders.com grade, Google Rich Results Test and Search Console indexing.
- Rust compilation/encoding and compiled-WASM execution (Rust absent in this workspace).
- Actual booking (verified business phone absent), real menu, hours, geo, opening year, Instagram/Google Profile, reviews, real salon photos and client-approved before/after pair.

No Lighthouse 90/100 score, AA certification, 60fps or production-launch-complete claim is made. Full repeatable commands are in VERIFICATION-AND-DEPLOY.md. The owner approval gate keeps HTML noindex until the real content is ready.

````

## gallery/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Salon &amp; Bridal Gallery | Abirami Natural Beauty</title><meta name="description" content="A place for approved salon and bridal photographs from Abirami Natural Beauty Parlour, Jalladiampet. Client images are published with permission."><link rel="canonical" href="https://abirami-beauty.vercel.app/gallery/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Salon &amp; Bridal Gallery | Abirami Natural Beauty"><meta property="og:description" content="A place for approved salon and bridal photographs from Abirami Natural Beauty Parlour, Jalladiampet. Client images are published with permission."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/gallery/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Salon &amp; Bridal Gallery | Abirami Natural Beauty"><meta name="twitter:description" content="A place for approved salon and bridal photographs from Abirami Natural Beauty Parlour, Jalladiampet. Client images are published with permission."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/gallery.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" aria-current="page">Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Gallery</span></nav><section class="page-intro"><p class="eyebrow">The gallery</p><h1 data-reveal>Beauty,<br><em>up close.</em></h1><p>Approved salon and client photographs will appear here with permission.</p></section><section class="section gallery" aria-label="Salon photo gallery"><figure><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A finishing touch." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><figcaption>A finishing touch.</figcaption></figure><figure><div class="photo photo-salon " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Our place on Rice Mill Road." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><figcaption>Our place on Rice Mill Road.</figcaption></figure><figure><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: The little details." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><figcaption>The little details.</figcaption></figure><figure><div class="photo photo-ritual " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A moment to pause." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><figcaption>A moment to pause.</figcaption></figure></section><section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">Bridal &amp; beauty gallery</p><h2 data-reveal>Still you.<br><em>Up close.</em></h2><p>Client photographs belong here only with permission. This demonstration does not show a client result.</p></div><div><div class="comparison" data-comparison data-approved="false"><img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy"><div class="after-photo"><img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy"></div><span class="comparison-label before">Before · placeholder</span><span class="comparison-label after">After · placeholder</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label></div></section><section class="section instagram-section"><div class="section-heading"><p class="eyebrow">Our Instagram journal</p><h2 data-reveal>The little<br><em>moments.</em></h2></div><p>Approved salon photographs and our confirmed Instagram handle will be added here.</p><div class="instagram-photos"><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Approved salon portrait for the Instagram journal" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Approved salon detail for the Instagram journal" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div></section><section class="section closing"><div class="photo photo-closing " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" href="/book/" data-magnetic>Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Beauty Parlour in Medavakkam | Abirami Natural Beauty</title><meta name="description" content="Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet, Medavakkam. Plan your visit and ask about appointments on WhatsApp."><link rel="canonical" href="https://abirami-beauty.vercel.app/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Beauty Parlour in Medavakkam | Abirami Natural Beauty"><meta property="og:description" content="Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet, Medavakkam. Plan your visit and ask about appointments on WhatsApp."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Beauty Parlour in Medavakkam | Abirami Natural Beauty"><meta name="twitter:description" content="Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet, Medavakkam. Plan your visit and ask about appointments on WhatsApp."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/home.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" aria-current="page">Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><section class="hero" data-fabric><div class="hero-media is-placeholder"><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Abirami Natural Beauty Parlour in Jalladiampet" width="1200" height="1500" fetchpriority="high" decoding="async" ></picture></div><div class="hero-shade"></div><p class="eyebrow">Abirami Natural Beauty Parlour · Chennai</p><h1 class="hero-title"><span>Beauty,</span><span>in your</span><span><em>own time.</em></span></h1><div><a class="button button-solid" href="/book/" data-magnetic>Book on WhatsApp</a></div><div class="hero-bottom"><p>Rice Mill Road.<br>Jalladiampet, Medavakkam.</p><p>Salon film and photographs to follow.</p><span class="hero-number" aria-hidden="true">a.</span></div></section><section class="section story" data-story><div class="story-art"><div class="photo photo-salon parallax-photo" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside the salon on Rice Mill Road" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div class="photo photo-detail story-inset" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A detail from the salon" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div class="story-copy"><p class="eyebrow">Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Find Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet. Tell us what you have in mind for your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section><section class="section promise"><p class="eyebrow">Our Promise</p><h2 data-reveal>Your face.<br>Your comfort.<br><em>Your choice.</em></h2><div class="promise-note"><p>Beauty should leave room for you. The look you like. The questions you want to ask. The things you would rather keep simple.</p><p>Before you book, let’s talk about what you have in mind.</p></div><span class="promise-signature" aria-hidden="true">Abirami.</span></section><section class="section services-editorial"><div class="section-heading"><p class="eyebrow">The service menu</p><h2 data-reveal>Care, at<br><em>your pace.</em></h2></div><div class="service-layout"><div class="photo photo-services " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Salon care and treatment details" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><ol class="service-list"><li class="service-row"><h3>Let’s talk first.</h3><p>Our confirmed service menu is being prepared. Ask about availability and prices before booking.</p></li></ol><p class="fine-print service-note">Prices on consultation</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section><section class="horizontal-section" aria-labelledby="strip-title"><div class="horizontal-heading"><p class="eyebrow">Before you book</p><h2 id="strip-title" data-reveal>A little<br><em>preparation.</em></h2><p class="fine-print">Planning guides. Please confirm service availability with the salon.</p></div><div class="services-track"><article class="strip-item"><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Bridal makeup planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Bridal makeup</h3><a class="text-link" href="/services/bridal-makeup/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-ritual " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Facials planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Facials</h3><a class="text-link" href="/services/facials/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Hair spa planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Hair spa</h3><a class="text-link" href="/services/hair-spa/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-services " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Threading planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Threading</h3><a class="text-link" href="/services/threading/">Read the guide ↗</a></article></div></section><section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">Bridal &amp; beauty gallery</p><h2 data-reveal>Still you.<br><em>Up close.</em></h2><p>Client photographs belong here only with permission. This demonstration does not show a client result.</p></div><div><div class="comparison" data-comparison data-approved="false"><img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy"><div class="after-photo"><img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy"></div><span class="comparison-label before">Before · placeholder</span><span class="comparison-label after">After · placeholder</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label></div></section><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section><section class="section instagram-section"><div class="section-heading"><p class="eyebrow">Our Instagram journal</p><h2 data-reveal>The little<br><em>moments.</em></h2></div><p>Approved salon photographs and our confirmed Instagram handle will be added here.</p><div class="instagram-photos"><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Approved salon portrait for the Instagram journal" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Approved salon detail for the Instagram journal" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div></section><section class="section closing"><div class="photo photo-closing " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" href="/book/" data-magnetic>Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## package-lock.json

````json
{
  "name": "abirami-natural-beauty-parlour",
  "version": "0.3.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "abirami-natural-beauty-parlour",
      "version": "0.3.0",
      "dependencies": {
        "gsap": "3.15.0",
        "lenis": "1.3.27",
        "three": "0.180.0"
      },
      "devDependencies": {
        "@axe-core/playwright": "4.14.0",
        "@fontsource/cormorant-garamond": "5.3.0",
        "@fontsource/dm-sans": "5.3.0",
        "@playwright/test": "1.64.1",
        "@types/node": "24.19.2",
        "@types/three": "0.180.0",
        "typescript": "5.9.3",
        "vite": "7.3.7"
      },
      "engines": {
        "node": ">=22.12"
      }
    },
    "node_modules/@axe-core/playwright": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/@axe-core/playwright/-/playwright-4.14.0.tgz",
      "integrity": "sha512-SGUhG5PIHd2eMdpgBF2PyQLOhX+qyDR2PT4cmoS4Qk2ak+jX/rrSvst9l0PGv5WTHolKpUMvVmoHpr4cZgf1RQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "axe-core": "~4.14.0"
      },
      "engines": {
        "node": ">=22.12.0"
      },
      "peerDependencies": {
        "playwright-core": ">= 1.0.0"
      }
    },
    "node_modules/@dimforge/rapier3d-compat": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/@dimforge/rapier3d-compat/-/rapier3d-compat-0.12.0.tgz",
      "integrity": "sha512-uekIGetywIgopfD97oDL5PfeezkFpNhwlzlaEYNOA0N6ghdsOvh/HYjSMek5Q2O1PYvRSDFcqFVJl4r4ZBwOow==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.28.2.tgz",
      "integrity": "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.28.2.tgz",
      "integrity": "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.28.2.tgz",
      "integrity": "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.28.2.tgz",
      "integrity": "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.28.2.tgz",
      "integrity": "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.28.2.tgz",
      "integrity": "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.28.2.tgz",
      "integrity": "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.28.2.tgz",
      "integrity": "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.28.2.tgz",
      "integrity": "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.28.2.tgz",
      "integrity": "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.28.2.tgz",
      "integrity": "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.28.2.tgz",
      "integrity": "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.28.2.tgz",
      "integrity": "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.28.2.tgz",
      "integrity": "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.28.2.tgz",
      "integrity": "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.28.2.tgz",
      "integrity": "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.2.tgz",
      "integrity": "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.28.2.tgz",
      "integrity": "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.28.2.tgz",
      "integrity": "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.28.2.tgz",
      "integrity": "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.28.2.tgz",
      "integrity": "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.28.2.tgz",
      "integrity": "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.28.2.tgz",
      "integrity": "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.28.2.tgz",
      "integrity": "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@fontsource/cormorant-garamond": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@fontsource/cormorant-garamond/-/cormorant-garamond-5.3.0.tgz",
      "integrity": "sha512-weuGsCirGVWBWqpt6YUp0yLThTe4G8YO45noq8wxeJCRvEpq5lFrxNMFSTxcyOyV5k5otzJ8guDzYegdYlcLMQ==",
      "dev": true,
      "license": "OFL-1.1",
      "funding": {
        "url": "https://github.com/sponsors/ayuhito"
      }
    },
    "node_modules/@fontsource/dm-sans": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@fontsource/dm-sans/-/dm-sans-5.3.0.tgz",
      "integrity": "sha512-lYJtMXXO28q1z+yz+z8XKd0s4hXaa9QdkETzkyD760sidCv5heI86weYA0sx0Nc4pAMAQTUuyf4gO44cYKKS9g==",
      "dev": true,
      "license": "OFL-1.1",
      "funding": {
        "url": "https://github.com/sponsors/ayuhito"
      }
    },
    "node_modules/@napi-rs/lzma-linux-x64-gnu": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/lzma-linux-x64-gnu/-/lzma-linux-x64-gnu-1.5.1.tgz",
      "integrity": "sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^22.20 || ^24.12 || >=25"
      }
    },
    "node_modules/@playwright/test": {
      "version": "1.64.1",
      "resolved": "https://registry.npmjs.org/@playwright/test/-/test-1.64.1.tgz",
      "integrity": "sha512-IaYGml/nSOiZWROfPtuIL7neuu9qDOZ3TNvNljUIrhDMxiGTgPjzj/g9p9RxpS2tSepPDRY+UwAaEeiKtUvIAg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "playwright": "1.64.1"
      },
      "bin": {
        "playwright": "cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.64.7.tgz",
      "integrity": "sha512-GFF2tHk0NqYVObrK0+/ps/LEXsV/v2q6Lyiy7mZr+Ej24fpQScvqK2ziz9NHeEQYnKWKym38Ml7dZbPtC9tuAw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.64.7.tgz",
      "integrity": "sha512-BOymcXJFYYXqluDidj6sLelNjXruC3u1BqVxLn2OPCXH9xaPSOTH+MS4uychsGI1NU7tJoiv9KvqijDHFe+hhQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.64.7.tgz",
      "integrity": "sha512-jgVpGweIbls2H5jfBB70tnX52abMd5pJr3xmtoDILx6JdmGl+Un+tMb9R+MbHPVB46tTBpY8emtn7M71SnQhEQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.64.7.tgz",
      "integrity": "sha512-AVMpt94mrXH7WjyWKmd9nT4RC5yM0AN3Lt6A89xVIsuLDi3dDX6dxMytLbW36FlppY9JsoqUoS3LUUpUrYxiMQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.64.7.tgz",
      "integrity": "sha512-Nje29c/MyajxRNFGU05oyeTDS6SWdMg/wWMSlZSBTBju5BKz2NVc0kFiFSQGzRELNiB+CBk/ZvAVsWsENgjGag==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.64.7.tgz",
      "integrity": "sha512-xxgN5/kMzCNz/NYJ4t49B0/WS6InNlWv6xvgwUQqNnWM9WJMMwMUGWrAxdNEgYWdHL0sMnuh8I87StGrIMTA+w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.64.7.tgz",
      "integrity": "sha512-5U/9gVn/X657I8+NHoHO9Wnfyd0lEXwqbslobRoB9TC8SwYzOitcIr6TLE7531Q/NWs3L4mb+YOGzlf3vHIeYw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.64.7.tgz",
      "integrity": "sha512-hcDS0a/Y8ggM3dcOfzH7UpSaogCViWTtNDSl0EXpWIj8g8/r86ITqptjil2hayTXS0Umzb+Yt3mjgpQVFVf2+A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.64.7.tgz",
      "integrity": "sha512-awbAr4N7Qd/yjZAQBEEPzgcPveYG2Gi5L6gq1/Bp+3SMRjn5F68Wv1zKsntzvvoioBR6yKvhLtWqu11am1TsxA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.64.7.tgz",
      "integrity": "sha512-Ut7xQJfeLhzu2yN3rHzVvL9ccyPJvN4aCdP1V7hJ5lGxX/eCzgB9SiMk/Md3J+rWWZgvoYsDW4BUFggJr32pBA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.64.7.tgz",
      "integrity": "sha512-trqoni/vHkuM5oo5iQhoKPh6fjjD7E80pMgCXWgGxU8vSRPUlwvG8GeYvEEcB6eJAxNa99WH9iVHPHelgtKiHA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.64.7.tgz",
      "integrity": "sha512-gvlUy0XFIwtUWiQmhc+4GT2Knm3KosinpUVhr7CtTFA78gFDnE5NWwMPzHrJsYpKkh2LlY7yvBIboN1FAV6Xeg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.64.7.tgz",
      "integrity": "sha512-8yS/kSXTJ/47Z62JW+C2AJ3vd/8zZw016vFjtNpZwmZlwJumLua4s1i78dkYuSSqQ+0aIMxJcBp/4uIwp2ehjA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.64.7.tgz",
      "integrity": "sha512-mxVSKvvty0hOP1AFo/l4Kpv3i3HK0zx4rYUrirZDToYlWhS3xzmIkq3vUJ7rtrM2cPyXveDyDT6M1FfXZ9hTRA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.64.7.tgz",
      "integrity": "sha512-lEse1zra1CagM+uHH2bl28GInDsZZ45NJzHei2OMaXQFzZWKBO1hFo07rS0xB6ayV4WU360UrSmPDSyCMpYsUQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.64.7.tgz",
      "integrity": "sha512-d/cqCoiG9WMZ5VuJZ5Qdlv9g97QyoGwnmvHccvGhKSacTy7xFrAS+jMcJSBdMNOw1oacSkl6p7K6O/DRYTKL3g==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.64.7.tgz",
      "integrity": "sha512-kVEA//CeDOZZP1XCH2JBgqXb9+ALlwuA/4civaazMVdgzaSQC9WM38w65zG/LLk0lA7F9Od19CSBZW7J9mCbNg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.64.7.tgz",
      "integrity": "sha512-14oLfDsOSr0TSntT/34jRg/V8B2XW/Jomh9zX9CjIM9gwwNlI1OCymS/GVn0DV32h67eRf7U0GGem0rvfXgNwQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.64.7.tgz",
      "integrity": "sha512-dFVtPfjZqAnUPpPY4Bfg+87yo1IBW9HiY8iCFtg49Pn46MfZTebSHZh8PL6SOsgyt9LQP8Nj/sE6jm3aWpySmQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.64.7.tgz",
      "integrity": "sha512-Dm9CZ2SM3u2NgvBj4awW/gGqkOwzH8f6MSYIJE6+bKcKLI+T0+LhpD6vtetTfrIIx+rLXDf5RJqBP6v7V5O+wg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.64.7.tgz",
      "integrity": "sha512-oaxsvS2mL6+78741CT2HCORBvy1USg3Wqpt5qvZwy3aMXRMl4zxyDo8maeFRWJkF3dp0Wbi71fKH5Gr9YI3vYA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.64.7.tgz",
      "integrity": "sha512-UKZz1Y4mxUqkWh60uH7B1aZn6UcAimPk4ipRktpb3wfZq7JrzZYyAXTwiafkb3T+kd5P3Sf+vzcRdsDks4WtjQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.64.7.tgz",
      "integrity": "sha512-WWkSuC1J+mZJnsDh0mRaCAFSWfQdl6y3fDjZeWElI6zHo8CcOSG5lY3yurKJjEq+FrX0WD60sFrVVpbHqzMmrw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.64.7.tgz",
      "integrity": "sha512-u9bp2yXCI3/BUjUxY6uWknAY32pfvvDCPysyUTySotx0dj3ydlFHrRQYfn/b/kZgnfjyEwySMtI7Ga054uiysQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.64.7.tgz",
      "integrity": "sha512-EhX6N3XPMEnVU5cRfNgzPOKcSucsbu3nNNWuoAaEuKIqmddBKHN5b9d4rPe65T1I+FaOT176JKiZNsUBp3rqbA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@tweenjs/tween.js": {
      "version": "23.1.3",
      "resolved": "https://registry.npmjs.org/@tweenjs/tween.js/-/tween.js-23.1.3.tgz",
      "integrity": "sha512-vJmvvwFxYuGnF2axRtPYocag6Clbb5YS7kLL+SO/TeVFzHqDIWrNKYtcsPMibjDx9O+bu+psAy9NKfWklassUA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.19.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.19.2.tgz",
      "integrity": "sha512-93d49wCWJkCyN87MxLpNN6KXPCwFw7bVUg79mGUV1OS40JGWwVCr8n61DXCSqz7CV6/VfPkb7xec7uP2M+QHWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": ">=7.24.0 <7.24.7"
      }
    },
    "node_modules/@types/stats.js": {
      "version": "0.17.4",
      "resolved": "https://registry.npmjs.org/@types/stats.js/-/stats.js-0.17.4.tgz",
      "integrity": "sha512-jIBvWWShCvlBqBNIZt0KAshWpvSjhkwkEu4ZUcASoAvhmrgAUI2t1dXrjSL4xXVLB4FznPrIsX3nKXFl/Dt4vA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/three": {
      "version": "0.180.0",
      "resolved": "https://registry.npmjs.org/@types/three/-/three-0.180.0.tgz",
      "integrity": "sha512-ykFtgCqNnY0IPvDro7h+9ZeLY+qjgUWv+qEvUt84grhenO60Hqd4hScHE7VTB9nOQ/3QM8lkbNE+4vKjEpUxKg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@dimforge/rapier3d-compat": "~0.12.0",
        "@tweenjs/tween.js": "~23.1.3",
        "@types/stats.js": "*",
        "@types/webxr": "*",
        "@webgpu/types": "*",
        "fflate": "~0.8.2",
        "meshoptimizer": "~0.22.0"
      }
    },
    "node_modules/@types/webxr": {
      "version": "0.5.24",
      "resolved": "https://registry.npmjs.org/@types/webxr/-/webxr-0.5.24.tgz",
      "integrity": "sha512-h8fgEd/DpoS9CBrjEQXR+dIDraopAEfu4wYVNY2tEPwk60stPWhvZMf4Foo5FakuQ7HFZoa8WceaWFervK2Ovg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webgpu/types": {
      "version": "0.1.74",
      "resolved": "https://registry.npmjs.org/@webgpu/types/-/types-0.1.74.tgz",
      "integrity": "sha512-lgiI4hbuLcI9unnm2cL/tvCaQU45dp0xcLWJh5uB/9MBGvIA4F8XIk7nSiBeg+K4xWGYwgZKn80LmERI5CxoTA==",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/axe-core": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.14.0.tgz",
      "integrity": "sha512-9WTZxEjsZ7b13TH8JPmbV2z8CHbl80/2hm3XPEG4JgNdQLK81IBRXmSxHfMAOkSqQeRxT/0dwNDz2GOm3zzpcQ==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.28.2.tgz",
      "integrity": "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.28.2",
        "@esbuild/android-arm": "0.28.2",
        "@esbuild/android-arm64": "0.28.2",
        "@esbuild/android-x64": "0.28.2",
        "@esbuild/darwin-arm64": "0.28.2",
        "@esbuild/darwin-x64": "0.28.2",
        "@esbuild/freebsd-arm64": "0.28.2",
        "@esbuild/freebsd-x64": "0.28.2",
        "@esbuild/linux-arm": "0.28.2",
        "@esbuild/linux-arm64": "0.28.2",
        "@esbuild/linux-ia32": "0.28.2",
        "@esbuild/linux-loong64": "0.28.2",
        "@esbuild/linux-mips64el": "0.28.2",
        "@esbuild/linux-ppc64": "0.28.2",
        "@esbuild/linux-riscv64": "0.28.2",
        "@esbuild/linux-s390x": "0.28.2",
        "@esbuild/linux-x64": "0.28.2",
        "@esbuild/netbsd-arm64": "0.28.2",
        "@esbuild/netbsd-x64": "0.28.2",
        "@esbuild/openbsd-arm64": "0.28.2",
        "@esbuild/openbsd-x64": "0.28.2",
        "@esbuild/openharmony-arm64": "0.28.2",
        "@esbuild/sunos-x64": "0.28.2",
        "@esbuild/win32-arm64": "0.28.2",
        "@esbuild/win32-ia32": "0.28.2",
        "@esbuild/win32-x64": "0.28.2"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fflate": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.3.tgz",
      "integrity": "sha512-tbZNuJrLwGUp3zshBtdy4W+ORxZuIh8a5ilyIEQDC5rY1f3U20JMry0Ll3WBzU58EZKsEuJFXhb5gwv8CsPvgA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gsap": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/gsap/-/gsap-3.15.0.tgz",
      "integrity": "sha512-dMW4CWBTUK1AEEDeZc1g4xpPGIrSf9fJF960qbTZmN/QwZIWY5wgliS6JWl9/25fpTGJrMRtSjGtOmPnfjZB+A==",
      "license": "Standard 'no charge' license: https://gsap.com/standard-license."
    },
    "node_modules/lenis": {
      "version": "1.3.27",
      "resolved": "https://registry.npmjs.org/lenis/-/lenis-1.3.27.tgz",
      "integrity": "sha512-QIHNH4LIfWyLfgH/5K0aTGZgyFJJ7GfHNcaH/AIgyKjb8gstLh5siNGvrVqz1w5ClLXzOvllBVk7vby8JzUVPQ==",
      "license": "MIT",
      "workspaces": [
        "packages/*",
        "playground",
        "playground/*"
      ],
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/darkroomengineering"
      },
      "peerDependencies": {
        "@nuxt/kit": ">=3.0.0",
        "react": ">=17.0.0",
        "vue": ">=3.0.0"
      },
      "peerDependenciesMeta": {
        "@nuxt/kit": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "vue": {
          "optional": true
        }
      }
    },
    "node_modules/meshoptimizer": {
      "version": "0.22.0",
      "resolved": "https://registry.npmjs.org/meshoptimizer/-/meshoptimizer-0.22.0.tgz",
      "integrity": "sha512-IebiK79sqIy+E4EgOr+CAw+Ke8hAspXKzBd0JdgEmPHiAwmvEj2S4h1rfvo+o/BnfEYd/jAOg5IeeIjzlzSnDg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/playwright": {
      "version": "1.64.1",
      "resolved": "https://registry.npmjs.org/playwright/-/playwright-1.64.1.tgz",
      "integrity": "sha512-HCrVhHr5QQuwYoswEUGTb7gGp522yflbv/ST8nF4sFWGuLjQCt17Q/EubpGGSNKYn1tsTCPZxqHhHCfVURu7UA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "playwright-core": "1.64.1"
      },
      "bin": {
        "playwright": "cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/playwright-core": {
      "version": "1.64.1",
      "resolved": "https://registry.npmjs.org/playwright-core/-/playwright-core-1.64.1.tgz",
      "integrity": "sha512-BC4s8y6SEVA6Q1rSxZTto8hI1KUI3xXlHGZgvGqP4IqPdI/a6FX9H29IDNz7vKo9l21b6LfYosScPL6M3xxyDQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "playwright-core": "cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.30",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.30.tgz",
      "integrity": "sha512-zkd+e9S1AQHhmaBKye9zlFHWjOwVgqXl1q3ECYy8561K7qxR2cREf/STLskulBFd78k6AOFeA+ff1TtEzk9bAA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.20",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/rollup": {
      "version": "4.64.7",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.64.7.tgz",
      "integrity": "sha512-aCiJONoZp0lNGJ6sYqspLkh6UXaWEey/7Ko2TZyXQ4kgzAhDUxAgbt/oulXKmD+zFHXw1k+RF6ZZWOrjp7DZnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.9"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@napi-rs/lzma-linux-x64-gnu": "1.5.1",
        "@rollup/rollup-android-arm-eabi": "4.64.7",
        "@rollup/rollup-android-arm64": "4.64.7",
        "@rollup/rollup-darwin-arm64": "4.64.7",
        "@rollup/rollup-darwin-x64": "4.64.7",
        "@rollup/rollup-freebsd-arm64": "4.64.7",
        "@rollup/rollup-freebsd-x64": "4.64.7",
        "@rollup/rollup-linux-arm-gnueabihf": "4.64.7",
        "@rollup/rollup-linux-arm-musleabihf": "4.64.7",
        "@rollup/rollup-linux-arm64-gnu": "4.64.7",
        "@rollup/rollup-linux-arm64-musl": "4.64.7",
        "@rollup/rollup-linux-loong64-gnu": "4.64.7",
        "@rollup/rollup-linux-loong64-musl": "4.64.7",
        "@rollup/rollup-linux-ppc64-gnu": "4.64.7",
        "@rollup/rollup-linux-ppc64-musl": "4.64.7",
        "@rollup/rollup-linux-riscv64-gnu": "4.64.7",
        "@rollup/rollup-linux-riscv64-musl": "4.64.7",
        "@rollup/rollup-linux-s390x-gnu": "4.64.7",
        "@rollup/rollup-linux-x64-gnu": "4.64.7",
        "@rollup/rollup-linux-x64-musl": "4.64.7",
        "@rollup/rollup-openbsd-x64": "4.64.7",
        "@rollup/rollup-openharmony-arm64": "4.64.7",
        "@rollup/rollup-win32-arm64-msvc": "4.64.7",
        "@rollup/rollup-win32-ia32-msvc": "4.64.7",
        "@rollup/rollup-win32-x64-gnu": "4.64.7",
        "@rollup/rollup-win32-x64-msvc": "4.64.7",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/three": {
      "version": "0.180.0",
      "resolved": "https://registry.npmjs.org/three/-/three-0.180.0.tgz",
      "integrity": "sha512-o+qycAMZrh+TsE01GqWUxUIKR1AL0S8pq7zDkYOQw8GqfX8b8VoCKYUoHbhiX5j+7hr8XsuHDVU6+gkQJQKg9w==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.24.6",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.24.6.tgz",
      "integrity": "sha512-WRNW+sJgj5OBN4/0JpHFqtqzhpbnV0GuB+OozA9gCL7a993SmU+1JBZCzLNxYsbMfIeDL+lTsphD5jN5N+n0zg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "7.3.7",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.3.7.tgz",
      "integrity": "sha512-AHEzTORMbi7/7aXp7w7KZ5+DCUdSeLsJz0grY8xHpc9DHdYb0vQu6DqJfm2tOw3gDExNgPgnJTXxM6syYFHaCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.27.0 || ^0.28.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    }
  }
}

````

## package.json

````json
{
  "name": "abirami-natural-beauty-parlour",
  "private": true,
  "version": "0.3.0",
  "type": "module",
  "engines": {
    "node": ">=22.12"
  },
  "scripts": {
    "prepare:pages": "node scripts/prerender.mjs",
    "dev": "npm run prepare:pages && vite --host 0.0.0.0",
    "check": "tsc --noEmit",
    "build": "npm run images && npm run wasm && npm run prepare:pages && npm run check && vite build && node scripts/finalize.mjs && npm run source",
    "preview": "vite preview --host 0.0.0.0",
    "verify": "node scripts/verify.mjs",
    "images": "node scripts/rust.mjs images",
    "wasm": "node scripts/rust.mjs wasm",
    "source": "node scripts/source.mjs",
    "test": "node --test scripts/media.test.mjs scripts/noise.test.mjs",
    "qa:browser": "node scripts/browser-qa.mjs"
  },
  "dependencies": {
    "gsap": "3.15.0",
    "lenis": "1.3.27",
    "three": "0.180.0"
  },
  "devDependencies": {
    "@axe-core/playwright": "4.14.0",
    "@fontsource/cormorant-garamond": "5.3.0",
    "@fontsource/dm-sans": "5.3.0",
    "@playwright/test": "1.64.1",
    "@types/node": "24.19.2",
    "@types/three": "0.180.0",
    "typescript": "5.9.3",
    "vite": "7.3.7"
  }
}

````

## public/.well-known/security.txt

````txt
Contact: https://github.com/tarunpradeep6162/Abirami-beauty-/issues
Expires: 2027-10-17T00:00:00Z
Preferred-Languages: en
Canonical: https://abirami-beauty.vercel.app/.well-known/security.txt

````

## public/assets/fonts/cormorant-garamond-LICENSE.txt

````txt
Copyright 2015 The Cormorant Project Authors (github.com/CatharsisFonts/Cormorant) CormorantGaramond-Italic[wght].ttf: Copyright 2015 The Cormorant Project Authors (github.com/CatharsisFonts/Cormorant)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

````

## public/assets/fonts/dm-sans-LICENSE.txt

````txt
Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts) DMSans-Italic[opsz,wght].ttf: Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

````

## public/assets/img/grain.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter><path fill="#c8a899" filter="url(#grain)" d="M0 0h180v180H0z" opacity=".4"/></svg>

````

## public/assets/img/location-card.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#e7ddcf"/><path d="M0 90h800M0 250h800M0 410h800M150 0v500M400 0v500M650 0v500" stroke="#c8a899" stroke-width="2"/><circle cx="400" cy="250" r="58" fill="#253e34"/><path d="M400 218c-33 0-39 39 0 70 39-31 33-70 0-70Z" fill="none" stroke="#f2ecdf" stroke-width="3"/><circle cx="400" cy="242" r="7" fill="#ac8e58"/><rect x="155" y="340" width="490" height="86" fill="#f2ecdf"/><text x="400" y="375" text-anchor="middle" font-family="Georgia,serif" font-size="27" fill="#253e34">Jalladiampet · Medavakkam</text><text x="400" y="404" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#5d6659">Location illustration · Get Directions for a live map</text></svg>

````

## public/assets/img/manifest.json

````json
{
  "version": 1,
  "images": {}
}

````

## public/assets/img/mark.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" fill="none">
  <path d="M9 88L40 13L71 88M24 62H56" stroke="#ac8e58" stroke-width="2.5"/>
  <path d="M40 13C63 35 58 56 40 66C29 43 32 28 40 13Z" fill="#ac8e58"/>
</svg>

````

## public/assets/img/photo-colours.css

````css
/* Supplied photos will add colour and preview backgrounds here. */

````

## public/assets/img/photo-placeholder.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <rect width="1200" height="1500" fill="#d5c8b9"/>
  <path d="M810 0C370 310 1150 660 625 1500H1200V0Z" fill="#b7b7a2"/>
  <path d="M0 300C660 160 100 1270 840 1500H0Z" fill="#c4ac9f"/>
  <path d="M615 90C210 620 1070 900 520 1420" fill="none" stroke="#eee7d9" stroke-width="2"/>
</svg>

````

## public/assets/wasm/manifest.json

````json
{
  "version": 1,
  "module": null
}

````

## public/data/schema/404.html.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Page not found","item":"https://abirami-beauty.vercel.app/404.html"}]}]}
````

## public/data/schema/about.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"About","item":"https://abirami-beauty.vercel.app/about/"}]}]}
````

## public/data/schema/book.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Contact & book","item":"https://abirami-beauty.vercel.app/book/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/gallery.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Gallery","item":"https://abirami-beauty.vercel.app/gallery/"}]}]}
````

## public/data/schema/home.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/services-bridal-makeup.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://abirami-beauty.vercel.app/services/"},{"@type":"ListItem","position":3,"name":"Bridal makeup guide","item":"https://abirami-beauty.vercel.app/services/bridal-makeup/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/services-facials.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://abirami-beauty.vercel.app/services/"},{"@type":"ListItem","position":3,"name":"Facials guide","item":"https://abirami-beauty.vercel.app/services/facials/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/services-hair-spa.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://abirami-beauty.vercel.app/services/"},{"@type":"ListItem","position":3,"name":"Hair spa guide","item":"https://abirami-beauty.vercel.app/services/hair-spa/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/services-threading.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://abirami-beauty.vercel.app/services/"},{"@type":"ListItem","position":3,"name":"Threading guide","item":"https://abirami-beauty.vercel.app/services/threading/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/data/schema/services.json

````json
{"@context":"https://schema.org","@graph":[{"@type":["BeautySalon","LocalBusiness"],"@id":"https://abirami-beauty.vercel.app/#salon","name":"Abirami Natural Beauty Parlour","url":"https://abirami-beauty.vercel.app/","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"},"priceRange":"Prices on consultation","sameAs":[]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://abirami-beauty.vercel.app/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://abirami-beauty.vercel.app/services/"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Abirami Natural Beauty Parlour?","acceptedAnswer":{"@type":"Answer","text":"Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route."}},{"@type":"Question","name":"How do I book an appointment?","acceptedAnswer":{"@type":"Answer","text":"Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added."}},{"@type":"Question","name":"Where can I check prices and service availability?","acceptedAnswer":{"@type":"Answer","text":"Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans."}},{"@type":"Question","name":"Are the photographs and reviews shown here real client work?","acceptedAnswer":{"@type":"Answer","text":"Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders."}}]}]}
````

## public/routes.json

````json
[
  {
    "route": "/",
    "label": "Home"
  },
  {
    "route": "/services/",
    "label": "Services"
  },
  {
    "route": "/gallery/",
    "label": "Gallery"
  },
  {
    "route": "/about/",
    "label": "About"
  },
  {
    "route": "/book/",
    "label": "Contact & book"
  },
  {
    "route": "/services/bridal-makeup/",
    "label": "Bridal makeup guide"
  },
  {
    "route": "/services/facials/",
    "label": "Facials guide"
  },
  {
    "route": "/services/hair-spa/",
    "label": "Hair spa guide"
  },
  {
    "route": "/services/threading/",
    "label": "Threading guide"
  }
]
````

## public/site.webmanifest

````webmanifest
{
  "name": "Abirami Natural Beauty Parlour",
  "short_name": "Abirami",
  "start_url": "/",
  "display": "browser",
  "theme_color": "#253e34",
  "background_color": "#f2ecdf",
  "icons": [
    {
      "src": "/assets/img/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/img/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

````

## README.md

````md
# Abirami Natural Beauty Parlour — luxury, security and local SEO

Canonical repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Use this repository for future updates.

Ten prerendered pages (including four planning guides and a custom 404), Vite + vanilla TypeScript, plain CSS, GSAP, Lenis and
optional Three.js shaders. Stage 2 adds a Rust image CLI and a wasm-bindgen
noise module. Everything deployed is static. There is no server, API, database,
admin page or enquiry storage.

## Install on macOS

Install Node.js 22.12 or newer from https://nodejs.org/en/download first.
Open Terminal. Install Apple command-line tools if not already installed:

```sh
xcode-select --install
```

Complete that installer before continuing. Then install Rust and wasm-pack:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
. "$HOME/.cargo/env"
rustup update stable
rustup target add wasm32-unknown-unknown
cargo install wasm-pack --locked
rustc --version
cargo --version
wasm-pack --version
```

From the extracted project directory:

```sh
cd abirami-beauty
npm ci
npm run images
npm run wasm
npm run build
npm test
npm run verify
npm run preview
```

The individual images/wasm commands are shown for first-run inspection. build
runs both again automatically, followed by prerender, TypeScript, Vite,
SEO output and COMPLETE-SOURCE.md generation. To work on the pages locally:

```sh
npm run dev
```

After changing business.json, the image manifest or supplied photos, restart dev.

## Install on Windows (PowerShell, x64)

Install Node.js 22.12 or newer from https://nodejs.org/en/download first.
Install Visual Studio C++ build tools. This command opens the Microsoft
installer; accept elevation and finish installation before proceeding:

```powershell
winget install --id Microsoft.VisualStudio.2022.BuildTools --exact --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
```

Download and run the official Rust installer:

```powershell
Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
Start-Process -FilePath .\rustup-init.exe -ArgumentList '-y', '--default-toolchain', 'stable' -Wait
```

Close and reopen PowerShell so Cargo is on PATH. Then:

```powershell
rustup update stable
rustup target add wasm32-unknown-unknown
cargo install wasm-pack --locked
rustc --version
cargo --version
wasm-pack --version
cd abirami-beauty
npm ci
npm run images
npm run wasm
npm run build
npm test
npm run verify
npm run preview
```

These Windows commands target x64. For Windows ARM64 use the matching installer
from https://rust-lang.org/tools/install/ and matching Microsoft build tools.
The Node wrappers use argument arrays with no Unix shell syntax, so project
paths with spaces work on Windows and macOS.

## Image originals and output

Put approved sRGB originals in photos-original at the project root. This folder
is a build input, not a public URL, and original photos are ignored by Git.
Use lowercase names with digits and hyphens. Do not supply two files with the
same stem, such as hero.jpg and hero.png. Supported inputs: JPG/JPEG, PNG, WebP.
HEIC must first be exported to sRGB JPEG. Subdirectories are not traversed.

| Original stem | Placement | Framing |
| --- | --- | --- |
| hero | Home hero, optional film poster, Open Graph | Landscape, subject on right |
| salon | Story and gallery | Portrait |
| detail | Overlapping story, services strip, gallery | Portrait |
| services | Editorial services image | Portrait |
| service-alt | Alternate liquid-hover texture | Same crop as services |
| portrait | Service strip and gallery | Portrait |
| ritual | Service strip and gallery | Portrait |
| closing | Closing full-bleed section | Landscape |
| before | Before comparison | Matched lighting and framing |
| after | After comparison | Same crop as before |

For example, photos-original/hero.jpg generates three exact-width AVIF/WebP
pairs under public/assets/img/generated. Filenames include a 16-character
source SHA-256 prefix. The CLI also writes a tiny blurred WebP, embeds that
preview as a data URL in manifest.json, and records a dominant hex colour.

Each output width is exactly 480, 960 or 1600 pixels, with proportional height.
Small originals are upscaled; supply sufficiently large originals for sharp
results. EXIF orientation is applied before resizing. The encoder does not
embed original EXIF/GPS metadata. Export originals to sRGB first; arbitrary
input ICC colour profiles are not converted. WebP uses lossless encoding;
AVIF uses quality 65 and speed 6. AVIF is normally the smaller browser source.
The transparent-aware dominant colour is the mean of the most populated
4-bit RGB histogram bucket, rather than an overall average.

The public manifest format is:

```json
{
  "version": 1,
  "images": {
    "image-name": {
      "width": 1600,
      "height": 2000,
      "dominant": "#253e34",
      "placeholder": "data:image/webp;base64,ENCODED_PREVIEW",
      "variants": [
        { "width": 480, "height": 600, "avif": "/assets/img/generated/image-name-HASH-480.avif", "webp": "/assets/img/generated/image-name-HASH-480.webp" },
        { "width": 960, "height": 1200, "avif": "/assets/img/generated/image-name-HASH-960.avif", "webp": "/assets/img/generated/image-name-HASH-960.webp" },
        { "width": 1600, "height": 2000, "avif": "/assets/img/generated/image-name-HASH-1600.avif", "webp": "/assets/img/generated/image-name-HASH-1600.webp" }
      ]
    }
  }
}
```

This is a schema illustration; HASH and ENCODED_PREVIEW are not real generated
assets. The shipped manifest is empty until actual originals are provided.
The prerendered frontend reads and validates the manifest, emits AVIF/WebP
srcsets and sizes, and uses the dominant colour and blurred preview behind
editorial images. Hero, comparisons, Open Graph and service shader URLs also
resolve through it. The browser chooses a width; no runtime image server is used.
The hero is eager/high-priority; other photos are lazy-loaded.

Previously supplied single-width public/assets/img/name.webp files still work
when no generated manifest entry exists. Same-name AVIF is optional. Missing
photos retain the labelled SVG placeholder. Do not use stock portraits as
client work. Before/after photos require both images and comparisonApproved
in src/business.json. Only enable that after client permission and pair review.

Run the CLI directly, if needed, from the project root:

```sh
cargo run --release --manifest-path rust/imgtool/Cargo.toml -- photos-original public/assets/img
```

The optional output argument is the img directory in the public asset layout;
manifest URLs deliberately use /assets/img/generated. Sources are processed in
sorted order. Invalid names, duplicate stems, unreadable files, encoder/write
errors, images above 40 megapixels/80 MiB and extreme aspect ratios fail with a
contextual error and a nonzero exit. The manifest is published only after all
images encode successfully. Files from an unsuccessful run can remain unused.
Old generated files are not automatically deleted, protecting existing builds.
On Windows, replacing the final manifest requires removing the previous file
immediately before rename. Keep a deployment/version backup as usual.

If the originals directory has no supported photos, npm run images retains the
existing manifest and prints a skip message. To remove a photo, delete its
manifest entry as well as the original, or run the CLI directly on the desired
set. A direct CLI run on an empty directory publishes an empty manifest.

## WASM noise and fallback

rust/noise-wasm exports flow_field(size, seed) through wasm-bindgen. It returns
size*size*4 RGBA bytes of deterministic, periodic, three-octave value noise.
RGB channels hold the same noise value and alpha is 255. Sizes 2 through 1024
are accepted. Invalid sizes throw a JavaScript error. All hashing uses wrapping
integer arithmetic. There are no network calls, filesystem access or clocks.

```sh
wasm-pack build rust/noise-wasm --target web --release --out-dir ../../public/assets/wasm --out-name noise_wasm
```

The relative output path above is resolved from rust/noise-wasm. Prefer
npm run wasm: its wrapper uses an absolute output path and also publishes
public/assets/wasm/manifest.json after a successful build. That descriptor
contains version 1 and module /assets/wasm/noise_wasm.js. The wrapper removes
wasm-pack's blanket generated .gitignore so prebuilt static assets can be
committed for hosting without Rust. wasm-opt is disabled to avoid a separate
Binaryen installation/download requirement.

The frontend automatically reads the generated descriptor. No business.json
change is needed. An optional business.wasmUrl overrides it but must remain
same-origin. Initialization is asynchronous and has a two-second timeout.
Import, initialization, invalid-output and network failures use the existing
JavaScript flow field automatically. That JS field has the same RGBA contract
but intentionally differs visually from the Rust algorithm. WASM is optional;
shader loading still respects reduced motion and low-power hints. Fabric,
liquid displacement and instanced dust all sample the shared field texture.

## Toolchain skips and static hosting

npm run build runs images, then wasm, then the frontend build. If cargo/rustc
are absent, each Rust step prints a clear message and succeeds without touching
existing manifests/assets. If wasm-pack is absent, the WASM step does the same.
Empty default descriptors keep a fresh checkout usable without Rust. A tool
that is present but fails compilation or execution fails the build: conversion
errors are never disguised as a missing-tool skip. Cargo can need internet
access on first use to fetch crates. Commit generated Cargo.lock files after a
successful native build to pin Rust dependency resolution; no lockfile was
fabricated in this environment.

Vercel can serve the dist directory unchanged. Use npm run build as the build
command and dist as the output directory. Node must be at least 22.12. To use
real generated media/WASM on a Node-only host, build them on a machine with
Rust and commit public/assets/img/manifest.json, its generated files, and
public/assets/wasm. The missing-Rust skip preserves them. Alternatively use a
CI build image with Rust and wasm-pack installed. Do not commit private originals
just to make a public hosting build work. This stage adds no backend or secrets.

## Business content and access

Edit src/business.json with the owner's confirmed details. Unknown fields stay
null. Phone must be an international number beginning with + and digits only
thereafter. Instagram is a username without @ or a URL. Services accept name,
description and price; reviews accept name and text. Only publish reviews you
have actually been given permission to use. No rating or testimonial is invented.
Use the final HTTPS origin for siteUrl when ready to launch; the canonical origin is already configured. indexable=false retains noindex until owner approval; robots permits crawlers to read that instruction.

Until a valid phone is provided, call/WhatsApp links are absent and the enquiry
form is disabled. When connected, it opens a message in WhatsApp for the visitor
to send. Appointment confirmation still comes from the salon. No browser form
data is sent to a server or stored. The Google map is lazy-loaded near the footer and includes a manual static fallback.
Self-hosted WOFF2 fonts have Georgia/Arial fallbacks. The approved supplied logo is public/assets/img/abirami-logo.png. Its artwork
is used unchanged in the header, footer, curtain and browser icon. CSS removes
only excess surrounding space from the displayed header/footer frame.

## Checks

```sh
npm test
npm run build
npm run verify
cargo test --manifest-path rust/imgtool/Cargo.toml
cargo test --manifest-path rust/noise-wasm/Cargo.toml
cargo fmt --manifest-path rust/imgtool/Cargo.toml
cargo fmt --manifest-path rust/noise-wasm/Cargo.toml
npm run source
```

npm test exercises responsive manifest consumption through prerender, protected
asset paths, async WASM selection, automatic JS fallback and invalid field sizes.
It substitutes an async module loader to test fallback logic; it does not execute
a compiled .wasm. verify checks all five built routes, srcset targets, manifests,
image container signatures, WASM binary header/glue if present, schema and the
exact business address. Rust tests cover alpha-aware colour selection and seeded
noise consistency. Source generation excludes binaries, private originals,
node_modules, target directories and dist; the deliverable ZIP includes dist.

In this workspace, Node tests, TypeScript, Vite and static checks pass, including
the missing-Rust path. Rust and wasm-pack are unavailable, so Rust compilation,
real photo encoding and compiled-WASM execution have not been verified here.
No actual client photos have been supplied. Browser/real-Android QA, Lighthouse
90+ and 60fps remain unmeasured. The site remains a content preview until the
business details, real photographs and launch checks are complete.

Official setup references:
- https://rust-lang.org/tools/install/
- https://rustwasm.github.io/docs/wasm-pack/commands/build.html
- https://docs.rs/image/latest/image/codecs/avif/struct.AvifEncoder.html


## Current audit and upgrade

See docs/AUDIT.md for the ranked baseline findings, docs/OWNER-CHECKLIST-AND-SOCIAL.md
for missing facts and publishable social drafts, and docs/VERIFICATION-AND-DEPLOY.md
for all verification and Vercel commands. Font WOFF2 files and their OFL licenses
are committed locally; no Google Fonts requests are made by the site.

CSP is enforced with self-hosted resources, no authored inline scripts/styles,
no unsafe-inline, and only www.google.com frames. Same-origin JSON-LD files are
loaded into a non-executable data block by external JavaScript. GSAP still uses
runtime CSSOM changes for animation. Browser CSP checks remain necessary.

No phone, hours, coordinates, opening year, Google Profile or Instagram handle
has been invented. Trust figures and Service schema are conditional on verified
business records. The public guides are general preparation copy, not a claim
that those services are currently offered. noindex remains until owner approval.

Use npm run qa:browser on a machine with Playwright Chromium installed. The
managed authoring environment has no local Playwright Chromium installation. No actual
Lighthouse score or Core Web Vitals measurement is claimed.

````

## rust/imgtool/Cargo.toml

````toml
[package]
name = "abirami-imgtool"
version = "0.1.0"
edition = "2021"

[dependencies]
anyhow = "1"
base64 = "0.22"
image = { version = "0.25", default-features = false, features = ["jpeg", "png", "webp", "avif"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
sha2 = "0.10"

````

## rust/imgtool/src/main.rs

````rs
use anyhow::{ensure, Context, Result};
use base64::{engine::general_purpose::STANDARD, Engine};
use image::{codecs::avif::AvifEncoder, codecs::webp::WebPEncoder, imageops::FilterType,
    DynamicImage, ImageDecoder, ImageEncoder, ImageReader, RgbaImage};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::{collections::BTreeMap, env, fs, io::{BufWriter, Write}, path::{Path, PathBuf}};

const WIDTHS: [u32; 3] = [480, 960, 1600];

#[derive(Serialize)]
struct Variant { width: u32, height: u32, avif: String, webp: String }

#[derive(Serialize)]
struct Photo {
    width: u32,
    height: u32,
    dominant: String,
    placeholder: String,
    variants: Vec<Variant>,
}

#[derive(Serialize)]
struct Manifest { version: u32, images: BTreeMap<String, Photo> }

fn dominant_color(image: &DynamicImage) -> String {
    let sample = image.thumbnail(64, 64).to_rgba8();
    let mut bins = vec![[0u64; 4]; 4096];
    for pixel in sample.pixels() {
        let [r, g, b, alpha] = pixel.0;
        let slot = ((r as usize >> 4) << 8) | ((g as usize >> 4) << 4) | (b as usize >> 4);
        let weight = alpha as u64;
        bins[slot][0] += weight;
        bins[slot][1] += r as u64 * weight;
        bins[slot][2] += g as u64 * weight;
        bins[slot][3] += b as u64 * weight;
    }
    let best = bins.iter().max_by_key(|bin| bin[0]).unwrap();
    if best[0] == 0 { return "#d5c8b9".into(); }
    format!("#{:02x}{:02x}{:02x}", best[1] / best[0], best[2] / best[0], best[3] / best[0])
}

fn write_webp(path: &Path, pixels: &RgbaImage) -> Result<()> {
    let mut file = BufWriter::new(fs::File::create(path)?);
    WebPEncoder::new_lossless(&mut file).write_image(pixels.as_raw(), pixels.width(), pixels.height(), image::ExtendedColorType::Rgba8)?;
    file.flush()?;
    Ok(())
}

fn process(path: &Path, output: &Path, name: &str) -> Result<Photo> {
    ensure!(fs::metadata(path)?.len() <= 80 * 1024 * 1024, "source exceeds 80 MiB");
    let mut decoder = ImageReader::open(path)?.with_guessed_format()?.into_decoder()?;
    let (width, height) = decoder.dimensions();
    ensure!(width > 0 && height > 0 && u64::from(width) * u64::from(height) <= 40_000_000, "image exceeds 40 megapixels or has invalid dimensions");
    ensure!(width.max(height) <= width.min(height).saturating_mul(10), "aspect ratio exceeds 10:1");
    let orientation = decoder.orientation()?;
    let mut image = DynamicImage::from_decoder(decoder)?;
    image.apply_orientation(orientation);
    let digest = format!("{:x}", Sha256::digest(fs::read(path)?));
    let prefix = format!("{name}-{}", &digest[..16]);
    let mut variants = Vec::new();
    for width in WIDTHS {
        let height = ((u64::from(image.height()) * u64::from(width) + u64::from(image.width()) / 2) / u64::from(image.width())).max(1) as u32;
        let resized = image.resize_exact(width, height, FilterType::Lanczos3).to_rgba8();
        let avif = format!("{prefix}-{width}.avif");
        let webp = format!("{prefix}-{width}.webp");
        let mut file = BufWriter::new(fs::File::create(output.join(&avif))?);
        AvifEncoder::new_with_speed_quality(&mut file, 6, 65)
            .write_image(resized.as_raw(), width, height, image::ExtendedColorType::Rgba8)?;
        file.flush()?;
        write_webp(&output.join(&webp), &resized)?;
        variants.push(Variant { width, height, avif: format!("/assets/img/generated/{avif}"), webp: format!("/assets/img/generated/{webp}") });
    }
    let tiny = image.resize(24, 24, FilterType::Triangle).blur(1.2).to_rgba8();
    let mut placeholder = Vec::new();
    WebPEncoder::new_lossless(&mut placeholder).write_image(tiny.as_raw(), tiny.width(), tiny.height(), image::ExtendedColorType::Rgba8)?;
    let tiny_name = format!("{prefix}-blur.webp");
    fs::write(output.join(tiny_name), &placeholder)?;
    Ok(Photo {
        width: image.width(), height: image.height(), dominant: dominant_color(&image),
        placeholder: format!("data:image/webp;base64,{}", STANDARD.encode(placeholder)), variants,
    })
}

fn run() -> Result<()> {
    let args: Vec<String> = env::args().skip(1).collect();
    if args.first().is_some_and(|arg| arg == "--help") {
        println!("Usage: abirami-imgtool [photos-original] [public/assets/img]\nReads top-level JPG, JPEG, PNG and WebP files. Filenames use lowercase letters, digits and hyphens.");
        return Ok(());
    }
    ensure!(args.len() <= 2, "expected at most input and output directories");
    let input = PathBuf::from(args.first().map(String::as_str).unwrap_or("photos-original"));
    let output = PathBuf::from(args.get(1).map(String::as_str).unwrap_or("public/assets/img"));
    let mut paths: Vec<PathBuf> = fs::read_dir(&input).with_context(|| format!("read {}", input.display()))?
        .map(|entry| entry.map(|item| item.path())).collect::<std::io::Result<_>>()?;
    paths.sort();
    let mut sources = BTreeMap::new();
    for path in paths {
        if !path.is_file() { continue; }
        let ext = path.extension().and_then(|part| part.to_str()).unwrap_or("").to_ascii_lowercase();
        if !matches!(ext.as_str(), "jpg" | "jpeg" | "png" | "webp") { continue; }
        let name = path.file_stem().and_then(|part| part.to_str()).context("filename is not UTF-8")?.to_owned();
        ensure!(!name.is_empty() && name.bytes().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == b'-'), "use a lowercase filename such as hero.jpg: {}", path.display());
        ensure!(sources.insert(name.clone(), path).is_none(), "duplicate image name: {name}");
    }
    let generated = output.join("generated");
    fs::create_dir_all(&generated)?;
    let mut manifest = Manifest { version: 1, images: BTreeMap::new() };
    for (name, path) in sources {
        let photo = process(&path, &generated, &name).with_context(|| format!("convert {}", path.display()))?;
        manifest.images.insert(name, photo);
    }
    // Publish the manifest only after every image has been encoded.
    let temporary = output.join("manifest.json.tmp");
    fs::write(&temporary, serde_json::to_vec_pretty(&manifest)?)?;
    let target = output.join("manifest.json");
    // Windows cannot rename over an existing file.
    if target.exists() && cfg!(windows) { fs::remove_file(&target)?; }
    fs::rename(temporary, target)?;
    println!("Images: {} originals, widths 480/960/1600, AVIF + WebP.", manifest.images.len());
    Ok(())
}

fn main() {
    if let Err(error) = run() { eprintln!("imgtool: {error:#}"); std::process::exit(1); }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn transparent_pixels_do_not_dominate() {
        let mut pixels = RgbaImage::from_pixel(8, 8, image::Rgba([255, 0, 0, 0]));
        pixels.put_pixel(0, 0, image::Rgba([32, 64, 48, 255]));
        assert_eq!(dominant_color(&DynamicImage::ImageRgba8(pixels)), "#204030");
    }
}

````

## rust/noise-wasm/Cargo.toml

````toml
[package]
name = "abirami-noise"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2"

[profile.release]
opt-level = "s"
lto = true

[package.metadata.wasm-pack.profile.release]
wasm-opt = false

````

## rust/noise-wasm/src/lib.rs

````rs
use wasm_bindgen::prelude::*;

fn hash(x: u32, y: u32, seed: u32) -> f64 {
    let mut value = x.wrapping_mul(374_761_393) ^ y.wrapping_mul(668_265_263) ^ seed;
    value = (value ^ (value >> 13)).wrapping_mul(1_274_126_177);
    f64::from(value ^ (value >> 16)) / f64::from(u32::MAX)
}

fn smooth(value: f64) -> f64 { value * value * (3.0 - 2.0 * value) }
fn mix(a: f64, b: f64, amount: f64) -> f64 { a + (b - a) * amount }

fn periodic_noise(x: f64, y: f64, cells: u32, seed: u32) -> f64 {
    let ix = x.floor() as u32;
    let iy = y.floor() as u32;
    let tx = smooth(x.fract());
    let ty = smooth(y.fract());
    let a = hash(ix % cells, iy % cells, seed);
    let b = hash((ix + 1) % cells, iy % cells, seed);
    let c = hash(ix % cells, (iy + 1) % cells, seed);
    let d = hash((ix + 1) % cells, (iy + 1) % cells, seed);
    mix(mix(a, b, tx), mix(c, d, tx), ty)
}

fn generate(size: u32, seed: u32) -> Vec<u8> {
    let mut pixels = vec![0; (size * size * 4) as usize];
    for y in 0..size {
        for x in 0..size {
            let mut value = 0.0;
            for (cells, weight) in [(4, 0.57), (8, 0.29), (16, 0.14)] {
                value += periodic_noise(f64::from(x) / f64::from(size) * f64::from(cells), f64::from(y) / f64::from(size) * f64::from(cells), cells, seed) * weight;
            }
            let shade = (value * 255.0).round().clamp(0.0, 255.0) as u8;
            let offset = ((y * size + x) * 4) as usize;
            pixels[offset..offset + 4].copy_from_slice(&[shade, shade, shade, 255]);
        }
    }
    pixels
}

#[wasm_bindgen]
pub fn flow_field(size: u32, seed: u32) -> Result<Vec<u8>, JsValue> {
    if !(2..=1024).contains(&size) { return Err(JsValue::from_str("size must be between 2 and 1024")); }
    Ok(generate(size, seed))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn field_is_repeatable_and_seeded() {
        let first = generate(32, 47);
        assert_eq!(first.len(), 32 * 32 * 4);
        assert_eq!(first, generate(32, 47));
        assert_ne!(first, generate(32, 48));
        assert!(first.chunks_exact(4).all(|pixel| pixel[0] == pixel[1] && pixel[1] == pixel[2] && pixel[3] == 255));
    }
}

````

## scripts/browser-qa.mjs

````mjs
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

````

## scripts/business.mjs

````mjs
export function validateBusiness(business) {
  const fail = text => { throw new Error(`Business configuration: ${text}`); };
  for (const field of ['name', 'address', 'prices']) if (typeof business[field] !== 'string' || !business[field].trim()) fail(`${field} must be text`);
  if (business.phone !== null && !/^\+[1-9]\d{7,14}$/.test(business.phone)) fail('phone must be an international +number');
  if (business.instagram !== null && !/^[A-Za-z0-9._]{1,30}$/.test(business.instagram)) fail('Instagram must be a username');
  for (const field of ['siteUrl', 'googleProfile']) if (business[field]) {
    const url = new URL(business[field]);
    if (url.protocol !== 'https:' || url.username || url.password) fail(`${field} must be a credential-free HTTPS URL`);
    if (field === 'siteUrl' && url.origin !== business[field].replace(/\/$/, '')) fail('siteUrl must be an origin without a path');
  }
  if (!Array.isArray(business.services) || !Array.isArray(business.reviews)) fail('services and reviews must be arrays');
  for (const service of business.services) if (typeof service.name !== 'string' || !service.name.trim() || typeof service.description !== 'string') fail('each confirmed service needs a name and description');
  for (const review of business.reviews) if (typeof review.name !== 'string' || typeof review.text !== 'string' || !review.text.trim()) fail('each supplied review needs a name and text');
  if (business.geo && (!Number.isFinite(business.geo.latitude) || Math.abs(business.geo.latitude) > 90 || !Number.isFinite(business.geo.longitude) || Math.abs(business.geo.longitude) > 180)) fail('coordinates are outside their valid ranges');
  if (business.googleRating !== null && (!Number.isFinite(business.googleRating) || business.googleRating < 1 || business.googleRating > 5)) fail('rating must be 1–5');
  if (business.googleReviewCount !== null && (!Number.isInteger(business.googleReviewCount) || business.googleReviewCount < 1)) fail('review count must be a positive integer');
  if (business.openedYear !== null && business.openedYear !== undefined && (!Number.isInteger(business.openedYear) || business.openedYear < 1900 || business.openedYear > new Date().getFullYear())) fail('opening year is invalid');
  const days = new Set(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  for (const hours of business.openingHoursSchema ?? []) {
    if (hours['@type'] !== 'OpeningHoursSpecification' || !Array.isArray(hours.dayOfWeek) || !hours.dayOfWeek.every(day => days.has(day))) fail('structured hours need real weekdays');
    for (const field of ['opens', 'closes']) if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(hours[field])) fail('structured hours must use HH:MM');
  }
}

````

## scripts/content.mjs

````mjs
export const faqs = [
  { question: 'Where is Abirami Natural Beauty Parlour?', answer: 'Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.' },
  { question: 'How do I book an appointment?', answer: 'Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.' },
  { question: 'Where can I check prices and service availability?', answer: 'Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.' },
  { question: 'Are the photographs and reviews shown here real client work?', answer: 'Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.' }
];

export const guides = [
  {
    slug: 'bridal-makeup', name: 'Bridal makeup', title: 'Bridal Makeup Planning in Medavakkam | Abirami',
    description: 'Planning bridal makeup in Medavakkam? Read what to discuss about your outfit, timing and preferred finish before confirming a salon appointment.',
    image: 'portrait', heading: 'Still you.<br><em>On your day.</em>',
    paragraphs: [
      'If you are planning bridal makeup in Medavakkam, begin with the day itself. What time do you need to be ready? Where will you be getting dressed? Is there a morning ceremony, an evening reception, or both? Write those details down before asking about an appointment. A clear schedule makes the conversation easier and gives you space to explain what matters most to you.',
      'Bring a few reference photographs, rather than a long collection of different looks. Say what you like in each one: the eye definition, the lip colour, the finish of the skin, or the way the hair sits with the jewellery. A photograph is a starting point for a discussion. It is not a promise that the same finish will suit every face, outfit or lighting condition.',
      'Your outfit and accessories deserve a place in that conversation. Mention your saree or dress colour, the neckline, the flowers you plan to wear and any head jewellery. If you wear glasses or contact lenses, say so. Ask which parts of the preparation are included and whether a separate trial can be discussed. Availability, products, travel and timings must all be confirmed directly with the salon.',
      'Before agreeing to a date, ask for the full price and the appointment details in writing on WhatsApp. Do not assume that a reference image includes every accessory or service shown. Share any product concerns privately during consultation, and avoid sending sensitive personal information through a public form. This is a planning guide, not a confirmed bridal package. Ask Abirami about current service availability before you book.'
    ]
  },
  {
    slug: 'facials', name: 'Facials', title: 'Facial Appointment Guide in Medavakkam | Abirami',
    description: 'A simple guide to asking about a facial in Medavakkam: discuss your preferences, products and appointment details before confirming your visit.',
    image: 'ritual', heading: 'A pause.<br><em>For yourself.</em>',
    paragraphs: [
      'Thinking about a facial near Jalladiampet? Start by saying what you want from the appointment in ordinary words. You may want a quiet break, help understanding the available options, or a simple conversation about what is included. You do not need to arrive knowing product names. Ask the salon to explain the current service menu before you choose anything.',
      'A salon facial is a beauty service, not a medical consultation. This website does not diagnose skin conditions or promise a particular result. If you have a current skin problem or have been advised to avoid certain products or procedures, speak with an appropriate qualified professional before deciding on a service. Keep any sensitive details for a private conversation rather than a public comment or review.',
      'When you contact the salon, ask about the steps included, the products proposed, the expected appointment length and the total price. Mention whether you have a date or event in mind, so that your timing can be discussed rather than assumed. Ask any questions before the appointment is confirmed. A familiar product name alone does not explain a complete service or establish whether it is appropriate for you.',
      'Leave yourself enough time to arrive without rushing. Confirm the location on Rice Mill Road and keep the WhatsApp conversation with the agreed details. After the appointment, follow the guidance you are actually given for the products used; do not rely on generic promises from a website. This page is a planning guide. Facial availability, suitability and prices must be confirmed with Abirami Natural Beauty Parlour before booking.'
    ]
  },
  {
    slug: 'hair-spa', name: 'Hair spa', title: 'Hair Spa Visit Guide in Medavakkam | Abirami',
    description: 'Planning a hair spa visit in Medavakkam? Here are the questions to ask about your hair, the service steps, timing and price before booking.',
    image: 'detail', heading: 'Take it<br><em>slowly.</em>',
    paragraphs: [
      'If a hair spa is on your mind, begin with a conversation about your hair and the time you have available. Ask what the salon currently offers and what each option includes. The words hair spa can describe different appointment steps, so it is sensible to ask for a plain explanation rather than choosing from a name alone. Confirm availability before travelling to the parlour.',
      'Tell the salon about recent colour, straightening or other salon work that may affect the discussion. You can also describe your usual routine and the finish you prefer. You do not need to share photographs or personal details publicly. This website makes no promise to treat hair loss, scalp disease or any medical condition. Those concerns require advice from an appropriately qualified professional rather than a beauty-service description.',
      'Ask whether washing, conditioning, drying or styling is included in the proposed appointment. Check whether the price depends on hair length or the specific option you discuss. A clear quotation is more useful than an estimated price copied from another salon. If you need to leave by a particular time, say that when you enquire. The salon can then confirm whether the available appointment suits your plans.',
      'For a visit from Medavakkam or Jalladiampet, use the directions link and check the appointment details in your WhatsApp conversation. Bring any questions you want answered before the service begins. Follow only the aftercare explained for the products actually used. This page offers questions to help you plan; it does not announce a confirmed hair spa package. Ask Abirami Natural Beauty Parlour for the current options and prices.'
    ]
  },
  {
    slug: 'threading', name: 'Threading', title: 'Threading Visit Guide near Jalladiampet | Abirami',
    description: 'A practical threading appointment guide near Jalladiampet and Medavakkam: discuss your preferred shape, appointment time and price before you visit.',
    image: 'services', heading: 'The small<br><em>details.</em>',
    paragraphs: [
      'Small appointments deserve a clear conversation too. If you are looking for threading near Jalladiampet, ask the salon about current availability before setting out. Say what you would like to discuss and whether you have a preferred time. The service menu is still awaiting confirmation on this website, so the salon’s direct reply is the place to check what can be booked.',
      'For eyebrow shaping, a reference can help explain your preference, but your own description is just as useful. Say whether you want to keep the existing shape or discuss a change. Avoid assuming that a photograph means the same shape is suitable for everyone. Ask questions before work begins, and be clear about any areas you do not want changed. Your preference should be part of the conversation.',
      'Confirm which areas are included and ask for the total price. If you are combining the visit with another service, mention that in the first message so that the timing can be discussed. Tell the salon privately about any relevant product or skin concerns. This page cannot assess suitability, diagnose a condition or promise that a particular method will be right for you.',
      'The address is No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the map link to plan your route rather than relying on an unverified landmark. Keep your confirmed time in the WhatsApp conversation and allow a little room for your journey. This is a practical planning guide, not a statement of guaranteed service availability. Ask Abirami Natural Beauty Parlour about threading and the current consultation price before you visit.'
    ]
  }
];

````

## scripts/finalize.mjs

````mjs
import { readFile, writeFile, readdir } from 'node:fs/promises';
const business = JSON.parse(await readFile('src/business.json', 'utf8'));
const origin = business.siteUrl ?? 'https://abirami-beauty.vercel.app';
const routes = JSON.parse(await readFile('public/routes.json', 'utf8'));
const urls = routes.map(({ route }) => `<url><loc>${new URL(route, origin).href.replace(/&/g, '&amp;')}</loc></url>`).join('');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
if (!business.indexable) console.log('Owner content gate: noindex remains on HTML pages. Crawlers can read that instruction.');
const bundles = await readdir('dist/assets');
if (bundles.some(name => name.endsWith('.map'))) throw new Error('Production source maps must not be published');

````

## scripts/media.mjs

````mjs
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

export async function readImages(publicRoot) {
  const manifest = JSON.parse(await readFile(resolve(publicRoot, 'assets/img/manifest.json'), 'utf8'));
  assert.equal(manifest.version, 1, 'Unsupported image manifest version');
  assert.ok(manifest.images && typeof manifest.images === 'object' && !Array.isArray(manifest.images), 'Missing images map');
  for (const [name, photo] of Object.entries(manifest.images)) {
    assert.match(name, /^[a-z0-9-]+$/);
    assert.ok(Number.isInteger(photo.width) && photo.width > 0 && Number.isInteger(photo.height) && photo.height > 0, `${name}: dimensions`);
    assert.match(photo.dominant, /^#[0-9a-f]{6}$/i);
    assert.match(photo.placeholder, /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/);
    assert.deepEqual(photo.variants.map(variant => variant.width), [480, 960, 1600], `${name}: widths`);
    for (const variant of photo.variants) {
      assert.ok(Number.isInteger(variant.height) && variant.height > 0);
      for (const format of ['avif', 'webp']) {
        assert.match(variant[format], new RegExp(`^/assets/img/generated/[a-z0-9-]+\\.${format}$`));
        await access(resolve(publicRoot, variant[format].slice(1)));
      }
    }
  }
  return manifest.images;
}

````

## scripts/media.test.mjs

````mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readImages } from './media.mjs';

test('responsive manifest reaches hero, editorial images, comparison and shader texture URLs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'abirami-media-'));
  try {
    for (const dir of ['scripts', 'src', 'public/assets/img/generated']) await mkdir(join(root, dir), { recursive: true });
    for (const name of ['prerender.mjs', 'media.mjs', 'content.mjs', 'business.mjs']) await copyFile(new URL(name, import.meta.url), join(root, 'scripts', name));
    const business = JSON.parse(await readFile(new URL('../src/business.json', import.meta.url), 'utf8'));
    business.comparisonApproved = true;
    await writeFile(join(root, 'src/business.json'), JSON.stringify(business));
    const images = {};
    for (const name of ['hero', 'services', 'service-alt', 'before', 'after']) {
      const variants = [];
      for (const width of [480, 960, 1600]) {
        const variant = { width, height: width, avif: `/assets/img/generated/${name}-${width}.avif`, webp: `/assets/img/generated/${name}-${width}.webp` };
        for (const format of ['avif', 'webp']) await writeFile(join(root, 'public', variant[format]), 'fixture, not a client image');
        variants.push(variant);
      }
      images[name] = { width: 1600, height: 1600, dominant: '#253e34', placeholder: 'data:image/webp;base64,UklGRg==', variants };
    }
    const manifestPath = join(root, 'public/assets/img/manifest.json');
    await writeFile(manifestPath, JSON.stringify({ version: 1, images }));
    assert.equal(Object.keys(await readImages(join(root, 'public'))).length, 5);
    const result = spawnSync(process.execPath, [join(root, 'scripts/prerender.mjs')], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(join(root, 'index.html'), 'utf8');
    assert.match(html, /hero-480\.avif 480w/);
    assert.match(html, /hero-1600\.webp 1600w/);
    assert.match(html, /fetchpriority="high"/);
    const colours = await readFile(join(root, 'public/assets/img/photo-colours.css'), 'utf8');
    assert.match(colours, /background-color:#253e34/);
    assert.match(colours, /data:image\/webp;base64,UklGRg==/);
    assert.ok(!html.includes(' style='));
    assert.match(html, /data-alt="\/assets\/img\/generated\/service-alt-960.webp"/);
    assert.match(html, /data-approved="true"/);
    assert.match(html, /before-480\.avif/);
    images.hero.variants[0].webp = '/assets/img/generated/../../private.webp';
    await writeFile(manifestPath, JSON.stringify({ version: 1, images }));
    await assert.rejects(() => readImages(join(root, 'public')), /generated/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

````

## scripts/noise.test.mjs

````mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

test('noise uses async WASM and falls back on failed, invalid or cross-origin modules', async () => {
  const originalLocation = globalThis.location;
  globalThis.location = { origin: 'https://abirami.test' };
  globalThis.__noiseConfig = { wasmUrl: null };
  globalThis.__noiseGenerated = { module: null };
  let source = await readFile(new URL('../src/gl/noise.ts', import.meta.url), 'utf8');
  source = source.replace("import business from '../business.json';", 'const business = globalThis.__noiseConfig;')
    .replace("import generated from '../../public/assets/wasm/manifest.json';", 'const generated = globalThis.__noiseGenerated;')
    .replace('await import(/* @vite-ignore */ url.href)', 'await globalThis.__noiseModule()');
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  try {
    const { makeFlowField } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
    const fallback = await makeFlowField(8);
    assert.equal(fallback.length, 8 * 8 * 4);
    assert.deepEqual(fallback, await makeFlowField(8));
    globalThis.__noiseGenerated.module = '/assets/wasm/noise_wasm.js';
    globalThis.__noiseModule = async () => ({ default: async () => {}, flow_field: size => new Uint8Array(size * size * 4).fill(91) });
    assert.ok((await makeFlowField(8)).every(value => value === 91));
    globalThis.__noiseModule = async () => { throw new Error('Network unavailable'); };
    assert.deepEqual(await makeFlowField(8), fallback);
    globalThis.__noiseModule = async () => ({ default: async () => {}, flow_field: () => new Uint8Array(2) });
    assert.deepEqual(await makeFlowField(8), fallback);
    globalThis.__noiseConfig.wasmUrl = 'https://other.test/noise.js';
    globalThis.__noiseModule = async () => { assert.fail('Cross-origin module must never load'); };
    assert.deepEqual(await makeFlowField(8), fallback);
    await assert.rejects(() => makeFlowField(0), RangeError);
  } finally {
    if (originalLocation === undefined) delete globalThis.location;
    else globalThis.location = originalLocation;
    delete globalThis.__noiseConfig;
    delete globalThis.__noiseGenerated;
    delete globalThis.__noiseModule;
  }
});

````

## scripts/prerender.mjs

````mjs
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readImages } from './media.mjs';
import { faqs, guides } from './content.mjs';
import { validateBusiness } from './business.mjs';

const root = resolve(import.meta.dirname, '..');
const b = JSON.parse(await readFile(resolve(root, 'src/business.json'), 'utf8'));
validateBusiness(b);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const origin = b.siteUrl ?? 'https://abirami-beauty.vercel.app';
if (new URL(origin).protocol !== 'https:') throw new Error('siteUrl must use HTTPS');
if (b.name !== 'Abirami Natural Beauty Parlour' || b.address !== 'No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100') throw new Error('Confirm any NAP change with the owner');
const exists = async url => access(resolve(root, 'public', url.replace(/^\//, ''))).then(() => true).catch(() => false);
const media = await readImages(resolve(root, 'public'));
const names = ['hero', 'salon', 'detail', 'services', 'service-alt', 'portrait', 'ritual', 'closing', 'before', 'after'];
const assets = Object.fromEntries(await Promise.all(names.map(async name => [name, Boolean(media[name]) || await exists(`/assets/img/${name}.webp`)])));
const imageUrl = (name, width = 960) => media[name]?.variants.find(item => item.width === width)?.webp ?? `/assets/img/${name}.webp`;
const phone = /^\+[1-9]\d{7,14}$/.test(b.phone ?? '') ? b.phone : null;
const fragments = phone ? phone.slice(1).match(/.{1,3}/g).reverse().join(':') : '';
const instagram = /^[A-Za-z0-9._]{1,30}$/.test(b.instagram ?? '') ? `https://www.instagram.com/${b.instagram}/` : null;
const external = 'target="_blank" rel="noopener noreferrer"';
const directions = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.name + ', ' + b.address);
const embed = 'https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&output=embed';
const schemaPath = route => `/data/schema/${route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '-')}.json`;
const photoCss = Object.entries(media).map(([name, image]) => `.photo-${name}{background-color:${image.dominant};background-image:url('${image.placeholder}');background-size:cover}`).join('\n');
await writeFile(resolve(root, 'public/assets/img/photo-colours.css'), photoCss || '/* Supplied photos will add colour and preview backgrounds here. */\n');
await mkdir(resolve(root, 'public/data/schema'), { recursive: true });

const picture = (name, alt, priority = false, extra = '') => {
  const image = media[name];
  const sizes = priority ? '100vw' : '(max-width: 767px) 90vw, 50vw';
  const avif = image ? `<source type="image/avif" srcset="${image.variants.map(v => `${v.avif} ${v.width}w`).join(', ')}" sizes="${sizes}">` : '';
  const srcset = image ? ` srcset="${image.variants.map(v => `${v.webp} ${v.width}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<picture>${avif}<img src="${assets[name] ? imageUrl(name, priority ? 1600 : 960) : '/assets/img/photo-placeholder.svg'}"${srcset} alt="${esc(assets[name] ? alt : 'Photo placeholder: ' + alt)}" width="${image?.width ?? 1200}" height="${image?.height ?? 1500}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${extra}></picture>`;
};
const photo = (name, alt, extra = '') => `<div class="photo photo-${name} ${extra}" ${name === 'services' && assets[name] && assets['service-alt'] ? 'data-liquid' : ''}>${picture(name, alt, false, name === 'services' && assets['service-alt'] ? `data-alt="${imageUrl('service-alt')}"` : '')}${assets[name] ? '' : `<span class="photo-caption">Salon photograph to follow</span>`}</div>`;
const booking = (text = 'Book on WhatsApp', solid = false) => phone ? `<a class="button ${solid ? 'button-solid' : ''}" href="/book/" data-contact-action="whatsapp" data-magnetic>${text}</a>` : `<a class="button ${solid ? 'button-solid' : ''}" href="/book/" data-magnetic>${text}</a>`;
const nav = [['Home', '/'], ['Services', '/services/'], ['Gallery', '/gallery/'], ['About', '/about/'], ['Book', '/book/']];
const header = route => `<a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="${esc(b.name)} home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([name, url]) => `<a href="${url}" ${url === route ? 'aria-current="page"' : ''}>${name}</a>`).join('')}${instagram ? `<a href="${instagram}" ${external} aria-label="Abirami on Instagram">Instagram</a>` : ''}</nav></header>`;
const map = `<div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="${esc(embed)}" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div>`;
const contactLinks = phone ? `<p><a href="/book/" data-contact-action="call">Call the salon</a> · <a href="/book/" data-contact-action="whatsapp">WhatsApp us</a></p>` : '<p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p>';
const footer = `<footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="${esc(b.name)} home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>${esc(b.address)}</p><p>Hours: ${esc(b.hours ?? 'Please confirm before visiting.')}</p>${contactLinks}<p>${instagram ? `<a href="${instagram}" ${external}>@${esc(b.instagram)}</a>` : 'Instagram handle to follow.'}</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: ${esc(b.landmark ?? 'to be confirmed')}</p><a class="button" href="${directions}" ${external}>Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div>${map}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${esc(b.name)}</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer>${phone ? '<a class="floating-whatsapp" href="/book/" data-contact-action="whatsapp">Book on WhatsApp ↗</a>' : '<a class="floating-whatsapp" href="/book/">Booking information ↗</a>'}<div class="cursor" aria-hidden="true"></div>`;
const intro = (label, title, text) => `<section class="page-intro"><p class="eyebrow">${label}</p><h1 data-reveal>${title}</h1><p>${text}</p></section>`;
const story = `<section class="section story" data-story><div class="story-art">${photo('salon', 'Inside the salon on Rice Mill Road', 'parallax-photo')}${photo('detail', 'A detail from the salon', 'story-inset')}</div><div class="story-copy"><p class="eyebrow">Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Find Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet. Tell us what you have in mind for your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section>`;
const promise = `<section class="section promise"><p class="eyebrow">Our Promise</p><h2 data-reveal>Your face.<br>Your comfort.<br><em>Your choice.</em></h2><div class="promise-note"><p>Beauty should leave room for you. The look you like. The questions you want to ask. The things you would rather keep simple.</p><p>Before you book, let’s talk about what you have in mind.</p></div><span class="promise-signature" aria-hidden="true">Abirami.</span></section>`;
const serviceRows = b.services.length ? b.services.map((service, i) => `<li class="service-row"><details><summary><span class="service-number">${String(i + 1).padStart(2, '0')}</span><span class="service-title">${esc(service.name)}</span></summary><p>${esc(service.description)}</p><p>${esc(service.price ?? b.prices)}</p></details></li>`).join('') : '<li class="service-row"><h3>Let’s talk first.</h3><p>Our confirmed service menu is being prepared. Ask about availability and prices before booking.</p></li>';
const services = `<section class="section services-editorial"><div class="section-heading"><p class="eyebrow">The service menu</p><h2 data-reveal>Care, at<br><em>your pace.</em></h2></div><div class="service-layout">${photo('services', 'Salon care and treatment details')}<div><ol class="service-list">${serviceRows}</ol><p class="fine-print service-note">${esc(b.prices)}</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section>`;
const strip = `<section class="horizontal-section" aria-labelledby="strip-title"><div class="horizontal-heading"><p class="eyebrow">Before you book</p><h2 id="strip-title" data-reveal>A little<br><em>preparation.</em></h2><p class="fine-print">Planning guides. Please confirm service availability with the salon.</p></div><div class="services-track">${guides.map(guide => `<article class="strip-item">${photo(guide.image, guide.name + ' planning guide')}<h3>${guide.name}</h3><a class="text-link" href="/services/${guide.slug}/">Read the guide ↗</a></article>`).join('')}</div></section>`;
const approved = Boolean(b.comparisonApproved && assets.before && assets.after);
const comparison = `<section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">Bridal &amp; beauty gallery</p><h2 data-reveal>Still you.<br><em>Up close.</em></h2><p>${approved ? 'Move the slider to compare the approved photographs.' : 'Client photographs belong here only with permission. This demonstration does not show a client result.'}</p></div><div><div class="comparison" data-comparison data-approved="${approved}">${approved ? picture('before', 'Before the salon appointment') : '<img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy">'}<div class="after-photo">${approved ? picture('after', 'After the salon appointment') : '<img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy">'}</div><span class="comparison-label before">Before${approved ? '' : ' · placeholder'}</span><span class="comparison-label after">After${approved ? '' : ' · placeholder'}</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label></div></section>`;
const trustData = [Number.isFinite(b.googleRating) && Number.isInteger(b.googleReviewCount) ? `${b.googleRating} from ${b.googleReviewCount} Google reviews` : null, Number.isInteger(b.openedYear) && b.openedYear <= new Date().getFullYear() ? `Open since ${b.openedYear}` : null, b.services.length ? `${b.services.length} confirmed services` : null].filter(Boolean);
const trust = trustData.length ? `<aside class="trust-strip" aria-label="Confirmed salon information">${trustData.map(value => `<p>${esc(value)}</p>`).join('')}</aside>` : '';
const reviews = b.reviews.length ? `<section class="section reviews-section"><div class="section-heading"><p class="eyebrow">Kind words</p><h2 data-reveal>From our<br><em>neighbours.</em></h2></div><div data-reviews>${b.reviews.map((review, i) => `<article data-review ${i ? 'hidden' : ''}><blockquote class="review-quote">“${esc(review.text)}”</blockquote><p class="review-meta">${esc(review.name)}</p></article>`).join('')}<div class="review-controls"><button type="button" data-review-prev aria-label="Previous review">←</button><span data-review-count>1 / ${b.reviews.length}</span><button type="button" data-review-next aria-label="Next review">→</button><button type="button" data-review-pause aria-pressed="false">Pause</button></div><p class="sr-only" data-review-announcement aria-live="polite"></p></div></section>` : '';
const faq = `<section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div>${faqs.map(item => `<details class="faq-item"><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join('')}</div></section>`;
const instagramSection = `<section class="section instagram-section"><div class="section-heading"><p class="eyebrow">${instagram ? 'As seen on Instagram' : 'Our Instagram journal'}</p><h2 data-reveal>The little<br><em>moments.</em></h2></div><p>${instagram ? `<a href="${instagram}" ${external}>Follow @${esc(b.instagram)} ↗</a>` : 'Approved salon photographs and our confirmed Instagram handle will be added here.'}</p><div class="instagram-photos">${photo('portrait', 'Approved salon portrait for the Instagram journal')}${photo('detail', 'Approved salon detail for the Instagram journal')}</div></section>`;
const closing = `<section class="section closing">${photo('closing', 'Inside Abirami Natural Beauty Parlour')}<div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2>${booking('Let’s plan your visit', true)}</div></section>`;
const hero = `<section class="hero" data-fabric><div class="hero-media ${assets.hero ? '' : 'is-placeholder'}">${picture('hero', 'Abirami Natural Beauty Parlour in Jalladiampet', true)}${await exists('/assets/video/hero.mp4') ? `<video muted loop playsinline preload="none" poster="${assets.hero ? imageUrl('hero', 1600) : '/assets/img/photo-placeholder.svg'}" data-hero-video><source data-src="/assets/video/hero.mp4" type="video/mp4"></video>` : ''}</div><div class="hero-shade"></div><p class="eyebrow">Abirami Natural Beauty Parlour · Chennai</p><h1 class="hero-title"><span>Beauty,</span><span>in your</span><span><em>own time.</em></span></h1><div>${booking('Book on WhatsApp', true)}</div><div class="hero-bottom"><p>Rice Mill Road.<br>Jalladiampet, Medavakkam.</p><p>${assets.hero ? 'A little time for you.' : 'Salon film and photographs to follow.'}</p><span class="hero-number" aria-hidden="true">a.</span></div></section>`;
const gallery = `<section class="section gallery" aria-label="Salon photo gallery">${[['portrait', 'A finishing touch.'], ['salon', 'Our place on Rice Mill Road.'], ['detail', 'The little details.'], ['ritual', 'A moment to pause.']].map(([name, caption]) => `<figure>${photo(name, caption)}<figcaption>${caption}</figcaption></figure>`).join('')}</section>`;
const form = `<section class="section book-layout"><div class="book-details"><h2>Say hello.</h2><p>${esc(b.address)}</p><p>Hours: ${esc(b.hours ?? 'Please confirm before visiting.')}</p>${contactLinks}<p>Nearby landmark: ${esc(b.landmark ?? 'to be confirmed')}</p><p class="fine-print">${phone ? 'Your message opens in WhatsApp. The salon confirms your appointment after replying.' : 'WhatsApp booking will open when the verified salon number is added. Your details are not sent or stored.'}</p><a class="button" href="${directions}" ${external}>Get Directions</a></div><form class="enquiry-form" action="/book/" method="get"><label for="guest-name">Your name<input id="guest-name" name="name" autocomplete="given-name" maxlength="80" required></label><label for="guest-service">What would you like to ask about?<input id="guest-service" name="service" maxlength="120" required></label><label for="guest-date">Preferred date<input id="guest-date" name="date" type="date"></label><label for="guest-note">Anything else?<textarea id="guest-note" name="note" maxlength="800"></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>I’m happy to share these details with the salon through WhatsApp.</span></label><p class="fine-print">Please leave out medical or other sensitive details.</p><p class="form-status" role="status">${phone ? 'We will open your message in WhatsApp.' : 'The verified WhatsApp number is awaiting confirmation.'}</p><button class="button" type="submit" disabled data-book-submit>Continue to WhatsApp</button><noscript><p>Please enable JavaScript to prepare your WhatsApp message. This form does not submit to a server.</p></noscript></form></section>`;
const pages = [
  { route: '/', label: 'Home', title: 'Beauty Parlour in Medavakkam | Abirami Natural Beauty', description: 'Abirami Natural Beauty Parlour on Rice Mill Road, Jalladiampet, Medavakkam. Plan your visit and ask about appointments on WhatsApp.', body: hero + trust + story + promise + services + strip + comparison + reviews + faq + instagramSection + closing, faq: true },
  { route: '/services/', label: 'Services', title: 'Services & Planning Guides | Abirami Natural Beauty', description: 'Read practical beauty appointment guides and ask Abirami Natural Beauty Parlour in Medavakkam about current services and consultation prices.', body: intro('Services & planning', 'A little care.<br><em>A little time.</em>', 'Ask about our current service menu. These guides help you prepare for a conversation; they do not confirm availability.') + services + strip + faq + closing, faq: true },
  { route: '/gallery/', label: 'Gallery', title: 'Salon & Bridal Gallery | Abirami Natural Beauty', description: 'A place for approved salon and bridal photographs from Abirami Natural Beauty Parlour, Jalladiampet. Client images are published with permission.', body: intro('The gallery', 'Beauty,<br><em>up close.</em>', 'Approved salon and client photographs will appear here with permission.') + gallery + comparison + instagramSection + closing },
  { route: '/about/', label: 'About', title: 'About Our Jalladiampet Parlour | Abirami Natural Beauty', description: 'Find Abirami Natural Beauty Parlour on Rice Mill Road in Jalladiampet, Medavakkam, Chennai. Natural beauty, close to home.', body: intro('Abirami, close to home', 'On Rice<br><em>Mill Road.</em>', 'A neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai.') + story + promise + closing },
  { route: '/book/', label: 'Contact & book', title: 'WhatsApp Booking & Directions | Abirami Natural Beauty', description: 'Plan a visit to Abirami Natural Beauty Parlour, No.1/11, Rice Mill Road, Jalladiampet, Medavakkam. Find directions and WhatsApp booking information.', body: intro('Come by. Say hello.', 'Let’s make<br><em>some time.</em>', 'Ask about a service, a date, or your next visit.') + form + faq, faq: true },
  ...guides.map(guide => ({ route: `/services/${guide.slug}/`, label: guide.name + ' guide', title: guide.title, description: guide.description, body: intro('Planning guide · confirm availability', guide.heading, 'Please ask the salon whether this service is currently available. Prices on consultation.') + `<article class="section service-guide"><div>${photo(guide.image, guide.name + ' planning guide')}</div><div><h2>${guide.name}: before you book</h2>${guide.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${booking('Ask about availability')}</div></article>` + faq, faq: true })),
  { route: '/404.html', label: 'Page not found', title: 'Page Not Found | Abirami Natural Beauty', description: 'That page is not here. Return to Abirami Natural Beauty Parlour or find our address and booking information.', body: intro('Page not found', 'A different<br><em>turn.</em>', 'This page is not here. <a href="/">Return home</a> or <a href="/book/">find our address</a>.'), notFound: true }
];

await writeFile(resolve(root, 'public/routes.json'), JSON.stringify(pages.filter(p => !p.notFound).map(({ route, label }) => ({ route, label })), null, 2));
for (const page of pages) {
  const url = new URL(page.route, origin).href;
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }];
  if (page.route !== '/') {
    if (page.route.startsWith('/services/') && page.route !== '/services/') crumbs.push({ '@type': 'ListItem', position: 2, name: 'Services', item: origin + '/services/' });
    crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: page.label, item: url });
  }
  const businessSchema = { '@type': ['BeautySalon', 'LocalBusiness'], '@id': origin + '/#salon', name: b.name, url: origin + '/', address: { '@type': 'PostalAddress', streetAddress: 'No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600100', addressCountry: 'IN' }, priceRange: b.prices, ...(phone ? { telephone: phone } : {}), ...(b.geo && Number.isFinite(b.geo.latitude) && Number.isFinite(b.geo.longitude) ? { geo: { '@type': 'GeoCoordinates', ...b.geo } } : {}), ...(b.openingHoursSchema?.length ? { openingHoursSpecification: b.openingHoursSchema } : {}), sameAs: [instagram, /^https:\/\//.test(b.googleProfile ?? '') ? b.googleProfile : null].filter(Boolean) };
  if (b.reviews.length && Number.isFinite(b.googleRating) && Number.isInteger(b.googleReviewCount)) businessSchema.aggregateRating = { '@type': 'AggregateRating', ratingValue: b.googleRating, reviewCount: b.googleReviewCount };
  const graph = [businessSchema, { '@type': 'BreadcrumbList', itemListElement: crumbs }];
  if (page.faq) graph.push({ '@type': 'FAQPage', mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) });
  if (page.route === '/services/') b.services.forEach(service => graph.push({ '@type': 'Service', name: service.name, description: service.description, provider: { '@id': origin + '/#salon' }, areaServed: 'Medavakkam, Jalladiampet, Chennai' }));
  await writeFile(resolve(root, 'public', schemaPath(page.route).slice(1)), JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }));
  const breadcrumb = page.route === '/' || page.notFound ? '' : `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${page.route.startsWith('/services/') && page.route !== '/services/' ? '<a href="/services/">Services</a><span aria-hidden="true">/</span>' : ''}<span aria-current="page">${esc(page.label)}</span></nav>`;
  const preloadImage = page.route === '/' && assets.hero ? `<link rel="preload" as="image" href="${imageUrl('hero', 1600)}" ${media.hero ? `imagesrcset="${media.hero.variants.map(v => `${v.webp} ${v.width}w`).join(', ')}" imagesizes="100vw"` : ''}>` : '';
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${url}">${!b.indexable || page.notFound ? '<meta name="robots" content="noindex, follow">' : ''}<meta property="og:site_name" content="${esc(b.name)}"><meta property="og:locale" content="en_IN"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}"><meta name="twitter:image" content="${origin}/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin>${preloadImage}<link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="${schemaPath(page.route)}" data-contact="${fragments}">${header(page.route)}<main id="main" tabindex="-1">${breadcrumb}${page.body}</main>${footer}</body></html>`;
  const target = resolve(root, page.notFound ? '404.html' : page.route === '/' ? 'index.html' : page.route.slice(1) + 'index.html');
  await mkdir(resolve(target, '..'), { recursive: true });
  await writeFile(target, html);
}
console.log(`Prerendered ${pages.length} pages; unknown business details remain unfilled.`);

````

## scripts/rust.mjs

````mjs
import { spawnSync } from 'node:child_process';
import { mkdir, writeFile, access, readdir, readFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
process.chdir(root);
const task = process.argv[2];
if (!['images', 'wasm'].includes(task)) throw new Error('Expected images or wasm');
const exists = path => access(path).then(() => true).catch(() => false);
const available = command => {
  const result = spawnSync(command, ['--version'], { encoding: 'utf8', shell: false });
  return !result.error && result.status === 0;
};
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? result.signal}). Existing media has not been silently substituted.`);
};
const ensureManifest = async (path, value) => {
  await mkdir(resolve(path, '..'), { recursive: true });
  if (!await exists(path)) await writeFile(path, JSON.stringify(value, null, 2) + '\n');
};
await ensureManifest('public/assets/img/manifest.json', { version: 1, images: {} });
await ensureManifest('public/assets/wasm/manifest.json', { version: 1, module: null });

if (!available('cargo') || !available('rustc')) {
  console.log(`[${task}] Skipped: Rust is not installed or not on PATH. Existing generated assets are kept; image placeholders and JS noise remain available. See README for installation.`);
} else if (task === 'images') {
  await mkdir('photos-original', { recursive: true });
  const originals = (await readdir('photos-original')).filter(name => /\.(jpe?g|png|webp)$/i.test(name));
  if (!originals.length) console.log('[images] Skipped: photos-original has no supported photos. Existing image manifest kept.');
  else run('cargo', ['run', '--release', '--manifest-path', 'rust/imgtool/Cargo.toml', '--', 'photos-original', 'public/assets/img']);
} else if (!available('wasm-pack')) {
  console.log('[wasm] Skipped: wasm-pack is not installed or not on PATH. Existing WASM assets are kept; JS noise is the automatic fallback. Install with cargo install wasm-pack --locked.');
} else {
  run('wasm-pack', ['build', 'rust/noise-wasm', '--target', 'web', '--release', '--out-dir', resolve('public/assets/wasm'), '--out-name', 'noise_wasm']);
  await access('public/assets/wasm/noise_wasm.js');
  await access('public/assets/wasm/noise_wasm_bg.wasm');
  const ignore = 'public/assets/wasm/.gitignore';
  if (await exists(ignore) && (await readFile(ignore, 'utf8')).trim() === '*') await unlink(ignore);
  await writeFile('public/assets/wasm/manifest.json', JSON.stringify({ version: 1, module: '/assets/wasm/noise_wasm.js' }, null, 2) + '\n');
  console.log('[wasm] Built browser module and published its manifest.');
}

````

## scripts/source.mjs

````mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = [];
const excluded = new Set(['node_modules', 'dist', 'target', '.git', '.vercel', 'photos-original', 'generated', 'qa-results']);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (excluded.has(entry.name) || entry.name === 'COMPLETE-SOURCE.md' || /^\.env(?:\.|$)/.test(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && !/\.(wasm|woff2?|ttf|webp|avif|png|jpe?g|mp4)$/i.test(entry.name)) files.push(path);
  }
}
await walk(root);
const sections = ['# Abirami — complete upgraded source', '', 'Static frontend, Rust image CLI, noise WASM and build tooling. Compiled output and private originals are excluded from this source listing.', '', '## File tree', '', '```text', ...files.map(path => relative(root, path).replaceAll('\\', '/')), '```', ''];
for (const path of files) {
  const content = await readFile(path, 'utf8');
  const runs = content.match(/`+/g) ?? [];
  const fence = '`'.repeat(Math.max(4, ...runs.map(run => run.length + 1)));
  sections.push(`## ${relative(root, path).replaceAll('\\', '/')}`, '', `${fence}${extname(path).slice(1)}`, content, fence, '');
}
await writeFile(resolve(root, 'COMPLETE-SOURCE.md'), sections.join('\n'));
console.log(`Complete source: ${files.length} files, no abbreviated code.`);

````

## scripts/verify.mjs

````mjs
import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { readImages } from './media.mjs';
import { guides } from './content.mjs';

const business = JSON.parse(await readFile('src/business.json', 'utf8'));
const routes = JSON.parse(await readFile('dist/routes.json', 'utf8'));
const images = await readImages('dist');
const titles = new Set(), descriptions = new Set();
for (const { route } of [...routes, { route: '/404.html' }]) {
  const path = route === '/404.html' ? 'dist/404.html' : `dist${route}index.html`;
  const html = await readFile(path, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && title.length < 60, `${route}: title under 60 (${title?.length})`);
  assert.ok(description && description.length < 155, `${route}: description under 155 (${description?.length})`);
  assert.ok(!titles.has(title)); titles.add(title);
  assert.ok(!descriptions.has(description)); descriptions.add(description);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
  assert.ok(html.includes('<main ') && html.includes('class="skip-link"'));
  assert.ok(html.includes(business.address));
  assert.ok(html.includes(`rel="canonical" href="${business.siteUrl}${route}"`));
  assert.ok(!/<style[\s>]|\sstyle\s*=|\son\w+\s*=/i.test(html), `${route}: no inline CSS or handlers`);
  for (const script of html.matchAll(/<script([^>]*)>(.*?)<\/script>/gs)) { assert.ok(script[1].includes('src=')); assert.equal(script[2].trim(), ''); }
  for (const anchor of html.matchAll(/<a\s[^>]*href="https?:\/\/[^>]+>/g)) assert.ok(anchor[0].includes('rel="noopener noreferrer"'), `${route}: safe external link`);
  assert.ok(!html.includes('fonts.googleapis') && !html.includes('fonts.gstatic'));
  for (const token of ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:image']) assert.ok(html.includes(token));
  const schemaPath = html.match(/data-schema="([^"]+)"/)?.[1];
  const schema = JSON.parse(await readFile(`dist${schemaPath}`, 'utf8'));
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@graph'][0].name, business.name);
  assert.ok(schema['@graph'][0]['@type'].includes('BeautySalon'));
  assert.ok(schema['@graph'].some(item => item['@type'] === 'BreadcrumbList'));
  if (!business.phone) assert.ok(!JSON.stringify(schema).includes('telephone'));
  assert.ok(!html.includes('wa.me/null'));
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    const url = match[1];
    await access(`dist${url}${url.endsWith('/') ? 'index.html' : ''}`);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) for (const candidate of match[1].split(',')) {
    const url = candidate.trim().split(/\s+/)[0]; if (url.startsWith('/')) await access(`dist${url}`);
  }
}
for (const guide of guides) assert.ok(guide.paragraphs.join(' ').split(/\s+/).length >= 200, `${guide.slug}: 200+ original words`);
for (const [name, photo] of Object.entries(images)) {
  const tiny = Buffer.from(photo.placeholder.split(',')[1], 'base64');
  assert.equal(tiny.toString('ascii', 0, 4), 'RIFF'); assert.equal(tiny.toString('ascii', 8, 12), 'WEBP');
  for (const variant of photo.variants) {
    const webp = await readFile(`dist${variant.webp}`), avif = await readFile(`dist${variant.avif}`);
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF'); assert.equal(webp.toString('ascii', 8, 12), 'WEBP');
    assert.equal(avif.toString('ascii', 4, 8), 'ftyp'); assert.ok(avif.subarray(8, 40).includes(Buffer.from('avif')), `${name}: AVIF`);
  }
}
const wasm = JSON.parse(await readFile('dist/assets/wasm/manifest.json', 'utf8'));
assert.equal(wasm.version, 1);
if (wasm.module !== null) {
  assert.equal(wasm.module, '/assets/wasm/noise_wasm.js');
  assert.ok((await readFile(`dist${wasm.module}`, 'utf8')).includes('flow_field'));
  const bytes = await readFile('dist/assets/wasm/noise_wasm_bg.wasm');
  assert.deepEqual([...bytes.subarray(0, 8)], [0, 97, 115, 109, 1, 0, 0, 0]);
}
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const headers = Object.fromEntries(config.headers.find(rule => rule.source === '/(.*)').headers.map(header => [header.key, header.value]));
for (const name of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin-Opener-Policy']) assert.ok(headers[name]);
assert.ok(headers['Content-Security-Policy'].includes("style-src 'self'"));
assert.ok(!headers['Content-Security-Policy'].includes('unsafe-inline'));
assert.ok(headers['Permissions-Policy'].includes('payment=()'));
assert.ok(!(await readdir('dist/assets')).some(name => name.endsWith('.map')));
for (const font of ['display-regular', 'display-italic', 'body-regular', 'body-medium', 'body-semibold']) assert.equal((await readFile(`dist/assets/fonts/${font}.woff2`)).toString('ascii', 0, 4), 'wOF2');
const og = await readFile('dist/assets/img/social-preview.png');
assert.equal(og.readUInt32BE(16), 1200); assert.equal(og.readUInt32BE(20), 630);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<url>/g) ?? []).length, routes.length);
await access('dist/.well-known/security.txt'); await access('dist/site.webmanifest');
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
for (const section of ['dependencies', 'devDependencies']) for (const version of Object.values(pkg[section])) assert.match(version, /^\d+\.\d+\.\d+$/);
console.log(`PASS: ${routes.length + 1} pages; metadata, schema, guide copy, assets, fonts, security config and pinned dependencies.`);
console.log('Runtime CSP, viewport rendering, Lighthouse and field CWV require a browser. Static checks do not establish those results.');

````

## services/bridal-makeup/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Bridal Makeup Planning in Medavakkam | Abirami</title><meta name="description" content="Planning bridal makeup in Medavakkam? Read what to discuss about your outfit, timing and preferred finish before confirming a salon appointment."><link rel="canonical" href="https://abirami-beauty.vercel.app/services/bridal-makeup/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Bridal Makeup Planning in Medavakkam | Abirami"><meta property="og:description" content="Planning bridal makeup in Medavakkam? Read what to discuss about your outfit, timing and preferred finish before confirming a salon appointment."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/services/bridal-makeup/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Bridal Makeup Planning in Medavakkam | Abirami"><meta name="twitter:description" content="Planning bridal makeup in Medavakkam? Read what to discuss about your outfit, timing and preferred finish before confirming a salon appointment."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/services-bridal-makeup.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">Bridal makeup guide</span></nav><section class="page-intro"><p class="eyebrow">Planning guide · confirm availability</p><h1 data-reveal>Still you.<br><em>On your day.</em></h1><p>Please ask the salon whether this service is currently available. Prices on consultation.</p></section><article class="section service-guide"><div><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Bridal makeup planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div><h2>Bridal makeup: before you book</h2><p>If you are planning bridal makeup in Medavakkam, begin with the day itself. What time do you need to be ready? Where will you be getting dressed? Is there a morning ceremony, an evening reception, or both? Write those details down before asking about an appointment. A clear schedule makes the conversation easier and gives you space to explain what matters most to you.</p><p>Bring a few reference photographs, rather than a long collection of different looks. Say what you like in each one: the eye definition, the lip colour, the finish of the skin, or the way the hair sits with the jewellery. A photograph is a starting point for a discussion. It is not a promise that the same finish will suit every face, outfit or lighting condition.</p><p>Your outfit and accessories deserve a place in that conversation. Mention your saree or dress colour, the neckline, the flowers you plan to wear and any head jewellery. If you wear glasses or contact lenses, say so. Ask which parts of the preparation are included and whether a separate trial can be discussed. Availability, products, travel and timings must all be confirmed directly with the salon.</p><p>Before agreeing to a date, ask for the full price and the appointment details in writing on WhatsApp. Do not assume that a reference image includes every accessory or service shown. Share any product concerns privately during consultation, and avoid sending sensitive personal information through a public form. This is a planning guide, not a confirmed bridal package. Ask Abirami about current service availability before you book.</p><a class="button " href="/book/" data-magnetic>Ask about availability</a></div></article><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## services/facials/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Facial Appointment Guide in Medavakkam | Abirami</title><meta name="description" content="A simple guide to asking about a facial in Medavakkam: discuss your preferences, products and appointment details before confirming your visit."><link rel="canonical" href="https://abirami-beauty.vercel.app/services/facials/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Facial Appointment Guide in Medavakkam | Abirami"><meta property="og:description" content="A simple guide to asking about a facial in Medavakkam: discuss your preferences, products and appointment details before confirming your visit."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/services/facials/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Facial Appointment Guide in Medavakkam | Abirami"><meta name="twitter:description" content="A simple guide to asking about a facial in Medavakkam: discuss your preferences, products and appointment details before confirming your visit."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/services-facials.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">Facials guide</span></nav><section class="page-intro"><p class="eyebrow">Planning guide · confirm availability</p><h1 data-reveal>A pause.<br><em>For yourself.</em></h1><p>Please ask the salon whether this service is currently available. Prices on consultation.</p></section><article class="section service-guide"><div><div class="photo photo-ritual " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Facials planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div><h2>Facials: before you book</h2><p>Thinking about a facial near Jalladiampet? Start by saying what you want from the appointment in ordinary words. You may want a quiet break, help understanding the available options, or a simple conversation about what is included. You do not need to arrive knowing product names. Ask the salon to explain the current service menu before you choose anything.</p><p>A salon facial is a beauty service, not a medical consultation. This website does not diagnose skin conditions or promise a particular result. If you have a current skin problem or have been advised to avoid certain products or procedures, speak with an appropriate qualified professional before deciding on a service. Keep any sensitive details for a private conversation rather than a public comment or review.</p><p>When you contact the salon, ask about the steps included, the products proposed, the expected appointment length and the total price. Mention whether you have a date or event in mind, so that your timing can be discussed rather than assumed. Ask any questions before the appointment is confirmed. A familiar product name alone does not explain a complete service or establish whether it is appropriate for you.</p><p>Leave yourself enough time to arrive without rushing. Confirm the location on Rice Mill Road and keep the WhatsApp conversation with the agreed details. After the appointment, follow the guidance you are actually given for the products used; do not rely on generic promises from a website. This page is a planning guide. Facial availability, suitability and prices must be confirmed with Abirami Natural Beauty Parlour before booking.</p><a class="button " href="/book/" data-magnetic>Ask about availability</a></div></article><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## services/hair-spa/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Hair Spa Visit Guide in Medavakkam | Abirami</title><meta name="description" content="Planning a hair spa visit in Medavakkam? Here are the questions to ask about your hair, the service steps, timing and price before booking."><link rel="canonical" href="https://abirami-beauty.vercel.app/services/hair-spa/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Hair Spa Visit Guide in Medavakkam | Abirami"><meta property="og:description" content="Planning a hair spa visit in Medavakkam? Here are the questions to ask about your hair, the service steps, timing and price before booking."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/services/hair-spa/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Hair Spa Visit Guide in Medavakkam | Abirami"><meta name="twitter:description" content="Planning a hair spa visit in Medavakkam? Here are the questions to ask about your hair, the service steps, timing and price before booking."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/services-hair-spa.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">Hair spa guide</span></nav><section class="page-intro"><p class="eyebrow">Planning guide · confirm availability</p><h1 data-reveal>Take it<br><em>slowly.</em></h1><p>Please ask the salon whether this service is currently available. Prices on consultation.</p></section><article class="section service-guide"><div><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Hair spa planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div><h2>Hair spa: before you book</h2><p>If a hair spa is on your mind, begin with a conversation about your hair and the time you have available. Ask what the salon currently offers and what each option includes. The words hair spa can describe different appointment steps, so it is sensible to ask for a plain explanation rather than choosing from a name alone. Confirm availability before travelling to the parlour.</p><p>Tell the salon about recent colour, straightening or other salon work that may affect the discussion. You can also describe your usual routine and the finish you prefer. You do not need to share photographs or personal details publicly. This website makes no promise to treat hair loss, scalp disease or any medical condition. Those concerns require advice from an appropriately qualified professional rather than a beauty-service description.</p><p>Ask whether washing, conditioning, drying or styling is included in the proposed appointment. Check whether the price depends on hair length or the specific option you discuss. A clear quotation is more useful than an estimated price copied from another salon. If you need to leave by a particular time, say that when you enquire. The salon can then confirm whether the available appointment suits your plans.</p><p>For a visit from Medavakkam or Jalladiampet, use the directions link and check the appointment details in your WhatsApp conversation. Bring any questions you want answered before the service begins. Follow only the aftercare explained for the products actually used. This page offers questions to help you plan; it does not announce a confirmed hair spa package. Ask Abirami Natural Beauty Parlour for the current options and prices.</p><a class="button " href="/book/" data-magnetic>Ask about availability</a></div></article><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## services/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Services &amp; Planning Guides | Abirami Natural Beauty</title><meta name="description" content="Read practical beauty appointment guides and ask Abirami Natural Beauty Parlour in Medavakkam about current services and consultation prices."><link rel="canonical" href="https://abirami-beauty.vercel.app/services/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Services &amp; Planning Guides | Abirami Natural Beauty"><meta property="og:description" content="Read practical beauty appointment guides and ask Abirami Natural Beauty Parlour in Medavakkam about current services and consultation prices."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/services/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Services &amp; Planning Guides | Abirami Natural Beauty"><meta name="twitter:description" content="Read practical beauty appointment guides and ask Abirami Natural Beauty Parlour in Medavakkam about current services and consultation prices."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/services.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" aria-current="page">Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav><section class="page-intro"><p class="eyebrow">Services & planning</p><h1 data-reveal>A little care.<br><em>A little time.</em></h1><p>Ask about our current service menu. These guides help you prepare for a conversation; they do not confirm availability.</p></section><section class="section services-editorial"><div class="section-heading"><p class="eyebrow">The service menu</p><h2 data-reveal>Care, at<br><em>your pace.</em></h2></div><div class="service-layout"><div class="photo photo-services " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Salon care and treatment details" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><ol class="service-list"><li class="service-row"><h3>Let’s talk first.</h3><p>Our confirmed service menu is being prepared. Ask about availability and prices before booking.</p></li></ol><p class="fine-print service-note">Prices on consultation</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section><section class="horizontal-section" aria-labelledby="strip-title"><div class="horizontal-heading"><p class="eyebrow">Before you book</p><h2 id="strip-title" data-reveal>A little<br><em>preparation.</em></h2><p class="fine-print">Planning guides. Please confirm service availability with the salon.</p></div><div class="services-track"><article class="strip-item"><div class="photo photo-portrait " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Bridal makeup planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Bridal makeup</h3><a class="text-link" href="/services/bridal-makeup/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-ritual " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Facials planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Facials</h3><a class="text-link" href="/services/facials/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-detail " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Hair spa planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Hair spa</h3><a class="text-link" href="/services/hair-spa/">Read the guide ↗</a></article><article class="strip-item"><div class="photo photo-services " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Threading planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><h3>Threading</h3><a class="text-link" href="/services/threading/">Read the guide ↗</a></article></div></section><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section><section class="section closing"><div class="photo photo-closing " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" href="/book/" data-magnetic>Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## services/threading/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Threading Visit Guide near Jalladiampet | Abirami</title><meta name="description" content="A practical threading appointment guide near Jalladiampet and Medavakkam: discuss your preferred shape, appointment time and price before you visit."><link rel="canonical" href="https://abirami-beauty.vercel.app/services/threading/"><meta name="robots" content="noindex, follow"><meta property="og:site_name" content="Abirami Natural Beauty Parlour"><meta property="og:locale" content="en_IN"><meta property="og:title" content="Threading Visit Guide near Jalladiampet | Abirami"><meta property="og:description" content="A practical threading appointment guide near Jalladiampet and Medavakkam: discuss your preferred shape, appointment time and price before you visit."><meta property="og:type" content="website"><meta property="og:url" content="https://abirami-beauty.vercel.app/services/threading/"><meta property="og:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Threading Visit Guide near Jalladiampet | Abirami"><meta name="twitter:description" content="A practical threading appointment guide near Jalladiampet and Medavakkam: discuss your preferred shape, appointment time and price before you visit."><meta name="twitter:image" content="https://abirami-beauty.vercel.app/assets/img/social-preview.png"><link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/img/icon-180.png"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/display-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/body-regular.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/img/photo-colours.css"><script type="module" src="/src/main.ts"></script></head><body data-schema="/data/schema/services-threading.json" data-contact=""><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/abirami-logo.png" alt="" width="1536" height="1536"></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" decoding="async"></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" >Home</a><a href="/services/" >Services</a><a href="/gallery/" >Gallery</a><a href="/about/" >About</a><a href="/book/" >Book</a></nav></header><main id="main" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">Threading guide</span></nav><section class="page-intro"><p class="eyebrow">Planning guide · confirm availability</p><h1 data-reveal>The small<br><em>details.</em></h1><p>Please ask the salon whether this service is currently available. Prices on consultation.</p></section><article class="section service-guide"><div><div class="photo photo-services " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Threading planning guide" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">Salon photograph to follow</span></div></div><div><h2>Threading: before you book</h2><p>Small appointments deserve a clear conversation too. If you are looking for threading near Jalladiampet, ask the salon about current availability before setting out. Say what you would like to discuss and whether you have a preferred time. The service menu is still awaiting confirmation on this website, so the salon’s direct reply is the place to check what can be booked.</p><p>For eyebrow shaping, a reference can help explain your preference, but your own description is just as useful. Say whether you want to keep the existing shape or discuss a change. Avoid assuming that a photograph means the same shape is suitable for everyone. Ask questions before work begins, and be clear about any areas you do not want changed. Your preference should be part of the conversation.</p><p>Confirm which areas are included and ask for the total price. If you are combining the visit with another service, mention that in the first message so that the timing can be discussed. Tell the salon privately about any relevant product or skin concerns. This page cannot assess suitability, diagnose a condition or promise that a particular method will be right for you.</p><p>The address is No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the map link to plan your route rather than relying on an unverified landmark. Keep your confirmed time in the WhatsApp conversation and allow a little room for your journey. This is a practical planning guide, not a statement of guaranteed service availability. Ask Abirami Natural Beauty Parlour about threading and the current consultation price before you visit.</p><a class="button " href="/book/" data-magnetic>Ask about availability</a></div></article><section class="section faq-section"><div><p class="eyebrow">A few things to know</p><h2 data-reveal>Before<br><em>you visit.</em></h2></div><div><details class="faq-item"><summary>Where is Abirami Natural Beauty Parlour?</summary><p>Find us at No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100. Use the directions link for your route.</p></details><details class="faq-item"><summary>How do I book an appointment?</summary><p>Booking is through WhatsApp. Send your name, the service you want to ask about and a preferred date. Your appointment is confirmed only after the salon replies. The booking link will appear when the verified number is added.</p></details><details class="faq-item"><summary>Where can I check prices and service availability?</summary><p>Prices are on consultation. Please confirm the service, price and available time directly with the salon before making plans.</p></details><details class="faq-item"><summary>Are the photographs and reviews shown here real client work?</summary><p>Only approved photographs and supplied reviews will be published as client work. Any empty image spaces are clearly marked as placeholders.</p></details></div></section></main><footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/abirami-logo.png" alt="Abirami Beauty Parlour" width="1536" height="1536" loading="lazy"></a><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: Please confirm before visiting.</p><p class="fine-print">The salon’s verified phone number is awaiting confirmation.</p><p>Instagram handle to follow.</p></div><div><h2 class="footer-title">Close to home.</h2><p>A beauty parlour in Medavakkam, near Jalladiampet.</p><p>Nearby landmark: to be confirmed</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=Abirami%20Natural%20Beauty%20Parlour%2C%20No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get Directions</a><p><a href="/book/">Contact and booking</a></p></div><div><div class="location-map" data-map><img class="map-fallback" src="/assets/img/location-card.svg" alt="Decorative location card. Use Get Directions for an actual street map." width="800" height="500" loading="lazy"><iframe src="https://www.google.com/maps?q=Abirami+Natural+Beauty+Parlour,+Rice+Mill+Rd,+Jalladiampet,+Medavakkam,+Chennai+600100&amp;output=embed" title="Google map to Abirami Natural Beauty Parlour, Jalladiampet" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button class="map-toggle" type="button" data-map-toggle>Show location card</button><p class="map-status" role="status">If the map is unavailable, use Get Directions below.</p></div></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><a href="/.well-known/security.txt">Security contact</a><button type="button" class="share-link" data-share>Share on WhatsApp</button></div></footer><a class="floating-whatsapp" href="/book/">Booking information ↗</a><div class="cursor" aria-hidden="true"></div></body></html>
````

## src/booking.ts

````ts
export function connectBooking() {
  const fragments = document.body.dataset.contact;
  const digits = fragments?.split(':').reverse().join('') ?? '';
  const phone = /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
  const message = 'Hello Abirami, I would like to ask about an appointment.';
  const link = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  if (phone) document.querySelectorAll<HTMLAnchorElement>('[data-contact-action]').forEach(anchor => {
    if (anchor.dataset.contactAction === 'call') anchor.textContent = `Call +${phone}`;
    anchor.href = anchor.dataset.contactAction === 'call' ? `tel:+${phone}` : link(message);
    if (anchor.dataset.contactAction === 'whatsapp') { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
  });
  const form = document.querySelector<HTMLFormElement>('.enquiry-form');
  if (!form) return;
  const submit = form.querySelector<HTMLButtonElement>('[data-book-submit]')!;
  submit.disabled = !phone;
  const clean = (value: FormDataEntryValue | null, limit: number) => String(value ?? '').normalize('NFC').replace(/[\u0000-\u001f\u007f\ud800-\udfff]/g, ' ').trim().slice(0, limit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!phone || !form.reportValidity()) return;
    const data = new FormData(form);
    const name = clean(data.get('name'), 80);
    const service = clean(data.get('service'), 120);
    if (!name || !service) { form.querySelector('.form-status')!.textContent = 'Please add your name and what you would like to ask about.'; return; }
    const date = clean(data.get('date'), 10);
    const note = clean(data.get('note'), 800);
    location.assign(link(`Hello Abirami, I’m ${name}.\nI’d like to ask about: ${service}.\nPreferred date: ${/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : 'Let’s discuss'}.\n${note}`));
  });
  const date = form.querySelector<HTMLInputElement>('input[type=date]');
  if (date) { const today = new Date(); date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; }
}

````

## src/business.json

````json
{
  "name": "Abirami Natural Beauty Parlour",
  "address": "No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100",
  "phone": null,
  "hours": null,
  "instagram": null,
  "siteUrl": "https://abirami-beauty.vercel.app",
  "wasmUrl": null,
  "prices": "Prices on consultation",
  "services": [],
  "reviews": [],
  "googleRating": null,
  "googleReviewCount": null,
  "comparisonApproved": false,
  "indexable": false,
  "geo": null,
  "openedYear": null,
  "landmark": null,
  "googleProfile": null,
  "openingHoursSchema": []
}

````

## src/css/base.css

````css
@font-face { font-family: 'Cormorant Garamond'; src: url('/assets/fonts/display-regular.woff2') format('woff2'); font-style: normal; font-weight: 400; font-display: swap; }
@font-face { font-family: 'Cormorant Garamond'; src: url('/assets/fonts/display-italic.woff2') format('woff2'); font-style: italic; font-weight: 400; font-display: swap; }
@font-face { font-family: 'DM Sans'; src: url('/assets/fonts/body-regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'DM Sans'; src: url('/assets/fonts/body-medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'DM Sans'; src: url('/assets/fonts/body-semibold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

:root {
  --ivory: #f2ecdf;
  --moss: #253e34;
  --rose: #c8a899;
  --brass: #9b7b46;
  --ink: #28372e;
  --muted: #5d6659;
  --line: #9b7b4660;
  --film-ease: cubic-bezier(.22,1,.36,1);
  --display: 'Cormorant Garamond', Georgia, serif;
  --body: 'DM Sans', Arial, sans-serif;
  --gutter: clamp(22px, 5.2vw, 96px);
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-padding-top: 100px; }
body { margin: 0; background: var(--ivory); color: var(--ink); font: 400 16px/1.65 var(--body); }
body.menu-open { overflow: hidden; }
::selection { background: var(--moss); color: var(--ivory); }
img, video { display: block; width: 100%; height: 100%; object-fit: cover; }
button, input, select, textarea { font: inherit; }
button, a, input { -webkit-tap-highlight-color: transparent; }
button { color: inherit; cursor: pointer; }
a { color: inherit; text-underline-offset: .25em; }
button:disabled { cursor: default; opacity: .6; }
:focus-visible { outline: 2px solid var(--brass); outline-offset: 6px; }
h1, h2, h3, p, figure { margin: 0; }
h1, h2, h3 { font-weight: 400; }
h1, h2 { font-family: var(--display); line-height: .93; letter-spacing: -.045em; }
h1 { font-size: clamp(64px, 12vw, 180px); }
h2 { font-size: clamp(49px, 8.4vw, 125px); }
h3 { font: 400 clamp(29px, 3.6vw, 51px)/1.1 var(--display); }
p { max-width: 42ch; }
em { font-weight: 400; }
[hidden] { display: none !important; }
.eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: .19em; line-height: 1.8; }
.fine-print { font-size: 12px; color: var(--muted); }
.skip-link { position: fixed; top: 10px; left: 10px; z-index: 100; padding: 10px 20px; background: var(--ivory); transform: translateY(-150%); }
.skip-link:focus { transform: translateY(0); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}

````

## src/css/components.css

````css
.button { display: inline-flex; align-items: center; justify-content: space-between; gap: 35px; min-height: 54px; padding: 15px 24px; border: 1px solid currentColor; background: transparent; color: inherit; text-decoration: none; font-size: 12px; }
.button::after { content: '↗'; font-size: 18px; }
.button-solid { color: var(--moss); background: var(--ivory); border-color: var(--ivory); }
.text-link { font-size: 12px; }
.photo { position: relative; overflow: hidden; background: #d5c8b9; }
.photo picture { display: block; height: 100%; }
.photo-caption { position: absolute; left: 15px; bottom: 15px; padding: 7px 10px; background: var(--ivory); color: var(--moss); font-size: 10px; letter-spacing: .06em; z-index: 2; }
.photo canvas, .hero > canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.hero > canvas { z-index: -2; opacity: .6; }
.photo canvas { opacity: 0; transition: opacity 1.2s var(--film-ease); }
.photo.gl-ready canvas { opacity: 1; }
.curtain { display: none; position: fixed; inset: 0; z-index: 80; background: var(--ivory); color: var(--moss); place-items: center; pointer-events: none; }
.curtain.is-active { display: grid; animation: curtain-away 1.4s .2s var(--film-ease) both; }
.curtain img { width: 240px; height: 240px; object-fit: contain; animation: mark-in .8s both; }
@keyframes curtain-away { 0%, 30% { transform: translateY(0); } 100% { transform: translateY(-101%); } }
@keyframes mark-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
.cursor { display: none; }
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .cursor.is-visible { display: block; position: fixed; left: 0; top: 0; z-index: 70; width: 24px; height: 24px; border: 1px solid var(--brass); border-radius: 50%; pointer-events: none; }
}
.floating-whatsapp { position: fixed; right: 23px; bottom: 22px; z-index: 30; border: 1px solid #f2ecdf77; background: var(--moss); color: var(--ivory); text-decoration: none; padding: 12px 18px; font-size: 11px; box-shadow: 0 4px 22px #253e3426; }
.comparison { position: relative; aspect-ratio: 4/5; overflow: hidden; background: #d5c8b9; }
.comparison > img, .comparison > picture, .comparison .after-photo { position: absolute; inset: 0; }
.comparison picture { display: block; width: 100%; height: 100%; }
.comparison .after-photo { clip-path: inset(0 50% 0 0); }
.comparison canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0; z-index: 1; }
.comparison.gl-ready canvas { opacity: 1; }
.comparison-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--ivory); pointer-events: none; z-index: 2; }
.comparison-line::after { content: '↔'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); border-radius: 50%; width: 45px; height: 45px; display: grid; place-items: center; color: var(--moss); background: var(--ivory); }
.comparison-label { position: absolute; top: 16px; padding: 5px 10px; background: var(--ivory); color: var(--moss); font-size: 10px; z-index: 2; }
.comparison-label.before { right: 15px; }
.comparison-label.after { left: 15px; }
.comparison-control { display: block; margin-top: 20px; font-size: 12px; }
.comparison-control input { display: block; width: 100%; min-height: 40px; accent-color: var(--moss); }
.comparison-status { font-size: 11px; margin-top: 10px; }
.map-shell { min-height: 200px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 25px; border: 1px solid var(--line); gap: 14px; }
.map-shell iframe { width: 100%; height: 260px; border: 0; }
.enquiry-form { border-top: 1px solid var(--line); padding-top: 25px; }
.enquiry-form label { display: block; font-size: 12px; margin-bottom: 25px; }
.enquiry-form input, .enquiry-form select, .enquiry-form textarea { display: block; width: 100%; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; background: transparent; padding: 12px 0; color: var(--ink); }
.enquiry-form textarea { resize: vertical; min-height: 110px; }
.enquiry-form .consent { display: flex; gap: 12px; align-items: flex-start; }
.enquiry-form .consent input { width: 18px; min-height: 20px; margin: 0; }
.form-status { margin: 20px 0; font-size: 13px; }
.native-transitions { view-transition-name: root; }
@view-transition { navigation: auto; }
::view-transition-old(root) { animation: page-out 1s var(--film-ease) both; }
::view-transition-new(root) { animation: page-in 1.1s var(--film-ease) both; }
@keyframes page-out { to { opacity: 0; } }
@keyframes page-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .curtain, .cursor { display: none !important; }
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
}

````

## src/css/editorial.css

````css
.site-nav a, .menu-toggle, .text-link, .footer-bottom a, .share-link { min-height: 44px; display: inline-flex; align-items: center; }
.site-nav a, .menu-toggle { padding: 9px 5px; }
.footer-title { font: 400 30px/1.2 var(--display); margin: 25px 0; letter-spacing: -.02em; }
.site-footer { padding-bottom: 100px; }
.footer-bottom { align-items: center; }
.share-link { background: none; border: 0; padding: 8px 0; color: var(--ink); font-size: 11px; cursor: pointer; }
.floating-whatsapp { border-radius: 50px; min-height: 48px; display: flex; align-items: center; padding: 12px 22px; }
.button { transition: background-color 1.1s var(--film-ease), color 1.1s var(--film-ease), border-color 1.1s var(--film-ease); }
.button:hover { background-color: var(--rose); border-color: var(--rose); color: var(--moss); }
.review-quote { margin: 0; }
.review-controls button[data-review-pause] { border-radius: 0; width: auto; padding: 0 16px; }
.hero-shade { background: radial-gradient(ellipse at 65% 30%, transparent 10%, #1d302960 100%), linear-gradient(90deg, #1d3029dd, #1d302940), linear-gradient(0deg, #1d3029bb, transparent 60%); }
.hero::after { content: ''; position: absolute; inset: 0; z-index: -1; opacity: .12; pointer-events: none; background-image: url('/assets/img/grain.svg'); }
.hero-title span { animation: title-arrive 1.2s var(--film-ease) both; }
.hero-title span:nth-child(2) { animation-delay: .12s; }
.hero-title span:nth-child(3) { animation-delay: .24s; }
@keyframes title-arrive { from { opacity: .75; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.promise { position: relative; overflow: hidden; background: var(--moss); color: var(--ivory); padding-top: 120px; padding-bottom: 130px; }
.promise h2 { max-width: 11ch; margin-top: 38px; position: relative; z-index: 1; }
.promise-note { margin: 60px 0 0 51%; }
.promise-note p + p { margin-top: 20px; }
.promise-signature { position: absolute; font: italic 400 clamp(120px, 23vw, 360px)/1 var(--display); bottom: -35px; left: 5%; color: #f2ecdf0c; pointer-events: none; }
.trust-strip { display: flex; flex-wrap: wrap; gap: 28px; justify-content: space-between; padding: 28px var(--gutter); border-bottom: 1px solid var(--brass); }
.trust-strip p { font-size: 13px; }
.faq-section { display: grid; grid-template-columns: .8fr 1.2fr; gap: 9vw; }
.faq-section h2 { margin-top: 25px; }
.faq-item { border-top: 1px solid var(--line); padding: 10px 0; }
.faq-item:last-child { border-bottom: 1px solid var(--line); }
.faq-item summary { min-height: 55px; cursor: pointer; display: flex; align-items: center; gap: 20px; padding: 9px 0; list-style: none; font-size: 15px; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: '+'; color: var(--muted); margin-left: auto; }
.faq-item[open] summary::after { content: '−'; }
.faq-item p { padding: 8px 20px 24px 0; font-size: 14px; }
.service-title { font: 400 clamp(29px, 3.6vw, 51px)/1.1 var(--display); }
.service-row summary { min-height: 48px; }
.instagram-section { background: #e7ddcf; }
.instagram-photos { display: grid; grid-template-columns: 1.2fr .7fr; align-items: start; gap: 11%; margin-top: 45px; }
.instagram-photos .photo { aspect-ratio: 4/5; }
.instagram-photos .photo:nth-child(2) { margin-top: 90px; }
.service-guide { display: grid; grid-template-columns: .8fr 1.2fr; gap: 9vw; align-items: start; padding-top: 0; }
.service-guide .photo { aspect-ratio: 4/5; }
.service-guide h2 { font-size: clamp(36px, 4.5vw, 65px); line-height: 1.1; margin-bottom: 35px; }
.service-guide p { margin-bottom: 24px; max-width: 64ch; }
.breadcrumbs { padding: 26px var(--gutter) 0; display: flex; flex-wrap: wrap; gap: 14px; font-size: 11px; }
.breadcrumbs a { display: inline-flex; align-items: center; min-height: 44px; }
.breadcrumbs span { display: flex; align-items: center; }
.location-map { position: relative; min-height: 300px; border: 1px solid var(--line); padding-bottom: 75px; background: #ded8c9; }
.map-fallback { position: absolute; inset: 0 0 75px; width: 100%; height: calc(100% - 75px); object-fit: cover; }
.location-map iframe { position: relative; border: 0; width: 100%; height: 250px; display: block; filter: saturate(.42) sepia(.18); }
.location-map.map-unavailable iframe { visibility: hidden; pointer-events: none; }
.map-toggle { position: absolute; bottom: 29px; left: 12px; min-height: 44px; border: 0; padding: 8px 12px; background: var(--ivory); color: var(--moss); font-size: 11px; }
.map-status { position: absolute; bottom: 6px; left: 12px; right: 12px; color: var(--moss); font-size: 10px; line-height: 1.25; }
@media (min-width: 1920px) { .section, .page-intro, .site-footer { padding-left: max(var(--gutter), calc((100vw - 1720px) / 2)); padding-right: max(var(--gutter), calc((100vw - 1720px) / 2)); } }
@media (max-width: 767px) {
  .promise { padding-top: 82px; padding-bottom: 85px; }
  .promise-note { margin: 42px 0 0 13%; }
  .faq-section, .service-guide { grid-template-columns: 1fr; gap: 38px; }
  .service-guide > div:first-child { margin-right: 17%; }
  .instagram-photos { gap: 7%; }
  .instagram-photos .photo:nth-child(2) { margin-top: 55px; }
  .site-nav a { width: 100%; }
  .map-status { max-width: none; }
}
@media (prefers-reduced-motion: reduce) { .hero-title span { animation: none; } }

.site-nav { gap: clamp(10px, 1.7vw, 26px); }
.wordmark, .footer-brand { position: relative; }
.wordmark img, .footer-brand img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.menu-toggle { display: none; }
@media (max-width: 767px) { .menu-toggle { display: inline-flex; } }

````

## src/css/layout.css

````css
.site-header { position: sticky; top: 0; z-index: 40; display: flex; align-items: center; justify-content: space-between; min-height: 120px; padding: 4px var(--gutter); border-bottom: 1px solid var(--line); background: var(--ivory); transition: transform 1s var(--film-ease); }
.site-header.is-away { transform: translateY(-105%); }
.wordmark { text-decoration: none; display: grid; place-items: center; width: 174px; height: 112px; overflow: hidden; flex-shrink: 0; }
.wordmark img { width: 174px; height: 174px; object-fit: contain; max-width: none; }
.footer-brand { display: grid; place-items: center; width: 240px; height: 170px; overflow: hidden; margin: -18px 0 24px; }
.footer-brand img { width: 240px; height: 240px; object-fit: contain; max-width: none; }
.site-nav { display: flex; align-items: center; gap: 26px; }
.site-nav a { text-decoration: none; font-size: 12px; }
.site-nav a[aria-current] { text-decoration: underline; }
.menu-toggle { display: none; border: 0; background: none; padding: 10px 0 10px 18px; }
.hero { position: relative; min-height: calc(100svh - 120px); display: flex; flex-direction: column; justify-content: flex-end; padding: 72px var(--gutter) 34px; overflow: hidden; isolation: isolate; background: var(--moss); color: var(--ivory); }
.hero-media, .hero-shade { position: absolute; inset: 0; z-index: -3; }
.hero-media > picture { display: block; width: 100%; height: 100%; }
.hero-media img { object-position: 60% 45%; }
@media (prefers-reduced-motion: no-preference) {
  .hero-media img { animation: hero-breathe 16s ease-in-out infinite alternate; }
}
@keyframes hero-breathe { from { transform: scale(1); } to { transform: scale(1.045); } }
.hero-media.is-placeholder { opacity: .4; }
.hero-shade { z-index: -1; background: linear-gradient(90deg, #1d3029dd, #1d302940), linear-gradient(0deg, #1d3029bb, transparent 60%); }
.hero video { position: absolute; inset: 0; }
.hero .eyebrow { margin-bottom: 32px; }
.hero-title { max-width: 10ch; margin-bottom: 34px; }
.hero-title span { display: block; }
.hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-top: 48px; }
.hero-bottom p { font-size: 12px; max-width: 24ch; }
.hero-number { font: 400 100px/.8 var(--display); opacity: .55; }
.section { padding: 110px var(--gutter); }
.section-heading { display: flex; justify-content: space-between; gap: 36px; align-items: flex-start; margin-bottom: 63px; }
.section-heading h2 { max-width: 9ch; }
.section-heading .eyebrow { max-width: 24ch; padding-top: 12px; }
.story { display: grid; grid-template-columns: 1fr 1fr; gap: 9vw; align-items: center; padding-top: 130px; padding-bottom: 135px; }
.story-art { position: relative; padding-right: 13%; padding-bottom: 22%; }
.story-art > .photo { aspect-ratio: 4/5; }
.story-inset { position: absolute !important; width: 47%; right: 0; bottom: 0; aspect-ratio: 3/4; border: 8px solid var(--ivory); }
.story-copy h2 { margin: 24px 0 35px; }
.story-copy p + p { margin-top: 24px; }
.story-copy .text-link { margin-top: 28px; display: inline-block; }
.services-editorial { background: #e6ded0; }
.service-layout { display: grid; grid-template-columns: .92fr 1fr; gap: 8vw; align-items: start; }
.service-layout > .photo { aspect-ratio: 3/4; }
.service-list { list-style: none; margin: 0; padding: 0; }
.service-row { border-top: 1px solid var(--line); padding: 23px 0; }
.service-row:last-child { border-bottom: 1px solid var(--line); }
.service-row summary { cursor: pointer; display: flex; gap: 20px; align-items: baseline; list-style: none; }
.service-row summary::-webkit-details-marker { display: none; }
.service-row summary::after { content: '+'; margin-left: auto; }
.service-row details[open] summary::after { content: '−'; }
.service-row p { margin: 22px 0 0 43px; font-size: 14px; }
.service-number { font-size: 10px; color: var(--muted); }
.service-note { padding-top: 30px; }
.horizontal-section { overflow: hidden; padding: 90px 0; }
.horizontal-heading { padding: 0 var(--gutter) 40px; }
.services-track { display: flex; gap: 45px; padding: 0 var(--gutter); width: max-content; }
.strip-item { width: min(69vw, 470px); }
.strip-item:nth-child(even) { padding-top: 63px; }
.strip-item .photo { aspect-ratio: 4/5; margin-bottom: 20px; }
.strip-item h3 { margin-bottom: 9px; }
.comparison-section { display: grid; grid-template-columns: .8fr 1.2fr; align-items: center; gap: 7vw; }
.comparison-copy h2 { margin: 25px 0; }
.comparison-copy p { font-size: 14px; }
.reviews-section { background: var(--moss); color: var(--ivory); }
.review-quote { max-width: 25ch; font: 400 clamp(30px, 5vw, 67px)/1.15 var(--display); }
.review-meta { margin-top: 28px; }
.review-controls { margin-top: 34px; display: flex; gap: 15px; align-items: center; }
.review-controls button { background: transparent; border: 1px solid #f2ecdf66; border-radius: 50%; width: 47px; height: 47px; }
.closing { position: relative; overflow: hidden; isolation: isolate; min-height: 680px; display: flex; align-items: center; background: var(--moss); color: var(--ivory); }
.closing > .photo { position: absolute; inset: 0; z-index: -2; }
.closing::after { content: ''; position: absolute; inset: 0; background: #1d3029b0; z-index: -1; }
.closing h2 { max-width: 10ch; margin: 25px 0 40px; }
.site-footer { padding: 70px var(--gutter) 26px; }
.footer-grid { display: grid; grid-template-columns: 1fr .8fr 1.2fr; gap: 45px; }
.footer-grid h3 { font-size: 28px; margin-bottom: 20px; }
.footer-grid p, .footer-grid a { font-size: 13px; }
.footer-grid p + p { margin-top: 16px; }
.footer-bottom { border-top: 1px solid var(--line); margin-top: 60px; padding-top: 22px; display: flex; justify-content: space-between; gap: 24px; font-size: 10px; text-transform: uppercase; letter-spacing: .1em; }
.page-intro { padding: 90px var(--gutter) 80px; }
.page-intro h1 { margin: 30px 0; max-width: 11ch; }
.page-intro p:last-child { margin-left: min(27vw, 360px); }
.gallery { display: grid; grid-template-columns: 1.2fr 1fr; gap: 85px 9vw; align-items: start; padding-top: 0; }
.gallery figure:nth-child(even) { margin-top: 110px; }
.gallery .photo { aspect-ratio: 4/5; }
.gallery figcaption { font-size: 12px; margin-top: 15px; }
.book-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 9vw; padding-top: 0; }
.book-details h2 { font-size: 70px; margin-bottom: 35px; }
.book-details p { margin-bottom: 23px; }
@media (max-width: 767px) {
  .site-header { min-height: 104px; }
  .wordmark { width: 148px; height: 96px; }
  .wordmark img { width: 148px; height: 148px; }
  .menu-toggle { display: block; }
  .site-nav { position: absolute; left: 0; right: 0; top: 100%; background: var(--ivory); padding: 32px var(--gutter) 45px; flex-direction: column; align-items: flex-start; border-bottom: 1px solid var(--line); visibility: hidden; }
  .site-nav.is-open { visibility: visible; }
  .site-nav a { font: 400 35px/1.3 var(--display); }
  .hero { min-height: calc(100svh - 104px); padding-top: 90px; }
  .hero-title { font-size: clamp(62px, 14vw, 108px); }
  .hero-number { font-size: 67px; }
  .hero-bottom { margin-top: 55px; }
  .section { padding: 74px var(--gutter); }
  .section-heading { display: block; margin-bottom: 38px; }
  .section-heading .eyebrow { margin-bottom: 24px; }
  .story, .service-layout, .comparison-section, .book-layout { grid-template-columns: 1fr; gap: 47px; }
  .story-art { margin-right: 9%; }
  .story-copy { padding-left: 7%; }
  .service-layout > .photo { aspect-ratio: 5/4; margin-right: 13%; }
  .horizontal-section { padding-top: 65px; padding-bottom: 65px; }
  .services-track { overflow-x: auto; width: 100%; scroll-snap-type: x mandatory; gap: 25px; padding-bottom: 20px; }
  .strip-item { min-width: 76vw; scroll-snap-align: center; }
  .closing { min-height: 570px; }
  .footer-grid { grid-template-columns: 1fr; gap: 35px; }
  .footer-bottom { flex-direction: column; margin-top: 35px; }
  .page-intro { padding-top: 65px; padding-bottom: 55px; }
  .page-intro p:last-child { margin-left: 12%; }
  .gallery { gap: 45px 22px; }
  .gallery figure:nth-child(even) { margin-top: 65px; }
}

````

## src/gl/experience.ts

````ts
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
  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true, powerPreference: 'low-power' });
  if (!context) return () => {};
  context.getExtension('WEBGL_lose_context')?.loseContext();
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

````

## src/gl/noise.ts

````ts
import business from '../business.json';
import generated from '../../public/assets/wasm/manifest.json';

export async function makeFlowField(size = 128): Promise<Uint8Array> {
  if (!Number.isInteger(size) || size < 2 || size > 1024) throw new RangeError('Flow field size must be 2–1024');
  const wasmUrl = (business.wasmUrl || generated.module) as string | null;
  if (wasmUrl) {
    try {
      const url = new URL(wasmUrl, location.origin);
      if (url.origin !== location.origin) throw new Error('WASM must be hosted on this origin');
      const load = async () => {
        const module = await import(/* @vite-ignore */ url.href);
        await module.default();
        return module.flow_field(size, 47);
      };
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const pixels: Uint8Array = await Promise.race([
        load(), new Promise<never>((_, reject) => { timeout = setTimeout(() => reject(new Error('WASM initialization timed out')), 2000); })
      ]).finally(() => clearTimeout(timeout));
      if (!(pixels instanceof Uint8Array) || pixels.length !== size * size * 4) throw new Error('Unexpected flow field data');
      return pixels;
    } catch { /* Offline and unsupported browsers keep the JS field. */ }
  }
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = Math.round(127.5 + 63 * Math.sin(x * .08 + Math.sin(y * .06)) + 40 * Math.cos(y * .13 - x * .035));
      const offset = (y * size + x) * 4;
      pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = Math.max(0, Math.min(255, value));
      pixels[offset + 3] = 255;
    }
  }
  return pixels;
}

````

## src/gl/shaders/dust.frag.glsl

````glsl
precision highp float;
varying vec2 vDustUv;
varying float vGlow;
void main() {
  float circle = 1.0 - smoothstep(0.1, 0.5, length(vDustUv - 0.5));
  gl_FragColor = vec4(0.69, 0.56, 0.34, circle * vGlow);
}

````

## src/gl/shaders/dust.vert.glsl

````glsl
precision highp float;
attribute vec3 aSeed;
varying vec2 vDustUv;
varying float vGlow;
uniform float uTime;
uniform sampler2D uNoise;
void main() {
  vDustUv = uv;
  float flow = texture2D(uNoise, fract(aSeed.xy + uTime * 0.002)).r;
  vec2 center = vec2(aSeed.x, fract(aSeed.y + uTime * 0.005 * (0.4 + aSeed.z)));
  center.x += sin(uTime * 0.12 + aSeed.z * 40.0) * 0.018 + (flow - 0.5) * 0.025;
  vGlow = 0.12 + aSeed.z * 0.18;
  vec2 point = center * 2.0 - 1.0 + position.xy * (0.0015 + aSeed.z * 0.002);
  gl_Position = vec4(point, 0.0, 1.0);
}

````

## src/gl/shaders/fabric.frag.glsl

````glsl
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform vec2 uResolution;
uniform sampler2D uNoise;
void main() {
  vec2 p = vUv;
  p.x *= uResolution.x / max(uResolution.y, 1.0);
  float field = texture2D(uNoise, fract(vUv * 0.7 + uTime * 0.004)).r;
  float touch = exp(-5.0 * distance(vUv, uPointer));
  float wave = sin(p.x * 5.8 + sin(p.y * 3.0 + uTime * 0.15) * 1.2 + field * 0.6 + touch * 0.45 + uScroll * 0.8);
  float silk = pow(0.5 + 0.5 * wave, 7.0);
  float seam = pow(0.5 + 0.5 * sin(p.x * 9.0 - p.y * 1.8 + uTime * 0.12), 22.0);
  vec3 moss = vec3(0.13, 0.24, 0.19);
  vec3 brass = vec3(0.61, 0.49, 0.29);
  vec3 color = mix(moss, brass, silk * 0.44 + seam * 0.09);
  gl_FragColor = vec4(color, 1.0);
}

````

## src/gl/shaders/fullscreen.vert.glsl

````glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}

````

## src/gl/shaders/grain.frag.glsl

````glsl
precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform float uTime;
float random(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main() {
  vec3 color = texture2D(uScene, vUv).rgb;
  float grain = random(gl_FragCoord.xy + floor(uTime * 12.0)) - 0.5;
  gl_FragColor = vec4(color + grain * 0.026, 1.0);
}

````

## src/gl/shaders/liquid.frag.glsl

````glsl
precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform sampler2D uNoise;
uniform float uMix;
uniform float uTime;
uniform vec2 uFrame;
uniform vec2 uFromSize;
uniform vec2 uToSize;
vec2 coverUv(vec2 uv, vec2 imageSize) {
  float imageRatio = imageSize.x / imageSize.y;
  float frameRatio = uFrame.x / uFrame.y;
  vec2 fit = imageRatio > frameRatio ? vec2(frameRatio / imageRatio, 1.0) : vec2(1.0, imageRatio / frameRatio);
  return (uv - 0.5) * fit + 0.5;
}
void main() {
  float displacement = texture2D(uNoise, fract(vUv * 0.8 + uTime * 0.013)).r - 0.5;
  float strength = sin(uMix * 3.14159265) * 0.09;
  vec2 offset = vec2(displacement, sin(vUv.y * 18.0 + uTime) * 0.18) * strength;
  vec4 from = texture2D(uFrom, coverUv(vUv + offset, uFromSize));
  vec4 to = texture2D(uTo, coverUv(vUv - offset, uToSize));
  gl_FragColor = mix(from, to, uMix);
}

````

## src/gl/shaders/wipe.frag.glsl

````glsl
precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uMix;
uniform vec2 uFrame;
uniform vec2 uFromSize;
uniform vec2 uToSize;
vec2 coverUv(vec2 uv, vec2 imageSize) {
  float imageRatio = imageSize.x / imageSize.y;
  float frameRatio = uFrame.x / uFrame.y;
  vec2 fit = imageRatio > frameRatio ? vec2(frameRatio / imageRatio, 1.0) : vec2(1.0, imageRatio / frameRatio);
  return (uv - 0.5) * fit + 0.5;
}
void main() {
  float reveal = step(vUv.x, uMix);
  gl_FragColor = mix(texture2D(uFrom, coverUv(vUv, uFromSize)), texture2D(uTo, coverUv(vUv, uToSize)), reveal);
}

````

## src/main.ts

````ts
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

````

## src/motion.ts

````ts
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

````

## src/structured-data.ts

````ts
export async function loadStructuredData() {
  const path = document.body.dataset.schema;
  if (!path || !/^\/data\/schema\/[a-z0-9.-]+\.json$/.test(path)) return;
  try {
    const response = await fetch(path, { credentials: 'same-origin' });
    if (!response.ok) return;
    const data = await response.json();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    document.head.append(script);
  } catch { /* The static page remains readable if structured data cannot load. */ }
}

````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022", "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext", "moduleResolution": "Bundler", "strict": true,
    "resolveJsonModule": true, "esModuleInterop": true, "skipLibCheck": true,
    "noEmit": true, "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}

````

## vercel.json

````json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self' data: blob:; media-src 'self'; font-src 'self'; frame-src https://www.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'none'; upgrade-insecure-requests"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=()"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/:file([^/]+-[A-Za-z0-9_-]{8,}\\.(?:js|css))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}

````

## vite.config.ts

````ts
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
const routes: Array<{route: string}> = JSON.parse(readFileSync(resolve(import.meta.dirname, 'public/routes.json'), 'utf8'));

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries([...routes.map(item => item.route === '/' ? 'index' : item.route.slice(1) + 'index'), '404']
        .map(name => [name, resolve(import.meta.dirname, `${name}.html`)]))
    }
  }
});

````
