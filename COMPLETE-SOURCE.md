# Abirami — stages 1 and 2: complete source

Static frontend, Rust image CLI, noise WASM and build tooling. Compiled output and private originals are excluded from this source listing.

## File tree

```text
.gitignore
about/index.html
AGENTS.md
book/index.html
gallery/index.html
index.html
package-lock.json
package.json
public/assets/img/manifest.json
public/assets/img/mark.svg
public/assets/img/photo-placeholder.svg
public/assets/wasm/manifest.json
README.md
rust/imgtool/Cargo.toml
rust/imgtool/src/main.rs
rust/noise-wasm/Cargo.toml
rust/noise-wasm/src/lib.rs
scripts/finalize.mjs
scripts/media.mjs
scripts/media.test.mjs
scripts/noise.test.mjs
scripts/prerender.mjs
scripts/rust.mjs
scripts/source.mjs
scripts/verify.mjs
services/index.html
src/business.json
src/css/base.css
src/css/components.css
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
tsconfig.json
vercel.json
vite.config.ts
```

## .gitignore

````
node_modules/
dist/
.env
.DS_Store

rust/**/target/
photos-original/*
!photos-original/README.md

.vercel/

````

## about/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>About our Jalladiampet parlour | Abirami Natural Beauty Parlour</title><meta name="description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:title" content="Abirami Natural Beauty Parlour"><meta property="og:description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:type" content="website"><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Abirami Natural Beauty Parlour","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"}}</script><script type="module" src="/src/main.ts"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/services/">Services</a><a href="/gallery/">Gallery</a><a href="/about/" aria-current="page">About</a><a href="/book/">Book</a></nav></header><main id="main" tabindex="-1"><section class="page-intro"><p class="eyebrow">Abirami, close to home</p><h1 data-reveal>On Rice<br><em>Mill Road.</em></h1><p>A neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai.</p></section><section class="section story" data-story><div class="story-art"><div class="photo parallax-photo" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: The salon on Rice Mill Road" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">salon.webp · photo to follow</span></div><div class="photo story-inset" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A detail from the salon" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">detail.webp · photo to follow</span></div></div><div class="story-copy"><p class="eyebrow">01 / Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Abirami Natural Beauty Parlour is on Rice Mill Road, Jalladiampet. If you are looking for a beauty parlour in Medavakkam, come and talk to us about your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section><section class="section closing"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">closing.webp · photo to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" data-magnetic href="/book/" >Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p><a href="https://www.google.com/maps/search/?api=1&query=No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p>Instagram: [handle]</p></div><div class="map-shell" data-map data-query="No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer><div class="cursor" aria-hidden="true"></div></body></html>
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
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Contact &amp; book | Abirami Natural Beauty Parlour</title><meta name="description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Find our address and ask about an appointment."><meta property="og:title" content="Abirami Natural Beauty Parlour"><meta property="og:description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Find our address and ask about an appointment."><meta property="og:type" content="website"><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Abirami Natural Beauty Parlour","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"}}</script><script type="module" src="/src/main.ts"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/services/">Services</a><a href="/gallery/">Gallery</a><a href="/about/">About</a><a href="/book/" aria-current="page">Book</a></nav></header><main id="main" tabindex="-1"><section class="page-intro"><p class="eyebrow">Come by. Say hello.</p><h1 data-reveal>Let’s make<br><em>some time.</em></h1><p>Ask about a service, a date, or your next visit to Abirami Natural Beauty Parlour.</p></section><section class="section book-layout"><div class="book-details"><h2>Say hello.</h2><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p class="fine-print">Online enquiries will open when the salon’s phone number is added. This form does not store or send your details.</p></div><form class="enquiry-form"><label for="guest-name">Your name<input id="guest-name" name="name" autocomplete="given-name" maxlength="80" required></label><label for="guest-service">What would you like to ask about?<input id="guest-service" name="service" maxlength="120" required></label><label for="guest-date">Preferred date, if you have one<input id="guest-date" name="date" type="date"></label><label for="guest-note">Anything you would like us to know?<textarea id="guest-note" name="note" maxlength="800"></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>I’m happy to share these details with the salon through WhatsApp.</span></label><p class="fine-print">Please leave out medical or other sensitive details.</p><p class="form-status" role="status">Booking is not connected yet. Phone number required.</p><button class="button" type="submit" disabled>Continue to WhatsApp</button></form></section></main><footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p><a href="https://www.google.com/maps/search/?api=1&query=No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p>Instagram: [handle]</p></div><div class="map-shell" data-map data-query="No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer><div class="cursor" aria-hidden="true"></div></body></html>
````

## gallery/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Gallery | Abirami Natural Beauty Parlour</title><meta name="description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:title" content="Abirami Natural Beauty Parlour"><meta property="og:description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:type" content="website"><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Abirami Natural Beauty Parlour","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"}}</script><script type="module" src="/src/main.ts"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/services/">Services</a><a href="/gallery/" aria-current="page">Gallery</a><a href="/about/">About</a><a href="/book/">Book</a></nav></header><main id="main" tabindex="-1"><section class="page-intro"><p class="eyebrow">The gallery</p><h1 data-reveal>Beauty,<br><em>up close.</em></h1><p>A place for photographs from the salon. Client work will appear here with permission.</p></section><section class="section gallery" aria-label="Salon photo gallery"><figure><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A finishing touch." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">portrait.webp · photo to follow</span></div><figcaption>A finishing touch.</figcaption></figure><figure><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Our place on Rice Mill Road." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">salon.webp · photo to follow</span></div><figcaption>Our place on Rice Mill Road.</figcaption></figure><figure><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: The little details." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">detail.webp · photo to follow</span></div><figcaption>The little details.</figcaption></figure><figure><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A moment to pause." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">ritual.webp · photo to follow</span></div><figcaption>A moment to pause.</figcaption></figure></section><section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">03 / Before &amp; after</p><h2 data-reveal>A closer<br><em>look.</em></h2><p>Real results belong here. We will add a matched pair of photographs with the client’s permission.</p></div><div><div class="comparison" data-comparison data-approved="false"><img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy"><div class="after-photo"><img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy"></div><span class="comparison-label before">Before · placeholder</span><span class="comparison-label after">After · placeholder</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label><p class="comparison-status">Demonstration only. No client result is shown.</p></div></section><section class="section closing"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">closing.webp · photo to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" data-magnetic href="/book/" >Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p><a href="https://www.google.com/maps/search/?api=1&query=No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p>Instagram: [handle]</p></div><div class="map-shell" data-map data-query="No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer><div class="cursor" aria-hidden="true"></div></body></html>
````

## index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Beauty parlour in Medavakkam &amp; Jalladiampet | Abirami Natural Beauty Parlour</title><meta name="description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:title" content="Abirami Natural Beauty Parlour"><meta property="og:description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:type" content="website"><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Abirami Natural Beauty Parlour","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"}}</script><script type="module" src="/src/main.ts"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/" aria-current="page">Home</a><a href="/services/">Services</a><a href="/gallery/">Gallery</a><a href="/about/">About</a><a href="/book/">Book</a></nav></header><main id="main" tabindex="-1"><section class="hero" data-fabric><div class="hero-media is-placeholder"><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Abirami Natural Beauty Parlour in Jalladiampet" width="1200" height="1500" fetchpriority="high" decoding="async" ></picture></div><div class="hero-shade"></div><p class="eyebrow">Abirami Natural Beauty Parlour · Chennai</p><h1 class="hero-title"><span>Beauty,</span><span>in your</span><span><em>own time.</em></span></h1><div><a class="button button-solid" data-magnetic href="/book/" >Book on WhatsApp</a></div><div class="hero-bottom"><p>Rice Mill Road.<br>Jalladiampet, Medavakkam.</p><p>Photo placeholder · hero.webp</p><span class="hero-number" aria-hidden="true">a.</span></div></section><section class="section story" data-story><div class="story-art"><div class="photo parallax-photo" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: The salon on Rice Mill Road" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">salon.webp · photo to follow</span></div><div class="photo story-inset" ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: A detail from the salon" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">detail.webp · photo to follow</span></div></div><div class="story-copy"><p class="eyebrow">01 / Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Abirami Natural Beauty Parlour is on Rice Mill Road, Jalladiampet. If you are looking for a beauty parlour in Medavakkam, come and talk to us about your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section><section class="section services-editorial"><div class="section-heading"><p class="eyebrow">02 / A little time for you</p><h2 data-reveal>Care, at<br>your pace.</h2></div><div class="service-layout"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Salon care and treatment details" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">services.webp · photo to follow</span></div><div><ol class="service-list"><li class="service-row"><p class="eyebrow">The service menu</p><h3>Details to follow.</h3><p>The confirmed service list will be added here. Please ask us about the care you have in mind.</p></li></ol><p class="fine-print service-note">Prices on consultation</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section><section class="horizontal-section" aria-labelledby="gallery-strip-title"><div class="horizontal-heading"><p class="eyebrow">The service edit</p><h2 id="gallery-strip-title" data-reveal>Time for you.</h2></div><div class="services-track"><article class="strip-item"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Your service, here." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">portrait.webp · photo to follow</span></div><h3>Your service, here.</h3><p class="fine-print">Confirmed service details to follow.</p><a class="text-link" href="/services/">View the service menu ↗</a></article><article class="strip-item"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Time for a visit." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">ritual.webp · photo to follow</span></div><h3>Time for a visit.</h3><p class="fine-print">Prices on consultation</p><a class="text-link" href="/services/">View the service menu ↗</a></article><article class="strip-item"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Let’s talk first." width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">detail.webp · photo to follow</span></div><h3>Let’s talk first.</h3><p class="fine-print">Ask about the care you have in mind.</p><a class="text-link" href="/services/">View the service menu ↗</a></article></div></section><section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">03 / Before &amp; after</p><h2 data-reveal>A closer<br><em>look.</em></h2><p>Real results belong here. We will add a matched pair of photographs with the client’s permission.</p></div><div><div class="comparison" data-comparison data-approved="false"><img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy"><div class="after-photo"><img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy"></div><span class="comparison-label before">Before · placeholder</span><span class="comparison-label after">After · placeholder</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label><p class="comparison-status">Demonstration only. No client result is shown.</p></div></section><section class="section reviews-section"><div class="section-heading"><p class="eyebrow">Kind words</p><h2 data-reveal>From our<br>neighbours.</h2></div><p>Client reviews will be added here when they are shared with us.</p></section><section class="section closing"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">closing.webp · photo to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" data-magnetic href="/book/" >Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p><a href="https://www.google.com/maps/search/?api=1&query=No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p>Instagram: [handle]</p></div><div class="map-shell" data-map data-query="No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer><div class="cursor" aria-hidden="true"></div></body></html>
````

## package-lock.json

````json
{
  "name": "abirami-natural-beauty-parlour",
  "version": "0.2.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "abirami-natural-beauty-parlour",
      "version": "0.2.0",
      "dependencies": {
        "gsap": "^3.13.0",
        "lenis": "^1.3.0",
        "three": "^0.180.0"
      },
      "devDependencies": {
        "@types/node": "^24.0.0",
        "@types/three": "^0.180.0",
        "typescript": "^5.9.0",
        "vite": "^7.1.0"
      },
      "engines": {
        "node": ">=22.12"
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
  "version": "0.2.0",
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
    "test": "node --test scripts/media.test.mjs scripts/noise.test.mjs"
  },
  "dependencies": {
    "gsap": "^3.13.0",
    "lenis": "^1.3.0",
    "three": "^0.180.0"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/three": "^0.180.0",
    "typescript": "^5.9.0",
    "vite": "^7.1.0"
  }
}

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

## README.md

````md
# Abirami Natural Beauty Parlour — stages 1 and 2

Canonical repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Use this repository for future updates.

Five prerendered pages, Vite + vanilla TypeScript, plain CSS, GSAP, Lenis and
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
Use the final HTTPS origin for siteUrl when ready to launch; null retains
noindex/robots Disallow. This setting also controls canonical URLs and sitemap.

Until a valid phone is provided, call/WhatsApp links are absent and the enquiry
form is disabled. When connected, it opens a message in WhatsApp for the visitor
to send. Appointment confirmation still comes from the salon. No browser form
data is sent to a server or stored. The Google map connects only after a click.
External Google Fonts have Georgia/Arial fallbacks. The small editable mark.svg
is a simple A/petal mark; it is not a tracing of the earlier generated logo.

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

## scripts/finalize.mjs

````mjs
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
    for (const name of ['prerender.mjs', 'media.mjs']) await copyFile(new URL(name, import.meta.url), join(root, 'scripts', name));
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
    assert.match(html, /background-color:#253e34/);
    assert.match(html, /data:image\/webp;base64,UklGRg==/);
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

const root = resolve(import.meta.dirname, '..');
const business = JSON.parse(await readFile(resolve(root, 'src/business.json'), 'utf8'));
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const exists = async path => access(resolve(root, 'public', path.replace(/^\//, ''))).then(() => true).catch(() => false);
const media = await readImages(resolve(root, 'public'));
const imageUrl = (name, width = 960) => media[name]?.variants.find(item => item.width === width)?.webp ?? `/assets/img/${name}.webp`;
const assets = {};
for (const name of ['hero', 'salon', 'detail', 'services', 'service-alt', 'portrait', 'ritual', 'closing', 'before', 'after']) {
  assets[name] = Boolean(media[name]) || await exists(`/assets/img/${name}.webp`);
}
const phone = /^\+[1-9]\d{7,14}$/.test(business.phone ?? '') ? business.phone : null;
const whatsapp = phone ? `https://wa.me/${phone.slice(1)}?text=${encodeURIComponent('Hello Abirami, I would like to ask about an appointment.')}` : null;
const instagram = /^[A-Za-z0-9._]{1,30}$/.test(business.instagram ?? '') ? `https://www.instagram.com/${business.instagram}/` : null;
const mapQuery = encodeURIComponent(business.address);
const directions = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const confirmedServices = business.services;
const picture = (name, alt, priority = false, extra = '') => {
  const entry = media[name];
  const src = assets[name] ? imageUrl(name, priority ? 1600 : 960) : '/assets/img/photo-placeholder.svg';
  const sizes = priority ? '100vw' : '(max-width: 767px) 90vw, 50vw';
  const avif = entry ? `<source type="image/avif" srcset="${entry.variants.map(item => `${item.avif} ${item.width}w`).join(', ')}" sizes="${sizes}">` : assets[`${name}-avif`] ? `<source type="image/avif" srcset="/assets/img/${name}.avif">` : '';
  const srcset = entry ? ` srcset="${entry.variants.map(item => `${item.webp} ${item.width}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<picture>${avif}<img src="${src}"${srcset} alt="${escape(assets[name] ? alt : `Photo placeholder: ${alt}`)}" width="${entry?.width ?? 1200}" height="${entry?.height ?? 1500}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${extra}></picture>`;
};
const backdrop = name => media[name] ? ` style="background-color:${media[name].dominant};background-image:url('${media[name].placeholder}');background-size:cover"` : '';
for (const name of Object.keys(assets)) assets[`${name}-avif`] = await exists(`/assets/img/${name}.avif`);
const photo = (name, alt, extra = '') => `<div class="photo ${extra}"${backdrop(name)} ${name === 'services' && assets[name] && assets['service-alt'] ? 'data-liquid' : ''}>${picture(name, alt, false, name === 'services' && assets['service-alt'] ? `data-alt="${imageUrl('service-alt')}"` : '')}${assets[name] ? '' : `<span class="photo-caption">${escape(name)}.webp · photo to follow</span>`}</div>`;
const bookButton = (label = 'Book on WhatsApp', light = false) => `<a class="button${light ? ' button-solid' : ''}" data-magnetic href="${escape(whatsapp ?? '/book/')}" ${whatsapp ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
const nav = [['Home', '/'], ['Services', '/services/'], ['Gallery', '/gallery/'], ['About', '/about/'], ['Book', '/book/']];
const header = route => `<a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([name, href]) => `<a href="${href}"${href === route ? ' aria-current="page"' : ''}>${name}</a>`).join('')}</nav></header>`;
const footer = `<footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>${escape(business.address)}</p><p><a href="${directions}" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: ${escape(business.hours ?? '[hours]')}</p><p>${phone ? `<a href="tel:${phone}">${escape(phone)}</a><br><a href="${escape(whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp us</a>` : 'Phone / WhatsApp: [number]'}</p><p>${instagram ? `<a href="${instagram}" target="_blank" rel="noopener noreferrer">@${escape(business.instagram)}</a>` : 'Instagram: [handle]'}</p></div><div class="map-shell" data-map data-query="${mapQuery}"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer>${whatsapp ? `<a class="floating-whatsapp" href="${escape(whatsapp)}" target="_blank" rel="noopener noreferrer" aria-label="Book an appointment on WhatsApp">WhatsApp ↗</a>` : ''}<div class="cursor" aria-hidden="true"></div>`;
const intro = (label, title, description) => `<section class="page-intro"><p class="eyebrow">${label}</p><h1 data-reveal>${title}</h1><p>${description}</p></section>`;
const serviceRows = confirmedServices.length ? confirmedServices.map((service, i) => `<li class="service-row"><details><summary><span class="service-number">${String(i + 1).padStart(2, '0')}</span><h3>${escape(service.name)}</h3></summary><p>${escape(service.description ?? '')}</p><p>${escape(service.price ?? business.prices)}</p></details></li>`).join('') : `<li class="service-row"><p class="eyebrow">The service menu</p><h3>Details to follow.</h3><p>The confirmed service list will be added here. Please ask us about the care you have in mind.</p></li>`;
const services = `<section class="section services-editorial"><div class="section-heading"><p class="eyebrow">02 / A little time for you</p><h2 data-reveal>Care, at<br>your pace.</h2></div><div class="service-layout">${photo('services', 'Salon care and treatment details')}<div><ol class="service-list">${serviceRows}</ol><p class="fine-print service-note">${escape(business.prices)}</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section>`;
const stripItems = confirmedServices.length ? confirmedServices.map((service, i) => ({ image: ['portrait', 'ritual', 'detail'][i % 3], title: service.name, text: service.price ?? business.prices })) : [{ image: 'portrait', title: 'Your service, here.', text: 'Confirmed service details to follow.' }, { image: 'ritual', title: 'Time for a visit.', text: business.prices }, { image: 'detail', title: 'Let’s talk first.', text: 'Ask about the care you have in mind.' }];
const strip = `<section class="horizontal-section" aria-labelledby="gallery-strip-title"><div class="horizontal-heading"><p class="eyebrow">The service edit</p><h2 id="gallery-strip-title" data-reveal>Time for you.</h2></div><div class="services-track">${stripItems.map(item => `<article class="strip-item">${photo(item.image, item.title)}<h3>${escape(item.title)}</h3><p class="fine-print">${escape(item.text)}</p><a class="text-link" href="/services/">View the service menu ↗</a></article>`).join('')}</div></section>`;
const comparisonReady = business.comparisonApproved && assets.before && assets.after;
const comparison = `<section class="section comparison-section"><div class="comparison-copy"><p class="eyebrow">03 / Before &amp; after</p><h2 data-reveal>A closer<br><em>look.</em></h2><p>${comparisonReady ? 'Move the slider to compare these photographs.' : 'Real results belong here. We will add a matched pair of photographs with the client’s permission.'}</p></div><div><div class="comparison" data-comparison data-approved="${comparisonReady}">${comparisonReady ? picture('before', 'Before the salon appointment') : '<img src="/assets/img/photo-placeholder.svg" alt="Before photo placeholder" width="1200" height="1500" loading="lazy">'}<div class="after-photo">${comparisonReady ? picture('after', 'After the salon appointment') : '<img src="/assets/img/photo-placeholder.svg" alt="After photo placeholder" width="1200" height="1500" loading="lazy">'}</div><span class="comparison-label before">Before${comparisonReady ? '' : ' · placeholder'}</span><span class="comparison-label after">After${comparisonReady ? '' : ' · placeholder'}</span><div class="comparison-line"></div></div><label class="comparison-control" for="comparison-range">Compare before and after<input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent after photo"></label>${comparisonReady ? '' : '<p class="comparison-status">Demonstration only. No client result is shown.</p>'}</div></section>`;
const reviews = `<section class="section reviews-section"><div class="section-heading"><p class="eyebrow">Kind words</p><h2 data-reveal>From our<br>neighbours.</h2></div>${business.reviews.length ? `<div data-reviews>${business.reviews.map((review, i) => `<article data-review${i ? ' hidden' : ''}><blockquote class="review-quote">“${escape(review.text)}”</blockquote><p class="review-meta">${escape(review.name)}</p></article>`).join('')}<div class="review-controls"><button type="button" data-review-prev aria-label="Previous review">←</button><span data-review-count>1 / ${business.reviews.length}</span><button type="button" data-review-next aria-label="Next review">→</button><button type="button" data-review-pause aria-pressed="false">Pause</button></div><p class="sr-only" data-review-announcement aria-live="polite"></p></div>${Number.isFinite(business.googleRating) && Number.isInteger(business.googleReviewCount) ? `<p class="review-meta">${escape(business.googleRating)} from ${escape(business.googleReviewCount)} Google reviews</p>` : ''}` : '<p>Client reviews will be added here when they are shared with us.</p>'}</section>`;
const closing = `<section class="section closing">${photo('closing', 'Inside Abirami Natural Beauty Parlour')}<div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2>${bookButton('Let’s plan your visit', true)}</div></section>`;
const story = `<section class="section story" data-story><div class="story-art">${photo('salon', 'The salon on Rice Mill Road', 'parallax-photo')}${photo('detail', 'A detail from the salon', 'story-inset')}</div><div class="story-copy"><p class="eyebrow">01 / Here, in Jalladiampet</p><h2 data-reveal>Natural.<br>Personal.<br><em>Abirami.</em></h2><p data-story-text>Some time for yourself. A familiar place, close to home.</p><p>Abirami Natural Beauty Parlour is on Rice Mill Road, Jalladiampet. If you are looking for a beauty parlour in Medavakkam, come and talk to us about your next visit.</p><a class="text-link" href="/about/">A little about us ↗</a></div></section>`;
const hero = `<section class="hero" data-fabric><div class="hero-media${assets.hero ? '' : ' is-placeholder'}">${picture('hero', 'Abirami Natural Beauty Parlour in Jalladiampet', true)}${await exists('/assets/video/hero.mp4') ? `<video muted loop playsinline preload="none" poster="${assets.hero ? imageUrl('hero', 1600) : '/assets/img/photo-placeholder.svg'}" data-hero-video><source data-src="/assets/video/hero.mp4" type="video/mp4"></video>` : ''}</div><div class="hero-shade"></div><p class="eyebrow">Abirami Natural Beauty Parlour · Chennai</p><h1 class="hero-title"><span>Beauty,</span><span>in your</span><span><em>own time.</em></span></h1><div>${bookButton('Book on WhatsApp', true)}</div><div class="hero-bottom"><p>Rice Mill Road.<br>Jalladiampet, Medavakkam.</p><p>${assets.hero ? 'A little time for you.' : 'Photo placeholder · hero.webp'}</p><span class="hero-number" aria-hidden="true">a.</span></div></section>`;
const gallery = `<section class="section gallery" aria-label="Salon photo gallery">${[['portrait', 'A finishing touch.'], ['salon', 'Our place on Rice Mill Road.'], ['detail', 'The little details.'], ['ritual', 'A moment to pause.']].map(([name, caption]) => `<figure>${photo(name, caption)}<figcaption>${caption}</figcaption></figure>`).join('')}</section>`;
const form = `<section class="section book-layout"><div class="book-details"><h2>Say hello.</h2><p>${escape(business.address)}</p><p>Hours: ${escape(business.hours ?? '[hours]')}</p>${phone ? `<p><a href="tel:${phone}">Call ${escape(phone)}</a></p>` : '<p>Phone / WhatsApp: [number]</p>'}<p class="fine-print">${phone ? 'Your message opens in WhatsApp. Your appointment is confirmed only after we reply.' : 'Online enquiries will open when the salon’s phone number is added. This form does not store or send your details.'}</p></div><form class="enquiry-form"><label for="guest-name">Your name<input id="guest-name" name="name" autocomplete="given-name" maxlength="80" required></label><label for="guest-service">What would you like to ask about?<input id="guest-service" name="service" maxlength="120" required></label><label for="guest-date">Preferred date, if you have one<input id="guest-date" name="date" type="date"></label><label for="guest-note">Anything you would like us to know?<textarea id="guest-note" name="note" maxlength="800"></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>I’m happy to share these details with the salon through WhatsApp.</span></label><p class="fine-print">Please leave out medical or other sensitive details.</p><p class="form-status" role="status">${phone ? 'We will open your message in WhatsApp.' : 'Booking is not connected yet. Phone number required.'}</p><button class="button" type="submit" ${phone ? '' : 'disabled'}>Continue to WhatsApp</button></form></section>`;
const pages = [
  { route: '/', title: 'Beauty parlour in Medavakkam & Jalladiampet', body: hero + story + services + strip + comparison + reviews + closing },
  { route: '/services/', title: 'Services', body: intro('Our service menu', 'A little care.<br><em>A little time.</em>', 'Tell us what you have in mind. We can talk through the details before you book.') + services + closing },
  { route: '/gallery/', title: 'Gallery', body: intro('The gallery', 'Beauty,<br><em>up close.</em>', 'A place for photographs from the salon. Client work will appear here with permission.') + gallery + comparison + closing },
  { route: '/about/', title: 'About our Jalladiampet parlour', body: intro('Abirami, close to home', 'On Rice<br><em>Mill Road.</em>', 'A neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai.') + story + closing },
  { route: '/book/', title: 'Contact & book', body: intro('Come by. Say hello.', 'Let’s make<br><em>some time.</em>', 'Ask about a service, a date, or your next visit to Abirami Natural Beauty Parlour.') + form }
];
for (const page of pages) {
  const description = `${business.name}, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. ${page.route === '/book/' ? 'Find our address and ask about an appointment.' : 'Natural beauty, close to home. Prices on consultation.'}`;
  const siteUrl = business.siteUrl ? new URL(page.route, business.siteUrl).href : null;
  const schema = { '@context': 'https://schema.org', '@type': 'BeautySalon', name: business.name, address: { '@type': 'PostalAddress', streetAddress: 'No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600100', addressCountry: 'IN' }, ...(phone ? { telephone: phone } : {}), ...(siteUrl ? { url: siteUrl } : {}) };
  let html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>${escape(page.title)} | ${escape(business.name)}</title><meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(business.name)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website">${siteUrl ? `<link rel="canonical" href="${escape(siteUrl)}"><meta property="og:url" content="${escape(siteUrl)}">` : '<meta name="robots" content="noindex, nofollow">'}${business.siteUrl && assets.hero ? `<meta property="og:image" content="${escape(new URL(imageUrl('hero', 1600), business.siteUrl).href)}">` : ''}<link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script><script type="module" src="/src/main.ts"></script></head><body>${header(page.route)}<main id="main" tabindex="-1">${page.body}</main>${footer}</body></html>`;
  const target = resolve(root, page.route === '/' ? 'index.html' : `${page.route.slice(1)}index.html`);
  await mkdir(resolve(target, '..'), { recursive: true });
  await writeFile(target, html);
}
console.log('Prerendered 5 pages. Unconfirmed business fields remain unset.');

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
const excluded = new Set(['node_modules', 'dist', 'target', '.git', '.vercel', 'photos-original', 'generated']);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (excluded.has(entry.name) || entry.name === 'COMPLETE-SOURCE.md' || entry.name === '.env') continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && !/\.(wasm|webp|avif|png|jpe?g|mp4)$/i.test(entry.name)) files.push(path);
  }
}
await walk(root);
const sections = ['# Abirami — stages 1 and 2: complete source', '', 'Static frontend, Rust image CLI, noise WASM and build tooling. Compiled output and private originals are excluded from this source listing.', '', '## File tree', '', '```text', ...files.map(path => relative(root, path).replaceAll('\\', '/')), '```', ''];
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
import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { readImages } from './media.mjs';

const images = await readImages('dist');
for (const [name, photo] of Object.entries(images)) {
  const tiny = Buffer.from(photo.placeholder.split(',')[1], 'base64');
  assert.equal(tiny.toString('ascii', 0, 4), 'RIFF', `${name}: placeholder RIFF header`);
  assert.equal(tiny.toString('ascii', 8, 12), 'WEBP', `${name}: placeholder WebP header`);
  for (const variant of photo.variants) {
    const webp = await readFile(`dist${variant.webp}`);
    const avif = await readFile(`dist${variant.avif}`);
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF');
    assert.equal(webp.toString('ascii', 8, 12), 'WEBP');
    assert.equal(avif.toString('ascii', 4, 8), 'ftyp');
    assert.ok(avif.subarray(8, 40).includes(Buffer.from('avif')), `${name}: AVIF brand`);
  }
}
const wasm = JSON.parse(await readFile('dist/assets/wasm/manifest.json', 'utf8'));
assert.equal(wasm.version, 1);
if (wasm.module !== null) {
  assert.equal(wasm.module, '/assets/wasm/noise_wasm.js');
  const glue = await readFile(`dist${wasm.module}`, 'utf8');
  assert.ok(glue.includes('flow_field'), 'WASM glue exports flow_field');
  const bytes = await readFile('dist/assets/wasm/noise_wasm_bg.wasm');
  assert.deepEqual([...bytes.subarray(0, 8)], [0, 97, 115, 109, 1, 0, 0, 0]);
} else console.log('WASM absent: built site uses automatic JS noise fallback.');

const routes = ['index.html', 'services/index.html', 'gallery/index.html', 'about/index.html', 'book/index.html'];
for (const route of routes) {
  const html = await readFile(`dist/${route}`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
  assert.ok(html.includes('<main '), `${route}: main landmark`);
  assert.ok(html.includes('No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100'), `${route}: exact address`);
  assert.ok(!html.includes('aggregateRating'), `${route}: no invented rating`);
  assert.ok(!html.includes('wa.me/null'), `${route}: no invalid WhatsApp link`);
  const schema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.equal(JSON.parse(schema)['@type'], 'BeautySalon');
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    const path = match[1];
    if (path.startsWith('//')) continue;
    await access(`dist${path}${path.endsWith('/') ? 'index.html' : ''}`);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/')) await access(`dist${url}`);
    }
  }
}
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes('User-agent: *'));
console.log(`PASS: 5 routes, responsive image targets, ${Object.keys(images).length} image manifest entries, WASM descriptor, schema and business-data guards.`);

````

## services/index.html

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#253e34"><title>Services | Abirami Natural Beauty Parlour</title><meta name="description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:title" content="Abirami Natural Beauty Parlour"><meta property="og:description" content="Abirami Natural Beauty Parlour, a neighbourhood beauty parlour in Jalladiampet, Medavakkam, Chennai 600100. Natural beauty, close to home. Prices on consultation."><meta property="og:type" content="website"><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Abirami Natural Beauty Parlour","address":{"@type":"PostalAddress","streetAddress":"No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600100","addressCountry":"IN"}}</script><script type="module" src="/src/main.ts"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="curtain" aria-hidden="true"><img src="/assets/img/mark.svg" alt=""></div><header class="site-header"><a class="wordmark" href="/" aria-label="Abirami Natural Beauty Parlour home"><img src="/assets/img/mark.svg" alt="" width="28" height="40"><span><strong>ABIRAMI</strong><small>Natural Beauty Parlour</small></span></a><button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/services/" aria-current="page">Services</a><a href="/gallery/">Gallery</a><a href="/about/">About</a><a href="/book/">Book</a></nav></header><main id="main" tabindex="-1"><section class="page-intro"><p class="eyebrow">Our service menu</p><h1 data-reveal>A little care.<br><em>A little time.</em></h1><p>Tell us what you have in mind. We can talk through the details before you book.</p></section><section class="section services-editorial"><div class="section-heading"><p class="eyebrow">02 / A little time for you</p><h2 data-reveal>Care, at<br>your pace.</h2></div><div class="service-layout"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Salon care and treatment details" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">services.webp · photo to follow</span></div><div><ol class="service-list"><li class="service-row"><p class="eyebrow">The service menu</p><h3>Details to follow.</h3><p>The confirmed service list will be added here. Please ask us about the care you have in mind.</p></li></ol><p class="fine-print service-note">Prices on consultation</p><p class="service-note"><a class="text-link" href="/book/">Ask about an appointment ↗</a></p></div></div></section><section class="section closing"><div class="photo " ><picture><img src="/assets/img/photo-placeholder.svg" alt="Photo placeholder: Inside Abirami Natural Beauty Parlour" width="1200" height="1500" loading="lazy" decoding="async" ></picture><span class="photo-caption">closing.webp · photo to follow</span></div><div><p class="eyebrow">Your next visit</p><h2 data-reveal>Come as<br><em>you are.</em></h2><a class="button button-solid" data-magnetic href="/book/" >Let’s plan your visit</a></div></section></main><footer class="site-footer"><div class="footer-grid"><div><h3>Abirami<br>Natural Beauty Parlour</h3><p>No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100</p><p><a href="https://www.google.com/maps/search/?api=1&query=No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100" target="_blank" rel="noopener noreferrer">Get directions ↗</a></p></div><div><h3>Plan your visit.</h3><p>Hours: [hours]</p><p>Phone / WhatsApp: [number]</p><p>Instagram: [handle]</p></div><div class="map-shell" data-map data-query="No.1%2F11%2C%20Rice%20Mill%20Rd%2C%20Jalladiampet%2C%20Medavakkam%2C%20Chennai%20600100"><p>Find us on Rice Mill Road.</p><button class="button" type="button" data-load-map>Load Google map</button><p class="fine-print">Loading the map connects to Google.</p></div></div><div class="footer-bottom"><span>© 2026 Abirami Natural Beauty Parlour</span><span>Jalladiampet · Medavakkam · Chennai</span></div></footer><div class="cursor" aria-hidden="true"></div></body></html>
````

## src/business.json

````json
{
  "name": "Abirami Natural Beauty Parlour",
  "address": "No.1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai 600100",
  "phone": null,
  "hours": null,
  "instagram": null,
  "siteUrl": null,
  "wasmUrl": null,
  "prices": "Prices on consultation",
  "services": [],
  "reviews": [],
  "googleRating": null,
  "googleReviewCount": null,
  "comparisonApproved": false
}

````

## src/css/base.css

````css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --ivory: #f2ecdf;
  --moss: #253e34;
  --rose: #c8a899;
  --brass: #9b7b46;
  --ink: #28372e;
  --muted: #5d6659;
  --line: #253e3438;
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
.photo canvas { opacity: 0; transition: opacity .6s; }
.photo.gl-ready canvas { opacity: 1; }
.curtain { display: none; position: fixed; inset: 0; z-index: 80; background: var(--moss); color: var(--ivory); place-items: center; pointer-events: none; }
.curtain.is-active { display: grid; animation: curtain-away 1.3s .2s cubic-bezier(.76,0,.24,1) both; }
.curtain img { width: 75px; height: 90px; animation: mark-in .8s both; }
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
::view-transition-old(root) { animation: page-out .22s both; }
::view-transition-new(root) { animation: page-in .4s both; }
@keyframes page-out { to { opacity: 0; } }
@keyframes page-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .curtain, .cursor { display: none !important; }
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
}

````

## src/css/layout.css

````css
.site-header { position: sticky; top: 0; z-index: 40; display: flex; align-items: center; justify-content: space-between; min-height: 87px; padding: 14px var(--gutter); border-bottom: 1px solid var(--line); background: var(--ivory); transition: transform .35s; }
.site-header.is-away { transform: translateY(-105%); }
.wordmark { text-decoration: none; display: flex; align-items: center; gap: 11px; }
.wordmark img { width: 28px; height: 40px; }
.wordmark strong { display: block; font: 500 25px/1 var(--display); letter-spacing: .12em; }
.wordmark small { font-size: 8px; letter-spacing: .14em; text-transform: uppercase; }
.site-nav { display: flex; align-items: center; gap: 26px; }
.site-nav a { text-decoration: none; font-size: 12px; }
.site-nav a[aria-current] { text-decoration: underline; }
.menu-toggle { display: none; border: 0; background: none; padding: 10px 0 10px 18px; }
.hero { position: relative; min-height: calc(100svh - 87px); display: flex; flex-direction: column; justify-content: flex-end; padding: 72px var(--gutter) 34px; overflow: hidden; isolation: isolate; background: var(--moss); color: var(--ivory); }
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
  .site-header { min-height: 78px; }
  .menu-toggle { display: block; }
  .site-nav { position: absolute; left: 0; right: 0; top: 100%; background: var(--ivory); padding: 32px var(--gutter) 45px; flex-direction: column; align-items: flex-start; border-bottom: 1px solid var(--line); visibility: hidden; }
  .site-nav.is-open { visibility: visible; }
  .site-nav a { font: 400 35px/1.3 var(--display); }
  .hero { min-height: calc(100svh - 78px); padding-top: 90px; }
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
const desktop = matchMedia('(pointer: fine)').matches;
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
    const urls = this.mode === 'wipe' ? [images[0].currentSrc || images[0].src, images[1].currentSrc || images[1].src] : [images[0].currentSrc || images[0].src, images[0].dataset.alt!];
    const results = await Promise.allSettled(urls.map(url => loader.loadAsync(url)));
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
    const { width, height } = this.host.getBoundingClientRect();
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
    this.uniforms.uScroll.value = Math.min(2, Math.max(0, -this.host.getBoundingClientRect().top / innerHeight));
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
  addEventListener('pagehide', () => { observer.disconnect(); surfaces.forEach(surface => surface.dispose()); noise.dispose(); }, { once: true });
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
import business from './business.json';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = document.querySelector<HTMLElement>('.site-nav')!;
const header = document.querySelector<HTMLElement>('.site-header')!;
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
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
    details.querySelector('summary')?.addEventListener('click', () => { openedByHover = false; });
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
  shell.querySelector('button')?.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = 'Map to Abirami Natural Beauty Parlour';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    frame.src = `https://maps.google.com/maps?q=${shell.dataset.query}&output=embed`;
    shell.replaceChildren(frame);
  });
});

document.querySelectorAll<HTMLElement>('[data-comparison]').forEach(box => {
  const input = box.parentElement!.querySelector<HTMLInputElement>('input[type=range]')!;
  input.addEventListener('input', () => {
    box.querySelector<HTMLElement>('.after-photo')!.style.clipPath = `inset(0 ${100 - Number(input.value)}% 0 0)`;
    box.querySelector<HTMLElement>('.comparison-line')!.style.left = `${input.value}%`;
    input.setAttribute('aria-valuetext', `${input.value} percent after photo`);
    box.dispatchEvent(new CustomEvent('comparisonchange', { detail: Number(input.value) / 100 }));
  });
});

const form = document.querySelector<HTMLFormElement>('.enquiry-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const phone = business.phone as string | null;
  if (!phone || !/^\+[1-9]\d{7,14}$/.test(phone) || !form.reportValidity()) return;
  const fields = new FormData(form);
  const message = `Hello Abirami, I’m ${String(fields.get('name')).trim()}.\nI’d like to ask about: ${String(fields.get('service')).trim()}.\nPreferred date: ${fields.get('date') || 'Let’s discuss'}.\n${String(fields.get('note') || '').trim()}`;
  location.assign(`https://wa.me/${phone.slice(1)}?text=${encodeURIComponent(message)}`);
});
const date = form?.querySelector<HTMLInputElement>('input[type=date]');
if (date) {
  const today = new Date();
  date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

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

const startEnhancements = () => {
  if (reducedMotion.matches) return;
  import('./motion').then(module => module.startMotion()).catch(() => { /* Static pages stay usable. */ });
  const navInfo = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowPower = (navInfo.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency || 8) <= 4 || navInfo.connection?.saveData;
  if (!lowPower) import('./gl/experience').then(module => module.startExperience()).catch(() => { /* Keep image fallbacks. */ });
};
if ('requestIdleCallback' in window) window.requestIdleCallback(startEnhancements, { timeout: 1800 });
else setTimeout(startEnhancements, 400);

reducedMotion.addEventListener('change', () => location.reload());

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
  gsap.from('.hero-title span', { yPercent: 35, opacity: 0, duration: 1.3, stagger: .13, ease: 'power3.out', clearProps: 'all' });
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
        gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .14, duration: .35 });
      };
      const reset = () => gsap.to(button, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' });
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
  const refresh = () => ScrollTrigger.refresh();
  void document.fonts.ready.then(refresh);
  document.querySelectorAll('img').forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }); });
  addEventListener('pagehide', () => { match.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); cleanups.forEach(clean => clean()); }, { once: true });
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
    { "source": "/assets/(.*)", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }] },
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
      { "key": "X-Frame-Options", "value": "DENY" }
    ] }
  ]
}

````

## vite.config.ts

````ts
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      input: Object.fromEntries(['index', 'services/index', 'gallery/index', 'about/index', 'book/index']
        .map(name => [name, resolve(import.meta.dirname, `${name}.html`)]))
    }
  }
});

````
