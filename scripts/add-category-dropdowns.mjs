// Adds CASCADING category dropdowns to data/products.xlsx so the slug columns can
// only hold valid combos when edited by hand:
//   Group Slug      → list of the 10 product groups
//   Category Slug   → filtered to the chosen group's categories
//   Subcategory Slug→ filtered to the chosen group+category's subcategories
//
// How it works (standard Excel dependent-dropdown trick): a hidden "Lists" sheet
// holds one column per group (its categories) and one per group+category (its
// subcategories); each list is a workbook defined-name (slug hyphens → underscores,
// since Excel names can't contain "-"). The Category/Subcategory validations resolve
// their list at runtime via INDIRECT(SUBSTITUTE(...)).
//
// ⚠️ exceljs writes the validation; SheetJS (sync/import) does NOT preserve it, so
// re-run this AFTER any `npm run products:sync`. It only reads/writes cell VALUES the
// same as SheetJS would, so the data round-trips cleanly (verified by products:import).
//
// Run: npm run products:dropdowns
import ExcelJS from "exceljs";
import { XLSX_FILE } from "./products-shared.mjs";

const san = (slug) => String(slug).trim().replaceAll("-", "_");
const colLetter = (n) => { let s = ""; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(XLSX_FILE);

const productsWs = wb.getWorksheet("Products");
const catWs = wb.getWorksheet("Categories");
if (!productsWs || !catWs) throw new Error("products.xlsx must have 'Products' and 'Categories' sheets — run npm run products:sync first.");

// --- Build the group → category → subcategory tree from the Categories sheet ---
const tree = {}; const groupOrder = [];
catWs.eachRow((row, rn) => {
  if (rn === 1) return; // header
  const g = String(row.getCell(1).value ?? "").trim();
  const c = String(row.getCell(3).value ?? "").trim();
  const sub = String(row.getCell(5).value ?? "").trim();
  if (!g || !c || !sub) return;
  if (!tree[g]) { tree[g] = { order: [], cats: {} }; groupOrder.push(g); }
  if (!tree[g].cats[c]) { tree[g].cats[c] = []; tree[g].order.push(c); }
  if (!tree[g].cats[c].includes(sub)) tree[g].cats[c].push(sub);
});

// --- Idempotency: drop any prior Lists sheet, defined names, and slug validations ---
const prior = wb.getWorksheet("Lists");
if (prior) wb.removeWorksheet(prior.id);
const wantNames = new Set(["cat_groups"]);
for (const g of groupOrder) { wantNames.add(san(g)); for (const c of tree[g].order) wantNames.add(`${san(g)}___${san(c)}`); }
for (const name of wantNames) { try { wb.definedNames.remove(name); } catch { /* not present */ } }
try { for (const key of Object.keys(productsWs.dataValidations.model)) delete productsWs.dataValidations.model[key]; } catch { /* none */ }

// --- Hidden Lists sheet + defined names ---
const lists = wb.addWorksheet("Lists", { state: "hidden" });
let col = 1;
const defName = (name, c, r1, r2) => { const L = colLetter(c); wb.definedNames.add(`Lists!$${L}$${r1}:$${L}$${r2}`, name); };

// Column 1: the group slugs
lists.getCell(1, col).value = "groups";
groupOrder.forEach((g, i) => { lists.getCell(2 + i, col).value = g; });
defName("cat_groups", col, 2, 1 + groupOrder.length);
col++;

// One column per group → its categories
for (const g of groupOrder) {
  lists.getCell(1, col).value = san(g);
  tree[g].order.forEach((c, i) => { lists.getCell(2 + i, col).value = c; });
  defName(san(g), col, 2, 1 + tree[g].order.length);
  col++;
}
// One column per group+category → its subcategories
for (const g of groupOrder) {
  for (const c of tree[g].order) {
    const subs = tree[g].cats[c];
    lists.getCell(1, col).value = `${san(g)}___${san(c)}`;
    subs.forEach((sub, i) => { lists.getCell(2 + i, col).value = sub; });
    defName(`${san(g)}___${san(c)}`, col, 2, 1 + subs.length);
    col++;
  }
}

// --- Cascading validations on Products G/H/I (data rows 2..last) ---
const last = productsWs.rowCount; // header + data
const base = { type: "list", allowBlank: true, showErrorMessage: true, errorStyle: "warning",
  errorTitle: "Not in the list", error: "Pick a value from the dropdown so the group / category / subcategory combo stays valid." };
productsWs.dataValidations.add(`G2:G${last}`, { ...base, formulae: ["cat_groups"],
  showInputMessage: true, promptTitle: "Product group", prompt: "Pick a group — Category and Subcategory then filter to match." });
productsWs.dataValidations.add(`H2:H${last}`, { ...base, formulae: ['INDIRECT(SUBSTITUTE($G2,"-","_"))'] });
productsWs.dataValidations.add(`I2:I${last}`, { ...base, formulae: ['INDIRECT(SUBSTITUTE($G2,"-","_")&"___"&SUBSTITUTE($H2,"-","_"))'] });

await wb.xlsx.writeFile(XLSX_FILE);
const nNames = groupOrder.length + Object.values(tree).reduce((a, g) => a + g.order.length, 0) + 1;
console.log(`[dropdowns] cascading validation on G/H/I for rows 2..${last}; ${nNames} defined-name lists; Lists sheet hidden.`);
