// Import data/products.xlsx -> src/data/products.ts
//
// Validates every row first. On ANY error it prints all problems and exits
// non-zero WITHOUT writing the file (no partial writes). On success it rewrites
// only the `rawProducts` array, preserving the rest of products.ts.
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

const errors = [];
const seenSku = new Map();
const seenId = new Map();
const out = [];

const TRUE = new Set(["y", "yes", "true", "1"]);
const FALSE = new Set(["n", "no", "false", "0", ""]);

rows.forEach((r, i) => {
  const row = i + 2; // 1-based incl header
  const get = (k) => String(r[k] ?? "").trim();
  const need = (k, field) => { const v = get(k); if (!v) errors.push(`Row ${row}: missing required "${field}"`); return v; };

  const sku = need("SKU", "SKU");
  const name = need("Product Name", "Product Name");
  const shortDescription = need("Short Description", "Short Description");
  const description = need("Description", "Description");
  const groupSlug = need("Group Slug", "Group Slug");
  const categorySlug = need("Category Slug", "Category Slug");
  const subcategorySlug = need("Subcategory Slug", "Subcategory Slug");

  // Category slug validation (only if the slugs were provided)
  const g = groupMap.get(groupSlug);
  if (groupSlug && !g) {
    errors.push(`Row ${row} (SKU ${sku || "?"}): unknown Group Slug "${groupSlug}"`);
  } else if (g) {
    const c = g.cats.get(categorySlug);
    if (categorySlug && !c) {
      errors.push(`Row ${row} (SKU ${sku || "?"}): Category Slug "${categorySlug}" not in group "${groupSlug}"`);
    } else if (c && subcategorySlug && !c.subs.has(subcategorySlug)) {
      errors.push(`Row ${row} (SKU ${sku || "?"}): Subcategory Slug "${subcategorySlug}" not in category "${categorySlug}"`);
    }
  }

  // Featured
  const fRaw = get("Featured (Y/N)").toLowerCase();
  let featured = false;
  if (TRUE.has(fRaw)) featured = true;
  else if (!FALSE.has(fRaw)) errors.push(`Row ${row} (SKU ${sku || "?"}): Featured must be Y or N (got "${get("Featured (Y/N)")}")`);

  // Specs
  const { specs, errors: specErrs } = cellToSpecs(r[SPECS_COL]);
  specErrs.forEach((e) => errors.push(`Row ${row} (SKU ${sku || "?"}): ${e}`));

  // ID (auto-assign if blank) + uniqueness
  let id = get("ID") || genId();
  if (seenId.has(id)) errors.push(`Row ${row}: duplicate ID "${id}" (also row ${seenId.get(id)})`);
  else seenId.set(id, row);
  if (sku) {
    if (seenSku.has(sku)) errors.push(`Row ${row}: duplicate SKU "${sku}" (also row ${seenSku.get(sku)})`);
    else seenSku.set(sku, row);
  }

  // image carried forward from the current file (sheet has no image column)
  const image = existingById.get(id)?.image ?? "";

  out.push({ id, sku, name, groupSlug, categorySlug, subcategorySlug, shortDescription, description, image, specs, featured });
});

if (errors.length) {
  console.error(`\n✖ Import aborted — ${errors.length} problem(s) found. No file was written:\n`);
  errors.forEach((e) => console.error(`  • ${e}`));
  console.error("");
  process.exit(1);
}

const newText = `${preamble}\n${serializeProductsArray(out)}${postamble}`;
writeFileSync(PRODUCTS_FILE, newText);
console.log(`[import] wrote ${out.length} products to src/data/products.ts`);
