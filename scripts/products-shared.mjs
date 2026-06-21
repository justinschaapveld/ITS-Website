// Shared helpers for the products Excel round-trip (export/import scripts).
//
// Strategy: src/data/products.ts stays the source format the site reads. These
// scripts only read/write the `rawProducts` array inside it — the import splices
// the regenerated array between the file's existing preamble (imports + types)
// and postamble (the image overlay + query helpers), so everything else is
// preserved byte-for-byte.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const PRODUCTS_FILE = join(root, "src/data/products.ts");
export const CATEGORIES_FILE = join(root, "src/data/categories.ts");
export const XLSX_FILE = join(root, "data/products.xlsx");

// Field order for serialized product objects — must match the existing file.
// `image` is carried through (not edited via the sheet); `images`/`tags` are
// intentionally never emitted (galleries come from productImages.ts; tags unused).
const FIELD_ORDER = [
  "id", "sku", "name", "groupSlug", "categorySlug", "subcategorySlug",
  "uom", "pack", "shortDescription", "description", "image", "specs", "featured",
];

// Split a TS file around a top-level array literal, returning the text before
// the opening `[`, the array body (items only), and the text from `\n];` on.
function splitAroundArray(text, marker) {
  const start = text.indexOf(marker);
  if (start === -1) throw new Error(`Could not find "${marker}" in source file.`);
  if (!marker.endsWith("[")) throw new Error(`Marker must end at the array's "[": ${marker}`);
  const open = start + marker.length - 1; // the array's opening "[" (not the "[" in "Product[]")
  const close = text.indexOf("\n];", open);
  if (close === -1) throw new Error(`Could not find array close "];" after "${marker}".`);
  return {
    preamble: text.slice(0, open + 1), // up to and including "["
    body: text.slice(open + 1, close), // the items (may include comments/trailing commas)
    postamble: text.slice(close),      // starts at "\n];"
  };
}

// Evaluate a TS array-literal body as plain JS data. The items are pure object
// literals (no identifiers/calls), so this safely yields their values; it also
// tolerates `//` comments and trailing commas that JSON.parse would reject.
function evalArrayBody(body) {
  // eslint-disable-next-line no-new-func
  return new Function(`return [${body}\n];`)();
}

export function readProductsFile() {
  const text = readFileSync(PRODUCTS_FILE, "utf8");
  const { preamble, body, postamble } = splitAroundArray(text, "const rawProducts: Product[] = [");
  return { preamble, postamble, products: evalArrayBody(body) };
}

export function readProductGroups() {
  const text = readFileSync(CATEGORIES_FILE, "utf8");
  const { body } = splitAroundArray(text, "export const productGroups: ProductGroup[] = [");
  return evalArrayBody(body);
}

// Build lookup structures for validation, name resolution, and the reference sheet.
export function buildCategoryIndex(groups) {
  const groupMap = new Map();      // groupSlug -> { name, categories: Map }
  const triplets = [];             // { groupSlug, groupName, categorySlug, categoryName, subcategorySlug, subcategoryName }
  for (const g of groups) {
    const catMap = new Map();
    for (const c of g.categories) {
      const subMap = new Map();
      for (const s of c.subcategories) {
        subMap.set(s.slug, s.name);
        triplets.push({
          groupSlug: g.slug, groupName: g.name,
          categorySlug: c.slug, categoryName: c.name,
          subcategorySlug: s.slug, subcategoryName: s.name,
        });
      }
      catMap.set(c.slug, { name: c.name, subs: subMap });
    }
    groupMap.set(g.slug, { name: g.name, cats: catMap });
  }
  return { groupMap, triplets };
}

const SPEC_SEP = ": "; // label/value separator within a spec line

export function specsToCell(specs) {
  return (specs || []).map((s) => `${s.label}${SPEC_SEP}${s.value}`).join("\n");
}

// Returns { specs, errors } — errors describe lines missing the separator.
export function cellToSpecs(cell) {
  const errors = [];
  const specs = [];
  const lines = String(cell ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const idx = line.indexOf(SPEC_SEP);
    if (idx === -1) { errors.push(`spec line missing "${SPEC_SEP}" separator: "${line}"`); continue; }
    const label = line.slice(0, idx).trim();
    const value = line.slice(idx + SPEC_SEP.length).trim();
    if (!label || !value) { errors.push(`spec line has empty label or value: "${line}"`); continue; }
    specs.push({ label, value });
  }
  return { specs, errors };
}

// Serialize one product to match the existing file style exactly.
export function serializeProduct(p) {
  const lines = ["  {"];
  for (const key of FIELD_ORDER) {
    if (key === "specs") {
      if (!p.specs || p.specs.length === 0) { lines.push("    specs: [],"); continue; }
      lines.push("    specs: [");
      for (const s of p.specs) {
        lines.push(`      { label: ${JSON.stringify(s.label)}, value: ${JSON.stringify(s.value)} },`);
      }
      lines.push("    ],");
    } else if (key === "featured") {
      if (p.featured === true) lines.push("    featured: true,");
    } else if (key === "uom" || key === "pack") {
      // Optional inventory fields — only emit when present, to keep the file tidy.
      if (p[key]) lines.push(`    ${key}: ${JSON.stringify(p[key])},`);
    } else {
      lines.push(`    ${key}: ${JSON.stringify(p[key] ?? "")},`);
    }
  }
  lines.push("  },");
  return lines.join("\n");
}

export function serializeProductsArray(products) {
  return products.map(serializeProduct).join("\n");
}
