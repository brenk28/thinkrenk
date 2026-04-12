---
name: blog-update
description: Agentic content workflow for bill's personal site (C:\projects\blog). Use for creating/editing blog posts, projects, previewing locally, committing, and deploying. Invoke whenever the user says "new post", "update project X", "preview the site", "ship it", or similar.
---

# blog-update — agentic content workflow

This skill is the playbook for updating Bill's personal site (Astro + Cloudflare Pages, repo at `C:\projects\blog`). The user describes what they want in natural language and you execute the recipe.

**Always read `C:\projects\blog\CLAUDE.md` first** if you haven't this session — it has the canonical site structure, content schemas, and house rules.

---

## Recipes

### 1. New blog post

Triggers: *"new post about X"*, *"write a post on X"*, *"draft a post..."*

1. Pick a slug from the title (kebab-case, short).
2. Create `src/data/blog/<slug>.mdx` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "..."
   pubDate: YYYY-MM-DD   # today unless told otherwise
   tags: ["..."]
   draft: false          # true if user says "draft"
   heroImage: "/images/blog/<slug>/hero.png"   # optional
   ---
   ```
3. Write the body. Match Bill's voice: direct, technical, dry. No marketing fluff, no "In this post we'll explore..." openings. Short paragraphs. Use H2 for section breaks; H3 sparingly.
4. If the post needs a hero or inline images, create `public/images/blog/<slug>/` and put them there.
5. Run the preview recipe. **Do not commit without user confirmation.**

### 2. New project

Triggers: *"add a new project called X"*, *"create a project page for X"*

1. Confirm with the user: title, tagline, tech stack, status, source project directory.
2. Create `public/images/projects/<slug>/` and copy a hero (1200×675 or thereabouts) plus up to 4 gallery shots from the source project.
3. Create `src/data/projects/<slug>.mdx` following the schema in `src/content.config.ts` (title, tagline, order, status, tech, repo?, liveUrl?, heroImage, gallery[]).
4. Set `order` to one more than the current max unless told where it slots in.
5. Preview, confirm, then commit.

### 3. Update a project

Triggers: *"update the lmap page with..."*, *"refresh screenshots for X"*, *"change the tagline on..."*

1. Read `src/data/projects/<slug>.mdx`.
2. Make the edits. If pulling new screenshots, re-scan the source project's `assets/`, `reference_images/`, or `public/` folders and copy into `public/images/projects/<slug>/`. Never hotlink from sibling directories.
3. Preview, confirm, commit.

### 4. Preview locally

Triggers: *"preview"*, *"let me see it"*, *"run the site"*

1. Start the dev server in the background: `npm run dev` from `C:\projects\blog` with `run_in_background: true`.
2. Tell the user the URL (default `http://localhost:4321`) and which page to open first given what you just changed.
3. If they report something visually wrong, iterate — don't commit yet.

### 5. Build check

Triggers: *"does it build"*, *"build check"*, before any ship.

1. `npm run build` from `C:\projects\blog`.
2. Report any errors. Fix them, re-run. Never ship a failing build.

### 6. Ship it

Triggers: *"ship it"*, *"push"*, *"deploy"*, *"commit and push"*

**Pre-flight:**
1. Run recipe 5 (build check). Must pass.
2. `git status` to show the user what'll be committed.
3. Explicit confirmation from the user before touching the remote.

**Commit:**
4. `git add` the specific files (never `git add -A` or `.`).
5. Commit with a message matching the repo's existing style. Include the Co-Authored-By trailer for Claude per house convention.

**Push:**
6. `git push` to the configured remote (see below — this will not exist until the user wires up GitHub).

**Deploy:**
7. Cloudflare Pages is configured to auto-deploy from the main branch once wired up. After push, the user can check the build in the Cloudflare dashboard. Report the expected URL.

---

## State of the deploy pipeline (as of 2026-04-12)

- ❌ Git repo not initialized
- ❌ No GitHub remote
- ❌ Cloudflare Pages project not created
- ✅ `@astrojs/cloudflare` adapter installed
- ✅ `wrangler.jsonc` in place

**Until the remote and Pages project exist, recipe 6 cannot run.** If the user asks to ship before that, walk them through the one-time setup instead:

1. `cd C:\projects\blog && git init && git add . && git commit -m "Initial commit"`
2. User creates a new repo on GitHub (can't be automated without gh auth).
3. `git remote add origin <url> && git branch -M main && git push -u origin main`
4. In Cloudflare dashboard: Pages → Connect to Git → pick the repo. Build command `npm run build`, output `dist`, framework preset Astro.
5. Update `CLAUDE.md` — flip the deploy status, record the production URL.

---

## Voice & style guardrails

- **Direct.** No hype words. No "stunning", "amazing", "exciting new feature". Say what it is.
- **Terse.** If a sentence can become a fragment without losing meaning, make it a fragment.
- **First person singular** on the blog and project pages. This is a personal site.
- **Pixel-friendly but modern.** Don't reintroduce the old retro-shell aesthetic (MenuBar/Window/CommandButtons) — those are retired. The retro flavor is in typography and borders, not in pretending to be a 1985 DOS program.
- **Ask before adding nav items** or top-level routes. The menu is Home / Projects / Blog, period.
