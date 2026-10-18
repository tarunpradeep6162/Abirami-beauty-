## Plain-language copy verification

Static build and CSP verification pass. All seven static browser checks pass with the new service labels, including mobile layouts and WhatsApp booking. Next.js production compilation and TypeScript pass; the advanced UI checks use mocked portal data as before.

## Feminine redesign verification · 18 October 2026

Static build and exact CSP hashes pass. All seven static browser checks passed at 360/768/1280/1920, including automated WCAG AA, gallery interactions, booking validation and local images. Brass label colours were darkened after the initial contrast check. Advanced Next.js production build, TypeScript/API syntax checks and all five frontend browser checks pass with the new palette and lighter shader. Portal API fixtures remain mocked; no backend activation or payment verification is claimed.

## Landing page refinement · 18 October 2026

New framed bridal hero, offset typography, mobile composition, champagne booking button and refined sanctuary spacing. Build and exact CSP verification pass. Browser QA checks 360/768/1280/1920 layouts, WCAG AA automated checks, local image decoding, gallery, tabs, reduced motion, shader fallback and WhatsApp validation. Seven checks passed with no review items. These are desktop browser emulations, not physical phone or Lighthouse measurements.

# Release verification — 18 October 2026, Chennai

The standalone page passed Chromium checks at 360, 768, 1280 and 1920px.
No horizontal document overflow, application JavaScript errors, broken decoded
images, site CSP violations or axe WCAG 2 A/AA and 2.1 AA violations were found
in the tested states. These automated checks do not certify every assistive
technology or device.

Exercised the mobile menu, skip link, treatment tab keyboard navigation,
service-specific booking drawer, Escape close, slider arrow keys, review
navigation, native FAQ disclosures and full-screen gallery navigation. A separate motion-enabled pass confirmed
the curtain exits and scroll reveals complete. Hero and booking screenshots
were inspected at mobile and desktop sizes.

The form rejected an elapsed appointment time and a non-bridal Sunday request.
A successful bridal request generated the correct salon number and URL-encoded
service, name, date and time. WhatsApp was intercepted in the browser: no test
appointment or message was sent to the salon.

Build, source verification and npm audit passed. npm audit reported zero known
vulnerabilities at the time checked. Exact inline CSS/JS hashes were regenerated
for the Vercel CSP. Tests used a local server with the production headers and an
exact-response cache of the real Unsplash resources because the
local headless browser could not directly reach those origins. Actual image
URLs were downloaded successfully through the available network transport.

No Lighthouse score, real-device result or real 4G Core Web Vitals result is
claimed. Responsive image candidates improve transfer size but are not a
substitute for field measurements. The final public deployment is also checked
for the new content and security policy.

Business data and review excerpts are owner-supplied. Editorial images remain
labelled; the comparison shows different people and does not claim client results.

## Additional design pass

Embedded four WOFF2 font faces (Cormorant regular/italic and Jakarta 400/600),
removed runtime Google Fonts requests, integrated the approved monogram,
increased text sizes and added the image viewer. Browser coverage now includes
its Escape/arrow-key controls and an axe check while open. The decorative footer
wordmark was adjusted to meet large-text contrast after the first check found
it too faint. All six checks passed after that correction: four viewport passes, a motion pass and an intercepted booking-flow pass.

## Bridal planning and optional WebGL release

Seven browser checks passed for this release: the four viewport/accessibility
passes, a motion/WebGL pass, a forced unavailable-WebGL pass, and the intercepted
booking pass. Chromium successfully compiled and displayed the silk shader.
Its canvas stopped displaying off-screen. Reduced-motion contexts kept it off.
With WebGL forced unavailable, the static hero and booking drawer still worked.

The 360px pass sent native touch events through Chromium and confirmed swipe
navigation. The reference-to-booking transition preserved the page scroll lock,
selected bridal styling and returned keyboard focus to the thumbnail on close.
The intercepted WhatsApp message contained the correct reference URL and optional
notes, including ampersands and angle brackets, without interpreting them as HTML.
No message reached WhatsApp or the salon. Responsive tests found no document
overflow, application errors, site CSP violations, broken decoded images or axe
WCAG AA violations in tested states. The sticky bridal chapter was also inspected
visually. Service offer names/prices and FAQ text come from visible owner content.

These tests do not establish a measured Android frame rate, real-device result,
Lighthouse score or field Core Web Vitals result.

## Current release: Google Maps content correction, 18 October 2026

The listing was inspected in Google Maps, including the expanded weekly hours,
review summary and accessible gallery. Published hours are 10:00–20:30 Monday
to Saturday and 10:00–16:30 Sunday. Rating is 5.0 from three reviews. Only the
first review has text; the other two are five-star eyebrow-shaping ratings.
These facts supersede the earlier brief and earlier release checks above.

All Unsplash images were replaced with locally served gallery copies. Nine
photographs and one video still are present. No playable video was available;
its HTML error response was rejected and removed rather than shipped as MP4.
The comparison remains labelled as an unverified pair, without before/after
claims. The limited public gallery did not expose all 16 reported items.

The seven browser checks passed again using local images and production CSP
headers, without a third-party image cache. This includes all four widths,
image decoding, keyboard/touch viewer controls, reduced motion, WebGL fallback,
reference-to-booking focus/scroll lock, and the intercepted WhatsApp message.
The Sunday test now rejects times after 16:30 and permits any listed service
within published hours. No test enquiry was sent to WhatsApp or the salon.
No application errors, image failures, document overflow, site CSP violations
or axe WCAG AA violations were detected in the tested states.
