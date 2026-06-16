export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  items?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

export interface ProductGroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  categories: Category[];
}

export const productGroups: ProductGroup[] = [
  {
    id: "tyre-tube-repair",
    name: "Tyre & Tube Repair",
    slug: "tyre-tube-repair",
    description: "Professional repair materials and tools for tyres and tubes",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    categories: [
      {
        id: "carbides",
        name: "Carbides",
        slug: "carbides",
        description: "High-performance carbide buffing tools for tyre preparation",
        subcategories: [
          { id: "contour-wheels", name: "Contour Wheels", slug: "contour-wheels", description: "Shaped carbide wheels for contour buffing" },
          { id: "donut-wheels", name: "Donut Wheels", slug: "donut-wheels", description: "Ring-profile carbide wheels for sidewall work" },
          { id: "flat-wheels", name: "Flat Wheels", slug: "flat-wheels", description: "Flat-profile carbide wheels for tread area buffing" },
          { id: "point-wheels", name: "Point Wheels", slug: "point-wheels", description: "Fine-point carbide wheels for precision work" },
        ],
      },
      {
        id: "cement-chemicals",
        name: "Cement Chemicals & Solutions",
        slug: "cement-chemicals",
        description: "Bonding cements and chemical solutions for tyre repair",
        subcategories: [
          { id: "cold-cement", name: "Cold Cement", slug: "cold-cement", description: "Solvent-based cold vulcanising cement" },
          { id: "hot-cement", name: "Hot Cement", slug: "hot-cement", description: "Heat-activated bonding cement for vulcanisation" },
          { id: "buffer-solution", name: "Buffer Solution", slug: "buffer-solution", description: "Cleaning and preparation solutions" },
        ],
      },
      {
        id: "dip-tanks",
        name: "Dip Tanks & Accessories",
        slug: "dip-tanks",
        description: "Dip tanks for cleaning and treating tyre repair materials",
        subcategories: [
          { id: "dip-tanks-units", name: "Dip Tank Units", slug: "dip-tanks-units", description: "Complete dip tank assemblies" },
          { id: "tank-accessories", name: "Tank Accessories", slug: "tank-accessories", description: "Lids, baskets and fittings" },
        ],
      },
      {
        id: "extruding",
        name: "Extruding",
        slug: "extruding",
        description: "Extruding equipment and repair filler materials",
        subcategories: [
          { id: "extruder-guns", name: "Extruder Guns", slug: "extruder-guns", description: "Handheld and pneumatic extruder guns" },
          { id: "filler-rubber", name: "Filler Rubber", slug: "filler-rubber", description: "Pre-cured filler rubber in various grades" },
        ],
      },
      {
        id: "repair-kits",
        name: "Repair Kits",
        slug: "repair-kits",
        description: "Complete tyre repair kits for workshops and field use",
        subcategories: [
          { id: "passenger-kits", name: "Passenger Car Kits", slug: "passenger-kits", description: "Comprehensive kits for passenger tyre repairs" },
          { id: "truck-kits", name: "Truck & Bus Kits", slug: "truck-kits", description: "Heavy-duty kits for commercial tyre repairs" },
          { id: "field-kits", name: "Field Service Kits", slug: "field-kits", description: "Portable kits for on-site tyre repair" },
        ],
      },
      {
        id: "repair-rubber",
        name: "Repair Rubber",
        slug: "repair-rubber",
        description: "Quality repair rubber for patches and fills",
        subcategories: [
          { id: "cushion-gum", name: "Cushion Gum", slug: "cushion-gum", description: "Soft cushion gum for patch bedding" },
          { id: "tread-rubber", name: "Tread Rubber", slug: "tread-rubber", description: "Extruded tread fill rubber" },
          { id: "sidewall-rubber", name: "Sidewall Rubber", slug: "sidewall-rubber", description: "Flexible sidewall repair rubber" },
        ],
      },
      {
        id: "repair-products-tubes",
        name: "Repair Products for Tubes",
        slug: "repair-products-tubes",
        description: "Dedicated repair products for inner tubes",
        subcategories: [
          { id: "tube-patches", name: "Tube Patches", slug: "tube-patches", description: "Self-vulcanising and hot patches for tubes" },
          { id: "tube-cement", name: "Tube Cement", slug: "tube-cement", description: "Bonding cement for tube repairs" },
        ],
      },
      {
        id: "repair-products-tyres",
        name: "Repair Products for Tyres",
        slug: "repair-products-tyres",
        description: "Comprehensive repair patch and plug range",
        subcategories: [
          { id: "radial-patches", name: "Radial Patches", slug: "radial-patches", description: "Multi-layer radial tyre repair patches" },
          { id: "bias-patches", name: "Bias Patches", slug: "bias-patches", description: "Cross-ply and bias tyre repair patches" },
          { id: "plug-repairs", name: "Plug Repairs", slug: "plug-repairs", description: "Combination plug and patch repairs" },
          { id: "unit-patches", name: "Unit Patches", slug: "unit-patches", description: "One-piece vulcanising units" },
        ],
      },
      {
        id: "tyre-repair-tools",
        name: "Tyre Repair Tools",
        slug: "tyre-repair-tools",
        description: "Hand tools and power tools for tyre repair operations",
        subcategories: [
          { id: "buffing-tools", name: "Buffing Tools", slug: "buffing-tools", description: "Angle grinders and buffing attachments" },
          { id: "stitching-tools", name: "Stitching Tools", slug: "stitching-tools", description: "Rollers and stitchers for patch application" },
          { id: "repair-stands", name: "Repair Stands", slug: "repair-stands", description: "Tyre repair work stands" },
        ],
      },
      {
        id: "tyre-sealant",
        name: "Tyre Sealant",
        slug: "tyre-sealant",
        description: "Liquid sealants for puncture prevention and repair",
        subcategories: [
          { id: "preventative-sealant", name: "Preventative Sealant", slug: "preventative-sealant", description: "Pre-emptive sealant for tubes and tubeless tyres" },
          { id: "emergency-sealant", name: "Emergency Sealant", slug: "emergency-sealant", description: "Rapid-deployment emergency inflation sealant" },
        ],
      },
      {
        id: "tyre-spreaders",
        name: "Tyre Spreaders & Parts",
        slug: "tyre-spreaders",
        description: "Spreaders and accessories for tyre inspection and repair",
        subcategories: [
          { id: "manual-spreaders", name: "Manual Spreaders", slug: "manual-spreaders", description: "Manually operated tyre spreaders" },
          { id: "spreader-parts", name: "Spreader Parts", slug: "spreader-parts", description: "Replacement arms, hooks and springs" },
        ],
      },
      {
        id: "vulcanisation",
        name: "Vulcanisation",
        slug: "vulcanisation",
        description: "Vulcanising equipment for professional hot repairs",
        subcategories: [
          { id: "vulcanisers", name: "Vulcanisers", slug: "vulcanisers", description: "Electric and steam vulcanising presses" },
          { id: "vulcaniser-parts", name: "Vulcaniser Parts", slug: "vulcaniser-parts", description: "Heating elements, clamps and accessories" },
        ],
      },
    ],
  },
  {
    id: "tyre-fitting-handling",
    name: "Tyre Fitting & Handling",
    slug: "tyre-fitting-handling",
    description: "Tools and equipment for mounting, balancing and handling tyres",
    icon: "Settings",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categories: [
      {
        id: "gauges",
        name: "Gauges",
        slug: "gauges",
        description: "Tyre pressure and depth gauges for accurate measurement",
        subcategories: [
          { id: "pressure-gauges", name: "Pressure Gauges", slug: "pressure-gauges", description: "Digital and analogue tyre pressure gauges" },
          { id: "depth-gauges", name: "Depth Gauges", slug: "depth-gauges", description: "Tread depth measurement tools" },
        ],
      },
      {
        id: "hand-tools",
        name: "Hand Tools",
        slug: "hand-tools",
        description: "General hand tools for tyre workshop use",
        subcategories: [
          { id: "hammers-mallets", name: "Hammers & Mallets", slug: "hammers-mallets", description: "Dead-blow and rubber mallets" },
          { id: "pliers-grips", name: "Pliers & Grips", slug: "pliers-grips", description: "Valve pliers and general gripping tools" },
        ],
      },
      {
        id: "hygiene-cleaning",
        name: "Hygiene & Cleaning",
        slug: "hygiene-cleaning",
        description: "Workshop cleaning and hygiene products",
        subcategories: [
          { id: "hand-cleaners", name: "Hand Cleaners", slug: "hand-cleaners", description: "Heavy-duty workshop hand cleaners" },
          { id: "workshop-wipes", name: "Workshop Wipes", slug: "workshop-wipes", description: "Industrial-grade workshop wipes" },
        ],
      },
      {
        id: "lubes-mounting",
        name: "Lubes/Mounting Compounds",
        slug: "lubes-mounting",
        description: "Tyre mounting lubricants and bead seating compounds",
        subcategories: [
          { id: "mounting-paste", name: "Mounting Paste", slug: "mounting-paste", description: "Non-corrosive tyre mounting paste" },
          { id: "bead-seating-fluid", name: "Bead Seating Fluid", slug: "bead-seating-fluid", description: "Liquid bead lubricant for difficult fitments" },
        ],
      },
      {
        id: "markers",
        name: "Markers",
        slug: "markers",
        description: "Tyre marking pens and paint sticks for identification",
        subcategories: [
          { id: "tyre-markers", name: "Tyre Markers", slug: "tyre-markers", description: "Paint pens for tyre sidewall marking" },
          { id: "chalk-markers", name: "Chalk Markers", slug: "chalk-markers", description: "Temporary chalk marking tools" },
        ],
      },
      {
        id: "mounting-tools",
        name: "Mounting Tools",
        slug: "mounting-tools",
        description: "Tools for bead breaking and tyre mounting",
        subcategories: [
          { id: "bead-breakers", name: "Bead Breakers", slug: "bead-breakers", description: "Manual and pneumatic bead breaking tools" },
          { id: "mounting-irons", name: "Mounting Irons", slug: "mounting-irons", description: "Steel tyre mounting irons" },
        ],
      },
      {
        id: "regrooving",
        name: "Regrooving",
        slug: "regrooving",
        description: "Tyre regrooving irons and accessories",
        subcategories: [
          { id: "regrooving-irons", name: "Regrooving Irons", slug: "regrooving-irons", description: "Electric regrooving irons with blades" },
          { id: "regrooving-blades", name: "Regrooving Blades", slug: "regrooving-blades", description: "Replacement blades in multiple profiles" },
        ],
      },
      {
        id: "safety-ppe",
        name: "Safety & PPE",
        slug: "safety-ppe",
        description: "Personal protective equipment for tyre workshop safety",
        subcategories: [
          { id: "inflation-cages", name: "Inflation Cages", slug: "inflation-cages", description: "Safety cages for tyre inflation" },
          { id: "gloves-eyewear", name: "Gloves & Eyewear", slug: "gloves-eyewear", description: "Cut-resistant gloves and safety glasses" },
        ],
      },
      {
        id: "sealing-rings",
        name: "Sealing Rings",
        slug: "sealing-rings",
        description: "O-rings and sealing rings for tyre valves and fittings",
        subcategories: [
          { id: "oring-kits", name: "O-Ring Kits", slug: "oring-kits", description: "Assorted O-ring kits for workshop use" },
          { id: "flap-rings", name: "Flap Rings", slug: "flap-rings", description: "Split-rim flap rings for tube-type wheels" },
        ],
      },
      {
        id: "impact-sockets",
        name: "Impact Sockets",
        slug: "impact-sockets",
        description: "Heavy-duty impact sockets for wheel nut removal",
        subcategories: [
          { id: "metric-impact", name: "Metric Impact Sockets", slug: "metric-impact", description: "Metric impact sockets 17mm–46mm" },
          { id: "imperial-impact", name: "Imperial Impact Sockets", slug: "imperial-impact", description: "AF impact sockets for older vehicles" },
        ],
      },
      {
        id: "standard-sockets",
        name: "Standard Sockets",
        slug: "standard-sockets",
        description: "Standard chrome vanadium sockets",
        subcategories: [
          { id: "socket-sets", name: "Socket Sets", slug: "socket-sets", description: "Complete metric and imperial socket sets" },
          { id: "deep-sockets", name: "Deep Sockets", slug: "deep-sockets", description: "Extended reach deep sockets" },
        ],
      },
      {
        id: "socket-tools-adaptors",
        name: "Socket Tools & Adaptors",
        slug: "socket-tools-adaptors",
        description: "Drive extensions, adaptors and accessories",
        subcategories: [
          { id: "extensions", name: "Extensions", slug: "extensions", description: "Drive extensions from 50mm to 500mm" },
          { id: "adaptors", name: "Adaptors", slug: "adaptors", description: "Drive adaptors for mixed-drive setups" },
        ],
      },
      {
        id: "torque-wrenches",
        name: "Torque Wrenches",
        slug: "torque-wrenches",
        description: "Precision torque wrenches for accurate wheel nut torquing",
        subcategories: [
          { id: "click-torque", name: "Click Torque Wrenches", slug: "click-torque", description: "Adjustable click-type torque wrenches" },
          { id: "beam-torque", name: "Beam Torque Wrenches", slug: "beam-torque", description: "Robust beam-type torque wrenches" },
          { id: "digital-torque", name: "Digital Torque Wrenches", slug: "digital-torque", description: "Electronic torque measurement tools" },
        ],
      },
      {
        id: "tyre-branding",
        name: "Tyre Branding",
        slug: "tyre-branding",
        description: "Tyre branding irons and marking equipment",
        subcategories: [
          { id: "branding-irons", name: "Branding Irons", slug: "branding-irons", description: "Electric and gas-heated branding irons" },
          { id: "branding-stamps", name: "Branding Stamps", slug: "branding-stamps", description: "Custom text and logo branding stamps" },
        ],
      },
      {
        id: "tyre-wheel-handlers",
        name: "Tyre & Wheel Handlers",
        slug: "tyre-wheel-handlers",
        description: "Equipment for moving and handling tyres and wheels safely",
        subcategories: [
          { id: "tyre-dollies", name: "Tyre Dollies", slug: "tyre-dollies", description: "Wheeled dollies for tyre transport" },
          { id: "wheel-carriers", name: "Wheel Carriers", slug: "wheel-carriers", description: "Storage and transport wheel carriers" },
        ],
      },
      {
        id: "tyre-inflation",
        name: "Tyre Inflation",
        slug: "tyre-inflation",
        description: "Inflation equipment including chucks, hoses and controllers",
        subcategories: [
          { id: "inflator-guns", name: "Inflator Guns", slug: "inflator-guns", description: "Trigger inflator guns with gauges" },
          { id: "inflation-hoses", name: "Inflation Hoses", slug: "inflation-hoses", description: "Braided inflation hoses in multiple lengths" },
          { id: "inflation-chucks", name: "Inflation Chucks", slug: "inflation-chucks", description: "Clip-on and screw-on inflation chucks" },
        ],
      },
      {
        id: "tyre-levers",
        name: "Tyre Levers",
        slug: "tyre-levers",
        description: "Heavy-duty tyre levers for manual tyre changing",
        subcategories: [
          { id: "steel-levers", name: "Steel Levers", slug: "steel-levers", description: "Hardened steel tyre levers" },
          { id: "plastic-levers", name: "Plastic Levers", slug: "plastic-levers", description: "Nylon levers for alloy rim protection" },
        ],
      },
      {
        id: "tyre-shine",
        name: "Tyre Shine",
        slug: "tyre-shine",
        description: "Tyre dressing and shine products",
        subcategories: [
          { id: "spray-shine", name: "Spray Shine", slug: "spray-shine", description: "Ready-to-use aerosol tyre shine" },
          { id: "gel-dressing", name: "Gel Dressing", slug: "gel-dressing", description: "Long-lasting gel tyre dressing" },
        ],
      },
      {
        id: "wheel-braces",
        name: "Wheel Braces",
        slug: "wheel-braces",
        description: "Manual and power-assist wheel braces",
        subcategories: [
          { id: "cross-braces", name: "Cross Braces", slug: "cross-braces", description: "4-way cross-pattern wheel braces" },
          { id: "l-braces", name: "L-Shape Braces", slug: "l-braces", description: "Single-arm L-shaped wheel braces" },
        ],
      },
      {
        id: "wheel-nut-safety",
        name: "Wheel Nut Safety",
        slug: "wheel-nut-safety",
        description: "Wheel nut indicators and safety warning products",
        subcategories: [
          { id: "nut-indicators", name: "Nut Indicators", slug: "nut-indicators", description: "Plastic nut rotation indicators" },
          { id: "torque-seals", name: "Torque Seals", slug: "torque-seals", description: "Visual tamper-evident torque sealant" },
        ],
      },
      {
        id: "other-accessories",
        name: "Other Accessories",
        slug: "other-accessories",
        description: "Miscellaneous tyre fitting accessories",
        subcategories: [
          { id: "rim-protectors", name: "Rim Protectors", slug: "rim-protectors", description: "Alloy rim protection during fitting" },
          { id: "bead-blasters", name: "Bead Blasters", slug: "bead-blasters", description: "Rapid bead-seating inflation devices" },
        ],
      },
    ],
  },
  {
    id: "valves-accessories",
    name: "Valves & Accessories",
    slug: "valves-accessories",
    description: "Complete range of tyre valves, cores, caps and accessories",
    icon: "Gauge",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
    categories: [
      {
        id: "tube-valves",
        name: "Tube Valves",
        slug: "tube-valves",
        description: "Valves for tube-type tyres",
        subcategories: [
          { id: "tr4-tr6", name: "TR4 / TR6 Valves", slug: "tr4-tr6", description: "Standard rubber tube valves" },
          { id: "metal-tube-valves", name: "Metal Tube Valves", slug: "metal-tube-valves", description: "Brass and steel tube valve stems" },
        ],
      },
      {
        id: "motorcycle-valves",
        name: "Motorcycle",
        slug: "motorcycle-valves",
        description: "Dedicated valves for motorcycle and scooter tyres",
        subcategories: [
          { id: "mc-rubber-valves", name: "Rubber Valves", slug: "mc-rubber-valves", description: "Standard rubber snap-in motorcycle valves" },
          { id: "mc-metal-valves", name: "Metal Valves", slug: "mc-metal-valves", description: "Angled and straight metal motorcycle valves" },
        ],
      },
      {
        id: "car-4wd-valves",
        name: "Car/4WD & Light Truck",
        slug: "car-4wd-valves",
        description: "Valves for passenger car, 4WD and light truck applications",
        subcategories: [
          { id: "snap-in-valves", name: "Snap-In Valves", slug: "snap-in-valves", description: "Standard snap-in rubber valves TR413, TR415" },
          { id: "clamp-in-valves", name: "Clamp-In Valves", slug: "clamp-in-valves", description: "Metal clamp-in valves for alloy wheels" },
        ],
      },
      {
        id: "truck-bus-valves",
        name: "Truck & Bus",
        slug: "truck-bus-valves",
        description: "Heavy-duty valves for truck and bus applications",
        subcategories: [
          { id: "truck-inner-valves", name: "Inner Tube Valves", slug: "truck-inner-valves", description: "TR175 and TR175A truck tube valves" },
          { id: "truck-tubeless-valves", name: "Tubeless Valves", slug: "truck-tubeless-valves", description: "Clamp-in tubeless valves for steel wheels" },
        ],
      },
      {
        id: "infrastructure-ag-valves",
        name: "Infrastructure & Agricultural",
        slug: "infrastructure-ag-valves",
        description: "Valves for earthmoving, agricultural and specialty applications",
        subcategories: [
          { id: "otr-valves", name: "OTR Valves", slug: "otr-valves", description: "Off-road and earthmoving tyre valves" },
          { id: "ag-valves", name: "Agricultural Valves", slug: "ag-valves", description: "Farm and implement tyre valves" },
        ],
      },
      {
        id: "large-bore-valves",
        name: "Large Bore",
        slug: "large-bore-valves",
        description: "Large bore valves for high-volume inflation",
        subcategories: [
          { id: "lb-straight", name: "Straight Large Bore", slug: "lb-straight", description: "Straight-body large bore valve stems" },
          { id: "lb-angled", name: "Angled Large Bore", slug: "lb-angled", description: "45° and 90° angled large bore valves" },
        ],
      },
      {
        id: "super-large-bore",
        name: "Super Large Bore",
        slug: "super-large-bore",
        description: "Extra-large bore valves for OTR and mining tyres",
        subcategories: [
          { id: "slb-valves", name: "SLB Valve Stems", slug: "slb-valves", description: "Super large bore valve stems for mining tyres" },
        ],
      },
      {
        id: "tpms",
        name: "TPMS",
        slug: "tpms",
        description: "Tyre pressure monitoring system valves and sensors",
        subcategories: [
          { id: "tpms-sensors", name: "TPMS Sensors", slug: "tpms-sensors", description: "OEM and aftermarket TPMS sensor units" },
          { id: "tpms-valves", name: "TPMS Valve Stems", slug: "tpms-valves", description: "Replacement TPMS valve stems" },
          { id: "tpms-tools", name: "TPMS Tools", slug: "tpms-tools", description: "Programming and service tools for TPMS" },
        ],
      },
      {
        id: "valve-cores",
        name: "Valve Cores",
        slug: "valve-cores",
        description: "Standard and high-flow valve core inserts",
        subcategories: [
          { id: "standard-cores", name: "Standard Cores", slug: "standard-cores", description: "Brass standard valve cores" },
          { id: "high-flow-cores", name: "High-Flow Cores", slug: "high-flow-cores", description: "High-flow cores for rapid inflation" },
        ],
      },
      {
        id: "valve-extensions",
        name: "Valve Extensions & Holders",
        slug: "valve-extensions",
        description: "Extensions and holders for hard-to-reach valves",
        subcategories: [
          { id: "rigid-extensions", name: "Rigid Extensions", slug: "rigid-extensions", description: "Solid brass valve extensions" },
          { id: "flexible-extensions", name: "Flexible Extensions", slug: "flexible-extensions", description: "Braided flexible valve extensions" },
        ],
      },
      {
        id: "valve-caps",
        name: "Valve Caps",
        slug: "valve-caps",
        description: "Protective dust caps for all valve types",
        subcategories: [
          { id: "standard-caps", name: "Standard Caps", slug: "standard-caps", description: "Plastic and brass standard dust caps" },
          { id: "locking-caps", name: "Locking Caps", slug: "locking-caps", description: "Security locking valve dust caps" },
        ],
      },
      {
        id: "valve-adapters",
        name: "Valve Adapters & Accessories",
        slug: "valve-adapters",
        description: "Adapters, connectors and miscellaneous valve accessories",
        subcategories: [
          { id: "dual-foot-adapters", name: "Dual Foot Adapters", slug: "dual-foot-adapters", description: "Adapters for dual tyre inflation" },
          { id: "valve-tools-acc", name: "Valve Accessories", slug: "valve-tools-acc", description: "Miscellaneous valve tools and fittings" },
        ],
      },
      {
        id: "tank-valves",
        name: "Tank Valves",
        slug: "tank-valves",
        description: "Valves for air tanks and compressor fittings",
        subcategories: [
          { id: "tank-drain-valves", name: "Drain Valves", slug: "tank-drain-valves", description: "Auto and manual drain valves for tanks" },
        ],
      },
      {
        id: "valve-tools",
        name: "Valve Tools",
        slug: "valve-tools",
        description: "Tools for installing and removing valve components",
        subcategories: [
          { id: "core-tools", name: "Core Tools", slug: "core-tools", description: "Valve core removal and installation tools" },
          { id: "stem-tools", name: "Stem Tools", slug: "stem-tools", description: "Valve stem installation and extraction tools" },
        ],
      },
    ],
  },
  {
    id: "balance-weights",
    name: "Balance Weights",
    slug: "balance-weights",
    description: "Wheel balance weights for all vehicle types",
    icon: "Scale",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    categories: [
      {
        id: "car-weights",
        name: "Car",
        slug: "car-weights",
        description: "Balance weights for passenger car wheels",
        subcategories: [
          { id: "clip-on-car", name: "Clip-On Weights", slug: "clip-on-car", description: "Steel and zinc clip-on balance weights" },
          { id: "adhesive-car", name: "Adhesive Weights", slug: "adhesive-car", description: "Stick-on balance weights for alloy wheels" },
        ],
      },
      {
        id: "4wd-lt-weights",
        name: "4WD/Light Trucks",
        slug: "4wd-lt-weights",
        description: "Heavier balance weights for 4WD and light truck wheels",
        subcategories: [
          { id: "clip-4wd", name: "Clip-On 4WD Weights", slug: "clip-4wd", description: "Heavy clip-on weights for 4WD" },
          { id: "adhesive-4wd", name: "Adhesive 4WD Weights", slug: "adhesive-4wd", description: "High-bond adhesive weights for 4WD" },
        ],
      },
      {
        id: "motorcycle-weights",
        name: "Motorcycle",
        slug: "motorcycle-weights",
        description: "Balance weights for motorcycle rims",
        subcategories: [
          { id: "mc-clip-weights", name: "Clip-On MC Weights", slug: "mc-clip-weights", description: "Clip-on balance weights for spoke rims" },
          { id: "mc-adhesive-weights", name: "Adhesive MC Weights", slug: "mc-adhesive-weights", description: "Stick-on weights for cast motorcycle rims" },
        ],
      },
      {
        id: "heavy-truck-weights",
        name: "Heavy Truck",
        slug: "heavy-truck-weights",
        description: "Large balance weights for heavy commercial vehicle wheels",
        subcategories: [
          { id: "truck-clip-weights", name: "Truck Clip-On Weights", slug: "truck-clip-weights", description: "Heavy-duty clip-on steel weights" },
          { id: "truck-adhesive-weights", name: "Truck Adhesive Weights", slug: "truck-adhesive-weights", description: "High-strength adhesive truck weights" },
        ],
      },
      {
        id: "balancing-compounds",
        name: "Balancing Compounds & Accessories",
        slug: "balancing-compounds",
        description: "Dynamic balancing compounds and related accessories",
        subcategories: [
          { id: "balance-beads", name: "Balance Beads", slug: "balance-beads", description: "Ceramic and glass balancing beads" },
          { id: "balance-powder", name: "Balance Powder", slug: "balance-powder", description: "Fine-grain balancing powder" },
        ],
      },
      {
        id: "balancing-tools",
        name: "Tools & Accessories for Balancing",
        slug: "balancing-tools",
        description: "Tools for balance weight removal and application",
        subcategories: [
          { id: "weight-pliers", name: "Weight Pliers", slug: "weight-pliers", description: "Clip-on and peel-off weight pliers" },
          { id: "adhesive-dispensers", name: "Adhesive Dispensers", slug: "adhesive-dispensers", description: "Tape dispensers for adhesive weight rolls" },
        ],
      },
    ],
  },
  {
    id: "air-tools-airlines",
    name: "Air Tools & Airlines",
    slug: "air-tools-airlines",
    description: "Pneumatic tools and workshop airline systems",
    icon: "Wind",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    categories: [
      {
        id: "impact-wrenches",
        name: "Impact Wrenches",
        slug: "impact-wrenches",
        description: "Pneumatic impact wrenches for wheel nut removal",
        subcategories: [
          { id: "1-2-impact", name: '1/2" Drive Impact Wrenches', slug: "1-2-impact", description: 'Compact 1/2" drive air impact wrenches' },
          { id: "3-4-impact", name: '3/4" Drive Impact Wrenches', slug: "3-4-impact", description: 'Heavy-duty 3/4" drive impact wrenches' },
          { id: "1-inch-impact", name: '1" Drive Impact Wrenches', slug: "1-inch-impact", description: 'High-torque 1" drive impact wrenches for trucks' },
        ],
      },
      {
        id: "other-air-tools",
        name: "Other Air Tools",
        slug: "other-air-tools",
        description: "Air ratchets, grinders and specialty pneumatic tools",
        subcategories: [
          { id: "air-ratchets", name: "Air Ratchets", slug: "air-ratchets", description: "Compact air ratchets for confined spaces" },
          { id: "air-grinders", name: "Air Grinders", slug: "air-grinders", description: "Angle and die grinders for tyre prep" },
        ],
      },
      {
        id: "airlines-fittings",
        name: "Airlines & Fittings",
        slug: "airlines-fittings",
        description: "Workshop airlines, hose reels and pneumatic fittings",
        subcategories: [
          { id: "hose-reels", name: "Hose Reels", slug: "hose-reels", description: "Auto-retract hose reels 10m–20m" },
          { id: "air-hose", name: "Air Hose", slug: "air-hose", description: "Braided PVC and rubber air hose" },
          { id: "pneumatic-fittings", name: "Pneumatic Fittings", slug: "pneumatic-fittings", description: "Couplings, nipples and push-in fittings" },
        ],
      },
      {
        id: "air-accessories",
        name: "Accessories & Maintenance",
        slug: "air-accessories",
        description: "Lubricators, filters, regulators and maintenance kits",
        subcategories: [
          { id: "frl-units", name: "FRL Units", slug: "frl-units", description: "Filter/regulator/lubricator combination units" },
          { id: "tool-oil", name: "Tool Oil", slug: "tool-oil", description: "Pneumatic tool maintenance oil" },
        ],
      },
    ],
  },
  {
    id: "jacking-lifting",
    name: "Jacking & Lifting",
    slug: "jacking-lifting",
    description: "Jacks, stands and lifting equipment for vehicle service",
    icon: "ArrowUpCircle",
    image: "https://images.unsplash.com/photo-1576689625695-e2e5e3f87fe4?w=800&q=80",
    categories: [
      {
        id: "bottle-jacks-manual",
        name: "Bottle Jacks (Manual)",
        slug: "bottle-jacks-manual",
        description: "Manual hydraulic bottle jacks",
        subcategories: [
          { id: "bj-2-10t", name: "2–10 Tonne", slug: "bj-2-10t", description: "Light to medium duty manual bottle jacks" },
          { id: "bj-20-50t", name: "20–50 Tonne", slug: "bj-20-50t", description: "Heavy-duty manual bottle jacks" },
        ],
      },
      {
        id: "bottle-jacks-air",
        name: "Bottle Jacks (Air)",
        slug: "bottle-jacks-air",
        description: "Air/hydraulic bottle jacks for fast lifting",
        subcategories: [
          { id: "abj-10-20t", name: "10–20 Tonne Air Jacks", slug: "abj-10-20t", description: "Pneumatic-hydraulic jacks for trucks" },
          { id: "abj-30-50t", name: "30–50 Tonne Air Jacks", slug: "abj-30-50t", description: "Heavy-duty air-operated bottle jacks" },
        ],
      },
      {
        id: "trolley-jacks",
        name: "Trolley Jacks",
        slug: "trolley-jacks",
        description: "Low-profile and standard trolley jacks",
        subcategories: [
          { id: "low-profile-trolley", name: "Low Profile", slug: "low-profile-trolley", description: "Low-profile trolley jacks for sports vehicles" },
          { id: "heavy-trolley", name: "Heavy Duty", slug: "heavy-trolley", description: "High-capacity trolley jacks for commercial use" },
        ],
      },
      {
        id: "axle-stands",
        name: "Axle Stands",
        slug: "axle-stands",
        description: "Safety axle stands for supporting lifted vehicles",
        subcategories: [
          { id: "ratchet-stands", name: "Ratchet Stands", slug: "ratchet-stands", description: "Height-adjustable ratchet axle stands" },
          { id: "pin-stands", name: "Pin-Lock Stands", slug: "pin-stands", description: "Heavy-duty pin-lock axle stands" },
        ],
      },
      {
        id: "wheel-chocks",
        name: "Wheel Chocks",
        slug: "wheel-chocks",
        description: "Rubber and plastic wheel chocks for vehicle safety",
        subcategories: [
          { id: "rubber-chocks", name: "Rubber Chocks", slug: "rubber-chocks", description: "Heavy-duty solid rubber wheel chocks" },
          { id: "plastic-chocks", name: "Plastic Chocks", slug: "plastic-chocks", description: "High-density polyethylene wheel chocks" },
        ],
      },
      {
        id: "cribbing",
        name: "Cribbing",
        slug: "cribbing",
        description: "Wooden and composite cribbing blocks for heavy vehicles",
        subcategories: [
          { id: "timber-cribbing", name: "Timber Cribbing", slug: "timber-cribbing", description: "Hardwood cribbing blocks" },
          { id: "composite-cribbing", name: "Composite Cribbing", slug: "composite-cribbing", description: "Plastic composite cribbing sets" },
        ],
      },
      {
        id: "jack-parts",
        name: "Parts & Accessories",
        slug: "jack-parts",
        description: "Replacement parts and accessories for jacks and stands",
        subcategories: [
          { id: "jack-saddles", name: "Jack Saddles", slug: "jack-saddles", description: "Replacement rubber saddles for bottle jacks" },
          { id: "jack-handles", name: "Jack Handles", slug: "jack-handles", description: "Replacement handles for manual bottle jacks" },
        ],
      },
    ],
  },
  {
    id: "cordless-tools",
    name: "Cordless Tools",
    slug: "cordless-tools",
    description: "Battery-powered cordless tools for tyre workshops",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7cf0181?w=800&q=80",
    categories: [
      {
        id: "cordless-impact-wrenches",
        name: "Cordless Impact Wrenches",
        slug: "cordless-impact-wrenches",
        description: "Battery-powered impact wrenches for flexible workshop use",
        subcategories: [
          { id: "18v-impact", name: "18V Impact Wrenches", slug: "18v-impact", description: "18V lithium-ion impact wrenches" },
          { id: "20v-impact", name: "20V Impact Wrenches", slug: "20v-impact", description: "20V brushless impact wrenches" },
          { id: "battery-kits", name: "Battery & Charger Kits", slug: "battery-kits", description: "Replacement batteries and rapid chargers" },
        ],
      },
    ],
  },
  {
    id: "retreading",
    name: "Retreading",
    slug: "retreading",
    description: "Equipment and materials for tyre retreading operations",
    icon: "RefreshCw",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    categories: [
      {
        id: "buffing-heads",
        name: "Buffing Heads & Refills",
        slug: "buffing-heads",
        description: "Buffing heads and replacement refill strips",
        subcategories: [
          { id: "bh-passenger", name: "Passenger Car Buffing Heads", slug: "bh-passenger", description: "Passenger tyre buffing heads" },
          { id: "bh-truck", name: "Truck Buffing Heads", slug: "bh-truck", description: "Commercial truck buffing heads" },
          { id: "bh-refills", name: "Buffing Refills", slug: "bh-refills", description: "Replacement refill strips for buffing heads" },
        ],
      },
      {
        id: "tyre-paint",
        name: "Tyre Paint",
        slug: "tyre-paint",
        description: "Speciality paints and coatings for retreaded tyres",
        subcategories: [
          { id: "sidewall-paint", name: "Sidewall Paint", slug: "sidewall-paint", description: "Durable sidewall paint for cosmetic finishing" },
          { id: "tread-paint", name: "Tread Paint", slug: "tread-paint", description: "High-grip tread paint markers" },
        ],
      },
      {
        id: "retreading-accessories",
        name: "Accessories",
        slug: "retreading-accessories",
        description: "Miscellaneous retreading accessories and consumables",
        subcategories: [
          { id: "repair-envelopes", name: "Repair Envelopes", slug: "repair-envelopes", description: "Curing envelopes for retreading" },
          { id: "eye-of-needle", name: "Eye-of-Needle Tools", slug: "eye-of-needle", description: "Needle tools for tread puncture checking" },
        ],
      },
    ],
  },
  {
    id: "outdoor-leisure",
    name: "Outdoor & Leisure",
    slug: "outdoor-leisure",
    description: "Tyre repair and inflation products for outdoor and leisure use",
    icon: "Tent",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80",
    categories: [
      {
        id: "outdoor-repair-kits",
        name: "Repair Kits",
        slug: "outdoor-repair-kits",
        description: "Compact repair kits for recreational and leisure vehicles",
        subcategories: [
          { id: "bicycle-kits", name: "Bicycle Repair Kits", slug: "bicycle-kits", description: "Compact kits for bicycle tube repairs" },
          { id: "atv-kits", name: "ATV & Quad Kits", slug: "atv-kits", description: "Field repair kits for ATV and quad tyres" },
          { id: "caravan-kits", name: "Caravan & Trailer Kits", slug: "caravan-kits", description: "Emergency repair kits for caravans and trailers" },
        ],
      },
    ],
  },
  {
    id: "other-workshop",
    name: "Other / Workshop",
    slug: "other-workshop",
    description: "Workshop furniture, storage and specialty products",
    icon: "Package",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777540?w=800&q=80",
    categories: [
      {
        id: "trolleys-cabinets",
        name: "Trolleys & Cabinets",
        slug: "trolleys-cabinets",
        description: "Workshop tool trolleys and storage cabinets",
        subcategories: [
          { id: "tool-trolleys", name: "Tool Trolleys", slug: "tool-trolleys", description: "Mobile workshop tool trolleys" },
          { id: "tool-cabinets", name: "Tool Cabinets", slug: "tool-cabinets", description: "Stationary workshop tool storage cabinets" },
        ],
      },
      {
        id: "lensklear",
        name: "Lensklear",
        slug: "lensklear",
        description: "Lens cleaning products for workshop safety eyewear",
        subcategories: [
          { id: "lens-wipes", name: "Lens Wipes", slug: "lens-wipes", description: "Anti-fog lens cleaning wipes" },
          { id: "lens-spray", name: "Lens Spray", slug: "lens-spray", description: "Lens cleaning spray solution" },
        ],
      },
    ],
  },
];

export function getGroupBySlug(slug: string): ProductGroup | undefined {
  return productGroups.find((g) => g.slug === slug);
}

export function getCategoryBySlug(groupSlug: string, categorySlug: string): Category | undefined {
  const group = getGroupBySlug(groupSlug);
  return group?.categories.find((c) => c.slug === categorySlug);
}

export function getSubcategoryBySlug(
  groupSlug: string,
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const category = getCategoryBySlug(groupSlug, categorySlug);
  return category?.subcategories.find((s) => s.slug === subcategorySlug);
}
