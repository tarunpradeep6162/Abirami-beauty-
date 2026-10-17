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
