# Product data — Excel workflow

`data/products.xlsx` is the **source of truth** for the product catalogue. The
site reads `src/data/products.ts`, which is now **generated from the spreadsheet**
— you don't edit it by hand.

The import runs automatically:
- **During `npm run dev`** — a watcher re-imports whenever you save the spreadsheet.
- **At build time** (`npm run build`, including Netlify) — via the `prebuild` hook.

```
data/products.xlsx  ──(auto: dev watcher + build hook)──▶  src/data/products.ts  ──▶  site
```

## Everyday workflow

1. Start the dev server (once): `npm run dev`.
2. **Edit `data/products.xlsx`** in Excel / Numbers / LibreOffice (Products sheet),
   then **save**. The watcher imports it and your local preview (http://localhost:5173)
   refreshes automatically.
   - If something is invalid, the terminal prints the problems and the site is left
     unchanged — fix the sheet and save again.
3. **Publish:** commit your changes and push.
   ```bash
   git add data/products.xlsx src/data/products.ts
   git commit -m "Update product data"
   git push
   ```
   Netlify re-imports the spreadsheet at build time and deploys.

> A git **push is always required** to update the live site — a static site can't
> update itself from the spreadsheet without a deploy.

### Manual commands (rarely needed)
- `npm run products:export` — rebuild the spreadsheet **from** `products.ts`
  (use only if `products.ts` was changed directly, e.g. by another tool).
- `npm run products:import` — import once without the watcher.

## The "Products" sheet — columns

| Column | Required | Meaning |
|---|---|---|
| ID | auto | Stable id (`p001`…), also used in product URLs. **Leave blank for a new product** — import assigns the next id. Don't change an existing id (it changes the URL). |
| SKU | ✅ | Uppercase product code, e.g. `TPM-TOOL-PRO`. Must be unique. Also the photo filename key. |
| Product Name | ✅ | Display name. |
| Short Description | ✅ | One-line tagline. |
| Description | ✅ | Full description. |
| Group Slug | ✅ | Must match a slug from the **Categories** sheet. |
| Category Slug | ✅ | Must belong to the chosen group. |
| Subcategory Slug | ✅ | Must belong to the chosen category. |
| Group / Category / Subcategory Name | — | **Read-only** helper columns, filled on export so you can read the slugs. Ignored on import. |
| Featured (Y/N) | — | `Y` shows the "Featured" badge on the product page. (The home-page featured row is a separate explicit list in `HomePage.tsx`.) |
| Specs (one per line — Label: Value) | — | One spec per line inside the cell, formatted `Label: Value` (e.g. `Diameter: 100mm`). Use Alt+Enter (Excel) / Ctrl+Enter to add a line within a cell. |

The **Categories** sheet is a read-only reference of every valid
Group / Category / Subcategory slug combination — copy slugs from it to avoid typos.

## Adding a new product

Add a row on the **Products** sheet:
- Leave **ID** blank (auto-assigned).
- Fill SKU, name, descriptions, and the three slugs (copy slugs from the
  **Categories** sheet).
- Add specs, one `Label: Value` per line.
- Set Featured to `Y` or `N`.

Then `npm run products:import`.

## Validation rules (import fails loudly if violated)

- All required columns present and non-empty.
- SKU unique; ID unique.
- Group / Category / Subcategory slugs exist and nest correctly.
- `Featured` is `Y` or `N` (blank = N).
- Each spec line contains the `: ` separator with a non-empty label and value.

On any failure, the import lists every problem with its row number and **does not
write** `products.ts`.

## Images

Product photos are **not** managed here. They are auto-detected by SKU filename —
drop `public/products/<SKU>.jpg` (plus `<SKU>-1.jpg`, `<SKU>-2.jpg` … for extra
shots) and rebuild. See `PROJECT_OVERVIEW.md` → "Product image system".

## Notes / limitations

- **Don't hand-edit `src/data/products.ts`** — it's generated from the spreadsheet
  and will be overwritten on the next save/dev start/build. Edit the spreadsheet
  instead. (If you must change the TS directly, run `npm run products:export`
  afterwards to sync the spreadsheet back.)
- The import regenerates the `rawProducts` array in `products.ts` and preserves
  the rest of the file (types, image overlay, query helpers). The organisational
  `// --- Section ---` comments in the array are not round-tripped.
- `tags` (declared in the type but unused) and gallery `images` (owned by the
  photo auto-detection) are intentionally not in the spreadsheet.
