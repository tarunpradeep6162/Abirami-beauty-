## Plain-language copy update

Customer-facing wording now uses clear everyday English: services, bridal makeup, facials, hair care and book an appointment. Shorter descriptions explain prices, booking confirmation and photo sources. Real reviews, contact details, opening hours and numerical prices are unchanged. The same wording is used in the advanced frontend.

## Feminine luxury redesign · 18 October 2026

The live page and advanced Next.js frontend now share porcelain, blush, mulberry and rose typography with restrained brass details. The bridal hero uses an arched portrait; treatments, gallery, forms, map, reviews and footer carry the same palette. The supplied logo and real listing media remain unchanged. The social preview and inline favicon match the new identity.

## Next.js + booking architecture

The new requested stack is implemented separately in [advanced/README.md](advanced/README.md): Next.js App Router, R3F fluid hero, GSAP/Lenis motion, Framer Motion bridal portal, Express, PostgreSQL and Stripe. The current static production website is unchanged. See that README for the full install, security, payment and deployment gates.

## Landing page refinement · 18 October 2026

Framed bridal inspiration from the locally copied salon gallery replaces the treatment-chair hero. The opening uses an oversized offset headline, a clearer consultation button, restrained champagne details and separate mobile image composition. No new business claims or result photographs were introduced.

<!-- Current Maps correction above supersedes historical design-pass notes below. -->
# Abirami Natural Beauty Parlour — standalone flagship

Canonical repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Live site: https://abirami-beauty.vercel.app/

index.html is the complete current site: semantic markup, embedded CSS, embedded
JavaScript and the approved logo embedded as a data URL. CSS, JavaScript, fonts and the logo are embedded. The copied salon media are
separate local assets. No backend, JavaScript CDN or API key is required.
Internet access is needed for Google Maps and WhatsApp. Salon photographs are
local files in public/assets/img/salon-maps, copied into dist during the build. Cormorant Garamond and Plus Jakarta Sans WOFF2 fonts are embedded
in the file, with their SIL Open Font licences included. Serve the built dist directory at the root of a static host, or use npm run
preview for a local check.

## Current content and media

The Google Maps listing was read directly on 18 October 2026. Phone and address
match the supplied business details. Published hours are Monday–Saturday
10 AM–8:30 PM and Sunday 10 AM–4:30 PM; these replace the earlier 9:30 AM and
bridal-only Sunday brief. Booking now validates against those hours.

The listing shows 5.0 from three reviews. One has written text and two are
ratings with Eyebrow shaping noted. The earlier expanded endorsements have been
removed. JSON-LD now uses that observed count, opening schedule and map pin.
Menu names, descriptions and starting prices remain owner-supplied.

Nine photographs and one video poster from the salon’s accessible Google Maps
gallery are copied and optimized as local WebP assets. They replace all Unsplash
images. The images load from this website; no Google photo links, image embeds
or external image hotlinks are used to display them. See MEDIA-INVENTORY.md.
Some interiors were uploaded in 2021. The comparison is explicitly not a
verified before/after pair. The hair-colour video download was unavailable;
only its still is displayed and it is labelled accordingly. The remaining
listing items were hidden by Google’s limited public view.

Treatment tabs, the image viewer and booking drawer support keyboard access.
The selected image can be attached to the enquiry as a first-party image URL.
Nothing is sent until the customer sends the generated WhatsApp message; the
salon then confirms availability. No website backend stores the form data.

## Build and deploy

```sh
npm ci
npm run build
npm test
npm run verify
```

The small build script copies the standalone file into dist, creates a real
404 page and refreshes exact CSP SHA-256 hashes in vercel.json. It does not
require Rust or bundle the legacy frontend. Commit refreshed vercel.json
whenever editing index.html. Hash authorization permits the requested embedded
CSS/JavaScript without unsafe-inline or unsafe-eval. Only local/data images and the Google map frame are allowed; embedded fonts use data URLs.

```sh
vercel link --yes --project abirami-beauty --scope tarun-2f6a
vercel pull --yes --environment=production --scope tarun-2f6a
vercel build --prod --scope tarun-2f6a
vercel deploy --prebuilt --prod --scope tarun-2f6a
```

Legacy services, gallery, about and book URLs redirect to the corresponding
sections of this page. Earlier TypeScript, Rust and audit files remain as
historical source in the repository and are not shipped by the standalone
build. Do not run the legacy prerender script over the current index.html.

Verification checks exact business-data presence, zero visible bracketed
placeholders, four treatment panels, safe external links, section targets,
valid application JavaScript and the embedded blocks' CSP hashes. Live image
availability still depends on the third-party providers. Browser checks and
measured performance results must not be inferred from static build success.

## Current polish and regression checks

Responsive image candidates reduce transfers on phones. The booking drawer
refreshes its Chennai date limit whenever opened or submitted, rejects times
that have passed, and enforces bridal-only Sundays. Inputs use 16px text to
avoid automatic mobile browser zoom. Keyboard-selected treatment tabs scroll
into view. The gallery is keyboard scrollable, the FAQ uses native disclosures,
and the map keeps a separate directions link available.

To run the interactive checks, start a static server in one terminal:

```sh
npm run build
npm run preview -- --port 4173
```

Then in another terminal:

```sh
npx playwright install chromium
npm run qa
```

The check covers 360, 768, 1280 and 1920px, keyboard navigation, modal focus,
service selection, slider, reviews, FAQ, decoded images, axe WCAG AA checks and
WhatsApp message encoding. WhatsApp requests are intercepted locally; no test
appointment is sent. Results and screenshots are written to qa-results.
Set QA_BASE_URL to test a deployed URL. Local preview does not apply Vercel
headers; check CSP against production or a local server with vercel.json headers.
PLAYWRIGHT_EXECUTABLE_PATH optionally selects a preinstalled Chromium binary.
QA_ASSET_CACHE optionally points to a JSON mapping of exact resource URLs to
locally cached response files for restricted-network runners; this must contain
unmodified provider responses. Image/cache tests do not measure real 4G load time.

## Art-direction refinement

The approved logo is reused as one embedded image for the header crest,
opening curtain and full footer seal. Body text and treatment information use a
larger, more readable scale. Uneven gallery sizes and longer treatment images
break the repeated split-section rhythm. The floating booking control steps
aside while the hero, closing invitation or contact section is in view.

Bridal journal images open a native full-screen dialog with captions, previous/
next controls and arrow-key navigation. Escape closes it and returns focus.
The images remain editorial references. Hero drift pauses when the hero leaves
the viewport or the tab is hidden. The scroll position indicator and gentle
hero parallax do not require a library. Reduced motion keeps a calm fallback.

The browser check now covers the image viewer, its keyboard controls and
accessibility, in addition to the existing booking and responsive checks.
Font licences are also available in FONT-LICENSES.txt and inside index.html.
The two Jakarta weights are Latin subsets with punctuation, arrows and the
rupee sign. Serif Latin subsets come from the installed Fontsource package.

## Bridal planning and film layer

The bridal planning chapter uses CSS sticky positioning on desktop and a normal
reading order on phones. The three chapters explain what to share and what the
salon must confirm; they do not advertise a trial, deposit or guaranteed slot.

The hero's optional silk texture is a small handwritten WebGL shader, started
after the first paint. It caps DPR at 1.25 on mobile and 1.5 on desktop, draws at
about 30fps, and stops when hidden or off-screen. Reduced motion, Save-Data,
modest hardware and unavailable WebGL keep the existing photographic hero.
Context loss also returns to that fallback. There are no new runtime libraries.

Gallery images support touch swipes as well as buttons and arrow keys. “Discuss
this reference” opens the bridal booking drawer, showing the chosen editorial
reference and starting price/duration. The reference can be removed. Optional
appointment notes and the reference URL are encoded into the WhatsApp request;
no image is uploaded and nothing is sent automatically. Focus returns to the
relevant gallery thumbnail when the drawer closes.

JSON-LD now includes the four owner-supplied Service offers and the five visible
FAQ answers alongside BeautySalon and WebSite data. No review count, geo point,
award, additional service or availability has been invented.
