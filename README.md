# Journey

Turning bold ideas into beautifully built products.

Agency website built with Next.js, React, and TypeScript.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a static export in `out/`
- `npm run start` — serve the production build (non-static)
- `npm run lint` — run ESLint

## Deploy (Firebase Hosting)

```bash
npm run build
firebase deploy --only hosting
```

Static files are exported to `out/` for Firebase Hosting.
