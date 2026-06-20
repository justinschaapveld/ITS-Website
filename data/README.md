# Product data — Excel workflow

`products.xlsx` is the **editing surface** for the product catalogue. The site
itself reads `src/data/products.ts`; these scripts round-trip between the two so
you can manage content in a spreadsheet instead of editing TypeScript by hand.

```
src/data/products.ts   ──  npm run products:export  ──▶  data/products.xlsx
data/products.xlsx     ──  npm run products:import  ──▶  src/data/products.ts
```

## Typical workflow

1. **Export** the current data to Excel:
   ```bash
   npm run products:export
   ```
   This (re)creates `data/products.xlsx` from `src/data/products.ts`.

2. **Edit** `data/products.xlsx` in Excel / Numbers / LibreOffice. Edit the
   **Products** sheet. Save and close.

3. **Import** your changes back into the TypeScript file:
   ```bash
   npm run products:import
   ```
   If anything is invalid, it prints every problem and writes nothing. Fix the
   sheet and run it again.

4. Review the change with `git diff src/data/products.ts`, then build/commit as usual.

> Always **export before a fresh editing session** so the spreadsheet matches the
> current code (e.g. if the TS file changed since your last export).

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

- The import regenerates the `rawProducts` array in `products.ts` and preserves
  the rest of the file (types, image overlay, query helpers). The organisational
  `// --- Section ---` comments in the array are not round-tripped.
- `tags` (declared in the type but unused) and gallery `images` (owned by the
  photo auto-detection) are intentionally not in the spreadsheet.
