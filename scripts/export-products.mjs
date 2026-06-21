// Export src/data/products.ts -> data/products.xlsx
//
// Produces an editable workbook:
//   - "Products"   : one row per product (source order preserved)
//   - "Categories" : read-only reference of every valid group/category/subcategory slug
//
// Run: npm run products:export
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as XLSX from "xlsx";
import {
  XLSX_FILE, readProductsFile, readProductGroups, buildCategoryIndex, specsToCell,
} from "./products-shared.mjs";

const { products } = readProductsFile();
const groups = readProductGroups();
const { groupMap, triplets } = buildCategoryIndex(groups);

const nameOf = {
  group: (slug) => groupMap.get(slug)?.name ?? "",
  category: (g, slug) => groupMap.get(g)?.cats.get(slug)?.name ?? "",
  subcategory: (g, c, slug) => groupMap.get(g)?.cats.get(c)?.subs.get(slug) ?? "",
};

// --- Products sheet ---
const productRows = products.map((p) => ({
  "ID": p.id ?? "",
  "SKU": p.sku ?? "",
  "Product Name": p.name ?? "",
  "Name Override": "", // products.ts already has the resolved name; nothing to override
  "Short Description": p.shortDescription ?? "",
  "Description": p.description ?? "",
  "Group Slug": p.groupSlug ?? "",
  "Category Slug": p.categorySlug ?? "",
  "Subcategory Slug": p.subcategorySlug ?? "",
  "Group Name (read-only)": nameOf.group(p.groupSlug),
  "Category Name (read-only)": nameOf.category(p.groupSlug, p.categorySlug),
  "Subcategory Name (read-only)": nameOf.subcategory(p.groupSlug, p.categorySlug, p.subcategorySlug),
  "UOM": p.uom ?? "",
  "Pack": p.pack ?? "",
  "Add to site (Y/N)": "Y", // everything in products.ts is already on-site
  "Featured (Y/N)": p.featured ? "Y" : "N",
  "Specs (one per line — Label: Value)": specsToCell(p.specs),
}));

const wb = XLSX.utils.book_new();
const wsProducts = XLSX.utils.json_to_sheet(productRows);

// Reasonable column widths + wrap on the long text columns.
wsProducts["!cols"] = [
  { wch: 6 }, { wch: 16 }, { wch: 34 }, { wch: 24 }, { wch: 42 }, { wch: 60 },
  { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 24 },
  { wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 50 },
];
XLSX.utils.book_append_sheet(wb, wsProducts, "Products");

// --- Categories reference sheet (read-only helper) ---
const catRows = triplets.map((t) => ({
  "Group Slug": t.groupSlug,
  "Group Name": t.groupName,
  "Category Slug": t.categorySlug,
  "Category Name": t.categoryName,
  "Subcategory Slug": t.subcategorySlug,
  "Subcategory Name": t.subcategoryName,
}));
const wsCats = XLSX.utils.json_to_sheet(catRows);
wsCats["!cols"] = [{ wch: 24 }, { wch: 28 }, { wch: 24 }, { wch: 28 }, { wch: 26 }, { wch: 28 }];
XLSX.utils.book_append_sheet(wb, wsCats, "Categories");

mkdirSync(dirname(XLSX_FILE), { recursive: true });
XLSX.writeFile(wb, XLSX_FILE);

console.log(`[export] wrote ${products.length} products + ${triplets.length} category rows to data/products.xlsx`);
