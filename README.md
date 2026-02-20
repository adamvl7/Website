# Portfolio — Setup & Deploy Guide

A sleek, classified-dossier themed portfolio built with Next.js. B&W + red accents, custom cursor, glitch effects, typewriter animations, and a scanline aesthetic.

## Stack
- **Next.js 14** (Pages Router)
- **TypeScript**
- **CSS** (custom, no UI library)
- **Google Fonts** (Bebas Neue, Space Mono, DM Sans)

---

## 1. Setup Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 2. Customize Your Content

### Your Name / Info
- `pages/_app.tsx` — site-wide name in Navbar
- `pages/index.tsx` — about bio text, skills, quote
- `pages/work.tsx` — work experience entries (`works` array)
- `pages/projects.tsx` — projects (`projects` array)
- `pages/contact.tsx` — email & social links

### Colors
Edit `styles/globals.css` CSS variables at the top:
```css
:root {
  --red: #cc1100;      /* accent color */
  --black: #0a0a0a;
  --white: #f5f5f0;
}
```

### Resume
Drop your `resume.pdf` into the `public/` folder.

---

## 3. Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# For production
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) and it auto-deploys on every push.

**That's it.** Vercel detects Next.js automatically — zero config needed.

---

## 4. Custom Domain (Optional)

In Vercel dashboard → Project → Settings → Domains → Add your domain.

---

## Features

- ✦ Custom red dot cursor with ring tracking
- ✦ Glitch text effect on hover (hero)  
- ✦ Typewriter animation on load
- ✦ Scrolling marquee ticker
- ✦ Grid + scanline + noise texture overlays
- ✦ Parallax hero section
- ✦ Work table with expandable rows
- ✦ Interactive project selector
- ✦ Year progress tracker
- ✦ Live UTC clock in navbar
- ✦ Red accent on hover, selection, scrollbar
- ✦ Smooth fade-in animations

---

## Folder Structure

```
portfolio/
├── components/
│   ├── Cursor.tsx       # Custom cursor
│   └── Navbar.tsx       # Navigation
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx        # About page
│   ├── work.tsx         # Work page
│   ├── projects.tsx     # Projects page
│   └── contact.tsx      # Contact page
├── public/
│   └── resume.pdf       # ← Add your resume here
├── styles/
│   └── globals.css      # All custom styles & animations
└── package.json
```
