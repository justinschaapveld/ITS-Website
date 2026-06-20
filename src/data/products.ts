import { productImages } from "./productImages";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  groupSlug: string;
  categorySlug: string;
  subcategorySlug: string;
  shortDescription: string;
  description: string;
  image: string;
  images?: string[];
  specs: ProductSpec[];
  tags?: string[];
  featured?: boolean;
}

const rawProducts: Product[] = [
  // --- Carbides ---
  {
    id: "p001",
    sku: "CAR-CW-100",
    name: "Carbide Contour Wheel 100mm",
    groupSlug: "tyre-tube-repair",
    categorySlug: "carbides",
    subcategorySlug: "contour-wheels",
    shortDescription: "Precision contour carbide wheel for tyre sidewall buffing",
    description: "Heavy-duty tungsten carbide contour wheel designed for professional tyre repair operations. Provides consistent buffing across sidewall contours for superior patch adhesion.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [
      { label: "Diameter", value: "100mm" },
      { label: "Arbor Size", value: "12mm" },
      { label: "Profile", value: "Contour" },
      { label: "Material", value: "Tungsten Carbide" },
      { label: "Max RPM", value: "3,000 RPM" },
    ],
  },
  {
    id: "p002",
    sku: "CAR-DW-080",
    name: "Carbide Donut Wheel 80mm",
    groupSlug: "tyre-tube-repair",
    categorySlug: "carbides",
    subcategorySlug: "donut-wheels",
    shortDescription: "Ring-profile carbide wheel for shoulder and sidewall buffing",
    description: "Ring-profile tungsten carbide wheel engineered for shoulder and bead area buffing. Ideal for OTR and truck tyre repairs requiring consistent surface preparation.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [
      { label: "Diameter", value: "80mm" },
      { label: "Profile", value: "Donut/Ring" },
      { label: "Material", value: "Tungsten Carbide" },
      { label: "Max RPM", value: "3,500 RPM" },
    ],
  },
  {
    id: "p003",
    sku: "CAR-FW-115",
    name: "Carbide Flat Wheel 115mm",
    groupSlug: "tyre-tube-repair",
    categorySlug: "carbides",
    subcategorySlug: "flat-wheels",
    shortDescription: "Flat-profile carbide wheel for tread area preparation",
    description: "Wide flat-profile carbide wheel for buffing tread areas on radial and bias tyres. Delivers a uniform surface texture for optimum repair adhesion.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [
      { label: "Diameter", value: "115mm" },
      { label: "Width", value: "25mm" },
      { label: "Profile", value: "Flat" },
      { label: "Material", value: "Tungsten Carbide" },
      { label: "Max RPM", value: "2,800 RPM" },
    ],
  },
  // --- Radial Patches ---
  {
    id: "p004",
    sku: "RAD-P-110",
    name: "Radial Repair Patch RAD-110",
    groupSlug: "tyre-tube-repair",
    categorySlug: "repair-products-tyres",
    subcategorySlug: "radial-patches",
    shortDescription: "Multi-layer radial patch for passenger and light truck tyres",
    description: "Professional-grade multi-layer radial tyre repair patch suitable for passenger car, 4WD and light truck tyres. Includes cushion gum layer for superior bonding.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    specs: [
      { label: "Dimensions", value: "110 x 80mm" },
      { label: "Type", value: "Radial Multi-Layer" },
      { label: "Max Injury Size", value: "15mm" },
      { label: "Application", value: "Passenger / LT" },
      { label: "Pack Quantity", value: "10 per box" },
    ],
    featured: true,
  },
  {
    id: "p005",
    sku: "RAD-P-200",
    name: "Radial Repair Patch RAD-200",
    groupSlug: "tyre-tube-repair",
    categorySlug: "repair-products-tyres",
    subcategorySlug: "radial-patches",
    shortDescription: "Large-area radial patch for truck and bus tyres",
    description: "Extra-large multi-layer radial patch engineered for truck, bus and OTR tyre repairs. High-tensile steel cord reinforcement provides structural integrity in demanding conditions.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    specs: [
      { label: "Dimensions", value: "200 x 150mm" },
      { label: "Type", value: "Radial Steel-Cord" },
      { label: "Max Injury Size", value: "30mm" },
      { label: "Application", value: "Truck / Bus / OTR" },
      { label: "Pack Quantity", value: "5 per box" },
    ],
  },
  // --- Torque Wrenches ---
  {
    id: "p006",
    sku: "TW-NOR-800",
    name: "NORBAR 3/4\" Torque Wrench 200–800Nm",
    groupSlug: "tyre-fitting-handling",
    categorySlug: "torque-wrenches",
    subcategorySlug: "click-torque",
    shortDescription: "Heavy-duty click torque wrench for truck wheel nuts",
    description: "Professional NORBAR click-type torque wrench ideal for torquing truck and bus wheel nuts. Accurate to ±4% clockwise for reliable torque application every time.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Drive Size", value: "3/4\"" },
      { label: "Torque Range", value: "200–800 Nm" },
      { label: "Accuracy", value: "±4% CW" },
      { label: "Length", value: "870mm" },
      { label: "Scale Division", value: "5 Nm" },
    ],
    featured: true,
  },
  {
    id: "p007",
    sku: "TW-NOR-300",
    name: "NORBAR 1/2\" Torque Wrench 40–200Nm",
    groupSlug: "tyre-fitting-handling",
    categorySlug: "torque-wrenches",
    subcategorySlug: "click-torque",
    shortDescription: "Precision click torque wrench for passenger wheel nuts",
    description: "Standard-duty NORBAR click-type torque wrench for passenger car and light truck wheel nut torquing. Compact reversible ratchet head for confined spaces.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Drive Size", value: "1/2\"" },
      { label: "Torque Range", value: "40–200 Nm" },
      { label: "Accuracy", value: "±4% CW" },
      { label: "Length", value: "455mm" },
      { label: "Scale Division", value: "2 Nm" },
    ],
  },
  // --- Impact Wrenches ---
  {
    id: "p008",
    sku: "AIR-IW-34-1200",
    name: "AME 3/4\" Composite Impact Wrench 1200Nm",
    groupSlug: "air-tools-airlines",
    categorySlug: "impact-wrenches",
    subcategorySlug: "3-4-impact",
    shortDescription: "High-torque 3/4\" pneumatic impact wrench for trucks",
    description: "Professional-grade AME composite body pneumatic impact wrench delivering 1200Nm of fastening torque. Ideal for truck, bus and earthmoving wheel nut removal.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Drive Size", value: "3/4\"" },
      { label: "Max Torque", value: "1,200 Nm" },
      { label: "Free Speed", value: "7,000 RPM" },
      { label: "Air Consumption", value: "340 L/min" },
      { label: "Weight", value: "2.8 kg" },
    ],
    featured: true,
  },
  {
    id: "p009",
    sku: "AIR-IW-12-680",
    name: "AME 1/2\" Air Impact Wrench 680Nm",
    groupSlug: "air-tools-airlines",
    categorySlug: "impact-wrenches",
    subcategorySlug: "1-2-impact",
    shortDescription: "Versatile 1/2\" impact wrench for passenger and 4WD wheels",
    description: "Compact and powerful AME 1/2\" drive impact wrench suitable for high-volume tyre shops. Variable speed trigger with forward/reverse selector.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Drive Size", value: "1/2\"" },
      { label: "Max Torque", value: "680 Nm" },
      { label: "Free Speed", value: "9,000 RPM" },
      { label: "Air Consumption", value: "200 L/min" },
      { label: "Weight", value: "1.9 kg" },
    ],
  },
  {
    id: "p010",
    sku: "AIR-IW-1-2000",
    name: "AME 1\" Drive Heavy Duty Impact Wrench 2000Nm",
    groupSlug: "air-tools-airlines",
    categorySlug: "impact-wrenches",
    subcategorySlug: "1-inch-impact",
    shortDescription: "Maximum torque 1\" drive wrench for earthmoving and mining",
    description: "Extreme-duty AME 1\" drive impact wrench designed for earthmoving, mining and port equipment wheel nut removal. Twin-hammer mechanism for maximum power.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Drive Size", value: "1\"" },
      { label: "Max Torque", value: "2,000 Nm" },
      { label: "Free Speed", value: "5,500 RPM" },
      { label: "Air Consumption", value: "480 L/min" },
      { label: "Weight", value: "4.2 kg" },
    ],
  },
  // --- Air Bottle Jacks ---
  {
    id: "p011",
    sku: "JK-AIR-20T",
    name: "AME 5L Air/Hydraulic Pump 20 Tonne",
    groupSlug: "jacking-lifting",
    categorySlug: "bottle-jacks-air",
    subcategorySlug: "abj-10-20t",
    shortDescription: "Air/hydraulic bottle jack for rapid heavy vehicle lifting",
    description: "Professional AME 20-tonne air/hydraulic bottle jack with 5-litre oil reservoir. Pneumatic-assisted lift for fast cycle times in high-volume tyre bays.",
    image: "https://images.unsplash.com/photo-1576689625695-e2e5e3f87fe4?w=800&q=80",
    specs: [
      { label: "Capacity", value: "20 Tonne" },
      { label: "Oil Reservoir", value: "5 Litre" },
      { label: "Min Height", value: "280mm" },
      { label: "Max Height", value: "500mm" },
      { label: "Air Pressure", value: "7 bar max" },
    ],
    featured: true,
  },
  {
    id: "p012",
    sku: "JK-AIR-50T",
    name: "AME 10L Air/Hydraulic Pump 50 Tonne",
    groupSlug: "jacking-lifting",
    categorySlug: "bottle-jacks-air",
    subcategorySlug: "abj-30-50t",
    shortDescription: "Heavy-duty 50 tonne air jack for mining and port equipment",
    description: "Maximum-capacity AME air/hydraulic bottle jack for earthmoving and mining equipment. Large 10-litre oil reservoir for extended lifting operations.",
    image: "https://images.unsplash.com/photo-1576689625695-e2e5e3f87fe4?w=800&q=80",
    specs: [
      { label: "Capacity", value: "50 Tonne" },
      { label: "Oil Reservoir", value: "10 Litre" },
      { label: "Min Height", value: "320mm" },
      { label: "Max Height", value: "580mm" },
      { label: "Air Pressure", value: "7 bar max" },
    ],
  },
  // --- TPMS ---
  {
    id: "p013",
    sku: "TPM-SEN-UNI-01",
    name: "Universal TPMS Sensor 433MHz",
    groupSlug: "valves-accessories",
    categorySlug: "tpms",
    subcategorySlug: "tpms-sensors",
    shortDescription: "Programmable universal TPMS sensor for most makes and models",
    description: "Universal programmable TPMS sensor compatible with over 98% of vehicles. Single SKU replaces multiple OEM part numbers. Programs via standard TPMS service tool.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    specs: [
      { label: "Frequency", value: "433 MHz" },
      { label: "Compatibility", value: "Multi-brand programmable" },
      { label: "Battery Life", value: "7–10 years" },
      { label: "Pressure Range", value: "0–116 PSI" },
      { label: "Pack Quantity", value: "1 sensor" },
    ],
    featured: true,
  },
  {
    id: "p014",
    sku: "TPM-TOOL-PRO",
    name: "TPMS Pro Service Tool",
    groupSlug: "valves-accessories",
    categorySlug: "tpms",
    subcategorySlug: "tpms-tools",
    shortDescription: "Handheld TPMS service and programming tool",
    description: "Professional handheld TPMS service tool for activating, reading, programming and relearning TPMS sensors across all major vehicle brands. Updateable via USB.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    specs: [
      { label: "Compatibility", value: "OBD & direct TPMS" },
      { label: "Sensor Coverage", value: "98%+ of vehicles" },
      { label: "Display", value: "3.5\" colour touchscreen" },
      { label: "Battery", value: "3.7V Li-ion, 2000mAh" },
      { label: "Update Method", value: "USB / Wi-Fi OTA" },
    ],
    featured: true,
  },
  // --- Balance Weights ---
  {
    id: "p015",
    sku: "BW-CLIP-CAR-5G",
    name: "Zinc Clip-On Balance Weights 5g",
    groupSlug: "balance-weights",
    categorySlug: "car-weights",
    subcategorySlug: "clip-on-car",
    shortDescription: "High-quality zinc clip-on wheel balance weights",
    description: "Premium zinc alloy clip-on balance weights for passenger car steel and alloy wheels. Environmentally friendly lead-free formulation meeting EU ELV directive requirements.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    specs: [
      { label: "Weight", value: "5 grams" },
      { label: "Material", value: "Zinc alloy (lead-free)" },
      { label: "Clip Type", value: "Standard MC" },
      { label: "Rim Width Fit", value: "3.5\"–7\"" },
      { label: "Pack Quantity", value: "100 per box" },
    ],
  },
  {
    id: "p016",
    sku: "BW-ADH-60G-ROLL",
    name: "Adhesive Balance Weight Tape 60g Roll",
    groupSlug: "balance-weights",
    categorySlug: "car-weights",
    subcategorySlug: "adhesive-car",
    shortDescription: "Pre-cut adhesive balance weight roll for alloy wheels",
    description: "Pre-segmented adhesive wheel balance weight roll in 5g segments. High-bond 3M adhesive tape for secure attachment to clean alloy wheel surfaces.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    specs: [
      { label: "Roll Weight", value: "60 grams" },
      { label: "Segment Size", value: "5g per segment" },
      { label: "Adhesive", value: "3M high-bond" },
      { label: "Material", value: "Zinc alloy (lead-free)" },
      { label: "Pack Quantity", value: "36 rolls per box" },
    ],
  },
  // --- Cordless Tools ---
  {
    id: "p017",
    sku: "CORD-IW-18V-KIT",
    name: "18V Brushless Cordless Impact Wrench Kit",
    groupSlug: "cordless-tools",
    categorySlug: "cordless-impact-wrenches",
    subcategorySlug: "18v-impact",
    shortDescription: "18V brushless impact wrench with 2 x 5Ah batteries",
    description: "Professional 18V brushless cordless impact wrench delivering 600Nm of torque. Includes 2 x 5Ah lithium-ion batteries and rapid charger for all-day workshop use.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    specs: [
      { label: "Voltage", value: "18V" },
      { label: "Max Torque", value: "600 Nm" },
      { label: "Drive Size", value: "1/2\"" },
      { label: "Battery", value: "2 x 5Ah Li-ion" },
      { label: "No-Load Speed", value: "0–2,800 RPM" },
    ],
    featured: true,
  },
  // --- Tyre Levers ---
  {
    id: "p018",
    sku: "TL-STEEL-450",
    name: "Steel Tyre Lever 450mm",
    groupSlug: "tyre-fitting-handling",
    categorySlug: "tyre-levers",
    subcategorySlug: "steel-levers",
    shortDescription: "Heavy-duty drop-forged steel tyre lever",
    description: "Drop-forged hardened steel tyre lever for professional tyre fitting. Tapered spoon end for easy bead insertion. Ergonomic vinyl grip handle for reduced hand fatigue.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [
      { label: "Length", value: "450mm" },
      { label: "Material", value: "Drop-forged steel" },
      { label: "Finish", value: "Chrome-plated" },
      { label: "Application", value: "Passenger / LT" },
      { label: "Pack Quantity", value: "3 per set" },
    ],
  },
  // --- Snap-In Valves ---
  {
    id: "p019",
    sku: "VAL-TR413-100",
    name: "TR413 Snap-In Valve (Box 100)",
    groupSlug: "valves-accessories",
    categorySlug: "car-4wd-valves",
    subcategorySlug: "snap-in-valves",
    shortDescription: "Standard TR413 rubber snap-in valve stems",
    description: "Industry-standard TR413 short rubber snap-in valve stems for tubeless passenger car and light truck wheels. UV-resistant rubber compound for long service life.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    specs: [
      { label: "Type", value: "TR413 Snap-In" },
      { label: "Application", value: "Passenger / LT tubeless" },
      { label: "Overall Length", value: "44mm" },
      { label: "Valve Core", value: "TR4 standard" },
      { label: "Pack Quantity", value: "100 per box" },
    ],
  },
  {
    id: "p020",
    sku: "VAL-TR415-100",
    name: "TR415 Snap-In Valve (Box 100)",
    groupSlug: "valves-accessories",
    categorySlug: "car-4wd-valves",
    subcategorySlug: "snap-in-valves",
    shortDescription: "Standard TR415 long-neck rubber snap-in valve stems",
    description: "Long-neck TR415 rubber snap-in valve for tubeless wheels requiring extended stem reach. Same rubber compound and core as TR413.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    specs: [
      { label: "Type", value: "TR415 Snap-In" },
      { label: "Application", value: "Passenger / LT tubeless" },
      { label: "Overall Length", value: "62mm" },
      { label: "Valve Core", value: "TR4 standard" },
      { label: "Pack Quantity", value: "100 per box" },
    ],
  },
  // --- Wheel Chocks ---
  {
    id: "p021",
    sku: "WC-RUB-LARGE",
    name: "Heavy Duty Rubber Wheel Chock Large",
    groupSlug: "jacking-lifting",
    categorySlug: "wheel-chocks",
    subcategorySlug: "rubber-chocks",
    shortDescription: "Large solid rubber chock for trucks and heavy vehicles",
    description: "Heavy-duty solid rubber wheel chock rated for vehicles up to 20 tonnes. Moulded anti-slip base with reflective safety stripe. Meets AS/NZS standards.",
    image: "https://images.unsplash.com/photo-1576689625695-e2e5e3f87fe4?w=800&q=80",
    specs: [
      { label: "Dimensions", value: "230 x 180 x 150mm" },
      { label: "Material", value: "Solid rubber" },
      { label: "Max Load", value: "20 Tonne" },
      { label: "Colour", value: "Black/Yellow" },
      { label: "Standard", value: "AS/NZS compliant" },
    ],
  },
  // --- Tyre Sealant ---
  {
    id: "p022",
    sku: "SEAL-PREV-5L",
    name: "TyreSeal Pro Preventative Sealant 5L",
    groupSlug: "tyre-tube-repair",
    categorySlug: "tyre-sealant",
    subcategorySlug: "preventative-sealant",
    shortDescription: "Long-life preventative tyre sealant for tubes and tubeless",
    description: "Professional-grade fibre-reinforced tyre sealant for preventative use in tubes and tubeless tyres. Seals punctures up to 6mm instantly without pressure loss. Suitable for all tyre types.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    specs: [
      { label: "Volume", value: "5 Litres" },
      { label: "Max Puncture Seal", value: "6mm" },
      { label: "Temperature Range", value: "-10°C to +60°C" },
      { label: "Application", value: "Tube & tubeless" },
      { label: "Shelf Life", value: "2 years unopened" },
    ],
    featured: true,
  },
];

// Auto-wire local product photos by SKU. A file at public/products/<SKU>.jpg
// overrides the placeholder image; <SKU>-1.jpg, -2.jpg … become gallery shots.
// The map is generated by scripts/generate-product-images.mjs — never edit images
// here; just drop files in public/products/ and rebuild.
export const products: Product[] = rawProducts.map((p) => {
  const shots = productImages[p.sku];
  return shots && shots.length > 0 ? { ...p, image: shots[0], images: shots } : p;
});

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsBySubcategory(
  groupSlug: string,
  categorySlug: string,
  subcategorySlug: string
): Product[] {
  return products.filter(
    (p) =>
      p.groupSlug === groupSlug &&
      p.categorySlug === categorySlug &&
      p.subcategorySlug === subcategorySlug
  );
}

export function getProductsByCategory(groupSlug: string, categorySlug: string): Product[] {
  return products.filter(
    (p) => p.groupSlug === groupSlug && p.categorySlug === categorySlug
  );
}

export function getProductsByGroup(groupSlug: string): Product[] {
  return products.filter((p) => p.groupSlug === groupSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
  );
}
