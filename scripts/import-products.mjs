// Import data/products.xlsx -> src/data/products.ts
//
// Validates per row: a row with a disqualifying problem (missing field, invalid
// category combo, duplicate SKU/ID) is SKIPPED and reported, while every valid row
// is still published — so one bad row can't silently block the whole catalogue.
// Soft issues (a stray Featured value, a malformed spec line) just warn. It rewrites
// only the `rawProducts` array, preserving the rest of products.ts. (A truly fatal
// problem — missing file/sheet — still exits non-zero.)
//
// The Image Path column is intentionally absent from the sheet, so each product's
// existing `image` value is carried forward from the current products.ts (matched
// by ID). New rows (blank ID) get an auto-assigned id and image: "".
//
// Run: npm run products:import
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import * as XLSX from "xlsx";
import {
  PRODUCTS_FILE, XLSX_FILE, readProductsFile, readProductGroups,
  buildCategoryIndex, cellToSpecs, serializeProductsArray,
} from "./products-shared.mjs";

const SPECS_COL = "Specs (one per line — Label: Value)";

function fail(message) { console.error(`\n✖ ${message}\n`); process.exit(1); }

if (!existsSync(XLSX_FILE)) {
  fail(`data/products.xlsx not found. Run "npm run products:export" first, then edit it.`);
}

const wb = XLSX.read(readFileSync(XLSX_FILE), { type: "buffer" });
const ws = wb.Sheets["Products"];
if (!ws) fail(`No "Products" sheet found in data/products.xlsx.`);
const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

const { preamble, postamble, products: existing } = readProductsFile();
const { groupMap } = buildCategoryIndex(readProductGroups());
const existingById = new Map(existing.map((p) => [p.id, p]));

// Next free pNNN id (above any id already in the file or the sheet).
let maxNum = 0;
const noteId = (id) => { const m = /^p(\d+)$/.exec(String(id).trim()); if (m) maxNum = Math.max(maxNum, +m[1]); };
existing.forEach((p) => noteId(p.id));
rows.forEach((r) => noteId(r.ID));
let nextNum = maxNum + 1;
const genId = () => `p${String(nextNum++).padStart(3, "0")}`;

const skipped = [];   // rows omitted from the site (invalid) — { row, sku, reasons[] }
const warnings = [];  // soft issues that did NOT drop the row
const seenSku = new Map();
const seenId = new Map();
const out = [];
let skippedOffSite = 0;

const TRUE = new Set(["y", "yes", "true", "1"]);
const FALSE = new Set(["n", "no", "false", "0", ""]);
// Only an explicit "no" hides a product; blank/absent keeps it on-site (back-compat
// with the original sheet, which had no "Add to site" column).
const OFF_SITE = new Set(["n", "no", "false", "0"]);
const ADD_COL = "Add to site (Y/N)";
const hasAddCol = rows.length > 0 && Object.prototype.hasOwnProperty.call(rows[0], ADD_COL);

rows.forEach((r, i) => {
  const row = i + 2; // 1-based incl header
  const get = (k) => String(r[k] ?? "").trim();

  // Off-site rows never reach products.ts (and aren't validated).
  if (hasAddCol && OFF_SITE.has(get(ADD_COL).toLowerCase())) { skippedOffSite++; return; }

  const sku = get("SKU");
  // A "Name Override" wins over the inventory-derived "Product Name" when present.
  const name = get("Name Override") || get("Product Name");
  const groupSlug = get("Group Slug");
  const categorySlug = get("Category Slug");
  const subcategorySlug = get("Subcategory Slug");

  // Disqualifying problems — collected per row so ONE bad row is skipped, not the
  // whole import. The valid rows are still published.
  const reasons = [];
  if (!sku) reasons.push("missing SKU");
  if (!name) reasons.push("missing Product Name");
  if (!groupSlug) reasons.push("missing Group Slug");
  if (!categorySlug) reasons.push("missing Category Slug");
  if (!subcategorySlug) reasons.push("missing Subcategory Slug");

  if (groupSlug && categorySlug && subcategorySlug) {
    const g = groupMap.get(groupSlug);
    if (!g) reasons.push(`unknown Group Slug "${groupSlug}"`);
    else {
      const c = g.cats.get(categorySlug);
      if (!c) reasons.push(`Category "${categorySlug}" not in group "${groupSlug}"`);
      else if (!c.subs.has(subcategorySlug)) reasons.push(`Subcategory "${subcategorySlug}" not in category "${categorySlug}"`);
    }
  }

  const id = get("ID") || genId();
  if (sku && seenSku.has(sku)) reasons.push(`duplicate SKU (also row ${seenSku.get(sku)})`);
  if (get("ID") && seenId.has(id)) reasons.push(`duplicate ID "${id}" (also row ${seenId.get(id)})`);

  if (reasons.length) { skipped.push({ row, sku, reasons }); return; }

  // Soft issues — keep the product, just warn.
  const fRaw = get("Featured (Y/N)").toLowerCase();
  let featured = false;
  if (TRUE.has(fRaw)) featured = true;
  else if (!FALSE.has(fRaw)) warnings.push(`Row ${row} (SKU ${sku}): Featured "${get("Featured (Y/N)")}" isn't Y/N — treated as N`);

  const { specs, errors: specErrs } = cellToSpecs(r[SPECS_COL]);
  specErrs.forEach((e) => warnings.push(`Row ${row} (SKU ${sku}): ${e} — that spec line dropped`));

  // Accept the row.
  seenId.set(id, row);
  if (sku) seenSku.set(sku, row);
  const image = existingById.get(id)?.image ?? ""; // sheet has no image column
  out.push({
    id, sku, name, groupSlug, categorySlug, subcategorySlug,
    uom: get("UOM"), pack: get("Pack"),
    shortDescription: get("Short Description"), description: get("Description"),
    image, specs, featured,
  });
});

// Always publish the valid rows — a single bad row no longer blocks the catalogue.
const newText = `${preamble}\n${serializeProductsArray(out)}${postamble}`;
writeFileSync(PRODUCTS_FILE, newText);

console.log(`[import] wrote ${out.length} products to src/data/products.ts` +
  (skippedOffSite ? ` (${skippedOffSite} hidden via "Add to site = N")` : ""));

if (warnings.length) {
  console.warn(`[import] ⚠ ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.warn(`  • ${w}`));
}
if (skipped.length) {
  const lines = skipped.map((s) => `Row ${s.row} (SKU ${s.sku || "?"}): ${s.reasons.join("; ")}`);
  console.warn(`[import] ⚠ SKIPPED ${skipped.length} invalid row(s) — fix in data/products.xlsx (the rest were published):`);
  lines.forEach((l) => console.warn(`  • ${l}`));
  // Machine-readable line so the dev watcher can surface this in the browser overlay.
  console.log("__IMPORT_SKIPPED__" + JSON.stringify(lines));
}
