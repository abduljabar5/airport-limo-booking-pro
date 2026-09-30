#!/usr/bin/env python3
"""Generate Total Town Car service, city and contact pages from spec files, using about.html as the skeleton.

Run from the repo root:  python3 tools/service-pages/build_pages.py
Every generated page is rewritten in place. Header/footer/head changes made to about.html propagate on the next build.
"""
import os, re, json, html, glob, importlib.util
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
os.chdir(ROOT)
SITE = 'https://totaltowncar.com'
PHONE = '(612) 999-5382'; TEL = 'tel:+16129995382'; EMAIL = 'totaltowncarservice@gmail.com'
HERO_BG = 'images/site/hero-bg.webp'
LINK = '    <link rel="stylesheet" href="css/quote-widget.css">'
QUOTE_CARD = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'quote_widget.html')).read()
MAPS = '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUQixm0feS4HuZ7IcytuaCdEmtSYje8PM&libraries=places"></script>'
MOBILE_BAR = '''
    <div class="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-obsidian-950/95 backdrop-blur-lg border-t border-white/10 p-3" style="padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));">
        <div class="flex gap-3 max-w-lg mx-auto">
            <a href="book-a-ride.html" class="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-semibold py-3 rounded-xl text-center shadow-lg shadow-gold-500/20">Book Now</a>
            <a href="tel:+16129995382" class="flex items-center justify-center gap-2 bg-obsidian-800 text-white font-medium py-3 px-5 rounded-xl border border-white/10"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg><span>Call</span></a>
        </div>
    </div>
    <div class="h-20 lg:hidden" aria-hidden="true"></div>
'''
GOLD = 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500'
BTN = 'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-gold-500/20'
GHOST = 'inline-flex items-center justify-center gap-2 border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 font-medium px-8 py-4 rounded-full transition-all duration-300'
CARD = 'bg-obsidian-900/30 border border-white/[0.04] rounded-2xl'
ARROW = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>'
PHONE_SVG = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>'

def dims(path, default=(1600, 900)):
    try:
        with Image.open(path) as im: return im.size
    except Exception: return default

def esc(s): return html.escape(s, quote=True)
def gold(s): return s.replace('<span class="gold-text">', f'<span class="{GOLD}">')

# ---------- skeleton ----------
SKEL = 'about.html'
src = open(SKEL).read()
head = src[:src.index('<body')]
header_html = src[src.index('<body'):src.index('    <!-- Hero Section -->')]
footer_html = src[src.index('    <footer'):]
head = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', head, flags=re.S)
head = re.sub(r'<link rel="canonical" href="[^"]*">', '', head)
EXTRA_CSS = '''        details > summary { list-style: none; cursor: pointer; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform .3s ease; }
        .page-hero { min-height: 60vh; }
    </style>'''
head = head.replace('</style>', EXTRA_CSS, 1)
if 'css/quote-widget.css' not in head: head = head.replace('<link rel="stylesheet" href="css/tailwind.css">', '<link rel="stylesheet" href="css/tailwind.css">\n' + LINK.rstrip('\n'), 1)

def eyebrow(text, center=False):
    return f'''<div class="inline-flex items-center gap-3 mb-6"><div class="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/50"></div><span class="text-xs text-gold-400 tracking-luxe uppercase">{esc(text)}</span><div class="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/50"></div></div>'''

def hero(p):
    w, h = dims(HERO_BG, (1920, 1072))
    return f'''
    <!-- Hero Section -->
    <section class="relative pt-40 lg:pt-56 pb-24 lg:pb-32 overflow-hidden page-hero">
        <div class="absolute inset-0">
            <img src="{HERO_BG}" alt="" class="absolute inset-0 w-full h-full object-cover object-[center_60%]" width="{w}" height="{h}" fetchpriority="high" aria-hidden="true">
            <div class="absolute inset-0 bg-gradient-to-b from-obsidian-950/85 via-obsidian-950/70 to-obsidian-950"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-transparent"></div>
            <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-400/[0.03] rounded-full blur-[120px]"></div>
        </div>
        <div class="container mx-auto px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-7">
                    {eyebrow(p['eyebrow'])}
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.12] text-white mb-6">{gold(p['h1'])}</h1>
                    <p class="text-lg lg:text-xl text-obsidian-300 font-light leading-relaxed mb-9 max-w-2xl">{p['lede']}</p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="book-a-ride.html{p.get('book_qs','')}" class="{BTN}"><span>{esc(p.get('cta1','Book Now'))}</span>{ARROW}</a>
                        <a href="{TEL}" class="{GHOST}">{PHONE_SVG}<span>Call Dispatch 24/7</span></a>
                    </div>
                    <div class="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-xs text-obsidian-400 font-light">
                        <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>5.0 on Google</span>
                        <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>10,000+ rides since 1991</span>
                        <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>Free cancellation up to 24 h</span>
                    </div>
                </div>
                <div class="lg:col-span-5 relative" id="quote">
                    <div class="absolute -inset-1 bg-gradient-to-br from-gold-400/10 via-transparent to-gold-500/5 rounded-3xl blur-2xl"></div>
{QUOTE_CARD}                </div>
            </div>
        </div>
    </section>
'''

def section_intro(p):
    img = p['image']; w, h = dims(img)
    paras = ''.join(f'<p class="text-obsidian-400 font-light leading-relaxed mb-5">{t}</p>' for t in p['intro'])
    return f'''
    <!-- Intro -->
    <section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-5">
                    {eyebrow(p['intro_eyebrow'])}
                    <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-6 leading-snug">{p['intro_h2']}</h2>
                    {paras}
                </div>
                <div class="lg:col-span-7">
                    <div class="{CARD} overflow-hidden p-2 bg-obsidian-900/40">
                        <img src="{img}" alt="{esc(p['image_alt'])}" class="block w-full rounded-xl" width="{w}" height="{h}" loading="lazy">
                    </div>
                    <p class="mt-4 text-center text-[10px] tracking-luxe uppercase text-obsidian-500">{esc(p['image_caption'])}</p>
                </div>
            </div>
        </div>
    </section>
'''

def section_bullets(p):
    n = len(p['bullets'])
    cols = 'md:grid-cols-2 lg:grid-cols-4' if n == 4 else 'md:grid-cols-2 lg:grid-cols-3'
    cards = ''.join(f'''
                <div class="{CARD} p-7 hover:border-gold-400/20 transition-all duration-500">
                    <h3 class="text-lg font-display font-semibold text-white mb-3">{esc(t)}</h3>
                    <p class="text-obsidian-400 font-light text-sm leading-relaxed">{d}</p>
                </div>''' for t, d in p['bullets'])
    lede = f'<p class="text-obsidian-400 font-light">{p["bullets_lede"]}</p>' if p.get('bullets_lede') else ''
    return f'''
    <!-- Why -->
    <section class="py-20 lg:py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900/50 to-obsidian-950">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-14">
                {eyebrow(p['bullets_eyebrow'])}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-5">{p['bullets_h2']}</h2>
                {lede}
            </div>
            <div class="grid {cols} gap-6">{cards}
            </div>
        </div>
    </section>
'''

ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']
def section_steps(p):
    if not p.get('steps'): return ''
    n = len(p['steps']); cols = {3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4', 5: 'md:grid-cols-2 lg:grid-cols-5'}.get(n, 'md:grid-cols-2 lg:grid-cols-4')
    cards = ''.join(f'''
                <div class="{CARD} p-7">
                    <div class="text-3xl font-display text-gold-400 mb-3">{ROMAN[i]}.</div>
                    <h3 class="text-lg font-display font-semibold text-white mb-3">{esc(t)}</h3>
                    <p class="text-obsidian-400 font-light text-sm leading-relaxed">{d}</p>
                </div>''' for i, (t, d) in enumerate(p['steps']))
    return f'''
    <!-- How it works -->
    <section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-14">
                {eyebrow(p.get('steps_eyebrow', 'How It Works'))}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-5">{p['steps_h2']}</h2>
            </div>
            <div class="grid {cols} gap-5">{cards}
            </div>
        </div>
    </section>
'''

FLEET = [
    ('SUV', 'Cadillac Escalade', 'Up to 6 passengers · 6 bags', 'From $69', 'images/fleet/suv-escalade.webp'),
    ('Executive Sedan', 'Mercedes-Benz S-Class', 'Up to 3 passengers · 3 bags', 'From $59', 'images/fleet/sedan-sclass.webp'),
    ('Sedan', 'Lincoln Continental', 'Up to 3 passengers · 3 bags', 'From $49', 'images/fleet/sedan-lincoln.webp'),
    ('Sprinter Van', 'Mercedes-Benz Sprinter', 'Up to 14 passengers · 10+ bags', 'Temporarily unavailable', 'images/fleet/van-sprinter.webp'),
]
def section_fleet(p):
    cards = ''
    for name, model, cap, price, img in FLEET:
        w, h = dims(img, (1200, 900))
        off = price == 'Temporarily unavailable'
        cards += f'''
                <a href="index.html#fleet" class="group {CARD} overflow-hidden hover:border-gold-400/20 transition-all duration-500{' opacity-60' if off else ''}">
                    <div class="aspect-[4/3] relative overflow-hidden bg-[#0e0f12]">
                        <img src="{img}" alt="{esc(model)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700{' grayscale' if off else ''}" width="{w}" height="{h}" loading="lazy">
                        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian-950/80 to-transparent pointer-events-none"></div>
                    </div>
                    <div class="p-5 border-t border-white/[0.04]">
                        <h3 class="text-lg font-display font-semibold text-white">{esc(name)}</h3>
                        <p class="text-xs text-obsidian-500 mb-2">{esc(model)}</p>
                        <p class="text-sm text-obsidian-400 font-light">{esc(cap)}</p>
                        <p class="{'text-obsidian-500' if off else 'text-gold-400'} font-semibold mt-3">{esc(price)}</p>
                    </div>
                </a>'''
    return f'''
    <!-- Fleet -->
    <section class="py-20 lg:py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900/50 to-obsidian-950">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-12">
                {eyebrow('The Fleet')}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-5">{p.get('fleet_h2', 'Sized to the Trip')}</h2>
                <p class="text-obsidian-400 font-light">{p.get('fleet_lede', 'Tell us your passenger and luggage count and we will recommend the right one. Every vehicle is late-model, non-smoking, detailed before each pickup, and fully licensed and insured for commercial passenger transport.')}</p>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">{cards}
            </div>
        </div>
    </section>
'''

def section_faq(p):
    items = ''.join(f'''
                <details class="{CARD}">
                    <summary class="flex items-center justify-between gap-4 px-6 py-5">
                        <span class="text-white font-medium">{esc(q)}</span>
                        <span class="faq-icon text-gold-400 text-xl leading-none shrink-0">+</span>
                    </summary>
                    <div class="px-6 pb-6 -mt-1"><p class="text-obsidian-400 font-light text-sm leading-relaxed">{a}</p></div>
                </details>''' for q, a in p['faq'])
    return f'''
    <!-- FAQ -->
    <section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-12">
                {eyebrow('Questions, Answered')}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white">{esc(p.get('faq_h2', 'Frequently Asked Questions'))}</h2>
            </div>
            <div class="max-w-3xl mx-auto space-y-4">{items}
            </div>
        </div>
    </section>
'''

def section_related(p):
    links = ''.join(f'''
                <a href="{href}" class="group {CARD} p-6 hover:border-gold-400/20 transition-all duration-500 flex items-center justify-between gap-4">
                    <div><h3 class="text-lg font-display font-semibold text-white mb-1">{esc(t)}</h3><p class="text-obsidian-400 font-light text-sm">{d}</p></div>
                    <svg class="w-5 h-5 text-obsidian-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>''' for href, t, d in p['related'])
    return f'''
    <!-- Related -->
    <section class="py-20 lg:py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900/50 to-obsidian-950">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-12">
                {eyebrow('Related Services')}
                <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white">More Ways We Drive the Twin Cities</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">{links}
            </div>
        </div>
    </section>
'''

def section_cta(p):
    return f'''
    <!-- CTA -->
    <section class="py-24 lg:py-32 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-obsidian-950"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-gold-900/10 to-transparent"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-gold-400/[0.05] rounded-full blur-[140px]"></div>
        <div class="container mx-auto px-6 lg:px-8 relative z-10">
            <div class="max-w-3xl mx-auto text-center">
                <div class="text-gold-400/70 mb-6">◆</div>
                <h2 class="text-3xl lg:text-5xl font-display font-semibold text-white mb-6">{p['cta_h2']}</h2>
                <p class="text-lg text-obsidian-300 font-light mb-10">{p['cta_p']}</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="book-a-ride.html{p.get('book_qs','')}" class="{BTN}"><span>{esc(p.get('cta1','Book Now'))}</span>{ARROW}</a>
                    <a href="{TEL}" class="{GHOST}">{PHONE_SVG}<span>{PHONE}</span></a>
                </div>
            </div>
        </div>
    </section>
'''

def section_contact(p):
    img = p['image']; w, h = dims(img)
    rows = [
        ('Call dispatch', f'<a href="{TEL}" class="text-gold-400 hover:text-gold-300">{PHONE}</a>', 'Answered 24 hours a day, every day, including red-eyes and first flights out.'),
        ('Email', f'<a href="mailto:{EMAIL}" class="text-gold-400 hover:text-gold-300">{EMAIL}</a>', 'Quotes, corporate accounts, group plans and anything that is not urgent.'),
        ('Book online', '<a href="book-a-ride.html" class="text-gold-400 hover:text-gold-300">book-a-ride</a>', 'Instant fare, confirmation by email and text in about two minutes.'),
        ('Text us', f'<a href="sms:+16129995382" class="text-gold-400 hover:text-gold-300">{PHONE}</a>', 'Same number. A dispatcher, not a bot, replies.'),
    ]
    cards = ''.join(f'''
                    <div class="{CARD} p-6">
                        <div class="text-[10px] tracking-luxe uppercase text-gold-400 mb-2">{esc(t)}</div>
                        <div class="text-lg text-white font-medium mb-1 break-words">{v}</div>
                        <p class="text-sm text-obsidian-400 font-light">{d}</p>
                    </div>''' for t, v, d in rows)
    return f'''
    <!-- Contact -->
    <section class="py-20 lg:py-24 bg-obsidian-950 border-t border-white/[0.04]">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div class="lg:col-span-6">
                    {eyebrow(p['intro_eyebrow'])}
                    <h2 class="text-3xl lg:text-4xl font-display font-semibold text-white mb-6 leading-snug">{p['intro_h2']}</h2>
                    {''.join(f'<p class="text-obsidian-400 font-light leading-relaxed mb-5">{t}</p>' for t in p['intro'])}
                    <div class="grid sm:grid-cols-2 gap-4 mt-8">{cards}
                    </div>
                </div>
                <div class="lg:col-span-6">
                    <div class="{CARD} overflow-hidden p-2 bg-obsidian-900/40">
                        <img src="{img}" alt="{esc(p['image_alt'])}" class="block w-full rounded-xl" width="{w}" height="{h}" loading="lazy">
                    </div>
                    <p class="mt-4 text-center text-[10px] tracking-luxe uppercase text-obsidian-500">{esc(p['image_caption'])}</p>
                    <div class="{CARD} p-6 mt-6">
                        <h3 class="text-lg font-display font-semibold text-white mb-3">Where we are</h3>
                        <p class="text-sm text-obsidian-400 font-light leading-relaxed">Total Town Car Service is based in Minneapolis and serves the whole Twin Cities metro, MSP Airport, and long-distance destinations across Minnesota. Pickups are at your address, hotel or terminal; there is no counter to visit.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
'''

def ld(p):
    area = [{"@type": "City", "name": p['city'], "containedInPlace": {"@type": "State", "name": "Minnesota"}}] if p.get('city') else \
           [{"@type": "City", "name": "Minneapolis"}, {"@type": "City", "name": "Saint Paul"}, {"@type": "State", "name": "Minnesota"}]
    service = {
        "@context": "https://schema.org", "@type": "Service", "serviceType": p['service_type'], "name": p['title_short'],
        "description": p['meta'], "url": f"{SITE}/{p['file']}",
        "provider": {"@type": "LocalBusiness", "@id": f"{SITE}/#business", "name": "Total Town Car Service", "telephone": "+1-612-999-5382", "url": SITE},
        "areaServed": area,
        "hoursAvailable": {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59"}
    }
    out = '    <script type="application/ld+json">\n' + json.dumps(service, indent=4) + '\n    </script>\n'
    if p.get('faq'):
        faq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub('<[^>]+>', '', a)}} for q, a in p['faq']]}
        out += '    <script type="application/ld+json">\n' + json.dumps(faq, indent=4) + '\n    </script>\n'
    return out

def build(p):
    h = head
    h = re.sub(r'<title>.*?</title>', f'<title>{esc(p["title"])}</title>', h, flags=re.S)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(p["meta"])}">', h)
    h = re.sub(r'<meta name="keywords" content="[^"]*">', f'<meta name="keywords" content="{esc(p["keywords"])}">', h)
    h = h.replace(SKEL, p['file'])
    h = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{esc(p["title"])}">', h)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{esc(p["meta"])}">', h)
    h = re.sub(r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{esc(p["title"])}">', h)
    h = re.sub(r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{esc(p["meta"])}">', h)
    h = re.sub(r'(<meta property="og:image" content=")[^"]*(">)', lambda m: m.group(1)+SITE+'/'+p['image']+m.group(2), h)
    h = re.sub(r'(<meta name="twitter:image" content=")[^"]*(">)', lambda m: m.group(1)+SITE+'/'+p['image']+m.group(2), h)
    h = h.replace('</head>', f'    <link rel="canonical" href="{SITE}/{p["file"]}">\n' + ld(p) + '</head>')
    if p.get('contact'):
        main = hero(p) + section_contact(p) + section_faq(p) + section_related(p) + section_cta(p)
    else:
        main = hero(p) + section_intro(p) + section_bullets(p) + section_steps(p) + section_fleet(p) + section_faq(p) + section_related(p) + section_cta(p)
    foot = footer_html.replace('    <script src="nav.js" defer></script>', f'    {MAPS}\n    <script src="app.js"></script>\n    <script src="nav.js" defer></script>', 1)
    out = h + header_html + '<main id="main-content">' + main + '    </main>\n' + MOBILE_BAR + '\n' + foot
    open(p['file'], 'w').write(out)
    return p['file']

def load_extra():
    f = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'faq_extra.py')
    if not os.path.exists(f): return {}
    sp = importlib.util.spec_from_file_location('faq_extra', f); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return m.EXTRA

def load_all():
    pages = []
    for f in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'specs_*.py'))):
        spec = importlib.util.spec_from_file_location('specs', f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
        pages += m.PAGES
    extra = load_extra()
    for p in pages:
        add = extra.get(p['file'], [])
        have = {q for q, _ in p.get('faq', [])}
        p['faq'] = list(p.get('faq', [])) + [(q, a) for q, a in add if q not in have]
    return pages

if __name__ == '__main__':
    for p in load_all():
        print('built', build(p))
