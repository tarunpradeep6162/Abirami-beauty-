# Abirami Natural Beauty Parlour — standalone flagship

Canonical repository: https://github.com/tarunpradeep6162/Abirami-beauty-
Live site: https://abirami-beauty.vercel.app/

index.html is the complete current site: semantic markup, embedded CSS, embedded
JavaScript and the approved logo embedded as a data URL. No framework, server,
JavaScript CDN, API key or runtime build process is needed to open the file.
Internet access is needed for the explicitly requested Unsplash photographs,
Google Fonts, Google Maps and WhatsApp. The file can be opened directly in a
browser or served by any static host.

## Content

The owner supplied the phone, hours, address, menu, prices, Google Maps link,
rating statement and review excerpts on 17 October 2026. They are used as
supplied, with salon attribution for rating/review information. The Maps link
resolved successfully during checking; every supplied photo ID returned a valid
image. No total Google review count has been invented or used in rating schema.

Editorial Unsplash photographs are not Abirami premises or client work. Some
supplied URLs depict a different subject than their prompt descriptions; alt
text describes the actual visible photograph. The comparison shows different
people and is explicitly labelled as a style comparison, not a client result.

The four treatment tabs support mouse, touch and arrow/Home/End keys. Booking
links open a native dialog with name, phone, selected service, date and time.
Submit validates and URL-encodes a formatted WhatsApp message, then opens the
provided salon number. The customer still sends the message, and the salon
confirms availability. Nothing is sent to or stored on a website backend.
Sunday requests are restricted to bridal appointments; Sunday timing is subject
to consultation. Ordinary weekday requests use 9:30 AM–8:30 PM.

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
CSS/JavaScript without unsafe-inline or unsafe-eval. Only the requested image,
font and map origins are allowed.

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
