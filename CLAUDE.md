# CLAUDE.md — Personal Site & Blog

This file orients Claude Code when working in `C:\projects\blog`. Read it first.

## What this is

Bill's personal site: portfolio + blog. Built with **Astro 6** (MDX content collections), deployed to **Cloudflare Pages** via `@astrojs/cloudflare`. Single-author, no CMS — content lives in MDX files in the repo and is edited agentically (the user describes changes in chat, Claude makes them).

## Site structure

Three top-level routes only:

- `/` — Home (hero, short intro, featured projects, recent posts, link to resume)
- `/projects` — Index grid of all projects
- `/projects/[slug]` — One page per project (see "Projects" below)
- `/blog` — Index of blog posts
- `/blog/[slug]` — Individual post
- `/resume` — Linked from the home page only, not in main nav

The old `/games` route, `MenuBar`, `CommandButtons`, and `Window` retro-shell components have been retired. Don't reintroduce them.

## Projects

Featured projects (in this order — keep the order stable unless the user says otherwise):

1. **lmap** — *Let's Make a Picture!* — retro movie-studio management + murder mystery game (Godot)
2. **egyptology** — game project (Python)
3. **sevenworlds** — Godot/Electron game
4. **projectmars** — Godot game
5. **story-generator** — Next.js app
6. **sightwords** — kids' literacy app (Capacitor)
7. **serenade** — web app

Each project lives in `C:\projects\<name>\` (sibling to this repo). For each one there is an MDX file at `src/data/projects/<name>.mdx` with frontmatter (title, tagline, tech, status, repo, hero image, gallery) and a body that can be hand-written or sourced from the project's own `README.md` / `CLAUDE.md`. Hero images and screenshots are copied into `public/images/projects/<name>/` so Astro can serve them — **do not** hot-link from sibling project directories.

When the user asks to refresh a project page, re-read the source project's README/CLAUDE.md and `assets/`, `reference_images/`, or `public/` folders for current screenshots. Always confirm before copying large numbers of images.

## Design language

**Modern + retro-fun, light mode, Solarized-inspired.** Not aggressively retro — no full-page CRT/scanlines, no VT323 body text. The retro flavor lives in accents: pixel-art icons, chunky pixel-stair-step borders on cards, a pixel display font for headings/UI chrome only.

- Palette: Solarized Light base (`#fdf6e3` bg, `#073642` ink, `#586e75` body) with accents `#268bd2` blue, `#cb4b16` orange, `#859900` green, `#d33682` magenta.
- Display font (headings, nav, buttons): **Pixelify Sans** — pixel hinting but readable.
- Body font: **Inter** (system sans fallback).
- Cards/borders: 3-4px solid ink color with offset hard shadow (no blur) to evoke 8-bit chunkiness without going full CRT.
- Hover: small translate + shadow snap (the "press" feel).
- Use scanlines/CRT tint **only** on hero/banner imagery, not the whole page.

The user is not a designer and explicitly defers design decisions. Don't ask "what color should X be" — pick from the palette and ship it.

## Content collections

Defined in `src/content.config.ts`:

- `blog` — `src/data/blog/*.{md,mdx}` — schema: title, description, pubDate, updatedDate?, heroImage?, tags[]
- `projects` — `src/data/projects/*.{md,mdx}` — schema: title, tagline, order, status, tech[], repo?, liveUrl?, heroImage, gallery[]

The retired `games` collection should be removed once the new projects collection is live.

## Agentic workflow

The user will describe updates in chat. Claude is responsible for: editing MDX, adding images, running the dev server for preview, committing, pushing, and (eventually) triggering the Cloudflare deploy. There is a project skill at `.claude/skills/blog-update/SKILL.md` that documents the recipes for "new post", "new project", "update project", "preview", and "ship".

**Do not commit or push without explicit user confirmation** ("ship it", "push", "deploy"). Drafts and previews are fine without asking; anything that touches the remote needs a green light.

## Local commands

```bash
npm run dev       # astro dev server, http://localhost:4321
npm run build     # production build into dist/
npm run preview   # preview the built site
```

## Deploy

Target: **Cloudflare Pages**. `wrangler.jsonc` and `@astrojs/cloudflare` are already in `package.json`, but the Pages project is **not yet wired up** and there is **no git remote** as of 2026-04-12. When the user is ready, the steps are:

1. `git init` (if needed) and create the GitHub repo
2. Connect the repo to a Cloudflare Pages project (build command `npm run build`, output `dist`)
3. Document the production URL here once it exists

Until then, don't try to push or deploy.

## House rules

- Light mode only. Don't add a dark-mode toggle unless asked.
- Default to no comments in code. Identifiers should explain themselves.
- Prefer editing existing files; don't create planning/notes/`.md` files unless asked.
- Don't reintroduce the retired retro-shell components.
- When pulling from sibling projects, treat their directories as **read-only sources** — copy what you need into `public/`, never edit the source projects from here.
