# Generates AI-draft Short Description + Specs for a product group, emitting JSON
# (data/_drafts.json). It only READS data/products.xlsx (openpyxl read-only) — all
# WRITES to the workbook go through scripts/apply-drafts.mjs (SheetJS), so the file
# is only ever written by the same library sync/import use (openpyxl-written cells
# get silently dropped by SheetJS on the next sync).
#
# Per-group generators decode the inventory naming into the house style. Only blank
# Short Descriptions are drafted (apply-drafts never clobbers a manual edit).
#
# Usage: /usr/local/bin/python3 scripts/draft-descriptions.py <group-slug>
import sys, re, json, openpyxl

GROUP = sys.argv[1] if len(sys.argv) > 1 else ""

cap = lambda s: s[:1].upper() + s[1:] if s else s
def clean(spec_pairs):
    seen, out = set(), []
    for l, v in spec_pairs:
        if not v or l in seen: continue
        seen.add(l); out.append([l, v])
        if len(out) >= 5: break
    return out

# ───────────────────────── valves-accessories ─────────────────────────
V_BASE = {
 'snap-in-valves': ('snap-in valve', 'passenger and light-truck wheels'),
 'clamp-in-valves': ('clamp-in metal valve', 'alloy wheels'),
 'truck-tubeless-valves': ('tubeless truck valve', 'truck and bus wheels'),
 'truck-inner-valves': ('inner-tube truck valve', 'tube-type truck wheels'),
 'rigid-extensions': ('rigid valve extension', None),
 'flexible-extensions': ('flexible braided valve extension', None),
 'stem-tools': ('valve tool', None), 'core-tools': ('valve-core tool', None),
 'otr-valves': ('large-bore valve', 'earthmover and OTR wheels'),
 'standard-caps': ('valve dust cap', None), 'locking-caps': ('locking valve cap', None),
 'standard-cores': ('valve core', None), 'high-flow-cores': ('high-flow valve core', None),
 'valve-tools-acc': ('valve accessory', None), 'dual-foot-adapters': ('valve adaptor', None),
 'tpms-valves': ('TPMS service valve', 'TPMS-equipped wheels'),
 'tpms-tools': ('TPMS service tool', None), 'tpms-sensors': ('TPMS sensor', None),
 'ag-valves': ('agricultural valve', 'tractor and implement wheels'),
 'mc-rubber-valves': ('motorcycle valve', 'motorcycle and scooter rims'),
 'mc-metal-valves': ('metal motorcycle valve', 'motorcycle rims'),
 'tr4-tr6': ('tube valve', 'tube-type wheels'), 'metal-tube-valves': ('metal tube valve', 'tube-type wheels'),
 'tank-drain-valves': ('tank valve', 'air tanks and compressors'),
 'slb-valves': ('super-large-bore valve', 'mining and OTR wheels'),
}
def v_parse(name):
    n=' '+name.strip()+' '; low=n.lower(); a={}
    m=re.search(r'(\d+(?:\.\d+)?)\s*mm',low);  a['length']=f"{m.group(1)} mm" if m else None
    m=re.search(r'(\d+)\s*(?:deg\b|degree|°)',low); a['bend']=f"{m.group(1)}°" if m else None
    m=re.search(r'(\d+/\d+)\s*(bsp|npt)\b',low); a['thread']=f'{m.group(1)} {m.group(2).upper()}' if m else None
    for kw,val in [('chrome','Chrome'),('nickel','Nickel-plated'),(' ni ','Nickel-plated'),('brass','Brass'),('plastic','Plastic'),('rubber','Rubber'),('alum','Aluminium'),('stainless','Stainless steel'),('zinc','Zinc')]:
        if kw in low: a['material']=val; break
    if re.search(r'\bc[\s-]*in\b|clamp[\s-]*in',low): a['constr']='Clamp-in'
    elif re.search(r'\bs[\s-]*in\b|snap[\s-]*in',low): a['constr']='Snap-in'
    a['swivel']='swivel' in low; a['seal']='Top grommet' if 'grommet' in low else None
    a['hp']=(' hp ' in low or 'high press' in low)
    for pat in [r'\bTR\s?\d+\w*',r'\bV-?\d+\w*',r'\bWH-\d+-?\d*',r'\b\d+MS-?\d*',r'\bEX-?\d+\w*',r'\b6-\d+\w*',r'\bN-\d+\w*']:
        m=re.search(pat,name,re.I)
        if m: a['ref']=re.sub(r'\s+','',m.group(0).upper()); break
    fit=None
    if 'alcoa' in low: fit='Alcoa alloy wheels'
    elif 'mag' in low: fit='mag / alloy wheels'
    elif 'dual' in low: fit='dual truck wheels'
    elif re.search(r'\bm/?cycle|m/c\b|motorcycle',low): fit='motorcycle rims'
    elif 'tractor' in low: fit='tractor and agricultural wheels'
    elif re.search(r'\bem\b|earthmov',low): fit='earthmover and OTR wheels'
    elif re.search(r'\bcar\b|pass',low): fit='passenger-car wheels'
    elif re.search(r'\btruck\b|\bt/?l\b',low): fit='truck and bus wheels'
    a['fit']=fit; return a
def v_draft(name, sub):
    base,defapp=V_BASE.get(sub,('valve product',None)); a=v_parse(name)
    app=a['fit'] or defapp; lead=[]
    if a.get('material') and a['material']!='Rubber': lead.append(a['material'])
    if a.get('hp'): lead.append('high-pressure')
    if a.get('bend'): lead.append(a['bend'])
    core=('swivel '+base) if (a.get('swivel') and 'swivel' not in base) else base
    phrase=' '.join(lead+[core]).strip()
    ref=f" ({a['ref']})" if a.get('ref') else ''
    size=''
    if a.get('length') and 'extension' in base: size=f", {a['length']} long"
    elif a.get('length') and 'tool' in base: size=f", {a['length']}"
    elif a.get('thread'): size=f", {a['thread']} thread"
    short=re.sub(r'\s+',' ',f"{cap(phrase)}{ref}{(' for '+app) if app else ''}{size}.").strip()
    specs=clean([('Type', f"{a['constr']} {base}" if a.get('constr') else cap(base)),
        ('Bend',a.get('bend')),('Material',a.get('material')),('Length',a.get('length')),
        ('Thread',a.get('thread')),('Seal',a.get('seal')),('Rating','High pressure' if a.get('hp') else None),
        ('Ref',a.get('ref')),('Application',cap(app) if app else None)])
    return short, specs

# ───────────────────────── balance-weights ─────────────────────────
# (base noun, default application, type label)
B_BASE = {
 'clip-on-car': ('clip-on wheel balance weight','passenger steel wheels','Clip-on'),
 'adhesive-car': ('self-adhesive wheel balance weight','alloy wheels','Adhesive (stick-on)'),
 'truck-clip-weights': ('clip-on wheel balance weight','heavy-truck steel wheels','Clip-on'),
 'truck-adhesive-weights': ('self-adhesive wheel balance weight','heavy-truck wheels','Adhesive (stick-on)'),
 'clip-4wd': ('clip-on wheel balance weight','4WD and light-truck wheels','Clip-on'),
 'adhesive-4wd': ('self-adhesive wheel balance weight','4WD and light-truck wheels','Adhesive (stick-on)'),
 'mc-clip-weights': ('clip-on balance weight','motorcycle rims','Clip-on'),
 'mc-adhesive-weights': ('self-adhesive balance weight','motorcycle rims','Adhesive (stick-on)'),
}
def b_draft(name, sub):
    low=' '+name.lower()+' '
    m=re.search(r'(\d+)\s*gm?\b',low); weight=f"{m.group(1)}g" if m else None
    form='block' if 'block' in low else ('flat' if 'flat' in low else None)
    mag=('mag' in low) or bool(re.search(r'\bfn\b',low))
    if sub in B_BASE:
        base,app,typ=B_BASE[sub]
        if mag and 'truck' not in sub: app='mag / alloy wheels'
        wpart=f"{weight} " if weight else ""
        formpart=f", {form} style" if form else ""
        short=re.sub(r'\s+',' ',cap(f"{wpart}{base} for {app}{formpart}.")).strip()
        return short, clean([('Type',typ),('Weight',weight),('Form',cap(form) if form else None),('Application',cap(app))])
    if sub in ('balance-beads','balance-powder'):
        mref=re.search(r'\b([A-Z]{2,4}\d+\w*)\b',name); ref=mref.group(1) if mref else None
        short=cap(f"Internal tyre balancing {'beads' if sub=='balance-beads' else 'powder'}"
                  f"{(' ('+ref+')') if ref else ''} for dynamic in-tyre wheel balancing"
                  f"{(', '+weight+' pack') if weight else ''}.")
        return re.sub(r'\s+',' ',short).strip(), clean([('Type','Balancing compound'),('Ref',ref),('Pack',weight),('Use','Dynamic in-tyre balancing')])
    if sub=='weight-pliers':
        if 'remov' in low: short="Wheel-weight removal tool for stripping clip-on and adhesive weights cleanly."
        elif 'plier' in low: short="Wheel-weight pliers for fitting and removing clip-on balance weights."
        else: short="Wheel-weight fitting tool for clip-on balance weights."
        return short, clean([('Type','Wheel-weight tool')])
    if sub=='adhesive-dispensers':
        return ("Self-adhesive wheel-weight tape, trimmed to length for fine balance adjustment.", clean([('Type','Adhesive weight tape')]))
    return (re.sub(r'\s+',' ',cap(f"{(weight+' ') if weight else ''}wheel balance weight.")).strip(),
            clean([('Type','Balance weight'),('Weight',weight)]))

GENERATORS = {'valves-accessories': v_draft, 'balance-weights': b_draft}
gen = GENERATORS.get(GROUP)
if not gen:
    sys.exit(f"No generator for group '{GROUP}'. Available: {', '.join(GENERATORS)}")

wb = openpyxl.load_workbook("data/products.xlsx", data_only=True, read_only=True)
ws = wb["Products"]; h=[c.value for c in next(ws.iter_rows(min_row=1,max_row=1))]
ci=lambda n:h.index(n)
drafts={}
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[ci("Group Slug")]!=GROUP: continue
    if not str(row[ci("Add to site (Y/N)")] or "").strip().upper().startswith("Y"): continue
    if str(row[ci("Short Description")] or "").strip(): continue   # keep manual edits
    sku=str(row[ci("SKU")] or "").strip()
    short, specs = gen(str(row[ci("Product Name")] or ""), row[ci("Subcategory Slug")])
    drafts[sku]={"short":short,"specs":specs}

json.dump({"drafts":drafts}, open("data/_drafts.json","w"), indent=0)
print(f"drafted {len(drafts)} products for {GROUP} -> data/_drafts.json")
