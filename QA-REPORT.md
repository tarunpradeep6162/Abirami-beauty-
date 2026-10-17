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
