# Treforge Portfolio

**Driven by AI. MVP within days, not weeks.**

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## 🌐 Deploy

### Option A — Vercel (Recommended, free)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Vite** (auto-detected)
4. Click **Deploy** — done in ~60 seconds

### Option B — Netlify (free)
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add New Site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy**

### Option C — GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"deploy": "gh-pages -d dist"
```
Then:
```bash
npm run build && npm run deploy
```

## 🛠 Tech Stack
- React 18
- Vite 5
- Google Fonts (Orbitron + Space Mono)
