# Arnav Srivastav — Portfolio

Personal site for [arnavs.tech](https://arnavs.tech). Built with React, Vite, Three.js, GSAP, and Lenis.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Vite** (build: `npm run build`, output: `dist`).
4. Add custom domain **arnavs.tech** in Project → Settings → Domains and follow DNS instructions.

No `base` path is required for a root domain.

## Stack

- React 19 + Vite 6
- Three.js / React Three Fiber (persistent scroll-linked universe + project orbs)
- GSAP ScrollTrigger + Lenis smooth scroll
- Deployed on Vercel

## Hinge mode (`/v2`)

Pixel-faithful Hinge UI parody with five bottom tabs:

| Bottom icon | Tab | Route | Description |
|-------------|-----|-------|-------------|
| H | Profile | `/v2` | Hinge profile feed (filters, photos, prompts) — uses `Arnav.jpg` + `portfolio.png` |
| ★ | Experience | `/v2/experience` | Matches-style accordion |
| ♥ | Projects | `/v2/projects` | Standouts cards — **X** for next project |
| 💬 | Education | `/v2/education` | My Hinge / Get more layout |
| Avatar | Contact | `/v2/contact` | Likes You + resume CTA |

Use **`/`** for applications; `/v2` is the memorable demo.
