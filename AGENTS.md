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
