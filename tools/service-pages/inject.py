#!/usr/bin/env python3
"""Inject shared conversion blocks into the hand-written (legacy) pages, idempotently via marker comments:
   - instant quote widget after the hero (service pages)
   - FAQ accordion + FAQPage JSON-LD before the final CTA (from faq_bank.py)
   - sticky mobile call/book bar
   - app.js + Google Maps for the quote widget
Run from repo root: python3 tools/service-pages/inject.py
"""
import os, re, json, html, importlib.util
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
HERE = os.path.dirname(os.path.abspath(__file__))
MAPS = '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUQixm0feS4HuZ7IcytuaCdEmtSYje8PM&libraries=places"></script>'
QUOTE_CARD = open(os.path.join(HERE, 'quote_widget.html')).read()
CARD = 'bg-obsidian-900/30 border border-white/[0.04] rounded-2xl'
def esc(s): return html.escape(s, quote=True)

def eyebrow(t): return f'<div class="inline-flex items-center gap-3 mb-6"><div class="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/50"></div><span class="text-xs text-gold-400 tracking-luxe uppercase">{esc(t)}</span><div class="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/50"></div></div>'

def quote_section(title='Get an instant fare', sub='Flat rate, quoted before you book. No surge.'):
    return f'''
    <!-- inject:quote -->
    <section class="py-16 lg:py-20 bg-obsidian-950 border-t border-white/[0.04]" id="quote">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div class="lg:col-span-6">
                    {eyebrow('Instant Quote')}
                    <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-5">{esc(title)}</h2>
                    <p class="text-obsidian-400 font-light leading-relaxed mb-6">{esc(sub)}</p>
                    <ul class="space-y-3 text-sm text-obsidian-300 font-light">
                        <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 mt-2 bg-gold-400 rounded-full shrink-0"></span>Chauffeur assigned before pickup, with a text when they are staged</li>
                        <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 mt-2 bg-gold-400 rounded-full shrink-0"></span>Flight tracked, 30 minutes of free wait time at MSP (60 international)</li>
                        <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 mt-2 bg-gold-400 rounded-full shrink-0"></span>Free cancellation up to 24 hours before pickup</li>
                        <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 mt-2 bg-gold-400 rounded-full shrink-0"></span>Pay online or pay your chauffeur. The number you see is the number you pay</li>
                    </ul>
                </div>
                <div class="lg:col-span-6 relative">
                    <div class="absolute -inset-1 bg-gradient-to-br from-gold-400/10 via-transparent to-gold-500/5 rounded-3xl blur-2xl"></div>
{QUOTE_CARD}                </div>
            </div>
        </div>
    </section>
    <!-- /inject:quote -->
'''

def faq_section(items):
    lis = ''.join(f'''
                <details class="{CARD}">
                    <summary class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                        <span class="text-white font-medium">{esc(q)}</span>
                        <span class="faq-icon text-gold-400 text-xl leading-none shrink-0">+</span>
                    </summary>
                    <div class="px-6 pb-6 -mt-1"><p class="text-obsidian-400 font-light text-sm leading-relaxed">{esc(a)}</p></div>
                </details>''' for q, a in items)
    return f'''
    <!-- inject:faq -->
    <section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]" id="faq">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-12">
                {eyebrow('Questions, Answered')}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white">Frequently Asked Questions</h2>
            </div>
            <div class="max-w-3xl mx-auto space-y-4">{lis}
            </div>
        </div>
    </section>
    <!-- /inject:faq -->
'''

def faq_ld(items):
    d = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]}
    return '    <!-- inject:faq-ld -->\n    <script type="application/ld+json">\n' + json.dumps(d, indent=2) + '\n    </script>\n    <!-- /inject:faq-ld -->\n'

MOBILE_BAR = '''
    <!-- inject:mobilebar -->
    <div class="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-obsidian-950/95 backdrop-blur-lg border-t border-white/10 p-3" style="padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));">
        <div class="flex gap-3 max-w-lg mx-auto">
            <a href="book-a-ride.html" class="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-semibold py-3 rounded-xl text-center shadow-lg shadow-gold-500/20">Book Now</a>
            <a href="tel:+16129995382" class="flex items-center justify-center gap-2 bg-obsidian-800 text-white font-medium py-3 px-5 rounded-xl border border-white/10"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg><span>Call</span></a>
        </div>
    </div>
    <div class="h-20 lg:hidden" aria-hidden="true"></div>
    <!-- /inject:mobilebar -->
'''
FAQ_CSS = '''        details > summary::-webkit-details-marker { display: none; }
        details[open] .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform .3s ease; }
    </style>'''

def strip(s, tag):
    return re.sub(rf'\n?[ \t]*<!-- inject:{tag} -->.*?<!-- /inject:{tag} -->\n?', '\n', s, flags=re.S)

def load_bank():
    f = os.path.join(HERE, 'faq_bank.py')
    if not os.path.exists(f): return {}
    sp = importlib.util.spec_from_file_location('faq_bank', f); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return m.FAQS

# page -> (quote after hero?, quote title)
PAGES = {
    'airport-service.html': ('MSP airport fare in seconds', 'Enter the terminal and your address. The fare covers the airport fee, tolls and the chauffeur, quoted before you book.'),
    'corporate-transportation.html': ('Quote an executive ride', 'Flat rate by distance, receipt by email, no surge on the day of the board meeting.'),
    'downtown-minneapolis.html': ('Downtown in one flat rate', 'Hotels, stadiums, theaters and offices, quoted before you book.'),
    'rochester-mayo-clinic.html': ('Twin Cities to Rochester, quoted flat', 'One fixed fare for the drive, round trips save 10 percent, timed to your appointment.'),
    'wedding-transportation.html': ('Price the getaway car', 'Point-to-point for the couple, hourly for the day. Quote it here or call for a full wedding plan.'),
    'prom-homecoming.html': ('Quote the prom ride', 'Parents book, teens ride, everyone gets home. One flat fare for the group.'),
    'concert-events.html': ('Skip the parking lot', 'Curb to venue door and back, fixed fare, no surge when the show lets out.'),
    'wine-brewery-tours.html': ('Plan the tasting day', 'Hourly service keeps the car with you between wineries. Get a point-to-point quote here or book hourly.'),
    'service-areas.html': ('Quote any address in the metro', 'Suburb to suburb, home to MSP, or out to Rochester. Distance-based, flat, no surprises.'),
    'about.html': None, 'index.html': None, 'book-a-ride.html': None, 'faq.html': None,
}

def inject(page):
    s = open(page).read(); orig = s
    for t in ('quote', 'faq', 'faq-ld', 'mobilebar'): s = strip(s, t)
    cfg = PAGES.get(page, None)
    bank = load_bank()
    # quote widget after hero
    if cfg and page not in ('index.html',):
        title, sub = cfg
        hi = s.find('page-hero'); he = s.index('</section>', hi) + len('</section>')
        s = s[:he] + '\n' + quote_section(title, sub) + s[he:]
    # FAQ before the final CTA section (or before footer)
    items = bank.get(page)
    if items:
        # questions already in the page's own FAQPage schema (legacy) become visible too
        for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
            try: d = json.loads(b)
            except Exception: continue
            for node in (d.get('@graph') or [d]):
                if node.get('@type') == 'FAQPage':
                    have = {q for q, _ in items}
                    items = [(q['name'], q['acceptedAnswer']['text']) for q in node.get('mainEntity', []) if q['name'] not in have] + list(items)
        if page == 'book-a-ride.html':
            block = faq_section(items).replace('<section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]" id="faq">\n        <div class="container mx-auto px-6 lg:px-8">', '<section class="px-6 sm:px-8 lg:px-12 xl:px-16 pb-16" id="faq">\n        <div>').replace('mb-12', 'mb-8')
            s = s.replace('            <!-- inject:faq -->\n', '', 1) if '<!-- inject:faq -->\n            <!-- Right Side' in s else s
            # place the FAQ inside the left (form) column, right after the form container
            right = s.index('            <!-- Right Side: Price Summary (Sticky) - Desktop only -->')
            close = s.rfind('            </div>', 0, right)   # closing tag of the form column
            s = s[:close] + block + s[close:]
        else:
            ctas = [m.start() for m in re.finditer(r'<section class="py-24 (lg:py-32 )?relative overflow-hidden">', s)]
            if ctas:
                at = s.rfind('\n', 0, ctas[-1]) + 1
            else:
                at = s.rfind('\n', 0, s.index('<footer')) + 1
            s = s[:at] + faq_section(items) + s[at:]
        merged = False
        def _merge(m):
            nonlocal merged
            try: d = json.loads(m.group(1))
            except Exception: return m.group(0)
            g = d.get('@graph') if isinstance(d, dict) else None
            if not g: return m.group(0)
            for node in g:
                if node.get('@type') == 'FAQPage':
                    have = {q['name'] for q in node.get('mainEntity', [])}
                    node['mainEntity'] = node.get('mainEntity', []) + [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items if q not in have]
                    merged = True
                    return '<script type="application/ld+json">\n' + json.dumps(d, indent=4) + '\n    </script>'
            return m.group(0)
        s = re.sub(r'<script type="application/ld\+json">(.*?)</script>', _merge, s, count=1, flags=re.S)
        if not merged: s = s.replace('</head>', faq_ld(items) + '</head>', 1)
        if '.faq-icon' not in s: s = s.replace('</style>', FAQ_CSS, 1)
    # mobile bar (pages that don't already have one)
    if page not in ('index.html', 'book-a-ride.html'):
        fi = s.rfind('\n', 0, s.index('<footer')) + 1
        s = s[:fi] + MOBILE_BAR + s[fi:]
    # scripts for the quote widget
    if cfg and 'src="app.js"' not in s:
        s = s.replace('    <script src="nav.js" defer></script>', f'    {MAPS}\n    <script src="app.js"></script>\n    <script src="nav.js" defer></script>', 1)
    if s != orig: open(page, 'w').write(s)
    return page

if __name__ == '__main__':
    for pg in PAGES:
        if os.path.exists(pg): print('injected', inject(pg))
