# Unnati Portfolio (Next.js + Tailwind)

Modern, elegant portfolio with editable data files and a simple blog.

## Quickstart
```bash
# 1) Install deps
npm i

# 2) Start dev
npm run dev

# 3) Build & run
npm run build && npm start
```

## Where to edit content
- Skills: `data/skills.js`
- Projects: `data/projects.js`
- Experience: `data/experience.js`
- Achievements: `data/achievements.js`
- Blog posts: `data/posts.js` (supports title, date, summary, content, slug)

No page code changes needed — the UI reads from these files.

## Deploy on Vercel
1. Push to GitHub.
2. Import repo in Vercel.
3. Add custom domain (e.g. `unnati.build`).

**DNS for .build**
- Apex `@` (A record): `76.76.21.21`
- `www` (CNAME): `cname.vercel-dns.com`
Then set redirect `www` → apex inside Vercel.

## Design
- Dark theme, soft accents, subtle gradients.
- Fully responsive.
