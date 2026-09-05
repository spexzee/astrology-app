# Vedic Astrology — Website

Official website for the Vedic Astrology desktop application.

> **This is a completely independent project from the Electron application.**
> It lives in `astrology-website/` and has its own `package.json` and dependencies.

## Technology

- **React** + **TypeScript**
- **Vite** (build tool)
- **React Router** (client-side routing)
- **CSS Modules** (scoped component styles)
- No Tailwind, no external UI library

## Getting started

```bash
cd astrology-website
npm install
npm run dev
```

Visit: `http://localhost:5173`

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint TypeScript / TSX files |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, product intro, how it works, download CTA |
| `/features` | Features — editorial feature list |
| `/about` | About — product description, version info |
| `/downloads` | Downloads — installer and ZIP download options |
| `/contact` | Contact — simple contact information |

## Managing releases

All version and download information lives in one file:

**`src/config/downloads.ts`**

To release a new version:

1. Create a GitHub Release for the new version tag (e.g. `v1.1.0`)
2. Upload the `.exe` installer and `.zip` portable builds as release assets
3. Open `src/config/downloads.ts`
4. Update `version`, `releaseDate`, `windows.installer`, `windows.zip`
5. Set `windows.available` to `true` if it wasn't already
6. Redeploy to Vercel

### GitHub Releases URL pattern

```
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/vX.Y.Z/Vedic-Astrology-Studio-Setup-X.Y.Z.exe
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/vX.Y.Z/Vedic-Astrology-Studio-X.Y.Z.zip
```

## Deployment — Vercel

1. Push `astrology-website/` to a GitHub repository (can be the same repo)
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the **Root Directory** to `astrology-website`
4. Vercel will auto-detect Vite and configure the build correctly
5. `npm run build` → `dist/`

The included `vercel.json` handles SPA routing (React Router redirect fallback).

## Design system

The website mirrors the Electron application's design tokens:

| Token | Value |
|-------|-------|
| Background | `#fff8f3` (ivory/parchment) |
| Primary | `#79542e` (antique bronze) |
| Secondary | `#904a49` (deep burgundy) |
| Display font | EB Garamond (serif) |
| Body font | Inter (sans-serif) |

## Project structure

```
astrology-website/
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   └── downloads/          ← place binaries here (or link to GitHub Releases)
├── src/
│   ├── components/
│   │   ├── AppMockup.tsx   ← D1 chart editorial mockup
│   │   ├── Button.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── PageHeader.tsx
│   ├── config/
│   │   └── downloads.ts    ← single source of truth for version + URLs
│   ├── hooks/
│   │   └── useScrollReveal.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DownloadsPage.tsx
│   │   ├── FeaturesPage.tsx
│   │   └── HomePage.tsx
│   ├── styles/
│   │   └── global.css      ← design tokens + typography scale
│   ├── App.tsx             ← router + layout
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```
