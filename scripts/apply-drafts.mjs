// Apply AI-draft descriptions/specs (from data/_drafts.json) into data/products.xlsx
// using SheetJS — the SAME library as sync/import, so the file round-trips cleanly
// (openpyxl-written cells were silently dropped by SheetJS on the next sync).
//
// The JSON shape:
//   { "drafts": { "<SKU>": { "short": "...", "specs": [["Label","Value"], ...] } },
//     "setFeatured": ["<SKU>", ...],   // optional: set these Y, all others N
//     "ensureOnSite": ["<SKU>", ...] } // optional: force Add to site = Y
//
// Only fills a BLANK Short Description (never clobbers a manual edit).
// Run: node scripts/apply-drafts.mjs            (defaults to data/_drafts.json)
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";
import { XLSX_FILE } from "./products-shared.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRAFTS = process.argv[2] || join(root, "data/_drafts.json");
const SPECS = "Specs (one per line — Label: Value)";
const COLS = [
  { wch: 6 }, { wch: 16 }, { wch: 34 }, { wch: 24 }, { wch: 42 }, { wch: 60 },
  { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 24 },
  { wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 50 },
];
const s = (v) => String(v ?? "").trim();

if (!existsSync(DRAFTS)) { console.error(`✖ drafts not found: ${DRAFTS}`); process.exit(1); }
const data = JSON.parse(readFileSync(DRAFTS, "utf8"));
const drafts = data.drafts || {};
const setSlugs = data.setSlugs || {};   // { "<SKU>": { g, c, sub } } — per-product category move
const setFeatured = data.setFeatured ? new Set(data.setFeatured) : null;
const ensureOnSite = new Set(data.ensureOnSite || []);

const wb = XLSX.read(readFileSync(XLSX_FILE), { type: "buffer" });
const rows = XLSX.utils.sheet_to_json(wb.Sheets["Products"], { defval: "" });

let applied = 0, feat = 0, onsite = 0, moved = 0;
for (const r of rows) {
  const sku = s(r["SKU"]);
  const d = drafts[sku];
  if (d && !s(r["Short Description"])) {
    r["Short Description"] = d.short;
    r[SPECS] = (d.specs || []).map(([l, v]) => `${l}: ${v}`).join("\n");
    applied++;
  }
  const mv = setSlugs[sku];
  if (mv) {
    r["Group Slug"] = mv.g; r["Category Slug"] = mv.c; r["Subcategory Slug"] = mv.sub;
    // Read-only name columns are recomputed by the next products:sync from the slugs.
    moved++;
  }
  if (setFeatured) { const y = setFeatured.has(sku); r["Featured (Y/N)"] = y ? "Y" : "N"; if (y) feat++; }
  if (ensureOnSite.has(sku)) { r["Add to site (Y/N)"] = "Y"; onsite++; }
}

const ws = XLSX.utils.json_to_sheet(rows);
ws["!cols"] = COLS;
wb.Sheets["Products"] = ws;
XLSX.writeFile(wb, XLSX_FILE);
console.log(`[apply-drafts] descriptions applied: ${applied}` +
  (moved ? ` | category moves: ${moved}` : "") +
  (setFeatured ? ` | featured set: ${feat}` : "") +
  (ensureOnSite.size ? ` | ensured on-site: ${onsite}` : ""));
