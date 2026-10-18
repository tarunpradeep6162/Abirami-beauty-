# Abirami advanced architecture — complete code

## File tree

```text
advanced/.gitignore
advanced/README.md
advanced/VERIFICATION.md
advanced/api/.env.example
advanced/api/Dockerfile
advanced/api/package.json
advanced/api/sql/001.sql
advanced/api/src/bookings.mjs
advanced/api/src/config.mjs
advanced/api/src/db.mjs
advanced/api/src/invite.mjs
advanced/api/src/journal.mjs
advanced/api/src/migrate.mjs
advanced/api/src/payments.mjs
advanced/api/src/portal.mjs
advanced/api/src/reconcile.mjs
advanced/api/src/rules.mjs
advanced/api/src/security.mjs
advanced/api/src/server.mjs
advanced/api/test/database.test.mjs
advanced/api/test/rules.test.mjs
advanced/package-lock.json
advanced/package.json
advanced/scripts/assets.mjs
advanced/scripts/browser-qa.mjs
advanced/scripts/check-api.mjs
advanced/web/.env.example
advanced/web/app/book/page.tsx
advanced/web/app/bridal/page.tsx
advanced/web/app/globals.css
advanced/web/app/layout.tsx
advanced/web/app/page.tsx
advanced/web/components/BookingForm.tsx
advanced/web/components/BridalDashboard.tsx
advanced/web/components/FluidCanvas.tsx
advanced/web/components/Hero.tsx
advanced/web/components/MotionShell.tsx
advanced/web/components/Treatments.tsx
advanced/web/next-env.d.ts
advanced/web/next.config.mjs
advanced/web/package.json
advanced/web/postcss.config.mjs
advanced/web/proxy.ts
advanced/web/tsconfig.json
```

## advanced/.gitignore

````
node_modules/
.next/
.env*
!.env.example
private-uploads/
web/public/assets/
*.tsbuildinfo
qa-results/

````

## advanced/README.md

````md
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

````

## advanced/VERIFICATION.md

````md
# Verification · 18 October 2026

- Next.js 16.4.2 production build: passed (React 19.3.1).
- TypeScript and syntax checks for all API modules: passed.
- Five backend appointment/payment-rule tests: passed.
- PostgreSQL exclusion/concurrency integration test: included but skipped here; no runnable PostgreSQL service was available. The host disallowed starting the downloaded test database under a non-root identity.
- Five browser checks: passed. Layouts at 360, 768, 1280 and 1920; reduced-motion static hero; ordinary-motion render without uncaught errors; decoded local imagery; no horizontal overflow; automated WCAG AA checks; nonce CSP checks; portal keyboard tabs.
- Portal UI testing used mocked 401/session/journal responses. These do not verify real session issuance, database isolation or image storage.
- Production deposits disabled by default; no Stripe session or charge created. Live/test Stripe webhook flows need the owner’s configured account and a database.
- npm audit attempted: registry advisory endpoint returned HTTP 403. No clean-audit claim.
- Existing static website build and exact CSP verification: passed; root index.html unchanged.
- No physical-phone, Lighthouse or measured GPU performance claim.

Run the commands and pre-launch cases in README.md before activating financial or client-data operations.

````

## advanced/api/.env.example

````example
NODE_ENV=development
DATABASE_URL=postgresql://abirami:local-development-only@127.0.0.1:5432/abirami
APP_ORIGIN=http://localhost:3000
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PRIVATE_UPLOAD_DIR=./private-uploads
BOOKING_ENABLED=false
DEPOSIT_POLICY=
TRUST_PROXY_HOPS=0
PORT=4000

````

## advanced/api/Dockerfile

````
FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN npm ci --workspace api --omit=dev
COPY api/src ./api/src
COPY api/sql ./api/sql
RUN mkdir /data && chown node:node /data
WORKDIR /app/api
USER node
ENV NODE_ENV=production PRIVATE_UPLOAD_DIR=/data
EXPOSE 4000
CMD ["node","src/server.mjs"]

````

## advanced/api/package.json

````json
{
  "name": "api",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file=.env src/server.mjs",
    "start": "node --env-file=.env src/server.mjs",
    "check": "node ../scripts/check-api.mjs",
    "test": "node --test test/*.test.mjs",
    "migrate": "node --env-file=.env src/migrate.mjs",
    "invite": "node --env-file=.env src/invite.mjs",
    "journal": "node --env-file=.env src/journal.mjs",
    "reconcile": "node --env-file=.env src/reconcile.mjs"
  },
  "dependencies": {
    "express": "5.3.0",
    "pg": "8.16.3",
    "stripe": "23.0.0",
    "helmet": "8.1.0",
    "express-rate-limit": "8.1.0",
    "multer": "2.4.0",
    "sharp": "0.35.5",
    "zod": "4.1.12"
  }
}

````

## advanced/api/sql/001.sql

````sql
BEGIN;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE IF NOT EXISTS bookings (
 id uuid PRIMARY KEY,
 request_key uuid NOT NULL UNIQUE,
 request_hash text NOT NULL,
 client_name text NOT NULL,
 treatment text NOT NULL,
 resource text NOT NULL DEFAULT 'salon',
 starts_at timestamptz NOT NULL,
 ends_at timestamptz NOT NULL CHECK(ends_at>starts_at),
 state text NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','confirmed','expired','review')),
 checkout_id text UNIQUE,
 deposit integer NOT NULL DEFAULT 100000 CHECK(deposit=100000),
 created_at timestamptz NOT NULL DEFAULT now(),
 EXCLUDE USING gist (resource WITH =, tstzrange(starts_at,ends_at,'[)') WITH &&) WHERE (state IN ('pending','confirmed','review'))
);
CREATE TABLE IF NOT EXISTS payment_events (id text PRIMARY KEY, received_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS brides (
 id uuid PRIMARY KEY,
 name text NOT NULL,
 notes text NOT NULL DEFAULT '',
 timeline jsonb NOT NULL DEFAULT '[]' CHECK(jsonb_typeof(timeline)='array')
);
CREATE TABLE IF NOT EXISTS invitations (
 token_hash text PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 expires_at timestamptz NOT NULL,
 used_at timestamptz
);
CREATE TABLE IF NOT EXISTS portal_sessions (
 token_hash text PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS references_private (
 id uuid PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS request_limits (
 key text PRIMARY KEY,
 hits integer NOT NULL DEFAULT 1,
 expires_at timestamptz NOT NULL
);
COMMIT;

````

## advanced/api/src/bookings.mjs

````mjs
import { createHash,randomUUID } from 'node:crypto';
import { z } from 'zod';
import { transaction } from './db.mjs';
import { bookingInput,appointment } from './rules.mjs';
import { checkout,reconcileSession } from './payments.mjs';
import { digest } from './security.mjs';
import { config } from './config.mjs';
export async function createBooking(req,res){
 if(config.BOOKING_ENABLED!=='true')return res.status(503).json({error:'Online deposits are not enabled. Please book on WhatsApp.'});
 const key=z.uuid().parse(req.get('Idempotency-Key'));
 const input=bookingInput.parse(req.body);
 const hash=createHash('sha256').update(JSON.stringify(input)).digest('hex');
 let booking;
 try{booking=await transaction(async client=>{
  await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',[key]);
  const previous=await client.query('SELECT * FROM bookings WHERE request_key=$1',[key]);
  if(previous.rowCount){if(previous.rows[0].request_hash!==hash)throw Object.assign(new Error('Use a new request key when changing appointment details.'),{status:409});return previous.rows[0];}
  const limitKey=`booking:${digest(`${req.ip}:${Math.floor(Date.now()/3600000)}`)}`;
  const attempts=await client.query("INSERT INTO request_limits(key,expires_at) VALUES($1,now()+interval '1 hour') ON CONFLICT(key) DO UPDATE SET hits=request_limits.hits+1 RETURNING hits",[limitKey]);
  if(attempts.rows[0].hits>5)throw Object.assign(new Error('Please contact the salon before making another reservation.'),{status:429});
  const {starts,ends}=appointment(input);
  const result=await client.query('INSERT INTO bookings(id,request_key,request_hash,client_name,treatment,starts_at,ends_at) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[randomUUID(),key,hash,input.name,input.treatment,starts,ends]);
  return result.rows[0];
 });}catch(error){if(error.code==='23P01')return res.status(409).json({error:'That time overlaps another appointment. Please choose a different time.'});throw error;}
 if(booking.state!=='pending')return res.status(409).json({error:booking.state==='confirmed'?'This appointment is already paid. Please contact the salon.':'Please choose a new appointment.'});
 const session=await checkout(booking);
 await reconcileSession(session);
 if(session.status!=='open' || !session.url)return res.status(409).json({error:'This checkout is closed. Please contact the salon or choose a new time.'});
 res.status(201).json({bookingId:booking.id,checkoutUrl:session.url,deposit:100000,currency:'INR'});
}

````

## advanced/api/src/config.mjs

````mjs
import { z } from 'zod';
const httpsOrLocal=z.string().url().refine(value=>value.startsWith('https://') || (process.env.NODE_ENV!=='production' && /^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(value)),'Use HTTPS in production');
export const config=z.object({
 DATABASE_URL:z.string().min(1), APP_ORIGIN:httpsOrLocal.transform(value=>new URL(value).origin),
 STRIPE_SECRET_KEY:z.string().regex(/^sk_(test|live)_/), STRIPE_WEBHOOK_SECRET:z.string().startsWith('whsec_'),
 PRIVATE_UPLOAD_DIR:z.string().min(1), PORT:z.coerce.number().int().min(1024).default(4000),
 BOOKING_ENABLED:z.enum(['true','false']).default('false'), DEPOSIT_POLICY:z.string().default(''),
 TRUST_PROXY_HOPS:z.coerce.number().int().min(0).max(3).default(0)
}).parse(process.env);
if(config.BOOKING_ENABLED==='true' && config.DEPOSIT_POLICY.trim().length<60)throw new Error('Set the owner-approved deposit/cancellation policy before enabling bookings.');

````

## advanced/api/src/db.mjs

````mjs
import pg from 'pg';
import { config } from './config.mjs';
export const pool=new pg.Pool({ connectionString:config.DATABASE_URL,max:10,connectionTimeoutMillis:5000,statement_timeout:10000 });
pool.on('error',()=>console.error('PostgreSQL pool connection error'));
export async function transaction(work){const client=await pool.connect();try{await client.query('BEGIN');const result=await work(client);await client.query('COMMIT');return result;}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}}

````

## advanced/api/src/invite.mjs

````mjs
import { randomBytes,randomUUID } from 'node:crypto';
import { z } from 'zod';
import { transaction,pool } from './db.mjs';
import { digest } from './security.mjs';
const name=z.string().trim().min(2).max(80).parse(process.argv[2]);
const bride=process.argv[3]?z.uuid().parse(process.argv[3]):randomUUID();
const code=randomBytes(32).toString('hex');
try{await transaction(async client=>{
 await client.query('INSERT INTO brides(id,name) VALUES($1,$2) ON CONFLICT(id) DO NOTHING',[bride,name]);
 await client.query('DELETE FROM invitations WHERE bride_id=$1',[bride]);
 await client.query('DELETE FROM portal_sessions WHERE bride_id=$1',[bride]);
 await client.query("INSERT INTO invitations(token_hash,bride_id,expires_at) VALUES($1,$2,now()+interval '30 minutes')",[digest(code),bride]);
});console.log(`Bride ID: ${bride}\nOne-use code (30 minutes; share privately): ${code}`);}finally{await pool.end();}

````

## advanced/api/src/journal.mjs

````mjs
import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { pool } from './db.mjs';
const id=z.uuid().parse(process.argv[2]);
const journal=z.object({notes:z.string().max(12000),timeline:z.array(z.object({time:z.string().min(1).max(40),detail:z.string().min(1).max(400)}).strict()).max(40)}).strict().parse(JSON.parse(await readFile(process.argv[3],'utf8')));
try{const result=await pool.query('UPDATE brides SET notes=$2,timeline=$3 WHERE id=$1',[id,journal.notes,JSON.stringify(journal.timeline)]);if(!result.rowCount)throw new Error('Bride not found');console.log('Private journal updated.');}finally{await pool.end();}

````

## advanced/api/src/migrate.mjs

````mjs
import { readFile } from 'node:fs/promises';
import { pool } from './db.mjs';
try{await pool.query(await readFile(new URL('../sql/001.sql',import.meta.url),'utf8'));console.log('Database schema ready.');}finally{await pool.end();}

````

## advanced/api/src/payments.mjs

````mjs
import Stripe from 'stripe';
import { config } from './config.mjs';
import { pool,transaction } from './db.mjs';
import { treatments,sessionOutcome } from './rules.mjs';
export const stripe=new Stripe(config.STRIPE_SECRET_KEY,{maxNetworkRetries:2,timeout:15000});
export async function checkout(booking){
 if(booking.checkout_id)return stripe.checkout.sessions.retrieve(booking.checkout_id);
 // Keep the request deterministic so a timeout can be retried safely.
 if(Date.now()-new Date(booking.created_at).getTime()>23*3600000){await pool.query("UPDATE bookings SET state='review' WHERE id=$1 AND state='pending'",[booking.id]);throw Object.assign(new Error('This reservation needs salon review. Please contact us.'),{status:409});}
 const session=await stripe.checkout.sessions.create({mode:'payment',payment_method_types:['card'],line_items:[{quantity:1,price_data:{currency:'inr',unit_amount:100000,product_data:{name:`Abirami · ${treatments[booking.treatment].name} deposit`}}}],client_reference_id:booking.id,metadata:{bookingId:booking.id},payment_intent_data:{metadata:{bookingId:booking.id}},success_url:`${config.APP_ORIGIN}/book?payment=processing`,cancel_url:`${config.APP_ORIGIN}/book?payment=cancelled`,custom_text:{submit:{message:config.DEPOSIT_POLICY.slice(0,1000)}}},{idempotencyKey:`booking:${booking.id}`});
 await pool.query('UPDATE bookings SET checkout_id=$2 WHERE id=$1 AND (checkout_id IS NULL OR checkout_id=$2)',[booking.id,session.id]);
 return session;
}
export async function reconcileSession(session,eventId){
 const outcome=sessionOutcome(session);if(!outcome)return;
 if(session.amount_total!==100000 || session.currency!=='inr' || !session.metadata?.bookingId)throw new Error('Payment metadata or amount mismatch');
 await transaction(async client=>{
  if(eventId){const event=await client.query('INSERT INTO payment_events(id) VALUES($1) ON CONFLICT DO NOTHING RETURNING id',[eventId]);if(!event.rowCount)return;}
  const result=await client.query('SELECT * FROM bookings WHERE id=$1 FOR UPDATE',[session.metadata.bookingId]);
  const booking=result.rows[0];if(!booking)throw new Error('Payment has no durable reservation');
  if(booking.checkout_id && booking.checkout_id!==session.id)throw new Error('Checkout does not belong to reservation');
  if(outcome==='confirmed' && booking.state==='expired')throw new Error('Late payment needs manual reconciliation');
  if(booking.state!=='confirmed')await client.query('UPDATE bookings SET state=$2,checkout_id=$3 WHERE id=$1',[booking.id,outcome,session.id]);
 });
}
export async function webhook(req,res){
 let event;try{event=stripe.webhooks.constructEvent(req.body,req.get('stripe-signature'),config.STRIPE_WEBHOOK_SECRET);}catch{return res.status(400).json({error:'Invalid webhook signature.'});}
 if(['checkout.session.completed','checkout.session.expired','checkout.session.async_payment_succeeded'].includes(event.type)){
  const session=await stripe.checkout.sessions.retrieve(event.data.object.id);
  await reconcileSession(session,event.id);
 }
 res.json({received:true});
}

````

## advanced/api/src/portal.mjs

````mjs
import { randomBytes,randomUUID } from 'node:crypto';
import { mkdir,writeFile,unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import multer from 'multer';
import sharp from 'sharp';
import { z } from 'zod';
import { config } from './config.mjs';
import { pool,transaction } from './db.mjs';
import { digest,cookieOptions } from './security.mjs';
export const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024,files:1,fields:0,parts:1}}).single('image');
export async function login(req,res){
 const {token}=z.object({token:z.string().regex(/^[a-f0-9]{64}$/)}).strict().parse(req.body);
 const session=randomBytes(32).toString('hex');
 const found=await transaction(async client=>{
  const invite=await client.query('UPDATE invitations SET used_at=now() WHERE token_hash=$1 AND expires_at>now() AND used_at IS NULL RETURNING bride_id',[digest(token)]);
  if(!invite.rowCount)return false;
  await client.query("INSERT INTO portal_sessions(token_hash,bride_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(session),invite.rows[0].bride_id]);return true;
 });
 if(!found)return res.status(401).json({error:'That invitation is invalid, used or expired. Ask the salon for a new one.'});
 res.cookie('abirami_session',session,cookieOptions).json({signedIn:true});
}
export async function logout(req,res){const token=(req.get('cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('abirami_session='))?.slice(16);if(token)await pool.query('DELETE FROM portal_sessions WHERE token_hash=$1',[digest(token)]);res.clearCookie('abirami_session',{...cookieOptions,maxAge:undefined}).json({signedOut:true});}
export async function journal(req,res){const [bride,images]=await Promise.all([pool.query('SELECT name,notes,timeline FROM brides WHERE id=$1',[req.brideId]),pool.query('SELECT id FROM references_private WHERE bride_id=$1 ORDER BY created_at DESC',[req.brideId])]);res.json({...bride.rows[0],images:images.rows});}
export async function addImage(req,res){
 if(!req.file)return res.status(422).json({error:'Choose a JPEG, PNG or WebP image.'});
 const source=sharp(req.file.buffer,{limitInputPixels:25000000,animated:false});
 let metadata;try{metadata=await source.metadata();}catch{return res.status(422).json({error:'That file could not be read as an image.'});}
 if(!['jpeg','png','webp'].includes(metadata.format)||metadata.pages>1)return res.status(422).json({error:'Please use a still JPEG, PNG or WebP image.'});
 let bytes;try{bytes=await source.rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();}catch{return res.status(422).json({error:'That image could not be decoded. Please save a new JPEG, PNG or WebP copy.'});}
 const id=randomUUID();const file=resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`);
 await mkdir(config.PRIVATE_UPLOAD_DIR,{recursive:true,mode:0o700});
 try{await transaction(async client=>{
  await client.query('SELECT id FROM brides WHERE id=$1 FOR UPDATE',[req.brideId]);
  const count=await client.query('SELECT count(*)::int AS count FROM references_private WHERE bride_id=$1',[req.brideId]);
  if(count.rows[0].count>=30)throw Object.assign(new Error('Your journal holds up to 30 references. Remove one before adding another.'),{status:422});
  await writeFile(file,bytes,{flag:'wx',mode:0o600});
  await client.query('INSERT INTO references_private(id,bride_id) VALUES($1,$2)',[id,req.brideId]);
 });}catch(error){await unlink(file).catch(()=>{});throw error;}
 res.status(201).json({id});
}
export async function getImage(req,res){const id=z.uuid().parse(req.params.id);const result=await pool.query('SELECT id FROM references_private WHERE id=$1 AND bride_id=$2',[id,req.brideId]);if(!result.rowCount)return res.status(404).json({error:'Reference not found.'});res.type('webp').sendFile(resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`));}
export async function removeImage(req,res){const id=z.uuid().parse(req.params.id);const result=await pool.query('DELETE FROM references_private WHERE id=$1 AND bride_id=$2 RETURNING id',[id,req.brideId]);if(!result.rowCount)return res.status(404).json({error:'Reference not found.'});await unlink(resolve(config.PRIVATE_UPLOAD_DIR,`${id}.webp`)).catch(error=>{if(error.code!=='ENOENT')throw error;});res.json({removed:true});}

````

## advanced/api/src/reconcile.mjs

````mjs
import { pool } from './db.mjs';
import { checkout,reconcileSession } from './payments.mjs';
try{
 const result=await pool.query("SELECT * FROM bookings WHERE state='pending' ORDER BY created_at LIMIT 100");
 for(const booking of result.rows){try{const session=await checkout(booking);await reconcileSession(session);}catch{console.error('Reservation needs retry or review:',booking.id);}}
 await pool.query('DELETE FROM request_limits WHERE expires_at<now()');
 await pool.query('DELETE FROM portal_sessions WHERE expires_at<now()');
 await pool.query('DELETE FROM invitations WHERE expires_at<now()');
}finally{await pool.end();}

````

## advanced/api/src/rules.mjs

````mjs
import { z } from 'zod';
export const treatments=Object.freeze({bridal:{name:'Bridal Couture',minutes:210},facial:{name:'Botanical Facial',minutes:60},hair:{name:'Hair & Scalp Ritual',minutes:75},grooming:{name:'Precision Grooming',minutes:45}});
export const bookingInput=z.object({name:z.string().trim().min(2).max(80).regex(/^[^\p{Cc}\p{Cf}]+$/u),treatment:z.enum(['bridal','facial','hair','grooming']),startsAt:z.iso.datetime({offset:true})}).strict();
export function appointment(input,now=Date.now()){
 const starts=new Date(input.startsAt);const ends=new Date(starts.getTime()+treatments[input.treatment].minutes*60000);
 if(starts.getTime()<now+60*60000 || starts.getTime()>now+180*86400000)throw Object.assign(new Error('Choose a time at least one hour ahead and within 180 days.'),{status:422});
 const local=new Date(starts.getTime()+330*60000);const localEnd=new Date(ends.getTime()+330*60000);
 const minutes=local.getUTCHours()*60+local.getUTCMinutes();const endMinutes=localEnd.getUTCHours()*60+localEnd.getUTCMinutes();
 const close=local.getUTCDay()===0?990:1230;
 if(minutes<600 || endMinutes>close || local.toISOString().slice(0,10)!==localEnd.toISOString().slice(0,10) || minutes%15!==0 || starts.getUTCSeconds()!==0 || starts.getUTCMilliseconds()!==0)throw Object.assign(new Error('Choose a 15-minute start within salon hours, with enough time for the full treatment. Sunday closes at 4:30 PM.'),{status:422});
 return {starts,ends};
}
export const sessionOutcome=session=>session.payment_status==='paid' && session.status==='complete'?'confirmed':session.status==='expired'?'expired':null;

````

## advanced/api/src/security.mjs

````mjs
import { createHash } from 'node:crypto';
import { pool } from './db.mjs';
import { config } from './config.mjs';
export const digest=value=>createHash('sha256').update(value).digest('hex');
export function originGuard(req,res,next){if(['GET','HEAD','OPTIONS'].includes(req.method)||req.get('origin')===config.APP_ORIGIN)return next();res.status(403).json({error:'Request origin is not allowed.'});}
export async function databaseLimit(req,res,next){
 const bucket=digest(`${req.ip}:${Math.floor(Date.now()/60000)}`);
 const result=await pool.query("INSERT INTO request_limits(key,expires_at) VALUES($1,now()+interval '2 minutes') ON CONFLICT(key) DO UPDATE SET hits=request_limits.hits+1 RETURNING hits",[bucket]);
 if(result.rows[0].hits>25)return res.status(429).json({error:'Please wait a minute before trying again.'});next();
}
export async function authenticated(req,res,next){
 const cookie=req.get('cookie')||'';const token=cookie.split(';').map(part=>part.trim()).find(part=>part.startsWith('abirami_session='))?.slice('abirami_session='.length);
 if(!token||!/^[a-f0-9]{64}$/.test(token))return res.status(401).json({error:'Please open your private invitation.'});
 const result=await pool.query('SELECT bride_id FROM portal_sessions WHERE token_hash=$1 AND expires_at>now()',[digest(token)]);
 if(!result.rowCount)return res.status(401).json({error:'Your session has ended. Ask the salon for a new invitation.'});
 req.brideId=result.rows[0].bride_id;next();
}
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/api',maxAge:8*3600000};

````

## advanced/api/src/server.mjs

````mjs
import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { ZodError } from 'zod';
import multer from 'multer';
import { config } from './config.mjs';
import { pool } from './db.mjs';
import { createBooking } from './bookings.mjs';
import { webhook } from './payments.mjs';
import { originGuard,databaseLimit,authenticated } from './security.mjs';
import { login,logout,journal,upload,addImage,getImage,removeImage } from './portal.mjs';
const app=express();
app.disable('x-powered-by');app.set('trust proxy',config.TRUST_PROXY_HOPS);
app.use(helmet());
app.post('/api/payments/webhook',express.raw({type:'application/json',limit:'256kb'}),webhook);
app.use('/api',(_req,res,next)=>{res.set('Cache-Control','private, no-store');next();});
app.use('/api',rateLimit({windowMs:60000,limit:100,standardHeaders:'draft-8',legacyHeaders:false}),originGuard,databaseLimit,express.json({limit:'8kb'}));
app.post('/api/bookings',createBooking);
app.post('/api/portal/session',login);
app.delete('/api/portal/session',logout);
app.get('/api/portal',authenticated,journal);
app.post('/api/portal/images',authenticated,upload,addImage);
app.get('/api/portal/images/:id',authenticated,getImage);
app.delete('/api/portal/images/:id',authenticated,removeImage);
app.use((_req,res)=>res.status(404).json({error:'Not found.'}));
app.use((error,_req,res,_next)=>{
 if(error instanceof ZodError)return res.status(422).json({error:'Please check your name, treatment and appointment details.'});
 if(error instanceof multer.MulterError)return res.status(422).json({error:'Choose one image up to 5 MB.'});
 if(error.type==='entity.too.large')return res.status(413).json({error:'Request is too large.'});
 if(error instanceof SyntaxError)return res.status(400).json({error:'Request could not be read.'});
 if(error.code==='ENOENT')return res.status(404).json({error:'Reference not found.'});
 if(error.status)return res.status(error.status).json({error:error.message});
 console.error('API request failed',{code:error.code||error.type||'unknown'});
 res.status(503).json({error:'We could not complete this request. Please retry with the same details or contact the salon.'});
});
const server=app.listen(config.PORT,'0.0.0.0',()=>console.log(`Abirami API listening on ${config.PORT}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{server.close(()=>{void pool.end().then(()=>process.exit(0));});setTimeout(()=>process.exit(1),10000).unref();});

````

## advanced/api/test/database.test.mjs

````mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { readFile } from 'node:fs/promises';
test('concurrent overlapping reservations: one succeeds, adjacent slot succeeds',{skip:!process.env.TEST_DATABASE_URL},async()=>{
 const pool=new pg.Pool({connectionString:process.env.TEST_DATABASE_URL});
 try{await pool.query(await readFile(new URL('../sql/001.sql',import.meta.url),'utf8'));const resource=`test-${randomUUID()}`;
 const insert=(start,end)=>pool.query('INSERT INTO bookings(id,request_key,request_hash,client_name,treatment,resource,starts_at,ends_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[randomUUID(),randomUUID(),'test','Test Client','facial',resource,start,end]);
 try{const results=await Promise.allSettled([insert('2030-01-01T10:00Z','2030-01-01T11:00Z'),insert('2030-01-01T10:30Z','2030-01-01T11:30Z')]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);const rejected=results.find(r=>r.status==='rejected');assert.equal(rejected.reason.code,'23P01');const adjacent=results[0].status==='fulfilled'?'2030-01-01T11:00Z':'2030-01-01T11:30Z';await insert(adjacent,'2030-01-01T12:30Z');}finally{await pool.query('DELETE FROM bookings WHERE resource=$1',[resource]);}
 }finally{await pool.end();}
});

````

## advanced/api/test/rules.test.mjs

````mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appointment,bookingInput,sessionOutcome } from '../src/rules.mjs';
const now=Date.parse('2026-10-19T00:00:00Z');
test('full bridal duration must fit before weekday closing',()=>{
 assert.doesNotThrow(()=>appointment({treatment:'bridal',startsAt:'2026-10-20T17:00:00+05:30'},now));
 assert.throws(()=>appointment({treatment:'bridal',startsAt:'2026-10-20T17:15:00+05:30'},now));
});
test('Sunday closes at 16:30, accepts any treatment that fits',()=>{
 assert.doesNotThrow(()=>appointment({treatment:'facial',startsAt:'2026-10-25T15:30:00+05:30'},now));
 assert.throws(()=>appointment({treatment:'facial',startsAt:'2026-10-25T15:45:00+05:30'},now));
});
test('rejects past, overnight, off-grid and excessively distant slots',()=>{
 for(const startsAt of ['2026-10-18T11:00:00+05:30','2026-10-20T23:00:00+05:30','2026-10-20T11:07:00+05:30','2027-10-20T11:00:00+05:30'])assert.throws(()=>appointment({treatment:'hair',startsAt},now));
});
test('cannot submit amount overrides, unknown treatment or controls',()=>{
 for(const input of [{name:'Client',treatment:'bridal',startsAt:'2026-10-20T11:00:00Z',amount:1},{name:'Client',treatment:'other',startsAt:'2026-10-20T11:00:00Z'},{name:'A\u0000B',treatment:'bridal',startsAt:'2026-10-20T11:00:00Z'}])assert.equal(bookingInput.safeParse(input).success,false);
});
test('only verified complete paid sessions confirm, not redirects',()=>{
 assert.equal(sessionOutcome({payment_status:'unpaid',status:'complete'}),null);
 assert.equal(sessionOutcome({payment_status:'paid',status:'complete'}),'confirmed');
 assert.equal(sessionOutcome({payment_status:'unpaid',status:'expired'}),'expired');
});

````

## advanced/package-lock.json

````json
{
  "name": "abirami-flagship",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "abirami-flagship",
      "workspaces": [
        "web",
        "api"
      ],
      "devDependencies": {
        "@axe-core/playwright": "4.14.0",
        "@playwright/test": "1.64.1"
      }
    },
    "api": {
      "dependencies": {
        "express": "5.3.0",
        "express-rate-limit": "8.1.0",
        "helmet": "8.1.0",
        "multer": "2.4.0",
        "pg": "8.16.3",
        "sharp": "0.35.5",
        "stripe": "23.0.0",
        "zod": "4.1.12"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
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
    "node_modules/@babel/runtime": {
      "version": "7.29.10",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.10.tgz",
      "integrity": "sha512-NpugTzbKgGrNe45Ui32cN8vCFFMxVtP/9rtfwv0nP5FRDAjvYBxJcLVpYA9mr1jxP6cnIT7x9LUzuDTbWYYNRA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@dimforge/rapier3d-compat": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/@dimforge/rapier3d-compat/-/rapier3d-compat-0.12.0.tgz",
      "integrity": "sha512-uekIGetywIgopfD97oDL5PfeezkFpNhwlzlaEYNOA0N6ghdsOvh/HYjSMek5Q2O1PYvRSDFcqFVJl4r4ZBwOow==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",
      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.5.tgz",
      "integrity": "sha512-QRUlFQ0WxvdWyqqG/WtI3iupfD5rBzmCHXSdPsY91sAtVtTo7Q4cb6zOccZ3gqEqkr0f1As1ehLqmEpDsRf+lg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.5.tgz",
      "integrity": "sha512-+BR255RhDlpygUpOc/Jdt1nT6DQ3XG/ERo5wbcdOf5Q320dKtPCKPLR1LJs9VGXRaMa8l1uUa0tkCNOXiAxZUw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-freebsd-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.5.tgz",
      "integrity": "sha512-Y/z91nEZ4uIBX5X3nfTovjU9lHNKFYbL2lpHCLVNmXQK03VIZvXBBt0KxbPGp2SdGSF+2mQU4e+hQaWOt86iAw==",
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.4.tgz",
      "integrity": "sha512-5R89nBYiRdUlSWJxPhO+GVtaXzXSxKnRu/xqMn3KTA3L9EB9Oy/P+Nn2f2vlhPuUdy/Zusb2DarbyTpGCfEDuw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.4.tgz",
      "integrity": "sha512-iR2OKH80yi0U+dUplyh3/xdpFvps6YkCwsXenIJxqxR1v9o+xtKTGbS9H7cps+2Vxjc8B1j96p75NmTGjIhtpQ==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.4.tgz",
      "integrity": "sha512-LmRtTsOHuvM2+wlO2Db37dx5MiZhB0FvSunciw48YjdOkZz9KAiRbm8ujeMOA1INqmei5NapFxYEK1D1ZSidmw==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.4.tgz",
      "integrity": "sha512-Y3dgX/6lE2QhQb+Gxy0WZxfg9MEm/JBjamZpS2IklP7xIQoKN4hzAm7KcMVGtaVDt3neE9OKBC7vAfonA/Lr1A==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.4.tgz",
      "integrity": "sha512-Le6boB8Tai0Nis+gIxIpKx68UDVVIqdR8Tin5Yf1z2LJJQLDJvCDRqRu+jC2qCoD+eIomonmOwB4smBRxfVpYQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.4.tgz",
      "integrity": "sha512-aHkkIEHPRdQEegJN20MLmGtxYD9R2wQr3Cwpddnu5+YKMt6Uzax7S9h5gpZTo8wyrGuZSlfQ63OevL5mTyOC7Q==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.4.tgz",
      "integrity": "sha512-ra/mB6MikESDUO7Yg+Mi95bFBb9GsObURuhnOv3OqknjGe9sZrG8tCe9q0xSIGrtLgvgw0gKnFWcK4blSgQOuQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.4.tgz",
      "integrity": "sha512-GJ//SSXbnwSDes02umB3nDJLFcQzw8a18V8fyhqr6tV515tOEMdImjjxj1AoafMRz56F3PHgftnj1QEKSU1zkw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.4.tgz",
      "integrity": "sha512-hvulFwtjUcagsis6BBxHwGFwWoNZjgYmULGVrZcyfNbjA8hKILbRxGg15/7w5HDyXHXUos/j6baAWqnCyQ2DWA==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.4.tgz",
      "integrity": "sha512-6zXKeE/p39I1AmA3cJG35eyBGNqNddLnUXjhwBnsGjFPWqf5VKkDBEqaEkPDoTEtkxwi2vv8Tcr2mDyP4So7Fg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.5.tgz",
      "integrity": "sha512-LEaXK2WdXVK5ykcw0buWyPMsmLLL2vpHLD6yrNSW+JGEL3BZPA4tpKN6iaMc4AxTTAoaX/sU1rOL51lcIz48ZQ==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.5.tgz",
      "integrity": "sha512-LYVx5JTsOM2CBzmxreh+nl64/3H6Xb09iSLknqH47z2T2DFFxDeFLP5y4dJwe6H7uGQlHPyEEtIqyo3DYsRwdQ==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.5.tgz",
      "integrity": "sha512-QVxAAq8evVRI9ia2vqgwrmWucn5Dfv+JdWzj75pD8omHLPSP7f8p20O8jxzjCcuCEQEOtYOZUmX1hkiZ0kdevA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.5.tgz",
      "integrity": "sha512-LtdreXguaavKODPIfzJ4kffx7UNt1omwtK0rch4EBbbSTXPnxWmYSayXdLJw0fJzQ97kHt1gL/yh4tvU+nCyRQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.5.tgz",
      "integrity": "sha512-UZasTOFiYzotTsGOCu42BfUzP6Tu6Do/947iRm1RsLKvlllxwGcn4RN27LibGWceix4Y+Pmw3jsnTcCQIgWjqA==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.5.tgz",
      "integrity": "sha512-SxFtLTeJInhAA9Q836kux2vZNeOBQEx658qvbboZScr0wIARym3IcGmW7KpVD5sbVg0Ojy+udFQdayYIZyoNog==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.5.tgz",
      "integrity": "sha512-9HbMclmI1zlNkFRs3z9/eBtDjfD0sGlrX1z6b1qwmiFY5ElDLh4BC0LPBdVp7z1DXFiKlIcznf+ZlsuZzLxQqg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.5.tgz",
      "integrity": "sha512-4KOphqB035HrVdqLZfCgMzzERrQkkzOwRhl4OAkRO1YCldbaFjySXMaK534Mo0V+LndnlJk+sbUyLeU0ULyD1A==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.5.tgz",
      "integrity": "sha512-Ptsga1su4tQx+LLF1ECS9U6nz5kmrXKo6XVbtR48Ke3ZRxxgaWBu7IDtEe1quo8hiupwm6WFqxVlXaSf7IINGQ==",
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.11.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-webcontainers-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.5.tgz",
      "integrity": "sha512-hfhF/FmoQyTUkA0bIKFOtw536BQSeBMe6BF6QyWlrPxT754+TFLaZ7sKKTfvvM0yJgKgaYTwnFCIZ/GuDw5SUA==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.5.tgz",
      "integrity": "sha512-X4t7g+7ZA5DKblCBEXGjUqqemj4vczING/5viFwAL8h4N3qYeyjwdCvRLHi4EdOUI+2Z7UFlp1VM+p/AuEtm6Q==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.5.tgz",
      "integrity": "sha512-5Zm82LoBc43nhwNybZlG7Y1KO//Zhsn306fQl29ZOuStHLGTo3BWL83q3cznX0poxSAMuYL1On/BHBxkBeKr6A==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.5.tgz",
      "integrity": "sha512-x76eH0vEiHlcMQu8Y8IenntaACtddpT6W0wmXtWrnKcnKI7ME5DdgqhAD6SEWOEl1v2zDvkZDhFA9KnURwpfqg==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@next/env": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-16.4.2.tgz",
      "integrity": "sha512-nTUTFH7G5/J/fmpkjVLegOkqyKOP0CEsJcMsyO4UCYeN1su+YMW/MfaSErnJskL7XM+UDK6aTvslxsRCyya/sA==",
      "license": "MIT"
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.4.2.tgz",
      "integrity": "sha512-ONkhFvZNFWlsEHOM/81AtxdyuJP2KRYKYR0JxPwvcu1AuPMMMgcL+wW2luldJvMtZwKtUxoSkCychW5wIeoYSw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-16.4.2.tgz",
      "integrity": "sha512-luPCMbOsCoaF+kXJEUjmjmOZg1lC3BflhmUu+ZmW4tBu2vW/4AXak8JBFvePizGkxVmNiAw/r9ra+6UviCWtWQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.4.2.tgz",
      "integrity": "sha512-xhwFTAncJyaCNy5KqKKuKaIIdCy1/1ZV1s5S1G0hhT7wGMkDTlfJ6aQbfRFnIG/s3/kDrxQ8aycVe+c5QnP8ow==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.4.2.tgz",
      "integrity": "sha512-T1PNmfbPcxr5ndtWUL/3wQtLXsz808lq6sc2GrNT5k2oquF7UyqZddHSuAewHVsWsGXe6nsl9HoN1YNriVjuSg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.4.2.tgz",
      "integrity": "sha512-N9cDUOCGtkJG5PNKDFZUF3xXndrJJcpLp121uAGjIGvO/U2p9tfdNOM9htj7+5f72l0m8rMw/cvYacUJBQoudg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.4.2.tgz",
      "integrity": "sha512-yY2uh1YhX6ufuYy2FCbw1dqblbhI57GLYAJfCkqD9auTv6pLrH67Uccjc3QMKBeCYAG6lkgu08ExmX1bbjejjQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.4.2.tgz",
      "integrity": "sha512-j/ArWRIHpMMB6wYLMhr2puTguBt70lNU/Cmjl9p6dTDE8DGknYJMP9PdwPk2dqpCNL/KIX9yfngDvIesxJPmsg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.4.2.tgz",
      "integrity": "sha512-AA4edyWHDko3NCSo0x6GomsdgFb0oR1J3MXU1b5xt6FRFg4AucrMPW3S0hCe/9onU0O1BbpGQBsqo1r0Gneu1g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@playwright/test": {
      "version": "1.64.1",
      "resolved": "https://registry.npmjs.org/@playwright/test/-/test-1.64.1.tgz",
      "integrity": "sha512-IaYGml/nSOiZWROfPtuIL7neuu9qDOZ3TNvNljUIrhDMxiGTgPjzj/g9p9RxpS2tSepPDRY+UwAaEeiKtUvIAg==",
      "devOptional": true,
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
    "node_modules/@react-three/fiber": {
      "version": "9.8.2",
      "resolved": "https://registry.npmjs.org/@react-three/fiber/-/fiber-9.8.2.tgz",
      "integrity": "sha512-6s0ejw0bT1myQ/aLLugcil8/zBmNnnHw/AISWF1yfDLOxfX3yYaTS+0IkpJITEnm/SSMLtxje6CJDt0i5Wu1Sw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.17.8",
        "@types/webxr": "*",
        "base64-js": "^1.5.1",
        "buffer": "^6.0.3",
        "its-fine": "^2.1.1",
        "react-use-measure": "^2.1.7",
        "scheduler": "^0.28.0",
        "suspend-react": "^0.1.3",
        "use-sync-external-store": "^1.4.0",
        "zustand": "^5.0.3"
      },
      "peerDependencies": {
        "expo": ">=43.0",
        "expo-asset": ">=8.4",
        "expo-file-system": ">=11.0",
        "expo-gl": ">=11.0",
        "react": ">=19 <19.4",
        "react-dom": ">=19 <19.4",
        "react-native": ">=0.78",
        "three": ">=0.156"
      },
      "peerDependenciesMeta": {
        "expo": {
          "optional": true
        },
        "expo-asset": {
          "optional": true
        },
        "expo-file-system": {
          "optional": true
        },
        "expo-gl": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        }
      }
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.23",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.23.tgz",
      "integrity": "sha512-5lSsMOTXURePglDfvuAQUqkGek9Hg2kksOYay2m0+XR++b2NWYL/4sWyuvVBIs8oKnJaxkdi9whaL/sqN13afw==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.3.3.tgz",
      "integrity": "sha512-JTSZZGQi1AyKirbLN3azmjVzef92tcX7h+iSqPdaeStyFpGpDlKvvpxeOE8njhbUanbRwr3z8DyzhICWnMtQeg==",
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "postcss": "^8.5.16",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tweenjs/tween.js": {
      "version": "23.1.3",
      "resolved": "https://registry.npmjs.org/@tweenjs/tween.js/-/tween.js-23.1.3.tgz",
      "integrity": "sha512-vJmvvwFxYuGnF2axRtPYocag6Clbb5YS7kLL+SO/TeVFzHqDIWrNKYtcsPMibjDx9O+bu+psAy9NKfWklassUA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.19.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.19.2.tgz",
      "integrity": "sha512-93d49wCWJkCyN87MxLpNN6KXPCwFw7bVUg79mGUV1OS40JGWwVCr8n61DXCSqz7CV6/VfPkb7xec7uP2M+QHWQ==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": ">=7.24.0 <7.24.7"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/react-reconciler": {
      "version": "0.28.9",
      "resolved": "https://registry.npmjs.org/@types/react-reconciler/-/react-reconciler-0.28.9.tgz",
      "integrity": "sha512-HHM3nxyUZ3zAylX8ZEyrDNd2XZOnQ0D5XfunJF5FLQnZbHHYq4UWvW1QfelQNXv1ICNkwYhfxjwfnqivYB6bFg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*"
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
      "license": "MIT"
    },
    "node_modules/@webgpu/types": {
      "version": "0.1.74",
      "resolved": "https://registry.npmjs.org/@webgpu/types/-/types-0.1.74.tgz",
      "integrity": "sha512-lgiI4hbuLcI9unnm2cL/tvCaQU45dp0xcLWJh5uB/9MBGvIA4F8XIk7nSiBeg+K4xWGYwgZKn80LmERI5CxoTA==",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/api": {
      "resolved": "api",
      "link": true
    },
    "node_modules/append-field": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-field/-/append-field-1.0.0.tgz",
      "integrity": "sha512-klpgFSWLW1ZEs8svjfb7g4qWY0YS5imI82dTg+QahUvJ8YqAY0P10Uk8tTyh9ZGuYEZEMaeJYCF5BFuX552hsw==",
      "license": "MIT"
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
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.29",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.29.tgz",
      "integrity": "sha512-YeesxhUmR4h5y5V8KF8iBCqJb8YFrBJ++XBTeGcWIaQOYXGN19JM0FoiOjAhwuDoln8owMgXcWBmgHtYSkky2w==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/body-parser": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.3.0.tgz",
      "integrity": "sha512-2cGmJupaNgg+QUwVLAucDuWuoMZ6EX9iHDRswZ5lsNYEmwPaRknMPCLZz07yTzVq/83p4o/wzbDZbBrTvGGTIw==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^2.0.0",
        "debug": "^4.4.3",
        "http-errors": "^2.0.1",
        "iconv-lite": "^0.7.2",
        "on-finished": "^2.4.1",
        "qs": "^6.15.2",
        "raw-body": "^3.0.2",
        "type-is": "^2.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/buffer": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
      "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.2.1"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001816",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001816.tgz",
      "integrity": "sha512-+8Yx7BXCoqk6IF8yTicjfUR6D/ldJzdlsodlEOiOSPmhK844WIgk67/zIQaGAOxNkZyyvBlrRFnLvqKIoqbAFw==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/content-disposition": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-2.0.1.tgz",
      "integrity": "sha512-e+H0ZXHSWYrENhQzw1LPuP4oF5MzVKmDU6d3hxlvaPEYLLg62MxtQNPRx4SYSuYJSBUgnQIG4HIN2tEtNv7Dog==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-2.1.0.tgz",
      "integrity": "sha512-mj7UPXE0jaqaOsukNZRUEfEi2AcL7C/vwmwcHV0O97eO1E1pxBZuyjlZrx5seTaNBg1U6+o35wpa35Qfcc+7ag==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.26.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.26.0.tgz",
      "integrity": "sha512-9vhedylFonb2YGogzUKX6+Ja72gOJbN1QHAqdrvqLwhdl/QWbKopzoUC9EbQNVsAns/bx/4uyqalrQAoy1IByw==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/express/-/express-5.3.0.tgz",
      "integrity": "sha512-qCqy1xSoaugxOD4IVHb1ZWdkvCF2W3aE2okKouWj8VwJ+ztskSiXoBnCSJqfKT+cVPJhuJqe9YLbY425+Zh00g==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.3.0",
        "content-disposition": "^2.0.1",
        "content-type": "^2.0.0",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.8",
        "qs": "^6.16.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.1.0",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express-rate-limit": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-8.1.0.tgz",
      "integrity": "sha512-4nLnATuKupnmwqiJc27b4dCFmB/T60ExgmtDD7waf4LdrbJ8CPZzZRHYErDYNhoz+ql8fUdYwM/opf90PoPAQA==",
      "license": "MIT",
      "dependencies": {
        "ip-address": "10.0.1"
      },
      "engines": {
        "node": ">= 16"
      },
      "funding": {
        "url": "https://github.com/sponsors/express-rate-limit"
      },
      "peerDependencies": {
        "express": ">= 4.11"
      }
    },
    "node_modules/fflate": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.3.tgz",
      "integrity": "sha512-tbZNuJrLwGUp3zshBtdy4W+ORxZuIh8a5ilyIEQDC5rY1f3U20JMry0Ll3WBzU58EZKsEuJFXhb5gwv8CsPvgA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/framer-motion": {
      "version": "14.3.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-14.3.0.tgz",
      "integrity": "sha512-d8WCrU0ZQn7ukKMykCsDyIOwb/taZeDqqrDBK0du5GO0AO/ynz8fdR/LIIz9Pyy3n3tGwrneR+n0egyrrLa3fw==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "14.3.0",
        "motion-utils": "14.1.1",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/gsap": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/gsap/-/gsap-3.15.0.tgz",
      "integrity": "sha512-dMW4CWBTUK1AEEDeZc1g4xpPGIrSf9fJF960qbTZmN/QwZIWY5wgliS6JWl9/25fpTGJrMRtSjGtOmPnfjZB+A==",
      "license": "Standard 'no charge' license: https://gsap.com/standard-license."
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/helmet": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/helmet/-/helmet-8.1.0.tgz",
      "integrity": "sha512-jOiHyAZsmnr8LqoPGmCjYAaiuWwjAPLgY8ZX2XrmHawt99/u1y6RgrZMTeoPfpUbV96HOalYgz1qzkRbw54Pmg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.3.tgz",
      "integrity": "sha512-IKXpvIzjnC9XTAUbVBcMfGS0EPaIXtW6v+zr+RRp+hqULEpo0owZax6wyRwPOJbWbzjYspQwusTsfVr0ifh4uQ==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ip-address": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.0.1.tgz",
      "integrity": "sha512-NWv9YLW4PoW2B7xtzaS3NCot75m6nK7Icdv0o3lfMceJVRfSoQwqD4wEH5rLwoKJwUiZ/rfpiVBhnaF0FK4HoA==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/its-fine": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/its-fine/-/its-fine-2.1.1.tgz",
      "integrity": "sha512-C5ZoVkeqSt0Aje0tzESO+iT/EQpNFNL39GkP7mCACtoZUFD6GcyerFCr6kp0ZtiII4W9HoYkY48Soy5xE/uHKw==",
      "license": "MIT",
      "dependencies": {
        "@types/react-reconciler": "^0.28.9"
      },
      "peerDependencies": {
        "react": "^19.0.0"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
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
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.1.tgz",
      "integrity": "sha512-yz3xRaG20c6/BOzvYoDaGtPmGscs7YivItZEEqe6GbwNfHuxu9YNmvnEkMzKldAGY4/80pRcQRZSEnhquk9XuQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/meshoptimizer": {
      "version": "0.22.0",
      "resolved": "https://registry.npmjs.org/meshoptimizer/-/meshoptimizer-0.22.0.tgz",
      "integrity": "sha512-IebiK79sqIy+E4EgOr+CAw+Ke8hAspXKzBd0JdgEmPHiAwmvEj2S4h1rfvo+o/BnfEYd/jAOg5IeeIjzlzSnDg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/motion-dom": {
      "version": "14.3.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-14.3.0.tgz",
      "integrity": "sha512-rcKO4aEJzAqDEsrH6qFzhLZxs7bNqZpiUEuEATz9LaRwt6dG7hZEbcFUSHNR8NECaKYM0Iuw6Iv6NpWEGXDI+w==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "14.1.1"
      }
    },
    "node_modules/motion-utils": {
      "version": "14.1.1",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-14.1.1.tgz",
      "integrity": "sha512-3VvN5Uvf8B6qG+OfOui6Nht5EWp+vLuU3IqcAj7ItZGKqtmTjCebl5sGZF7/08gEHRnEl1AP/fIwbcEyVrcQGQ==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/multer": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/multer/-/multer-2.4.0.tgz",
      "integrity": "sha512-7dqa0ZcFfzbefdTuIkzOSMvZWC0J7FLqBOjJUZvDCXShIURWKxAyTT1wHhnE5q19c7jOJf43IYYKjBmZVZmvhg==",
      "license": "MIT",
      "dependencies": {
        "append-field": "^1.0.0",
        "busboy": "^1.6.0",
        "type-is": "^1.6.18"
      },
      "engines": {
        "node": ">= 10.16.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/multer/node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
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
    "node_modules/negotiator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.1.0.tgz",
      "integrity": "sha512-NMPBRMJgiQHjbd8phG3Vebdx4kZ1H121rbl5IkMqeOsahptB9BKo/d7oJ3zTXqTgagn2bWlNSXkh0QUGM31RYg==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^2.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/next": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/next/-/next-16.4.2.tgz",
      "integrity": "sha512-r+oBJojfefUjOiWkBhXgLS+igxX/7BWyK59uHnyOyplMSLtBZ+QLP3okrdYTbrfrbrmNTVWLBPaHDX9KRaIt3w==",
      "license": "MIT",
      "dependencies": {
        "@next/env": "16.4.2",
        "@swc/helpers": "0.5.23",
        "baseline-browser-mapping": "^2.9.19",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.5.23",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "16.4.2",
        "@next/swc-darwin-x64": "16.4.2",
        "@next/swc-linux-arm64-gnu": "16.4.2",
        "@next/swc-linux-arm64-musl": "16.4.2",
        "@next/swc-linux-x64-gnu": "16.4.2",
        "@next/swc-linux-x64-musl": "16.4.2",
        "@next/swc-win32-arm64-msvc": "16.4.2",
        "@next/swc-win32-x64-msvc": "16.4.2",
        "sharp": "^0.35.5"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.5.23",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.23.tgz",
      "integrity": "sha512-g50586zr4bZmwFiTlflMu8E0bDTb5I5gertgwAKmsdUlTQIhZtunzUlD1WSzwcVWPoAVpsrA6vlfCD7oXvRwgg==",
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
        "nanoid": "^3.3.16",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.4.2.tgz",
      "integrity": "sha512-qRcuIdP69NPm4qbACK+aDogI5CBDMi1jKe0ry5rSQJz8JVLsC7jV8XpiJjGRLLol3N+R5ihGYcrPLTno6pAdBA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/pg": {
      "version": "8.16.3",
      "resolved": "https://registry.npmjs.org/pg/-/pg-8.16.3.tgz",
      "integrity": "sha512-enxc1h0jA/aq5oSDMvqyW3q89ra6XIIDZgCX9vkMrnz5DFTw/Ny3Li2lFQ+pt3L6MCgm/5o2o8HW9hiJji+xvw==",
      "license": "MIT",
      "dependencies": {
        "pg-connection-string": "^2.9.1",
        "pg-pool": "^3.10.1",
        "pg-protocol": "^1.10.3",
        "pg-types": "2.2.0",
        "pgpass": "1.0.5"
      },
      "engines": {
        "node": ">= 16.0.0"
      },
      "optionalDependencies": {
        "pg-cloudflare": "^1.2.7"
      },
      "peerDependencies": {
        "pg-native": ">=3.0.1"
      },
      "peerDependenciesMeta": {
        "pg-native": {
          "optional": true
        }
      }
    },
    "node_modules/pg-cloudflare": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/pg-cloudflare/-/pg-cloudflare-1.4.1.tgz",
      "integrity": "sha512-6PQbsFWZcp9EmJEwy5cGQ2La+AMWpP46lgbb8X+U/XsHIUweYDNCpeuKck5RxL2MdVFi7krbbEi5nX4Zh7JhrQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/pg-connection-string": {
      "version": "2.14.1",
      "resolved": "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.14.1.tgz",
      "integrity": "sha512-qR3kGNPBLpCNtz0evbKA0Y/MRFXwSSdT+pTJvYp/bXTcReZbvX1kzF0IyTc1QnxqF7AZbOeBhNL8R5mYQZV/MA==",
      "license": "MIT"
    },
    "node_modules/pg-int8": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz",
      "integrity": "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==",
      "license": "ISC",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/pg-pool": {
      "version": "3.14.0",
      "resolved": "https://registry.npmjs.org/pg-pool/-/pg-pool-3.14.0.tgz",
      "integrity": "sha512-gKtPkFdQPU3DksooVLi9LsjZxrsBUZIpa+7aVx+LV5pNh0KzP4Zleud2po+ConrxbuXGBJ6Hfer6hdgpIBpBaw==",
      "license": "MIT",
      "peerDependencies": {
        "pg": ">=8.0"
      }
    },
    "node_modules/pg-protocol": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.16.1.tgz",
      "integrity": "sha512-p9VOFMiHB/ZbJATetbg+99PxssTVSQRnyuPSQ67mN1+1KBOjZaZ83ZQzltnxPhJwSsC3nwVjJ10DVJlerbFzLg==",
      "license": "MIT"
    },
    "node_modules/pg-types": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz",
      "integrity": "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==",
      "license": "MIT",
      "dependencies": {
        "pg-int8": "1.0.1",
        "postgres-array": "~2.0.0",
        "postgres-bytea": "~1.0.0",
        "postgres-date": "~1.0.4",
        "postgres-interval": "^1.1.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/pgpass": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz",
      "integrity": "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==",
      "license": "MIT",
      "dependencies": {
        "split2": "^4.1.0"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/playwright": {
      "version": "1.64.1",
      "resolved": "https://registry.npmjs.org/playwright/-/playwright-1.64.1.tgz",
      "integrity": "sha512-HCrVhHr5QQuwYoswEUGTb7gGp522yflbv/ST8nF4sFWGuLjQCt17Q/EubpGGSNKYn1tsTCPZxqHhHCfVURu7UA==",
      "devOptional": true,
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
      "devOptional": true,
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
    "node_modules/postgres-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz",
      "integrity": "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postgres-bytea": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.1.tgz",
      "integrity": "sha512-5+5HqXnsZPE65IJZSMkZtURARZelel2oXUEO8rH83VS/hxH5vv1uHquPg5wZs8yMAfdv971IU+kcPUczi7NVBQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-date": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz",
      "integrity": "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-interval": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz",
      "integrity": "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==",
      "license": "MIT",
      "dependencies": {
        "xtend": "^4.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.8.tgz",
      "integrity": "sha512-5nnx0yGyVUcY6t9RnWcARWtwT9F1D8O9rt08htPvnd49W1IgZtmLkhu9WfMzQj1cFxjHIO6connUNVW5k7AVyQ==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/qs": {
      "version": "6.16.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.16.1.tgz",
      "integrity": "sha512-5Px6J7rfHBAGUhNQ3es4YzcOdBBw0SDcVtThJml4RdnKw4tKs2epA0kPZ+K8X+WiHktT93RHVcQ/3ym5aTCgtg==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "es-define-property": "^1.0.1",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.3.0.tgz",
      "integrity": "sha512-hek2mFQpPuI4E1BBKrSto+BU3e3x4xuarsbiwr3+lf7p44juvFMV0XFWQAP3xUyqXA4RrXLIoaSUGbSt056ZMw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/react": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.1.tgz",
      "integrity": "sha512-QNhWdt7nrgVWWQG58QuGsAR3jv3Hbe4mb4vz7w2csnHavciZJgda1CPNaldF6eVxv90ud3jUXpKlHL69gO38yw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz",
      "integrity": "sha512-Y0bARz53lhEC1NMCASs0/j+faB/zqt3R8hpvg1e8+61ZVJ4UL0UdC4cBbXfZMcIuhrfgeILTLe+ZeBCavQPtKQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.1"
      }
    },
    "node_modules/react-use-measure": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/react-use-measure/-/react-use-measure-2.1.7.tgz",
      "integrity": "sha512-KrvcAo13I/60HpwGO5jpW7E9DfusKyLPLvuHlUyP5zqnmAPhNc6qTRjUQrdTADl0lpPpDVU2/Gg51UlOGHXbdg==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=16.13",
        "react-dom": ">=16.13"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/sharp": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.35.5.tgz",
      "integrity": "sha512-Ywn4OnzGukp7CDMrp08RQ50YKmuwG47brZgIVPTvBaaAfQlRlygrRqSrxdCiL9M+LlzLBiJ68IR1QqvzHyjC7g==",
      "license": "Apache-2.0",
      "dependencies": {
        "@img/colour": "^1.1.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.8.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.35.5",
        "@img/sharp-darwin-x64": "0.35.5",
        "@img/sharp-freebsd-wasm32": "0.35.5",
        "@img/sharp-libvips-darwin-arm64": "1.3.4",
        "@img/sharp-libvips-darwin-x64": "1.3.4",
        "@img/sharp-libvips-linux-arm": "1.3.4",
        "@img/sharp-libvips-linux-arm64": "1.3.4",
        "@img/sharp-libvips-linux-ppc64": "1.3.4",
        "@img/sharp-libvips-linux-riscv64": "1.3.4",
        "@img/sharp-libvips-linux-s390x": "1.3.4",
        "@img/sharp-libvips-linux-x64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4",
        "@img/sharp-linux-arm": "0.35.5",
        "@img/sharp-linux-arm64": "0.35.5",
        "@img/sharp-linux-ppc64": "0.35.5",
        "@img/sharp-linux-riscv64": "0.35.5",
        "@img/sharp-linux-s390x": "0.35.5",
        "@img/sharp-linux-x64": "0.35.5",
        "@img/sharp-linuxmusl-arm64": "0.35.5",
        "@img/sharp-linuxmusl-x64": "0.35.5",
        "@img/sharp-webcontainers-wasm32": "0.35.5",
        "@img/sharp-win32-arm64": "0.35.5",
        "@img/sharp-win32-ia32": "0.35.5",
        "@img/sharp-win32-x64": "0.35.5"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.1.tgz",
      "integrity": "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4",
        "side-channel-list": "^1.0.1",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "license": "ISC",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/stripe": {
      "version": "23.0.0",
      "resolved": "https://registry.npmjs.org/stripe/-/stripe-23.0.0.tgz",
      "integrity": "sha512-MDE2A5ZVVluYURORaZEVghSmnLJc3w6aHAlZSxDQMsOjOb3V0O6ro/CiaeFlJS4N7uIVmsg98ocRsPmUK6YfyA==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "peerDependencies": {
        "@types/node": ">=20"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/suspend-react": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/suspend-react/-/suspend-react-0.1.3.tgz",
      "integrity": "sha512-aqldKgX9aZqpoDp3e8/BZ8Dm7x1pJl+qI3ZKxDN0i/IQTWUwBx/ManmlVJ3wowqbno6c2bmiIfs+Um6LbsjJyQ==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=17.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/three": {
      "version": "0.180.0",
      "resolved": "https://registry.npmjs.org/three/-/three-0.180.0.tgz",
      "integrity": "sha512-o+qycAMZrh+TsE01GqWUxUIKR1AL0S8pq7zDkYOQw8GqfX8b8VoCKYUoHbhiX5j+7hr8XsuHDVU6+gkQJQKg9w==",
      "license": "MIT"
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-is": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.1.0.tgz",
      "integrity": "sha512-faYHw0anBbc/kWF3zFTEnxSFOAGUX9GFbOBthvDdLsIlEoWOFOtS0zgCiQYwIskL9iGXZL3kAXD8OoZ4GmMATA==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^2.0.0",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
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
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.7.0.tgz",
      "integrity": "sha512-6L+EeigHMQhdaIPNIFUKwfWJSwWFQ8gJbJ2DLOs5sDIegTwR9fRxvnM3uciHKjIZhFz+KAv2emhWMRvDmMcY8A==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/web": {
      "resolved": "web",
      "link": true
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4"
      }
    },
    "node_modules/zod": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.1.12.tgz",
      "integrity": "sha512-JInaHOamG8pt5+Ey8kGmdcAcg3OL9reK8ltczgHTAwNhMys/6ThXHityHxVV2p3fkw/c+MAvBHFVYHFZDmjMCQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.15",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.15.tgz",
      "integrity": "sha512-MpSEjRiBkA9crSYeOUH32rJC7SVqAbm0Fqcqge/bUi2PPoLcBWKOsG+C8mevmpr8TwXHBVkChbbJiyvkE+i/3A==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    },
    "web": {
      "dependencies": {
        "@react-three/fiber": "9.8.2",
        "@tailwindcss/postcss": "4.3.3",
        "framer-motion": "14.3.0",
        "gsap": "3.15.0",
        "lenis": "1.3.27",
        "next": "16.4.2",
        "react": "19.3.1",
        "react-dom": "19.3.1",
        "tailwindcss": "4.3.3",
        "three": "0.180.0"
      },
      "devDependencies": {
        "@types/node": "24.19.2",
        "@types/react": "19.2.14",
        "@types/react-dom": "19.2.3",
        "@types/three": "0.180.0",
        "typescript": "5.9.3"
      }
    }
  }
}

````

## advanced/package.json

````json
{
  "name": "abirami-flagship",
  "private": true,
  "type": "module",
  "workspaces": [
    "web",
    "api"
  ],
  "scripts": {
    "dev:web": "npm run dev -w web",
    "dev:api": "npm run dev -w api",
    "build": "npm run build -w web && npm run check -w api",
    "test": "npm run test -w api",
    "check": "npm run check -w web && npm run check -w api",
    "qa": "node scripts/browser-qa.mjs"
  },
  "devDependencies": {
    "@axe-core/playwright": "4.14.0",
    "@playwright/test": "1.64.1"
  }
}

````

## advanced/scripts/assets.mjs

````mjs
import { cp, mkdir } from 'node:fs/promises';
const target=new URL('../web/public/assets/',import.meta.url);
await mkdir(target,{recursive:true});
await cp(new URL('../../public/assets/',import.meta.url),target,{recursive:true});

````

## advanced/scripts/browser-qa.mjs

````mjs
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

````

## advanced/scripts/check-api.mjs

````mjs
import { readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
for(const file of await readdir('src'))if(file.endsWith('.mjs'))execFileSync(process.execPath,['--check',`src/${file}`],{stdio:'inherit'});

````

## advanced/web/.env.example

````example
API_INTERNAL_URL=http://127.0.0.1:4000
BOOKING_ENABLED=false
DEPOSIT_POLICY=

````

## advanced/web/app/book/page.tsx

````tsx
import { BookingForm } from '../../components/BookingForm';
export const dynamic='force-dynamic';
export default function Book(){const enabled=process.env.BOOKING_ENABLED==='true' && (process.env.DEPOSIT_POLICY?.trim().length??0)>=60;return <main id="main" className="portal-page"><p className="eyebrow">An appointment for you</p><h1>Make a little<br/><em>time.</em></h1>{enabled?<><BookingForm/><section className="policy"><h2>Deposit & cancellations</h2><p className="whitespace-pre-wrap">{process.env.DEPOSIT_POLICY}</p></section></>:<><p>Talk to us about your treatment, date and timings. We’ll confirm your appointment personally.</p><a className="button" href="https://wa.me/919840638981?text=Hello%20Abirami%20Beauty%20Parlour%2C%20I%20would%20like%20to%20book%20a%20consultation" target="_blank" rel="noopener noreferrer">Book on WhatsApp ↗</a></>}</main>}

````

## advanced/web/app/bridal/page.tsx

````tsx
import { BridalDashboard } from '../../components/BridalDashboard';
export const metadata = { title:'Your private bridal journal | Abirami', robots:{index:false,follow:false} };
export default function Bridal(){return <main id="main" className="portal-page"><p className="eyebrow">Only your details. Only your day.</p><h1>Your bridal<br/><em>journal.</em></h1><BridalDashboard/></main>}

````

## advanced/web/app/globals.css

````css
@import 'tailwindcss';
:root{--ink:#131311;--panel:#1d1e19;--ivory:#f5f0e7;--muted:#c0b7a8;--gold:#d0b37a;--line:#d0b37a33;--ease:cubic-bezier(.22,1,.36,1)}
*{box-sizing:border-box}html{scroll-padding-top:100px}body{margin:0;background:var(--ink);color:var(--ivory);font:15px/1.85 var(--font-body),sans-serif}h1,h2,h3{font-family:var(--font-display),serif;font-weight:400;line-height:.98;letter-spacing:-.04em;margin:0}h1{font-size:clamp(66px,8.5vw,152px)}h2{font-size:clamp(52px,6vw,90px)}h3{font-size:clamp(40px,4vw,68px)}em{color:var(--gold);font-weight:400}p{color:var(--muted);max-width:53ch}a{color:inherit;text-decoration:none}button,input,select{font:inherit}button,a{touch-action:manipulation}button{cursor:pointer}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--gold);outline-offset:5px}.skip{position:fixed;left:20px;top:-100px;z-index:100;background:var(--gold);color:var(--ink);padding:12px}.skip:focus{top:10px}.header{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:25px 6%;border-bottom:1px solid var(--line)}.wordmark{font:30px/1.1 var(--font-display);letter-spacing:.17em}.wordmark small{display:block;font:8px/2 var(--font-body);letter-spacing:.14em;margin-top:6px}.header nav{display:flex;gap:30px;font-size:11px}.header a{min-height:44px;display:inline-flex;align-items:center}.header .wordmark{display:block}.hero{position:relative;min-height:900px;min-height:max(850px,100svh);padding:200px 6% 120px;overflow:hidden}.hero-copy{position:relative;z-index:2;max-width:760px;width:58%;pointer-events:none}.hero-copy a{pointer-events:auto}.eyebrow{text-transform:uppercase;color:var(--gold);font-size:10px;letter-spacing:.19em}.hero h1{margin:30px 0;line-height:.87}.hero h1 span{display:block}.hero h1 span:nth-child(2){padding-left:.4em}.hero h1 span:last-child{white-space:nowrap}.hero-photo{position:absolute;top:145px;right:5%;width:48%;bottom:90px;isolation:isolate}.hero-photo>img{object-fit:cover;object-position:18% center;filter:saturate(.65) brightness(.8)}.hero-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--ink),transparent 40%);pointer-events:none;z-index:2}.hero-photo::before{content:'';position:absolute;inset:-12px;border:1px solid var(--line);pointer-events:none}.fluid{position:absolute;inset:0;z-index:1}.hero-caption{position:absolute;bottom:35px;right:6%;font-size:9px;letter-spacing:.11em;text-transform:uppercase}.button{display:inline-flex;align-items:center;justify-content:center;min-height:54px;background:var(--gold);color:var(--ink);border:1px solid var(--gold);padding:15px 26px;font-size:12px;transition:background 1.1s var(--ease)}.button:hover{background:#e1ca9f}.button:disabled{opacity:.5;cursor:wait}.hero .button{margin-top:20px}.opening,.promise{padding:130px 12%;border-block:1px solid var(--line)}.opening>p:last-child{margin-top:35px;max-width:47ch}.promise{text-align:center}.promise p{margin-inline:auto}.promise .button{margin-top:40px}.treatments{padding:130px 7%}.section-title{margin-bottom:80px}.treatment{display:grid;grid-template-columns:1.05fr 1fr;gap:12%;align-items:center;margin-bottom:125px}.treatment:nth-of-type(even){margin-left:10%}.treatment figure{position:relative;height:560px;margin:0;overflow:hidden}.treatment img{object-fit:cover;transform:scale(1.12)}.treatment h3{margin:25px 0}.text-link{display:inline-block;padding:12px 0;border:0;border-bottom:1px solid var(--gold);background:none;color:var(--gold);min-height:44px}.cursor{position:fixed;top:0;left:0;width:18px;height:18px;border:1px solid var(--gold);border-radius:50%;pointer-events:none;z-index:50;translate:-50% -50%}footer{padding:70px 7%;font-size:12px}footer p{max-width:65ch}.portal-page{padding:185px 8% 110px;min-height:80svh}.portal-page h1{margin-bottom:55px}.journal{margin-top:60px}.journal-welcome{display:flex;justify-content:space-between;align-items:center}.tabs{display:flex;border-bottom:1px solid var(--line);gap:40px;overflow-x:auto}.tabs button{padding:20px 4px;min-height:60px;border:0;background:none;color:var(--muted);white-space:nowrap}.tabs button[aria-selected=true]{color:var(--gold);border-bottom:1px solid var(--gold)}.journal-panel{padding:45px 0;min-height:350px}.journal-panel h2{font-size:42px;margin-bottom:30px}.reference-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,260px));gap:35px;margin-top:45px}.reference-gallery img{width:100%;height:280px;object-fit:cover}.timeline{list-style:none;padding:0}.timeline li{display:flex;gap:45px;align-items:baseline;border-bottom:1px solid var(--line);padding:20px 0}.timeline time{color:var(--gold)}label{display:block;color:var(--ivory);font-size:13px}input,select{display:block;width:100%;background:var(--panel);color:var(--ivory);border:1px solid var(--line);border-radius:0;min-height:52px;padding:12px;margin:8px 0 25px;color-scheme:dark}input[type=file]{padding:14px;max-width:500px}.booking-form{max-width:650px}.form-pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}.consent{display:flex;gap:15px;align-items:flex-start;margin:24px 0}.consent input{width:22px;min-height:22px;margin:3px 0;flex-shrink:0}.policy{max-width:650px;margin-top:70px}.policy h2{font-size:38px}
@media(max-width:767px){.header{padding:20px 6%}.header nav a:not(:last-child){display:none}.header nav{font-size:10px}.wordmark{font-size:25px}.hero{min-height:1000px;padding:160px 7% 90px}.hero-copy{width:100%}.hero h1{font-size:clamp(68px,18vw,110px)}.hero .eyebrow{max-width:29ch}.hero-photo{top:660px;bottom:70px;right:7%;width:75%}.hero-photo::after{background:none}.hero-caption{font-size:7px;bottom:20px;right:7%}.hero-copy>p:not(.eyebrow){font-size:13px}.opening,.promise{padding:90px 7%}.treatments{padding:90px 7%}.treatment{grid-template-columns:1fr;gap:30px;margin-bottom:80px}.treatment:nth-of-type(even){margin-left:8%}.treatment figure{height:390px}.cursor{display:none}.portal-page{padding:160px 7% 80px}.tabs{gap:22px;font-size:12px}.timeline li{gap:25px}.journal-panel h2{font-size:35px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.cursor{display:none}*,*::before,*::after{animation:none!important;transition:none!important}}
@media(pointer:coarse){.cursor{display:none}}

````

## advanced/web/app/layout.tsx

````tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { MotionShell } from '../components/MotionShell';
const display = localFont({ src: [ { path: '../public/assets/fonts/display-regular.woff2', weight: '400' }, { path: '../public/assets/fonts/display-italic.woff2', weight: '400', style: 'italic' } ], variable: '--font-display', display: 'swap' });
const body = localFont({ src: '../public/assets/fonts/body-regular.woff2', variable: '--font-body', display: 'swap' });
export const dynamic='force-dynamic';
export const metadata: Metadata = { title: 'Abirami | Beauty & Bridal Artistry in Medavakkam', description: 'Bridal styling, skin and hair care at Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam, Chennai.', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) {
 return <html lang="en"><body className={`${display.variable} ${body.variable}`}><a className="skip" href="#main">Skip to content</a><header className="header"><a className="wordmark" href="/">ABIRAMI<small>NATURAL BEAUTY PARLOUR</small></a><nav aria-label="Main"><a href="/#treatments">Treatments</a><a href="/bridal">Bridal journal</a><a href="/book">Reserve a visit ↗</a></nav></header><MotionShell>{children}</MotionShell><footer><span>Abirami Natural Beauty Parlour</span><p>No. 1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai, Tamil Nadu 600100</p><a href="tel:+919840638981">+91 98406 38981</a><p>Monday–Saturday 10 AM–8:30 PM · Sunday 10 AM–4:30 PM</p></footer></body></html>;
}

````

## advanced/web/app/page.tsx

````tsx
import { Hero } from '../components/Hero';
import { Treatments } from '../components/Treatments';
export default function Home() { return <main id="main"><Hero/><section className="opening"><p className="eyebrow">A familiar address. A little time for you.</p><h2>Your wedding morning.<br/><em>Your everyday rituals.</em></h2><p>A quiet conversation before the first brushstroke. The colour you love. The details you want to keep. Come as you are. We’ll begin there.</p></section><Treatments/><section className="promise"><p className="eyebrow">Our promise</p><h2>Still you.<br/><em>Beautifully considered.</em></h2><a className="button" data-magnetic href="/book">Plan your appointment ↗</a></section></main>; }

````

## advanced/web/components/BookingForm.tsx

````tsx
'use client';
import { useRef,useState } from 'react';
export function BookingForm(){
 const [status,setStatus]=useState('');const [busy,setBusy]=useState(false);const attempt=useRef<{payload:string;key:string}|null>(null);
 async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();const data=new FormData(event.currentTarget);const payload=JSON.stringify({name:data.get('name'),treatment:data.get('treatment'),startsAt:`${data.get('date')}T${data.get('time')}:00+05:30`});if(attempt.current?.payload!==payload)attempt.current={payload,key:crypto.randomUUID()};setBusy(true);setStatus('Checking your appointment…');try{const response=await fetch('/api/bookings',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':attempt.current.key},body:payload});const result=await response.json();if(!response.ok)throw new Error(result.error||'Please try again.');const url=new URL(result.checkoutUrl);if(url.protocol!=='https:'||url.hostname!=='checkout.stripe.com')throw new Error('Checkout could not be verified. Please contact the salon.');location.assign(url.href);}catch(error){setStatus((error as Error).message);setBusy(false);}}
 return <form onSubmit={submit} className="booking-form"><label>Your name<input name="name" autoComplete="name" required maxLength={80}/></label><label>Treatment<select name="treatment"><option value="bridal">Bridal Couture · 3.5 hours</option><option value="facial">Botanical Facial · 60 minutes</option><option value="hair">Hair & Scalp Ritual · 75 minutes</option><option value="grooming">Precision Grooming · 45 minutes</option></select></label><div className="form-pair"><label>Date<input name="date" type="date" required/></label><label>Time in Chennai<input name="time" type="time" min="10:00" max="20:30" step="900" required/></label></div><p>₹1,000 deposit. The appointment is confirmed only after payment is verified. Opening hours and the full treatment duration are checked before checkout.</p><label className="consent"><input type="checkbox" required/>I have read the salon’s deposit and cancellation policy shown below.</label><button className="button" disabled={busy}>Continue to secure checkout ↗</button><p role="status" aria-live="polite">{status}</p></form>;
}

````

## advanced/web/components/BridalDashboard.tsx

````tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
type Journal={ name:string; notes:string; timeline:{ time:string; detail:string }[]; images:{ id:string }[] };
const tabs=['Inspiration','Consultation Notes','Timeline'] as const;
async function request(url:string,options?:RequestInit){const r=await fetch(url,{...options,credentials:'same-origin'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Please try again.');return data;}
export function BridalDashboard(){
 const [journal,setJournal]=useState<Journal|null>(null);
 const [tab,setTab]=useState(0);
 const [status,setStatus]=useState('Loading your journal…');
 const [busy,setBusy]=useState(false);
 const reduced=useReducedMotion();
 const tabRefs=useRef<(HTMLButtonElement|null)[]>([]);
 const load=async()=>{try{setJournal(await request('/api/portal'));setStatus('');}catch{setJournal(null);setStatus('Enter the private invitation code shared by the salon.');}};
 useEffect(()=>{void load();},[]);
 async function login(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);try{const form=new FormData(event.currentTarget);await request('/api/portal/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:form.get('code')})});await load();}catch(error){setStatus((error as Error).message);}finally{setBusy(false);}}
 async function upload(event:React.FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;setBusy(true);setStatus('Saving your reference…');try{await request('/api/portal/images',{method:'POST',body:new FormData(form)});form.reset();await load();setStatus('Reference saved privately.');}catch(error){setStatus((error as Error).message);}finally{setBusy(false);}}
 return <div className="journal"><p role="status" aria-live="polite">{status}</p>{!journal?<form onSubmit={login} className="max-w-lg space-y-6"><label>Private invitation code<input name="code" type="password" autoComplete="one-time-code" required minLength={40} maxLength={128}/></label><button className="button" disabled={busy}>Open my journal</button></form>:<><div className="journal-welcome"><p>For {journal.name}</p><button className="text-link" onClick={async()=>{try{await request('/api/portal/session',{method:'DELETE'});setJournal(null);setStatus('You have signed out.');}catch{setStatus('Could not sign out. Please try again.');}}}>Sign out</button></div><div role="tablist" aria-label="Bridal journal" className="tabs">{tabs.map((name,i)=><button key={name} ref={node=>{tabRefs.current[i]=node;}} id={`tab-${i}`} role="tab" aria-selected={i===tab} aria-controls={`panel-${i}`} tabIndex={i===tab?0:-1} onClick={()=>setTab(i)} onKeyDown={event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%3;else if(event.key==='ArrowLeft')next=(i+2)%3;else if(event.key==='Home')next=0;else if(event.key==='End')next=2;else return;event.preventDefault();setTab(next);tabRefs.current[next]?.focus();}}>{name}</button>)}</div><AnimatePresence mode="wait" initial={false}><motion.section key={tab} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:reduced?0:.65,ease:[.22,1,.36,1]}} className="journal-panel">{tab===0?<><p>Keep your saree colours, jewellery and makeup references together. JPEG, PNG or WebP, up to 5 MB each.</p><form onSubmit={upload} className="upload-form"><label>Add a private reference<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required/></label><button className="button" disabled={busy}>Save reference</button></form><div className="reference-gallery">{journal.images.map(image=><figure key={image.id}><img src={`/api/portal/images/${image.id}`} alt="Your privately uploaded bridal inspiration" loading="lazy" width={600} height={750}/><button className="text-link" onClick={async()=>{try{await request(`/api/portal/images/${image.id}`,{method:'DELETE'});await load();}catch(error){setStatus((error as Error).message);}}}>Remove reference</button></figure>)}</div></>:tab===1?<><h2>What we’ve discussed</h2><p className="whitespace-pre-wrap">{journal.notes||'Your salon consultation notes will appear here once you have spoken with us.'}</p></>:<><h2>Your wedding morning</h2>{journal.timeline.length?<ol className="timeline">{journal.timeline.map((entry,i)=><li key={i}><time>{entry.time}</time><p>{entry.detail}</p></li>)}</ol>:<p>Your timings will be agreed with you after the consultation.</p>}</>}</motion.section></AnimatePresence></>}</div>;
}

````

## advanced/web/components/FluidCanvas.tsx

````tsx
'use client';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector2, ShaderMaterial } from 'three';
import { Suspense, useEffect, useMemo, useRef } from 'react';
const vertex = `varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = `precision highp float;
 uniform sampler2D uPhoto; uniform vec2 uMouse; uniform vec2 uSize; uniform float uTime;
 varying vec2 vUv;
 void main(){
  vec2 p=vUv; float distanceToCursor=distance(p,uMouse);
  float wave=sin(distanceToCursor*24.-uTime*.8)*exp(-distanceToCursor*5.)*.006;
  p+=normalize(p-uMouse+vec2(.0001))*wave;
  float aspect=uSize.x/uSize.y; float sourceAspect=796./448.;
  vec2 cover=vec2(min(1.,aspect/sourceAspect),min(1.,sourceAspect/aspect));
  vec2 uv=(p-.5)*cover+vec2(.42,.5);
  vec3 colour=texture2D(uPhoto,uv).rgb;
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233))+floor(uTime*12.))*43758.5453);
  float vignette=1.-smoothstep(.2,.8,length(vUv-.5));
  gl_FragColor=vec4(colour*(.75+.12*vignette)+(grain-.5)*.018,1.);
 }`;
function Silk() {
 const texture = useLoader(TextureLoader, '/assets/img/salon-maps/listing-10-960.webp');
 const material = useRef<ShaderMaterial>(null);
 const { size, gl } = useThree();
 const target = useRef(new Vector2(.5,.5));
 const uniforms = useMemo(() => ({ uPhoto: { value: texture }, uMouse: { value: new Vector2(.5,.5) }, uTime: { value: 0 }, uSize: { value: new Vector2(1,1) } }), [texture]);
 useEffect(() => {
  const canvas = gl.domElement;
  const move = (event: PointerEvent) => { const r=canvas.getBoundingClientRect(); target.current.set((event.clientX-r.left)/r.width,1-(event.clientY-r.top)/r.height); };
  window.addEventListener('pointermove', move, { passive: true });
  return () => window.removeEventListener('pointermove', move);
 }, [gl]);
 useFrame((_, delta) => {
  if (!material.current) return;
  uniforms.uTime.value += Math.min(delta,.05);
  uniforms.uSize.value.set(size.width,size.height);
  uniforms.uMouse.value.lerp(target.current,1-Math.exp(-delta*3));
 });
 return <mesh frustumCulled={false}><planeGeometry args={[2,2]}/><shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} depthTest={false} depthWrite={false}/></mesh>;
}
export default function FluidCanvas({ active }: { active: boolean }) {
 return <div className="fluid" aria-hidden="true"><Canvas dpr={[1,1.5]} frameloop={active ? 'always' : 'never'} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}><Suspense fallback={null}><Silk/></Suspense></Canvas></div>;
}

````

## advanced/web/components/Hero.tsx

````tsx
'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
const FluidCanvas = dynamic(() => import('./FluidCanvas'), { ssr: false });
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? null : this.props.children; }
}
export function Hero() {
 const host = useRef<HTMLElement>(null);
 const [eligible, setEligible] = useState(false);
 const [active, setActive] = useState(false);
 useEffect(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const capability = () => {
   const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
   const test = document.createElement('canvas');
   const gl = test.getContext('webgl2');
   const supported = !!gl && !motion.matches && !device.connection?.saveData && (device.deviceMemory ?? 8) >= 4;
   gl?.getExtension('WEBGL_lose_context')?.loseContext();
   setEligible(supported);
  };
  const timer = setTimeout(capability, 1100);
  motion.addEventListener('change', capability);
  let visible = true;
  const update = () => setActive(visible && !document.hidden);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
  if (host.current) observer.observe(host.current);
  document.addEventListener('visibilitychange', update);
  return () => { clearTimeout(timer); observer.disconnect(); motion.removeEventListener('change', capability); document.removeEventListener('visibilitychange', update); };
 }, []);
 return <section ref={host} className="hero" aria-labelledby="hero-heading"><div className="hero-photo"><Image src="/assets/img/salon-maps/listing-10-960.webp" alt="Bridal makeup inspiration from Abirami’s salon gallery" fill priority sizes="(max-width: 767px) 100vw, 55vw"/>{eligible ? <CanvasBoundary><FluidCanvas active={active}/></CanvasBoundary> : null}</div><div className="hero-copy"><p className="eyebrow">Medavakkam, Chennai · Beauty & bridal artistry</p><h1 id="hero-heading"><span>Beauty,</span><span>in your</span><span><em>own light.</em></span></h1><p>The Art of Natural Radiance<br/>& Bespoke Bridal Artistry</p><a className="button" data-magnetic href="/book">Reserve your consultation ↗</a></div><p className="hero-caption">Bridal inspiration · From our salon journal</p></section>;
}

````

## advanced/web/components/MotionShell.tsx

````tsx
'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
export function MotionShell({ children }: { children: ReactNode }) {
 const root = useRef<HTMLDivElement>(null);
 const cursor = useRef<HTMLDivElement>(null);
 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
   const touch=matchMedia('(pointer: coarse)').matches;
   const lenis=touch ? null : new Lenis({ duration:1.35, smoothWheel:true, anchors:true });
   const tick=(time:number)=>lenis?.raf(time*1000);
   if (lenis) { gsap.ticker.add(tick); lenis.on('scroll',ScrollTrigger.update); }
   const context=gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(section => {
     gsap.from(section.querySelectorAll('[data-reveal-item]'), { y:36, opacity:0, duration:1.3, stagger:.16, ease:'power4.out', scrollTrigger:{ trigger:section,start:'top 85%',once:true } });
    });
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(image => gsap.fromTo(image,{yPercent:-5},{ yPercent:5,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:1.4} }));
   }, root);
   const buttons=[...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
   const move=(event:PointerEvent)=>{ if (!touch && cursor.current) gsap.to(cursor.current,{x:event.clientX,y:event.clientY,duration:.45,ease:'power3.out'}); };
   const handlers=buttons.map(button=>{
    const hover=(event:PointerEvent)=>{if(touch)return; const r=button.getBoundingClientRect();gsap.to(button,{x:(event.clientX-r.left-r.width/2)*.12,y:(event.clientY-r.top-r.height/2)*.12,duration:1.1,ease:'power4.out'});};
    const reset=()=>gsap.to(button,{x:0,y:0,duration:1.2,ease:'power4.out'});
    button.addEventListener('pointermove',hover);button.addEventListener('pointerleave',reset);
    return ()=>{button.removeEventListener('pointermove',hover);button.removeEventListener('pointerleave',reset);gsap.set(button,{clearProps:'transform'});};
   });
   window.addEventListener('pointermove',move,{passive:true});
   return ()=>{handlers.forEach(clean=>clean());window.removeEventListener('pointermove',move);context.revert();gsap.ticker.remove(tick);lenis?.destroy();};
  });
  return ()=>media.revert();
 }, []);
 return <div ref={root}>{children}<div ref={cursor} className="cursor" aria-hidden="true"/></div>;
}

````

## advanced/web/components/Treatments.tsx

````tsx
import Image from 'next/image';
const rituals=[
 {name:'Bridal couture',detail:'HD makeup, saree draping and floral hair styling. A conversation about the look you want to remember.',image:'06',price:'₹8,500+'},
 {name:'Botanical facials',detail:'An hour for your skin. Talk to us about hydration, cleansing and the facial that suits your preferences.',image:'03',price:'₹1,800+'},
 {name:'Hair & scalp rituals',detail:'Warm herbal oil, conditioning and unhurried care for your hair and scalp.',image:'05',price:'₹1,500+'}
];
export function Treatments(){return <section id="treatments" className="treatments" data-reveal><div className="section-title"><p className="eyebrow" data-reveal-item>The treatment collection</p><h2 data-reveal-item>Care, with<br/><em>intention.</em></h2></div>{rituals.map((ritual,i)=><article className="treatment" key={ritual.name} data-reveal><figure data-reveal-item><Image data-parallax src={`/assets/img/salon-maps/listing-${ritual.image}-960.webp`} alt={i===0?'Bridal styling collage from Abirami’s published gallery':i===1?'Treatment chair inside Abirami salon':'Hair colour photograph from Abirami’s salon gallery'} fill sizes="(max-width:767px) 100vw, 45vw"/></figure><div data-reveal-item><p className="eyebrow">{ritual.price} · Final quote on consultation</p><h3>{ritual.name}</h3><p>{ritual.detail}</p><a className="text-link" href="/book">Make time for yourself ↗</a></div></article>)}</section>}

````

## advanced/web/next-env.d.ts

````ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";
import "./.next/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

````

## advanced/web/next.config.mjs

````mjs
const api = process.env.API_INTERNAL_URL || 'http://127.0.0.1:4000';
export default {
 poweredByHeader: false,
 productionBrowserSourceMaps: false,
 async rewrites() { return [{ source: '/api/:path*', destination: `${api}/api/:path*` }]; },
 async headers() { return [{ source: '/:path*', headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' }
 ] }]; }
};

````

## advanced/web/package.json

````json
{
  "name": "web",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",
    "start": "next start",
    "check": "tsc --noEmit",
    "predev": "node ../scripts/assets.mjs",
    "prebuild": "node ../scripts/assets.mjs"
  },
  "dependencies": {
    "next": "16.4.2",
    "react": "19.3.1",
    "react-dom": "19.3.1",
    "@react-three/fiber": "9.8.2",
    "three": "0.180.0",
    "gsap": "3.15.0",
    "lenis": "1.3.27",
    "framer-motion": "14.3.0",
    "tailwindcss": "4.3.3",
    "@tailwindcss/postcss": "4.3.3"
  },
  "devDependencies": {
    "typescript": "5.9.3",
    "@types/node": "24.19.2",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "@types/three": "0.180.0"
  }
}

````

## advanced/web/postcss.config.mjs

````mjs
export default { plugins: { '@tailwindcss/postcss': {} } };

````

## advanced/web/proxy.ts

````ts
import { NextRequest, NextResponse } from 'next/server';
export function proxy(request:NextRequest){
 const nonce=btoa(crypto.randomUUID());
 const development=process.env.NODE_ENV==='development';
 const policy=["default-src 'self'",`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development?" 'unsafe-eval'":''}`,`style-src 'self' 'nonce-${nonce}'`,"style-src-attr 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self'"+(development?' ws:':''),"object-src 'none'","base-uri 'self'","frame-ancestors 'none'","form-action 'self' https://checkout.stripe.com"].join('; ');
 const headers=new Headers(request.headers);headers.set('x-nonce',nonce);headers.set('Content-Security-Policy',policy);
 const response=NextResponse.next({request:{headers}});response.headers.set('Content-Security-Policy',policy);response.headers.set('Cache-Control','private, no-store');
 if(!development)response.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains');
 return response;
}
export const config={matcher:['/((?!api|_next/static|_next/image|assets|favicon.ico).*)']};

````

## advanced/web/tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

````
