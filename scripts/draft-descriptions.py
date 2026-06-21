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

# ───────────────────────── tyre-tube-repair ─────────────────────────
# (base noun, default application, type label)
TR_BASE = {
 'plug-repairs': ('combination plug-patch repair', 'permanent tread-area puncture repairs', 'Plug-patch repair'),
 'radial-patches': ('radial tyre repair patch', 'radial tyre casing and tread repairs', 'Radial patch'),
 'bias-patches': ('bias-ply tyre repair patch', 'cross-ply (bias) tyre repairs', 'Bias-ply patch'),
 'tube-patches': ('inner-tube repair patch', 'inner-tube puncture repairs', 'Tube patch'),
 'hot-cement': ('vulcanising cement', 'bonding patches and plugs during repair', 'Vulcanising cement'),
 'cold-cement': ('cold-vulcanising cement', 'chemical (cold) patch repairs', 'Cold cement'),
 'preventative-sealant': ('puncture-preventative tyre sealant', 'sealing and preventing slow punctures', 'Tyre sealant'),
 'buffer-solution': ('pre-buff cleaning solution', 'cleaning the buffed area before cementing', 'Buffing solution'),
 'stitching-tools': ('patch stitcher', 'rolling down patches and plugs during repair', 'Repair tool'),
 'contour-wheels': ('contour buffing wheel', 'buffing curved injury areas before patching', 'Buffing wheel'),
 'donut-wheels': ('donut buffing wheel', 'buffing injury areas before patching', 'Buffing wheel'),
 'flat-wheels': ('flat-face buffing wheel', 'buffing flat injury areas before patching', 'Buffing wheel'),
 'buffing-tools': ('buffing tool', 'cleaning out tyre injuries before repair', 'Buffing tool'),
 'field-kits': ('tyre puncture repair kit', 'roadside and field puncture repairs', 'Repair kit'),
 'cushion-gum': ('repair rubber compound', 'building up section repairs', 'Repair rubber'),
 'manual-spreaders': ('tyre spreader', 'opening the tyre to inspect and repair injuries', 'Spreader'),
 'extruder-guns': ('rubber-extruder part', 'hot rubber-extrusion repairs', 'Extruder part'),
 'tread-rubber': ('uncured tread rubber', 'retreading and section repairs', 'Tread rubber'),
}
TR_BRANDS = [('panesa','Panesa'),('versacure','Versacure'),('xtra seal','Xtra Seal'),
             ('maxibond','Maxibond'),('bufsol','Bufsol'),('never flat','Never Flat'),('prema','Prema')]
TR_PATCH_SUBS = {'radial-patches','bias-patches','tube-patches','plug-repairs'}
TR_WHEEL_SUBS = {'contour-wheels','donut-wheels','flat-wheels'}

def tr_parse(name, sub):
    n=' '+name.strip()+' '; low=n.lower(); a={}
    m=re.search(r'(\d+(?:\.\d+)?)\s*ml\b',low); a['vol']=f"{m.group(1)} mL" if m else None
    if not a['vol']:
        m=re.search(r'(\d+(?:\.\d+)?)\s*(?:lt|ltr|litre|liter|l)\b',low); a['vol']=f"{m.group(1)} L" if m else None
    if not a['vol']:
        m=re.search(r'(\d+(?:\.\d+)?)\s*gallon',low); a['vol']=f"{m.group(1)} gallon" if m else None
    m=re.search(r'(\d+(?:\.\d+)?)\s*kg\b',low); a['kg']=f"{m.group(1)} kg" if m else None
    a['g']=None
    if sub not in TR_WHEEL_SUBS:
        m=re.search(r'(\d+(?:\.\d+)?)\s*(?:gm|gr|g)\b',low); a['g']=f"{m.group(1)} g" if m else None
    m=re.search(r'(\d+)\s*grit',low); a['grit']=m.group(1) if m else None
    if not a['grit'] and sub in TR_WHEEL_SUBS:
        m=re.search(r'(\d+)\s*g\b',low); a['grit']=m.group(1) if m else None
    m=re.search(r'(\d+(?:\.\d+)?)\s*mm',low); a['mm']=f"{m.group(1)} mm" if m else None
    m=re.search(r'(\d+(?:/\d+)?)\s*"',name); inch=m.group(1) if m else None
    if not inch:
        m=re.search(r"(\d+)\s*'",name); inch=m.group(1) if m else None
    a['inch']=f'{inch}"' if inch else None
    a['wire']=('with wire' if re.search(r"w/?\s*wire|with wire",low)
               else 'without wire' if re.search(r"w/?\s*out wire|without wire",low) else None)
    a['brush']=bool(re.search(r"c/?w brush|w brush|with brush",low))
    a['dg']=bool(re.search(r"\bdg\b|-\s*dg",low))
    a['fastdry']=bool(re.search(r"fast dry|quick dry",low))
    for kw,c in [('blue','Blue'),('white','White'),('brown','Brown'),('black','Black'),('silver','Silver')]:
        if ' '+kw+' ' in low: a['colour']=c; break
    for kw,b in TR_BRANDS:
        if kw in low: a['brand']=b; break
    m=re.search(r'\bno\.?\s*(\d+)\b',low); a['no']=f"No. {m.group(1)}" if m else None
    refs=re.findall(r'\b([A-Z]{1,5}\d[\w/]*)\b',name); a['ref']=refs[-1] if refs else None
    m=re.search(r'suit\s+([A-Za-z][A-Za-z0-9/\- ]*?)(?:\s+\d|\s*$)',name,re.I)
    a['suit']=m.group(1).strip() if m else None
    return a

def tr_draft(name, sub):
    a=tr_parse(name, sub); low=name.lower()
    base,app,typ=TR_BASE.get(sub,('tyre repair product',None,'Tyre repair'))

    if sub=='buffing-tools':
        if low.startswith('burr') or 'burr' in low:
            base='tungsten-carbide cutting burr'; typ='Carbide burr'; a['ref']=None
        elif 'stone' in low:
            shape=next((w for w in ['cone','pencil','mushroom','ball','cylinder','cup'] if w in low),None)
            base=f"{shape}-shaped buffing stone" if shape else 'buffing stone'; typ='Buffing stone'
        elif 'rasp' in low: base='buffing rasp'; typ='Rasp'
        elif 'wheel' in low: base='buffing wheel'; typ='Buffing wheel'
    elif sub=='plug-repairs':
        if 'kit' in low: base='string-plug puncture repair kit'; typ='Repair kit'
        elif 'combi' in low or 'patch plug' in low: base='combination plug-patch repair'
        elif 'quill' in low: base='plug-repair insertion quill'; typ='Insertion tool'; app='inserting plug repairs'
        elif any(k in low for k in ['probe','needle','insert tool','pistol grip','t handle']):
            base='plug insertion tool'; typ='Insertion tool'; app='inserting string and plug repairs'
        elif any(k in low for k in ['string','sealfix','sealastic','premafill']):
            base='string repair plug'; typ='String plug'; app='temporary tread-area puncture repairs'
        elif 'remastem' in low: base='stem plug repair'; typ='Stem plug'
        else: base='repair seal'
    elif sub=='hot-cement':
        if 'inner liner' in low: base='inner-liner sealer'; typ='Inner-liner sealer'; app='sealing tubeless inner liners during repair'
        elif 'brush' in low and 'lid' in low: base='spare brush-lid'; typ='Spare part'; app='vulcanising cement cans'
        elif 'fluid' in low: base='vulcanising fluid'; typ='Vulcanising fluid'
    elif sub=='cold-cement':
        if 'inner liner' in low: base='inner-liner sealer'; typ='Inner-liner sealer'
        elif 'solution' in low: base='cold-vulcanising solution'
    elif sub=='preventative-sealant':
        if 'bead seal' in low: base='tyre bead sealer'; typ='Bead sealer'; app='sealing the tyre-to-rim bead'
    elif sub=='buffer-solution':
        if 'liquid buffer' in low: base='liquid pre-buff cleaner'
    elif sub=='stitching-tools':
        if 'probe' in low: base='repair probe'; typ='Probe'; app='probing and clearing tyre injuries'
        elif 'staple' in low: base='tyre repair staples'; typ='Staples'; app='securing section repairs while curing'
        elif 'stitch' in low: base='patch stitcher'; typ='Stitcher'
    elif sub=='donut-wheels':
        if re.search(r'carbide|c/?bide|c/?bde',low): base='carbide donut buffing wheel'
    elif sub=='field-kits':
        if 'string driver' in low: base='string-plug insertion tool kit'
        elif 'box' in low: base='empty repair-kit storage box'; typ='Storage box'; app=None
        elif 'breaker bar' in low: base='breaker bar'; typ='Tool'; app='use with tyre repair kits'
        for kw,ap in [('4wd','4WD and light-truck tyres'),('off road','off-road and 4WD tyres'),
                      ('off-road','off-road and 4WD tyres'),('truck','truck tyres'),
                      ('m/cycle','motorcycle tyres'),('cycle','motorcycle tyres')]:
            if kw in low and app is not None: app='tubeless puncture repairs on '+ap; break
        a['grade']='Premium' if 'premium' in low else ('Standard' if 'standard' in low else None)
    elif sub=='cushion-gum':
        if 'polyfilm' in low: base='repair poly-film'; typ='Consumable'; app='covering repairs while curing'
        elif 'pad' in low or 'stretch' in low: base='stretch repair pad'; typ='Repair pad'
        elif 'rubber' in low: base='two-part repair rubber compound'
    elif sub=='manual-spreaders':
        if 'pneumatic' in low: base='pneumatic tyre spreader'
        elif 'adjustable' in low: base='adjustable tyre spreader'
    elif sub=='extruder-guns':
        if 'heat' in low: base='heating element for repair extruder gun'; typ='Spare part'
        elif 'knob' in low: base='control knob for repair extruder gun'; typ='Spare part'
        elif 'nozzle' in low: base='shaped nozzle for repair extruder gun'; typ='Spare part'

    lead=[]
    if a.get('fastdry'): lead.append('fast-dry')
    if a.get('colour') and sub in ('hot-cement','cold-cement','buffing-tools'): lead.append(a['colour'].lower())
    phrase=' '.join(lead+[base]).strip()

    ref=a.get('no') or a.get('ref')
    reftxt=''
    if ref and sub in TR_PATCH_SUBS:
        reftxt=f" ({(a['brand']+' ') if a.get('brand') else ''}{ref})"
    suittxt=f", to suit {a['suit']}" if a.get('suit') else ''

    dims=[d for d in [a.get('mm'),a.get('inch')] if d]
    detail=[]
    if a.get('grade'): detail.append(a['grade'].lower()+' grade')
    if a.get('grit'): detail.append(f"{a['grit']} grit")
    if dims: detail.append(' × '.join(dims))
    if a.get('wire'): detail.append(a['wire'])
    pack=[p for p in [a.get('vol'),a.get('kg'),a.get('g')] if p]
    packtxt=list(pack)
    if a.get('brush'): packtxt.append('supplied with brush')
    seg=[s for s in [', '.join(detail) if detail else '', ', '.join(packtxt) if packtxt else ''] if s]
    tail=(', '+'; '.join(seg)) if seg else ''

    apptxt=f" for {app}" if app else ''
    short=re.sub(r'\s+',' ',f"{cap(phrase)}{reftxt}{apptxt}{suittxt}{tail}.").strip()

    specs=clean([('Type',typ),('Grade',a.get('grade')),('Brand',a.get('brand')),
        ('Ref',ref),('Grit',(a['grit']+' grit') if a.get('grit') else None),
        ('Size',' × '.join(dims) if dims else None),
        ('Wire',cap(a['wire']) if a.get('wire') else None),
        ('Pack',', '.join(pack) if pack else None),
        ('Application',cap(app) if app else None),
        ('Handling','Dangerous goods — flammable' if a.get('dg') else None)])
    return short, specs

# ───────────────────────── air-tools-airlines ─────────────────────────
# Subcategory slugs in this group are unreliable (gauges filed under frl-units,
# impact wrenches under hose-reels, etc.), so classification is name-driven.
AT_BRANDS=[('hi-cupla','Hi-Cupla'),('jamec pem','Jamec Pem'),('jamecpem','Jamec Pem'),('jamec','Jamec'),
           ('nitto','Nitto'),('cejn','Cejn'),('ryco','Ryco'),('retracta','Retracta'),('coldflex','Coldflex'),
           ('wonder','Wonder'),('ingersoll','Ingersoll Rand'),('sp air','SP Air')]

def at_size(name):
    low=name.lower()
    m=re.search(r'(\d+/\d+)',name)
    if m: return m.group(1)+'"'
    m=re.search(r'\b([12])\s*(?:"|inch|in\b|dr\b|d\b)',low)
    if m: return m.group(1)+'"'
    return None

def at_kind(name):
    l=name.lower()
    if 'socket retainer' in l: return ('impact-socket retainer','retaining impact sockets on the tool anvil','Socket retainer')
    if 'rotor blade' in l or 'vane' in l: return ('air-tool rotor blades (vanes)','servicing air-tool motors','Spare part')
    if 'tool oil' in l or ('oil' in l and 'air' in l): return ('air-tool lubricating oil','lubricating air tools','Lubricant')
    if 'tool holder' in l or 'holder' in l: return ('air-tool holder','hanging air tools at the bay','Accessory')
    if 'hose reel' in l: return ('retractable air-hose reel','tidy air-line delivery at the workshop bay','Hose reel')
    if 'reducing bush' in l: return ('reducing bush','adapting between air-line thread sizes','Adaptor')
    if 'teflon' in l or 'ptfe' in l: return ('PTFE thread-seal tape','sealing threaded air-line joints','Thread tape')
    if 'valve cap' in l: return ('brass valve dust caps','protecting tyre valve stems','Valve cap')
    if 'hose clip' in l: return ('worm-drive hose clip','clamping air and water hose to fittings','Hose clip')
    if 'die grinder' in l: return ('air die grinder','grinding, deburring and rasping','Die grinder')
    if 'ratchet' in l: return ('air ratchet wrench','fast nut-running in tight spaces','Air ratchet')
    if 'drill' in l: return ('air drill','drilling in the workshop','Air drill')
    if 'buffer' in l or 'polisher' in l: return ('low-speed air buffer','buffing and polishing','Air buffer')
    if any(k in l for k in ['impact','i/wren','imp wrench','anvil','air wrench']):
        return ('air impact wrench','removing and refitting wheel nuts','Impact wrench')
    if 'chuck' in l and 'hose' in l: return ('replacement chuck and hose','servicing inflation gauges','Spare part')
    if 'spare' in l and 'hose' in l: return ('replacement air hose','replacing a worn inflator or reel hose','Spare part')
    if 'b/entry' in l or 'liquid filled' in l or 'bottom entry' in l:
        return ('liquid-filled pressure gauge','monitoring air-line pressure','Pressure gauge')
    if 'inflation device' in l: return ('large-bore tyre inflator','inflating and seating large and OTR tyres','Inflator')
    if 'wall mount' in l: return ('wall-mounted tyre inflator','bay tyre inflation to a set pressure','Inflator')
    if 'gauge' in l or 'inflat' in l: return ('tyre inflation gauge','inflating tyres accurately to pressure','Inflation gauge')
    if 'compressor' in l: return ('multifunction tyre inflator','portable tyre inflation','Inflator')
    if 'hose' in l:
        if 'rubber' in l: return ('rubber air hose','air-line air supply','Air hose')
        if 'pvc' in l: return ('PVC air hose','air-line air supply','Air hose')
        return ('air hose','air-line air supply','Air hose')
    if 'coupl' in l or 'cupla' in l or re.search(r'\d\s*s[hfm]\b',l):
        return ('quick-release air coupling (socket)','connecting air tools and hoses','Air coupling')
    if 'tee' in l: return ('air-line tee piece','splitting an air line three ways','Air fitting')
    if 'join' in l: return ('air-line hose joiner','joining two air hoses','Air fitting')
    if 'barb' in l: return ('barbed air-hose tail','push-on air-hose connections','Air fitting')
    if 'adpt' in l or 'adapt' in l: return ('air-line adaptor','adapting air-line connections','Adaptor')
    if 'clip' in l: return ('worm-drive hose clip','clamping air and water hose','Hose clip')
    return ('quick-release air fitting (plug)','connecting air tools and hoses','Air fitting')

def at_parse(name):
    n=' '+name+' '; low=n.lower(); a={}
    a['size']=at_size(name)
    m=re.search(r'(\d+)\s*-\s*(\d+)\s*mm',low); a['clip']=f"{m.group(1)}–{m.group(2)} mm" if m else None
    m=re.search(r'(\d+(?:\.\d+)?)\s*mm',low); a['bore']=f"{m.group(1)} mm" if m else None
    m=re.search(r'(\d+(?:\.\d+)?)(?:m(?:tr|trs|etre|eter)|m)\b',low); a['len']=f"{m.group(1)} m" if m else None
    m=re.search(r'(\d+)\s*-\s*(\d+)\s*psi',low)
    if m: a['psi']=f"{m.group(1)}–{m.group(2)} psi"
    else:
        m=re.search(r'(\d+)\s*psi',low); a['psi']=f"0–{m.group(1)} psi" if m else None
    m=re.search(r'(\d+)\s*rpm',low); a['rpm']=f"{m.group(1)} rpm" if m else None
    a['vol']=None
    if 'oil' in low:  # volume only meaningful for tool oil ("L"/"ml" elsewhere mean Long/model)
        m=re.search(r'(\d+(?:\.\d+)?)\s*ml\b',low)
        if m: a['vol']=f"{m.group(1)} mL"
        else:
            m=re.search(r'(\d+(?:\.\d+)?)\s*l\b',low); a['vol']=f"{m.group(1)} L" if m else None
    a['digital']=('digi' in low or 'digital' in low)
    a['anvil']=('long' if 'long anvil' in low else 'short' if 'short anvil' in low
                else '2" extended' if re.search(r'2"\s*anvil',low) else None)
    a['exhaust']='rear-exhaust' if 'rear exhaust' in low else None
    m=re.search(r'\((\d+)\)',name); a['pack']=f"pack of {m.group(1)}" if m else None
    for kw,b in AT_BRANDS:
        if kw in low: a['brand']=b; break
    m=re.search(r'\b((?:cp|ir|ki|sp|tdr|acs|vg|otk)-?\d[\w-]*)\b',name,re.I)
    if m: a['ref']=m.group(1).upper().replace(' ','')
    else:
        used=set()
        for v in [a.get('bore'),a.get('len'),a.get('psi'),a.get('rpm'),a.get('vol'),a.get('clip'),a.get('pack')]:
            if v: used.update(re.findall(r'\d+',v))
        cands=re.findall(r'\b(\d{2,4}[A-Za-z]+\d*|\d{3,4})\b',name)
        def keep(c):
            cl=c.lower()
            if re.fullmatch(r'\d+',c) and c in used: return False
            if cl.endswith(('mm','ml','psi','rpm','mtr')): return False
            if re.fullmatch(r'\d+(?:\.\d+)?m',cl) or re.fullmatch(r'\d+l',cl): return False
            return True
        cands=[c for c in cands if keep(c)]
        a['ref']=cands[-1] if cands else None
    return a

def at_draft(name, sub):
    base,app,typ=at_kind(name); a=at_parse(name)
    lead=[]
    if a.get('digital') and typ=='Inflation gauge': lead.append('digital')
    phrase=' '.join(lead+[base]).strip()

    ref=a.get('ref'); brand=a.get('brand')
    if ref and brand: idtxt=f" ({brand} {ref})"
    elif ref: idtxt=f" ({ref})"
    elif brand: idtxt=f" ({brand})"
    else: idtxt=''

    sizelbl=('drive' if typ in ('Impact wrench','Air ratchet') else 'chuck' if typ=='Air drill'
             else 'collet' if typ=='Die grinder'
             else 'BSP' if typ in ('Air coupling','Air fitting','Adaptor','Pressure gauge','Hose clip','Thread tape') else '')
    sizetxt=f"{a['size']}{(' '+sizelbl) if sizelbl else ''}" if a.get('size') else None
    ishose = 'hose' in base or typ in ('Air hose','Hose reel')

    detail=[]
    if sizetxt and typ!='Hose clip': detail.append(sizetxt)
    if a.get('anvil'): detail.append(a['anvil']+' anvil')
    if a.get('exhaust'): detail.append(a['exhaust'])
    if a.get('psi'): detail.append(a['psi'])
    if a.get('rpm'): detail.append(a['rpm'])
    if ishose:
        hl=[d for d in [a.get('bore'),a.get('len')] if d]
        if hl: detail.append(' × '.join(hl))
    if typ=='Hose clip' and a.get('clip'): detail.append('fits '+a['clip']+' hose')
    if a.get('vol'): detail.append(a['vol'])
    if a.get('pack'): detail.append(a['pack'])

    apptxt=f" for {app}" if app else ''
    tail=(', '+', '.join(detail)) if detail else ''
    short=re.sub(r'\s+',' ',f"{cap(phrase)}{idtxt}{apptxt}{tail}.").strip()

    sizespec_label=('Drive' if typ in ('Impact wrench','Air ratchet') else 'Chuck' if typ=='Air drill'
                    else 'Collet' if typ=='Die grinder' else 'Thread' if sizelbl=='BSP' else 'Size')
    specs=clean([('Type',typ),('Brand',brand),
        (sizespec_label,a.get('size')),
        ('Pressure range',a.get('psi')),('Speed',a.get('rpm')),
        ('Bore',a.get('bore') if ishose else None),('Length',a.get('len') if ishose else None),
        ('Fits hose',a.get('clip') if typ=='Hose clip' else None),
        ('Volume',a.get('vol')),('Pack',a.get('pack')),('Ref',ref),
        ('Application',cap(app) if app else None)])
    return short, specs

GENERATORS = {'valves-accessories': v_draft, 'balance-weights': b_draft,
              'tyre-tube-repair': tr_draft, 'air-tools-airlines': at_draft}
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
