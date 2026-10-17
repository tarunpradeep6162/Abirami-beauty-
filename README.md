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
