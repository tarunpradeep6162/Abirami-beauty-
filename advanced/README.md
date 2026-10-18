# Abirami flagship architecture

A separate Next.js App Router frontend and Express/PostgreSQL API. The current static production site is unchanged. All source is in this directory; copied gallery images and licensed fonts are prepared from the repository’s existing public/assets directory at build time. This development app is deliberately noindex until its new deployment is approved for launch.

## Structure

- web/app: server-rendered home, booking and bridal portal routes, local fonts, design tokens.
- web/components: deferred R3F fluid hero; GSAP/Lenis motion lifecycle; editorial treatments; Framer Motion bridal tabs; checkout form.
- api/src: validated bookings, Stripe Checkout/webhook/reconciliation, invitation sessions, private image access.
- api/sql/001.sql: durable reservations, PostgreSQL overlap exclusion constraint, private journals and rate limits.
- api/test: appointment/payment rules and an optional real PostgreSQL concurrency test.

## Install and build

Use Node.js 24 LTS and PostgreSQL 16 or newer. From the repository root:

```sh
cd advanced
npm ci
npm run build
npm test
npm audit
```

On Windows PowerShell or macOS Terminal, copy api/.env.example to api/.env and web/.env.example to web/.env.local using your editor. Set DATABASE_URL to your PostgreSQL connection string. Configure a real Stripe test secret and webhook signing secret privately. Never commit these files. Run from advanced:

```sh
npm run migrate -w api
npm run dev:api
```

In another terminal:

```sh
cd advanced
npm run dev:web
```

The frontend runs on http://localhost:3000 and rewrites /api to Express on port 4000. Use a reverse proxy with the exact same browser origin in production; no wildcard CORS. APP_ORIGIN must equal the frontend origin. Set TRUST_PROXY_HOPS only to the number of trusted reverse proxies in front of Express; do not enable trust for arbitrary forwarded IPs.

## Deposit workflow

BOOKING_ENABLED defaults to false in both apps. WhatsApp remains available until you explicitly enable online deposits. Before enabling it, configure matching owner-approved DEPOSIT_POLICY text in both environments, at least 60 characters. The deposit is always INR 100000 paise on the server; request body price overrides are rejected.

The API accepts POST /api/bookings with Idempotency-Key set to a fresh UUID and a JSON body containing name, treatment (bridal/facial/hair/grooming) and startsAt as an ISO timestamp with offset. Chennai hours and the complete treatment duration are validated. Times start on a 15-minute grid, one hour to 180 days ahead.

The initial capacity is ONE exclusive salon resource for all treatments. Confirm the salon’s actual staffing/calendar before launch. The database rejects overlapping pending or confirmed bookings even under concurrent requests. Inserting the reservation commits before the Stripe call, and the Stripe idempotency key is derived from its durable UUID. Retry the same payload/key after network failure. A conflicting key/payload is rejected.

Stripe-hosted card Checkout is used; the app never handles card details. Only verified session state can confirm a booking. The webhook checks Stripe’s signature against the raw request body, retrieves the canonical session, checks INR/100000 and reservation identity, then applies an idempotent database transaction. Return-page query strings never confirm a booking.

Register this webhook endpoint with Stripe:

```text
https://YOUR_API_HOST/api/payments/webhook
```

Subscribe to checkout.session.completed, checkout.session.expired, checkout.session.async_payment_succeeded. Replace the hostname with your deployed API host. The default hosted Checkout expiry is 24 hours; pending reservations remain blocked until Stripe confirms expiry. Cancelling the browser checkout does not free an active payment link. Run the reconciliation command every minute in your scheduler:

```sh
npm run reconcile -w api
```

It repairs interrupted session creation and missed webhook transitions. A reservation with no recorded session after 23 hours is held for manual review rather than risking a second charge after Stripe’s idempotency window. Review these rows operationally. The job also removes expired sessions, invitations and rate-limit buckets. Monitor its failures and webhook delivery failures. Do not free pending rows by timestamp alone. A provider outage may temporarily retain a slot; this is intentional.

Refunds, disputes, rescheduling and cancellation decisions are handled by the owner in Stripe and the salon’s calendar. Automated refunds and a staff calendar UI are not implemented. Decide the published deposit/refund policy and operating process before accepting money. No live Stripe charge or payment was created during development.

## Bridal portal

The salon provisions a client and a 30-minute one-use invitation on the trusted server terminal. The portal uses an 8-hour HttpOnly SameSite=Strict cookie, Secure in production, and stores only hashes of tokens. Codes are entered in the portal form, never placed in URLs or browser storage.

```sh
npm run invite -w api -- "Client name"
```

The command prints the bride UUID and invitation code to the owner’s terminal. Deliver the code privately. To issue another invitation for the same bride, append her UUID; this revokes previous invitations and sessions:

```sh
npm run invite -w api -- "Client name" BRIDE_UUID
```

Update her notes and timeline with a local JSON file containing notes (string) and timeline (array of objects with time and detail strings):

```sh
npm run journal -w api -- BRIDE_UUID /private/path/journal.json
```

Replace BRIDE_UUID with the actual UUID produced by the invitation command. No client information is seeded or invented. Empty notes and timelines show truthful empty states.

Every image read/write/delete checks the authenticated bride. Only still JPEG/PNG/WebP up to 5 MB and 25 million pixels are accepted. Files are decoded, rotated, resized and re-encoded as WebP without original metadata. At most 30 references per bride. Originals are not retained. PRIVATE_UPLOAD_DIR must be an absolute private persistent disk path in production, outside the web root. Mount it only for the API, use encrypted disks/backups and restrict host access. Never use ephemeral Vercel storage for these files. Image responses are private/no-store, and uploads have random filenames. A crash can leave an inaccessible orphan file; include orphan cleanup and database/file backup consistency in operations.

For client data deletion, remove the bride’s private files using IDs from references_private, then delete her brides row; database records cascade. The owner must define and publish retention and deletion handling before real client data is collected. This is an invitation workflow, not self-service registration or an MFA identity provider.

## Motion and accessibility

The headline and image are server-rendered. R3F is imported after the first paint; no SSR canvas dependency. A photo remains underneath the canvas, including on context/render failure. Reduced motion, save-data, unsupported WebGL2 and low-memory devices use the static image. DPR is capped at 1.5. An intersection observer and visibility listener stop rendering off-screen and in hidden tabs.

GSAP animations have scoped cleanup; smooth scrolling and magnetic interactions are disabled on coarse pointers. Reduced-motion users get static readable content and native scrolling. Tabs support arrow/Home/End keys, focus states remain visible, the native cursor stays available, and errors use live regions. Automated checks cannot guarantee all real-device performance targets.

## Deploy

Frontend: create a NEW Vercel project rooted at advanced/web using Next.js. Set API_INTERNAL_URL to the HTTPS Express origin. Do not apply the old standalone page’s hash-based CSP to this different runtime. The included proxy issues a fresh nonce and a strict script CSP per request. HTML is dynamic/no-store so nonces are never reused through a page cache. A separate style-src-attr permission supports Framer Motion and R3F style attributes; it does not permit inline scripts. Check CSP violations on your actual host before launch. Configure your real frontend domain in APP_ORIGIN on the API.

API: build from advanced as the Docker context:

```sh
docker build -f api/Dockerfile -t abirami-api .
docker run --env-file api/.env -p 4000:4000 -v abirami-private:/data abirami-api
```

Supply production environment values privately, including NODE_ENV=production and PRIVATE_UPLOAD_DIR=/data. Terminate TLS at a trusted reverse proxy. Run migrations before serving traffic and run reconciliation from a scheduled worker with the same environment. Use a managed PostgreSQL database with verified TLS and backups; do not disable certificate verification.

The repo’s existing static Vercel project is not switched automatically. Live activation needs database provisioning, the owner’s payment account/policy, a persistent private upload disk, invitations, scheduled reconciliation and end-to-end Stripe sandbox testing.

## Verification

```sh
npm run check
npm run build
npm test
npm audit
```

The database concurrency test runs only with TEST_DATABASE_URL set to a disposable PostgreSQL database with extension privileges. On macOS: export TEST_DATABASE_URL='your test connection'; on PowerShell: $env:TEST_DATABASE_URL='your test connection'. Then run npm test. The test never uses DATABASE_URL implicitly.

Before taking deposits: test simultaneous overlapping requests, repeat idempotency keys, a successful card payment, declined card, closed/expired Checkout, duplicate and out-of-order webhooks, API timeout recovery, and unauthorized cross-client image access. Run a real phone GPU/motion test. No Lighthouse score or live financial certification is implied.
