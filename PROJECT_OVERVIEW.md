# Industrial Tyre Supplies — Website Overview

A brochure/catalogue website for **Industrial Tyre Supplies (ITS)**, a Melbourne-based
wholesale supplier of tools and materials for the tyre trade. The site presents the
product range, company information, and quote-request paths. It is a static
single-page application with no backend — all content lives in typed data modules.

> This document is a snapshot of the project structure and conventions as a handoff
> reference. Last updated after the spreadsheet-driven product data workflow landed (`ca889b9`).

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 18 (`^18.3.1`) |
| Build tool | Vite 5 (`^5.4.2`) |
| Language | TypeScript (`^5.5.3`) |
| Routing | React Router (`react-router-dom ^7.15.1`) |
| Styling | Tailwind CSS (`^3.4.1`) + CSS custom properties in `src/index.css` |
| Icons | `lucide-react` (UI) + hand-built SVG icons (category tiles) |
| Data tooling | SheetJS (`xlsx`, dev-only) for the product spreadsheet round-trip |
| Hosting | Netlify (static, SPA) |

> `@supabase/supabase-js` is listed in dependencies but is **not** currently used —
> the data layer is entirely static TypeScript. No database/API is wired up.

---

## Running the project

```bash
npm install
npm run dev        # local dev server (Vite) on http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit (type safety; NOT run by the Netlify build)
npm run lint       # eslint

npm run products:export  # src/data/products.ts -> data/products.xlsx
npm run products:import  # data/products.xlsx -> src/data/products.ts (validated)
```

`predev` and `prebuild` hooks automatically run the spreadsheet import **and** the
image-map generator first, so `products.ts` is regenerated from `data/products.xlsx`
before dev/build (see [Product data — Excel workflow](#product-data--excel-workflow)
and [Product image system](#product-image-system)).

---

## Directory structure

```
ITS-Website/
├─ public/
│  ├─ _redirects               # Netlify SPA fallback: /*  /index.html  200
│  ├─ ITS_Logo.png, logo.png   # brand
│  ├─ hero/hero-1..5.jpg       # hero/backdrop imagery (lowercase folder — see note)
│  └─ products/<SKU>.jpg       # product photos, filename = SKU (uppercase)
├─ data/
│  ├─ products.xlsx            # SOURCE OF TRUTH for product content (committed)
│  └─ README.md                # the Excel workflow, documented
├─ scripts/
│  ├─ generate-product-images.mjs   # scans public/products/, emits src/data/productImages.ts
│  ├─ export-products.mjs            # products.ts -> data/products.xlsx
│  ├─ import-products.mjs            # data/products.xlsx -> products.ts (validated)
│  └─ products-shared.mjs           # shared parse/serialize/validate helpers
├─ src/
│  ├─ main.tsx                 # React entry
│  ├─ App.tsx                  # routes (see Routing)
│  ├─ index.css               # Google Fonts + CSS custom-property design tokens
│  ├─ components/
│  │  ├─ Layout.tsx            # Header + <Outlet/> + Footer
│  │  ├─ Header.tsx            # top bar, search, desktop mega-menu, mobile drawer
│  │  ├─ Footer.tsx            # quick links + product categories + legal strip
│  │  ├─ Breadcrumbs.tsx
│  │  ├─ HeroCarousel.tsx
│  │  ├─ ScrollToTop.tsx       # resets scroll on route change
│  │  ├─ QuoteRequestForm.tsx / QuoteRequestModal.tsx
│  │  └─ icons/                # 7 custom SVG category icons (see Custom icons)
│  ├─ data/
│  │  ├─ categories.ts         # product taxonomy (groups → categories → subcategories)
│  │  ├─ products.ts           # GENERATED from data/products.xlsx (do not hand-edit)
│  │  └─ productImages.ts      # AUTO-GENERATED SKU→photo map (do not edit by hand)
│  └─ pages/                   # one component per route (13 pages)
├─ netlify.toml                # pins build to `npm run build` (so prebuild import runs)
├─ tailwind.config.js          # theme tokens + animate-scroll keyframe
├─ vite.config.ts              # React + dev watcher that auto-imports the spreadsheet
└─ package.json
```

---

## Routing

Defined in `src/App.tsx`. All routes render inside `Layout` (Header + Footer).
`ScrollToTop` resets scroll position on navigation.

| Path | Page |
|---|---|
| `/` | HomePage |
| `/products` | ProductsPage (all groups) |
| `/products/:groupSlug` | GroupPage |
| `/products/:groupSlug/:categorySlug` | CategoryPage |
| `/products/:groupSlug/:categorySlug/:subcategorySlug` | SubcategoryPage |
| `/products/:groupSlug/:categorySlug/:subcategorySlug/:productId` | ProductDetailPage |
| `/about`, `/contact`, `/training`, `/shipping`, `/returns` | static info pages |
| `/search` | SearchPage (`?q=`) |
| `/request-a-quote` | RequestAQuotePage |
| `/privacy`, `/terms`, `*` | placeholder pages (coming soon / 404) |

Because routing is client-side, `public/_redirects` makes Netlify serve
`index.html` for every path so deep links don't 404.

---

## Data model

All product data is static TypeScript in `src/data/`.

**`categories.ts`** — the taxonomy:
```
ProductGroup → Category → Subcategory
```
`productGroups` drives the mega-menu, the products landing page, category counts,
and breadcrumbs. Helpers: `getGroupBySlug`, `getCategoryBySlug`, `getSubcategoryBySlug`.

**`products.ts`** — the `Product[]` catalogue. Each product has `id`, `sku`, `name`,
group/category/subcategory slugs, descriptions, `image`, optional `images[]`,
`specs[]`, and an optional `featured` flag. The exported `products` array is the
raw records with **local photos overlaid by SKU** (see below). Helpers:
`getProductById`, `getProductsByCategory`, `getProductsByGroup`,
`getFeaturedProducts`, `searchProducts`.
**This file is generated from `data/products.xlsx`** — edit the spreadsheet, not the TS.

**`productImages.ts`** — auto-generated; never edit by hand.

---

## Product data — Excel workflow

`data/products.xlsx` is the **committed source of truth** for product content;
`src/data/products.ts` is generated from it. Full details in
[`data/README.md`](data/README.md). In short:

- **Editing:** open `data/products.xlsx` (Products sheet). With `npm run dev`
  running, a Vite dev plugin re-imports on save and reloads the preview — no
  manual command. The import also runs via the `predev`/`prebuild` hooks.
- **Publishing:** `git add -A && git commit && git push`. `netlify.toml` pins the
  deploy to `npm run build`, whose `prebuild` re-imports the spreadsheet, so the
  committed workbook drives the live data. (A push is still required — static host.)
- **Validation:** the import checks required fields, unique SKU/ID, valid nested
  category slugs, Y/N featured, and spec-line format; on any error it lists every
  problem and writes nothing.
- **Not in the sheet:** images (owned by the SKU-filename system), gallery
  `images[]`, and `tags`. Specs live one-per-line (`Label: Value`) in a single cell.
- `scripts/export-products.mjs` regenerates the workbook **from** `products.ts`
  (use only if the TS was changed directly, e.g. by another tool).

---

## Product image system

Photos are matched to products **automatically by filename** — you never edit
`products.ts` to attach an image.

**Convention** (case-sensitive on Netlify, so follow exactly):
- Primary photo: `public/products/<SKU>.jpg` — filename equals the SKU verbatim,
  **uppercase**, lowercase `.jpg` extension. e.g. `TPM-TOOL-PRO.jpg`.
- Gallery extras: `<SKU>-1.jpg`, `<SKU>-2.jpg`, … Numbering gaps are tolerated
  (e.g. `-2` and `-3` with no `-1` still both appear).
- Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`.

**How it works:**
1. `scripts/generate-product-images.mjs` scans `public/products/`, matches each
   file to a SKU (read from `products.ts`), and writes `src/data/productImages.ts`
   as a `SKU → [paths]` map.
2. It runs automatically via the `predev` / `prebuild` npm hooks (and can be run
   manually with `npm run gen:images`).
3. `products.ts` overlays that map onto each product: a product with a local photo
   gets `image` (primary) and `images[]` (full gallery); products without one keep
   their existing placeholder.

**Adding photos = drop files in `public/products/` and rebuild.** The generated
map is committed, so it's part of the diff and deploys correctly regardless of the
host's build command.

Products currently on real local photos: `CAR-CW-100`, `RAD-P-110`, `TW-NOR-800`,
`TW-NOR-300`, `AIR-IW-34-1200`, `TPM-TOOL-PRO` (gallery), `TPM-SEN-UNI-01` (gallery).
The remaining products still show placeholder imagery until photos are added.

> **Folder casing note:** Netlify's CDN is case-sensitive but macOS is not, so a
> mismatched-case file/folder works locally then 404s in production. Keep the
> folder lowercase (`public/products/`) and filenames exactly matching the SKU.

---

## Featured products (home page)

The home "Featured Products" row is an **explicit, ordered SKU list** in
`src/pages/HomePage.tsx` (`FEATURED_SKUS`), independent of the per-product
`featured` flag (which only drives the "Featured" badge on detail pages, and is
set on more products than the row displays). To change the row, edit that array.

Current order: `TPM-TOOL-PRO`, `RAD-P-110`, `TW-NOR-800`, `AIR-IW-34-1200`.

---

## Design system

Defined as CSS custom properties in `src/index.css` and mirrored as Tailwind
tokens in `tailwind.config.js`. The aesthetic is **"spec-format"** — the site reads
like a trade document: field labels in mono, values in sans, hairline rule dividers.

**Type:**
- `font-display` — Barlow Condensed 800 (headlines, card titles, uppercase)
- `font-sans` — IBM Plex Sans (body)
- `font-mono` — IBM Plex Mono (SKUs, field labels, spec values, eyebrows only —
  never on buttons/headlines/prose)

**Colour tokens** (`--color-*`): `ink` `#1a1a1a`, `teal` `#2d5260` /
`teal-dark` `#1f3d47`, `field` `#edeef0`, `steel` `#6b7c83`, `signal` `#f5b800`,
`rule` `#ced5d8`. Legacy aliases (`charcoal`, `offwhite`, `yellow`) remain for
older components.

**Product imagery** uses `object-contain` on a white, padded backdrop everywhere
(listing cards, detail gallery, related, featured) so whole product shots show
without cropping.

### Custom icons
Seven hand-built SVG line-art icons in `src/components/icons/`, one per home-page
category tile. Shared style: `viewBox="0 0 64 64"`, `stroke="currentColor"`,
`strokeWidth="2.5"`, round caps/joins, `fill="none"`. They are: `ValveIcon`,
`BottleJackIcon`, `RepairPatchIcon`, `ImpactWrenchIcon`, `TyreLeverIcon`,
`BalanceWeightIcon`, `ToolChestIcon`.

---

## Notable component behaviour

- **Header mega-menu** (`Header.tsx`): hover-opened desktop dropdown. The close
  handler skips closing when the pointer is within the panel's rectangle — this
  guards against an open-render race that previously dismissed the menu when
  approached from below.
- **ProductDetailPage**: gallery uses `product.images` when present (auto-detected
  shots); products without local photos fall back to a faked multi-shot gallery
  derived from their placeholder URL. Single-image products hide the thumbnail strip.
- **Quote flow**: `QuoteRequestModal` / `QuoteRequestForm` and the
  `/request-a-quote` page. Pricing is not shown; CTAs route to quote/contact.

---

## Confirmed business facts

These are the only verified details and the source of truth for site content (a
strict no-fabrication policy applies — do not invent accreditations, testimonials,
or stats):

- **Company:** Industrial Tyre Supplies Pty Ltd · **ABN** 48 533 559 801
- **Address:** 2 Venture Court, Dandenong South, Victoria 3175
- **Phone:** 03 8781 0600 · **Email:** its-office@itsindustrial.com.au
- **Hours:** Mon–Fri 8:00am–4:00pm · **Established:** 1978
- Dispatches Australia-wide from the Melbourne warehouse.

---

## Working conventions

- Commit before any substantial change. Each design pass is its own commit
  with a clear message; the working tree should be clean before starting new work.
- Plan-then-build for substantive design or feature work. Sketch the approach
  in prose before writing code, especially for creative work (icons, motion).
- Review in the browser before committing visual changes. Don't auto-commit.
- Mono discipline: IBM Plex Mono only on data-origin content (SKUs, field labels,
  spec values, mono eyebrows). Never on buttons, headlines, or prose.
- No fabricated facts. If a stat, certification, testimonial, or business
  detail isn't in the Confirmed business facts section, don't add it.

---

## Deployment

- Host: **Netlify** (connected to the GitHub repo; pushes to `main` auto-deploy).
- Build: `npm run build` → `dist/` (pinned via `netlify.toml`). The `prebuild` hook
  imports `data/products.xlsx` → `products.ts` and regenerates the image map.
- SPA routing handled by `public/_redirects`.
- Note: the build does not run `tsc`, so type errors won't fail the deploy —
  run `npm run typecheck` locally to catch them.

---

## Open / future items

- Add remaining product photos (drop into `public/products/`, naming = SKU).
- `/privacy`, `/terms` are placeholders.
- Quote form submission target/handler (currently front-end only).
- `@supabase/supabase-js` dependency is unused and could be removed if no backend
  is planned.
