# PageForge

A browser-based landing page generator. Pick a template, edit the copy, toggle and
reorder sections, watch it update live, then export a single self-contained HTML
file.

No framework, no build step, no server on the other end of the export — the
downloaded file runs anywhere you can host a static file.

---

## Table of contents

- [What it does](#what-it-does)
- [Getting started](#getting-started)
- [How it works](#how-it-works)
- [The editor](#the-editor)
- [Templates](#templates)
- [Export format](#export-format)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Roadmap](#roadmap)

---

## What it does

PageForge is a three-pane editor:

- **Left** — section list. Toggle sections on or off, move them up and down, pick an
  accent colour.
- **Center** — live preview in a sandboxed iframe at desktop, tablet or mobile width.
- **Right** — content fields grouped by section, with add/delete for repeated items.

The preview and the export are the same HTML string, so what you see is exactly what
downloads. Editing a field regenerates the document on every keystroke.

---

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:1460`.

```bash
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint     # oxlint
```

---

## How it works

The whole app is one source of truth:

```
state (React) ──► buildPage(state, order) ──► HTML string ──► iframe.srcdoc
                                              └────────────► Blob download
```

1. `state` holds everything — brand, hero copy, feature list, pricing tiers, accent
   colour, active template.
2. `order` holds which sections are visible and in what sequence.
3. `buildPage()` maps each enabled section through its renderer, wraps them in one
   document with a shared stylesheet, and returns a string.
4. The same string goes to the preview iframe and to the export blob.

Because there is no separate template runtime, the preview cannot drift from the
export.

---

## The editor

**Sections panel** — nine sections, each toggleable. Navigation and footer are locked
on because removing them produces a page with no way back. Reordering is a single
click with the arrows; the order array is the only thing that changes.

**Content panel** — accordion groups for Brand, Hero, Features, Stats, Pricing and
Call to action. Features can be added and removed; pricing tiers expose their price,
note and feature list. Textareas are used where wrapping matters.

**Accent colour** — six swatches plus per-template defaults. It flows into buttons,
links, icons, borders, gradient panels and the highlighted pricing card through a
single CSS custom property (`--a`).

**Device switcher** — the preview stage rescales to fit the available width, so a
1180px desktop canvas, a 768px tablet canvas and a 390px phone canvas all remain
visible without horizontal scrolling. The percentage is shown next to the document
size.

---

## Templates

Three presets, each a colour scheme plus a light/dark base:

| Template | Feel | Base |
| --- | --- | --- |
| **Nova** | SaaS product, warm orange | light |
| **Atlas** | Studio / agency, cool blue | dark |
| **Bloom** | Local business, green | light |

Switching a template also swaps the accent colour. All three share the same section
renderers — the difference is the colour system in `baseCss()`.

---

## Export format

The export is one `.html` file containing:

- inline stylesheet with custom properties for the accent palette
- all markup, no external CSS or JS
- Google Fonts via `<link>` (the only network request; falls back to system sans)
- lazy-loaded images
- responsive breakpoints at 720px, 860px and 960px

There is no framework, no bundle and no build output to re-upload. Drop it on Netlify,
GitHub Pages, S3, or open it straight off your disk.

Images point at Unsplash URLs by default — swap the hero image URL in the editor for
your own asset before exporting.

---

## Project structure

```
pageforge/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               # entry
    ├── App.jsx                # three-pane editor + preview
    ├── index.css              # Tailwind theme + editor chrome
    └── data/
        ├── templates.js       # TEMPLATES, SECTION_META, defaultState, esc()
        └── build.js           # buildPage() + per-section HTML renderers
```

`build.js` is where the generated site lives. Each section is a function taking the
state and returning an HTML fragment; `baseCss()` returns the shared stylesheet.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on `127.0.0.1:1460` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run oxlint |

---

## Roadmap

Reasonable next steps, none of which are implemented:

- drag-and-drop reordering instead of arrow buttons
- more sections — FAQ, contact form, team, before/after
- image upload instead of URL input
- export the editor state as JSON so a page can be reopened later
- custom fonts and a font picker
- undo / redo

---

## Notes

- PageForge is an original build; the section patterns follow common marketing-page
  conventions rather than any specific template.
- Exported content is whatever you type — nothing is sent anywhere, there is no
  backend.
- Preview runs in a sandboxed iframe with `allow-same-origin` for document access.